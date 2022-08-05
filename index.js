import express from 'express';
import cors from 'cors';
import {getUserPage} from "./client/getUserPage.js";
import * as Process from "process";
import {getLoginPage} from "./client/getLoginPage.js";
import Ddos from 'ddos';
import {dbController, TOKENS} from "./db.controller.js"
import {db} from "./DB/db.js";
import {header} from "./helloTutor/header.js";
import {groupBlock} from "./helloTutor/groupBlock.js";
import {footer} from "./helloTutor/footer.js";

const PORT = Process.env.PORT || 3000;
const app = express();
const ddos = new Ddos;

const DOMAIN = "http://localhost:3000";
//const DOMAIN = "https://kiber-bank-server.herokuapp.com";

app.use(ddos.express)
app.use(cors());

await db.query("create TABLE groups( group_id   SERIAL PRIMARY KEY, group_name character(10)) ON CONFLICT DO NOTHING;");
await db.query("create TABLE users(user_id  character(40) PRIMARY KEY, login character(30), password character(70), name character(30), group_id smallint, coins smallint, FOREIGN KEY (group_id) REFERENCES groups (group_id)) ON CONFLICT DO NOTHING;");
await db.query("create TABLE tasks(task_id  SERIAL PRIMARY KEY, date     character(12), text     character(255), group_id smallint, weight   smallint, FOREIGN KEY (group_id) REFERENCES groups (group_id)) ON CONFLICT DO NOTHING;");
await db.query("create TABLE tasks_state(row     SERIAL PRIMARY KEY, user_id character(40), task_id smallint, state   smallint, FOREIGN KEY (user_id) REFERENCES users (user_id), FOREIGN KEY (task_id) REFERENCES tasks (task_id))ON CONFLICT DO NOTHING;");

app.get("/getUser561204567rtyw7", dbController.getCoinsAndTasks);
app.get("/reg", dbController.addUser);
app.get("/auto", dbController.checkUser);
app.get("/addGroup", dbController.addGroup);
app.get("/deleteGroup", dbController.deleteGroup);
app.get("/addTask", dbController.addTask);
app.get("/completeTask", dbController.completeTask);
app.get("/deleteStudent", dbController.deleteStudent);
app.get("/addCoins", dbController.addCoin);
app.get('/', async (req, res) => {
    if (req.query.id === undefined || req.query.id === null) {
        res.send(getLoginPage(req.query.page, DOMAIN));
    } else {
        const id = req.query.id;
        let rows = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);

        const taskArray = await db.query("SELECT * FROM tasks_state WHERE user_id = $1 ORDER BY task_id DESC", [id]);
        let answerTaskArray = [];

        for (let task of taskArray.rows) {
            let rows = await db.query("SELECT * FROM tasks WHERE task_id = $1", [task["task_id"]]);
            let fullTask = {};
            fullTask.date = rows.rows[0]["date"].trim();
            fullTask.text = rows.rows[0]["text"].trim();
            fullTask.weight = rows.rows[0]["weight"];
            fullTask["state"] = task["state"];
            answerTaskArray.push(fullTask);
        }

        if (rows.rows.length === 0) {
            res.send(getUserPage(null, answerTaskArray, DOMAIN));
        } else {
            res.send(getUserPage(rows.rows[0], answerTaskArray, DOMAIN));
        }
    }
})
app.get('/edit', async (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        res.send(`<input id="input" style="width: 20vw;"><button id="btn">Сохранить</button> <a id="a">Ссылка</a>
            <script> 
            document.getElementById("input").value =  localStorage.getItem("token") || "";
            if(localStorage.getItem("token"))
                document.getElementById("a").setAttribute("href","${DOMAIN}/edit?token=" + localStorage.getItem("token"));
            document.getElementById("btn").addEventListener("click",()=>{
                localStorage.setItem("token",document.getElementById("input").value);
                document.getElementById("a").setAttribute("href","${DOMAIN}/edit?token=" + document.getElementById("input").value);
                localStorage.setItem("token",document.getElementById("input").value);
            })
            </script>`);
    } else {
        let page = ``;
        page += header(DOMAIN);
        const groups = await db.query("SELECT * from groups");

        for (let group of groups.rows) {
            let groupJson = {};
            groupJson.name = group["group_name"].trim();
            groupJson.users = [];
            const usersDb = await db.query("SELECT * from users WHERE group_id = $1", [group["group_id"]]);
            for (let user of usersDb.rows) {
                const id = user["user_id"];

                const taskArray = await db.query("SELECT * FROM tasks_state WHERE user_id = $1 ORDER BY task_id DESC", [id]);
                let answerTaskArray = [];

                for (let task of taskArray.rows) {

                    let rows = await db.query("SELECT * FROM tasks WHERE task_id = $1", [task["task_id"]]);
                    let fullTask = {};
                    fullTask.date = rows.rows[0]["date"].trim();
                    fullTask.text = rows.rows[0]["text"].trim();
                    fullTask.weight = rows.rows[0]["weight"];
                    fullTask["state"] = task["state"];
                    answerTaskArray.push(fullTask);
                }

                let newUser = {
                    name: user["name"].trim(),
                    id: user["user_id"].trim(),
                    login: user["login"].trim(),
                    coins: user["coins"],
                    task: answerTaskArray.length === 0 ? null : answerTaskArray[0]
                }
                groupJson.users.push(newUser);
            }

            page += groupBlock(groupJson);
        }
        page += footer();
        res.send(page);
    }
})

app.get('/nice_orig', (req, res) => {
    res.sendFile(`/app/img/nice_orig.png`);
});

app.get('/ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(`/app/img/favicon.ico`);
});

app.listen(PORT, () => {
    console.log("Запустились!")
})