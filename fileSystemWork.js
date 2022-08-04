import fs from "fs";
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';

const USER_INFO = "DB/usersInfo.json";
const USER_LIST = "DB/usersList.json";
const GROUPS = "DB/groups.json";
const salt = bcrypt.genSaltSync(9);

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

const addUser = (name, login, password, group) => {
    const usersInfo = readFile(USER_INFO);
    const users = readFile(USER_LIST);
    const groups = readFile(GROUPS);

    let id = uuidv4();
    while (usersInfo[id] !== undefined) {
        id = uuidv4();
    }
    const cryptoPas = bcrypt.hashSync(password, salt);
    const user = {name, login, password: cryptoPas, group, id};

    // Проверка и регистрация
    if (users[login] !== undefined) {
        return {state: false, message: "Такой пользователь уже существует"};
    }
    users[login] = user;

    //Добавление в общий список
    usersInfo[id] = {login, coins: 10, tasks: []};

    // Запись в группу
    if (groups[group] === undefined) {
        return {state: false, message: "Такой группы не существует"};
    }
    groups[group] = groups[group] !== undefined ? [...groups[group], id] : [id];

    writeFile(USER_INFO, usersInfo);
    writeFile(USER_LIST, users);
    writeFile(GROUPS, groups);

    return {state: true};
};

const addGroup = (group) => {
    const groups = readFile(GROUPS);
    if (groups[group] !== undefined) {
        return {state: false};
    }
    groups[group] = [];
    writeFile(GROUPS, groups);
    return {state: true}
};

const deleteGroup = (group) => {
    const usersList = readFile(USER_LIST);
    const usersInfo = readFile(USER_INFO);
    const groups = readFile(GROUPS);

    if (groups[group] === undefined) return {state: false};

    for (let id of groups[group]) {
        delete usersList[usersInfo[id].login];
        delete usersInfo[id];
    }

    delete groups[group];

    writeFile(USER_LIST, usersList);
    writeFile(USER_INFO, usersInfo);
    writeFile(GROUPS, groups);

    return {state: true};
};

const addTask = (date, text, group, weight) => {
    const task = {date, text, weight, state: 0}

    // получение списка группы
    const groups = readFile(GROUPS);
    const children = groups[group];
    if (groups[group] === undefined) return;
    // Добавление задачи через общий список
    const users = readFile(USER_INFO);
    for (let id of children) {
        if (users[id] !== undefined) {
            users[id].tasks = [task, ...users[id].tasks];
        } else {
            groups[group] = groups[group].filter(e => e !== id);
        }
    }
    writeFile(USER_INFO, users);
    writeFile(GROUPS, groups);
};

const completeTask = (id, state) => {
    // Добавление задачи через общий список
    const users = readFile(USER_INFO);
    if (users[id] === undefined) return;
    const oldState = users[id].tasks[0].state;
    users[id].tasks[0].state = Number(state);

    if (+oldState === 1 && +state === 0)
        users[id].coins = Number(users[id].coins) - Number(users[id].tasks[0].weight);
    else if (+oldState === 0 && +state === -1)
        users[id].coins = Number(users[id].coins);
    else
        users[id].coins = Number(users[id].coins) + Number(users[id].tasks[0].weight) * Number(state);
    writeFile(USER_INFO, users);
};

const addCoin = (coins, id) => {
    // Добавление киберонов через общий список
    const users = readFile(USER_INFO);
    if (users[id]) users[id].coins = Number(users[id].coins) + Number(coins);
    writeFile(USER_INFO, users);
};

const deleteStudent = (id) => {
    const usersList = readFile(USER_LIST);
    const usersInfo = readFile(USER_INFO);
    const groups = readFile(GROUPS);

    for (let group of groups) {
        group = group.filter(e => e !== id);
    }
    if (usersInfo[id]) delete usersList[usersInfo[id].login];
    delete usersInfo[id];

    writeFile(USER_LIST, usersList);
    writeFile(USER_INFO, usersInfo);
    writeFile(GROUPS, groups);
}

export {
    USER_INFO,
    USER_LIST,
    GROUPS,
    writeFile,
    readFile,
    getCoinsAndTasks,
    completeTask,
    addUser,
    addTask,
    addCoin,
    addGroup,
    deleteStudent,
    deleteGroup
};