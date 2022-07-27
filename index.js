import express from 'express';
import fs from 'fs';
import cors from 'cors';
import {addCoin, addTask, addUser, checkUser, getCoinsAndTasks} from "./fileSystemWork.js";
import * as Process from "process";

const PORT = Process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get("/getUser561204567rtyw7", (req, res) => {
    res.send(JSON.stringify(getCoinsAndTasks(req.query.id)));
})

app.get("/reg", (req, res) => {
    res.send(JSON.stringify(addUser(req.query.name, req.query.login, req.query.password, req.query.group)));
})

app.get("/auto", (req, res) => {
    res.send(JSON.stringify(checkUser(req.query.login, req.query.password)));
})

app.get("/addTask", (req, res) => {
    addTask(req.query.date, req.query.text, req.query.group);
    res.send();
})

app.get("/addCoins", (req, res) => {
    addCoin(req.query.count, req.query.id);
    res.send();
})

app.listen(PORT, () => {
    console.log("Запустились!")
})