import fs from "fs";
import {v4 as uuidv4} from 'uuid';

const USER_INFO = "DB/usersInfo.json";
const USER_LIST = "DB/usersList.json";
const GROUPS = "DB/groups.json";

const readFile = (name) => {
    return JSON.parse(fs.readFileSync(name, "utf-8"));
};
const writeFile = (name, data) => {
    fs.writeFileSync(name, JSON.stringify(data));
};

const getCoinsAndTasks = (id) => {
    const users = readFile(USER_INFO);
    return users[id];
};
const checkUser = (login, password) => {
    console.log(password);
    const users = readFile(USER_LIST);
    // Проверка и регистрация
    if (users[login] === undefined) {
        return {state: false};
    }
    if (users[login].password !== password) {
        return {state: false};
    }

    return {state: true, id: users[login].id, name: users[login].name};
}

const addUser = (name, login, password, group) => {
    const id = uuidv4();
    const user = {name, login, password, group, id};
    const users = readFile(USER_LIST);
    // Проверка и регистрация
    if (users[login] !== undefined) {
        return {state: false};
    }
    users[login] = user;
    writeFile(USER_LIST, users);

    //Добавление в общий список
    const usersInfo = readFile(USER_INFO);
    usersInfo[id] = {coins: 10, tasks: []};
    writeFile(USER_INFO, usersInfo);

    // Запись в группу
    const groups = readFile(GROUPS);
    groups[group] = groups[group] !== undefined ? [...groups[group], id] : [id];
    writeFile(GROUPS, groups);

    return {state: true};
};
const addTask = (date, text, group) => {
    const task = {date, text, state: 1}

    // получение списка группы
    const groups = readFile(GROUPS);
    const children = groups[group];

    // Добавление задачи через общий список
    const users = readFile(USER_INFO);
    for (let id of children) {
        users[id].tasks = [task, ...users[id].tasks];
    }
    writeFile(USER_INFO, users);
};
const addCoin = (coins, id) => {
    // Добавление киберонов через общий список
    const users = readFile(USER_INFO);
    users[id].coins = Number(users[id].coins) + Number(coins);
    writeFile(USER_INFO, users);
};

export {getCoinsAndTasks, addUser, addTask, addCoin, checkUser};