import express from 'express';
import fs from 'fs';
import cors from 'cors';
import {addCoin, addTask, addUser, checkUser, completeTask, getCoinsAndTasks, addGroup} from "./fileSystemWork.js";
import * as Process from "process";
import {getPage} from "./client/getPage.js";

const PORT = Process.env.PORT || 3000;
const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send(`WORK`);
})

app.get('/edit', (req, res) => {
    if (req.query.token !== "token1928vtnhjgjkbnty") {
        res.send(`Неверный токен`);
    } else {
        res.send(getPage());
    }
})

app.get("/getUser561204567rtyw7", (req, res) => {
    res.send(JSON.stringify(getCoinsAndTasks(req.query.id)));
})

app.get("/reg", (req, res) => {
    res.send(JSON.stringify(addUser(req.query.name, req.query.login, req.query.password, req.query.group)));
})

app.get("/addGroup", (req, res) => {
    res.send(JSON.stringify(addGroup(req.query.group)));
})

app.get("/auto", (req, res) => {
    res.send(JSON.stringify(checkUser(req.query.login, req.query.password)));
})

app.get("/addTask", (req, res) => {
    addTask(req.query.date, req.query.text, req.query.group);
    res.send();
})

app.get("/completeTask", (req, res) => {
    completeTask(req.query.id, req.query.state);
    res.send();
})

app.get("/addCoins", (req, res) => {
    if (isNaN(parseInt(req.query.coins))) {
        return;
    }
    addCoin(req.query.coins, req.query.id);
    res.send();
})

app.listen(PORT, () => {
    console.log("Запустились!")
})