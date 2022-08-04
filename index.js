import express from 'express';
import cors from 'cors';
import {
    addCoin,
    addTask,
    addUser,
    checkUser,
    completeTask,
    getCoinsAndTasks,
    addGroup,
    deleteStudent
} from "./fileSystemWork.js";
import {DOMAIN, getPage} from "./client/getPage.js";
import {getUserPage} from "./client/getUserPage.js";
import * as Process from "process";
import {getLoginPage} from "./client/getLoginPage.js";
import * as path from "path";
import favicon  from 'serve-favicon';

const PORT = Process.env.PORT || 3000;
const app = express();

const TOKENS = ["f8bae0a5-ad36-4c7a-a98f-d2868f1bc6f8", "b9cc3baa-b280-4241-a517-7c903f39255b"];

app.use(cors());
app.use(favicon(path.join('img','favicon.ico')));

app.get('/', (req, res) => {
    if (req.query.id === undefined || req.query.id === null) {
        res.send(getLoginPage(req.query.page));
    } else {
        res.send(getUserPage(req.query.id));
    }
})

app.get('/edit', (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        res.send(`<input id="input" style="width: 20vw;"><button id="btn">Сохранить</button> <a id="a">Ссылка</a>
<script> 
document.getElementById("input").value =  localStorage.getItem("token") || "";
if(localStorage.getItem("token"))
    document.getElementById("a").setAttribute("href","${DOMAIN}/edit?token=" + localStorage.getItem("token"));
document.getElementById("btn").addEventListener("click",()=>{
    localStorage.setItem("token",document.getElementById("input").value);
    document.getElementById("a").setAttribute("href","${DOMAIN}/edit?token=" + document.getElementById("input").value);
})
</script>`);
    } else {
        res.send(getPage());
    }
})

app.get("/getUser561204567rtyw7", (req, res) => {
    if (req.query.id === undefined || req.query.id === null) {
        return;
    }
    res.send(JSON.stringify(getCoinsAndTasks(req.query.id)));
})

app.get("/reg", (req, res) => {
    if (req.query.name === undefined || req.query.name === null) {
        return;
    }
    if (req.query.login === undefined || req.query.login === null) {
        return;
    }
    if (req.query.password === undefined || req.query.password === null) {
        return;
    }
    if (req.query.group === undefined || req.query.group === null) {
        return;
    }
    res.send(JSON.stringify(addUser(req.query.name, req.query.login, req.query.password, req.query.group)));
})

app.get("/addGroup", (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        return;
    }
    if (req.query.group === undefined || req.query.group === null) {
        return;
    }
    res.send(JSON.stringify(addGroup(req.query.group)));
})

app.get("/auto", (req, res) => {
    if (req.query.login === undefined || req.query.login === null) {
        return;
    }
    if (req.query.password === undefined || req.query.password === null) {
        return;
    }
    res.send(JSON.stringify(checkUser(req.query.login, req.query.password)));
})

app.get("/addTask", (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        return;
    }
    if (req.query.date === undefined || req.query.date === null) {
        return;
    }
    if (req.query.text === undefined || req.query.text === null) {
        return;
    }
    if (req.query.group === undefined || req.query.group === null) {
        return;
    }
    if (req.query.weight === undefined || req.query.weight === null) {
        return;
    }
    addTask(req.query.date, req.query.text, req.query.group, req.query.weight);
    res.send();
})

app.get("/completeTask", (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        return;
    }
    if (req.query.id === undefined || req.query.id === null) {
        return;
    }
    if (req.query.state === undefined || req.query.state === null) {
        return;
    }
    completeTask(req.query.id, req.query.state);
    res.send();
})

app.get("/deleteStudent", (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        return;
    }
    if (req.query.id === undefined || req.query.id === null) {
        return;
    }
    deleteStudent(req.query.id);
    res.send();
})

app.get("/addCoins", (req, res) => {
    if (!TOKENS.includes(req.query.token)) {
        return;
    }
    if (isNaN(parseInt(req.query.coins))) {
        return;
    }
    if (req.query.id === undefined || req.query.id === null) {
        return;
    }
    addCoin(req.query.coins, req.query.id);
    res.send();
})

app.get('/nice_orig', (req, res) => {
    res.sendFile(`${DOMAIN}/img/nice_orig.png`);
});

app.get('/ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(`${DOMAIN}/img/favicon.ico`);
});


app.listen(PORT, () => {
    console.log("Запустились!")
})