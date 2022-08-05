import {db} from './DB/db.js';
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(9);
const TOKENS = ["f8bae0a5-ad36-4c7a-a98f-d2868f1bc6f8", "b9cc3baa-b280-4241-a517-7c903f39255b"];


class DbController {
    async addUser(req, res) {
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

        let id = uuidv4();
        const {login, name, password, group} = req.query;
        const cryptoPas = bcrypt.hashSync(password, salt);

        const checkUser = await db.query("SELECT * FROM users WHERE login = $1", [login]);
        const checkGroup = await db.query("SELECT * FROM groups WHERE group_name = $1", [group]);

        // Проверка если уже зарегистрирован
        if (checkUser.rows.length !== 0) {
            res.send(JSON.stringify({state: false, message: "Такой пользователь уже существует"}));
        }
        // Проверка на группу
        if (checkGroup.rows.length === 0) {
            res.send(JSON.stringify({state: false, message: "Такой группы не существует"}));
        }

        await db.query("INSERT INTO users (user_id, login, password, group_id, name, coins) VALUES ($1, $2, $3, $4, $5, $6)", [id, login, cryptoPas, checkGroup.rows[0]["group_id"], name, 10]);
        res.send(JSON.stringify({state: true}));
    };

    async getCoinsAndTasks(req, res) {
        if (req.query.id === undefined || req.query.id === null) {
            return;
        }
        const id = req.query.id;

        const rows = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (rows.rows.length === 0) return;

        const taskArray = await db.query("SELECT (state, task_id) FROM tasks_state WHERE user_id = $1 ORDER BY task_id DESC", [id]);
        let answerTaskArray = [];

        for (let task of taskArray.rows) {
            let rows = await db.query("SELECT (date, text, weight) FROM tasks WHERE task_id = $1", [task["task_id"]]);
            let fullTask = {};
            fullTask.date = rows.rows[0]["date"].trim();
            fullTask.text = rows.rows[0]["text"].trim();
            fullTask.weight = rows.rows[0]["weight"];
            fullTask["state"] = task["state"];
            answerTaskArray.push(fullTask);
        }

        res.send(JSON.stringify({tasks: answerTaskArray, coins: rows[0]["coins"]}));
    };

    async completeTask(req, res) {
        if (!TOKENS.includes(req.query.token)) {
            return;
        }
        if (req.query.id === undefined || req.query.id === null) {
            return;
        }
        if (req.query.state === undefined || req.query.state === null) {
            return;
        }

        const {id, state} = req.query;
        const rows = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (rows.rows.length === 0) return;

        const task = await db.query("SELECT * FROM tasks_state WHERE user_id = $1 ORDER BY task_id DESC", [id]);
        const oldState = task.rows[0]["state"];
        let weight = await db.query("SELECT * FROM tasks WHERE task_id = $1", [task.rows[0]["task_id"]]);
        console.log(weight.rows)
        weight = weight.rows[0]["weight"]
        const coins = rows.rows[0]["coins"];

        //Обновление состояния
        await db.query("UPDATE tasks_state SET state = $1 WHERE row = $2", [state, task.rows[0]["row"]]);

        let newCoins;
        if (+oldState === 1 && +state === 0)
            newCoins = Number(coins) - Number(weight);
        else if (+oldState === 0 && +state === -1)
            newCoins = Number(coins);
        else
            newCoins = Number(coins) + Number(weight) * Number(state);

        await db.query("UPDATE users SET coins = $1 WHERE user_id = $2", [newCoins, id]);
        res.send(JSON.stringify({state: true}));
    };

    async addTask(req, res) {
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

        const {date, text, weight, group} = req.query;
        const state = 0;
        const rows = await db.query("SELECT * FROM groups WHERE group_name = $1", [group]);
        const groupId = rows.rows[0]["group_id"];

        //?????????????????????????
        const taskIds = await db.query("INSERT INTO tasks (date, text, group_id, weight) VALUES ($1, $2, $3, $4) RETURNING task_id", [date, text, groupId, weight]);
        const taskId = taskIds.rows[0]["task_id"];

        const users = await db.query("SELECT * FROM users WHERE group_id = $1", [groupId]);

        for (const user of users.rows) {
            await db.query("INSERT INTO tasks_state (user_id, task_id, state) VALUES ($1, $2, $3)", [user["user_id"], taskId, state]);
        }
        res.send(JSON.stringify({state: true}));
    };

    async addCoin(req, res) {
        if (!TOKENS.includes(req.query.token)) {
            return;
        }
        if (isNaN(parseInt(req.query.coins))) {
            return;
        }
        if (req.query.id === undefined || req.query.id === null) {
            return;
        }

        const {id, coins} = req.query;
        const rows = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (rows.rows.length === 0) return;
        const oldCoins = rows.rows[0]["coins"];

        const newCoins = Number(coins) + Number(oldCoins);
        await db.query("UPDATE users SET coins = $1 WHERE user_id = $2", [newCoins, id]);
        res.send(JSON.stringify({state: true}));
    };

    async addGroup(req, res) {
        if (!TOKENS.includes(req.query.token)) {
            return;
        }
        if (req.query.group === undefined || req.query.group === null) {
            return;
        }

        await db.query("INSERT INTO groups (group_name) VALUES ($1)", [req.query.group]);
        res.send(JSON.stringify({state: true}));

    };

    async deleteStudent(req, res) {
        if (!TOKENS.includes(req.query.token)) {
            return;
        }
        if (req.query.id === undefined || req.query.id === null) {
            return;
        }
        const id = req.query.id;

        await db.query("Delete from tasks_state WHERE user_id = $1", [id]);
        await db.query("Delete from users WHERE user_id = $1", [id]);
        res.send(JSON.stringify({state: true}));
    };

    async deleteGroup(req, res) {
        if (!TOKENS.includes(req.query.token)) {
            return;
        }
        if (req.query.group === undefined || req.query.group === null) {
            return;
        }
        const group = req.query.group;
        const groupIds = await db.query("SELECT * FROM groups WHERE group_name = $1", [group]);
        const groupId = groupIds.rows[0]["group_id"]
        const users = await db.query("SELECT * FROM users WHERE group_id = $1", [groupId]);

        for (const user of users.rows) {
            await db.query("Delete from tasks_state WHERE user_id = $1", [user["user_id"]]);
        }

        await db.query("Delete from tasks WHERE group_id = $1", [groupId]);
        await db.query("Delete from users WHERE group_id = $1", [groupId]);
        await db.query("Delete from groups WHERE group_id = $1", [groupId]);
        res.send(JSON.stringify({state: true}));
    };

    async checkUser(req, res) {
        if (req.query.login === undefined || req.query.login === null) {
            return;
        }
        if (req.query.password === undefined || req.query.password === null) {
            return;
        }

        const {login, password} = req.query;
        const checkUser = await db.query("SELECT * FROM users WHERE login = $1", [login]);

        if (checkUser.rows.length === 0) {
            res.send(JSON.stringify({state: false, message: "Такого пользователя не существует"}));
        } else {
            const id = checkUser.rows[0]["user_id"];
            const name = checkUser.rows[0]["name"];
            bcrypt.compare(password, checkUser.rows[0]["password"].trim(), function (err, result) {
                    if (result) {
                        res.send(JSON.stringify({state: true, id, name}));
                    } else {
                        res.send(JSON.stringify({state: false, message: "Неверный пароль"}));
                    }
                }
            );
        }
    };
}

const dbController = new DbController();
export {dbController, TOKENS};