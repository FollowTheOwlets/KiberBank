import {GROUPS, readFile, USER_INFO, USER_LIST} from "../fileSystemWork.js";
import {DOMAIN} from "./getPage.js";
import path from "path";

const getUserPage = (id) => {
    const users = readFile(USER_INFO);
    const usersList = readFile(USER_LIST);
    console.log(id);
    let page = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>KiberBank</title>
    <link rel="icon" href="${DOMAIN}/img/favicon.ico">
</head>
<style>
    * {
        font-family: sans-serif;
    }

    body {
        padding: 0;
        margin: 0;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .header, .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #19d5ff;
        width: 100%;
        height: 10vh;
    }

    .body {
        width: 80vw;
        height: 80vh;
        background-color: #fafafa;
        border-radius: 1rem;
        display: flex;
    }

    #logo_name {
        color: white;
    }

    #powered {
        font-size: 0.5rem;
        padding: 0.5rem;
        background-color: #e8f8ff;
        border-radius: 3rem;
        color: #909090;
    }

    .block {
        display: flex;
        flex-grow: 1;
        border: 0.05rem solid #b1b1b1;
        border-radius: 1rem;
        background-color: white;
        margin: 0.5rem;
        flex-direction: column;
        align-items: center;
    }

    .first_under_block {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        width: 100%;
        margin-bottom: 3rem;
    }

    .second_under_block {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        width: 100%;
        align-items: center;
        overflow: hidden;
    }

    .hello {
        padding-left: 3rem;
        padding-bottom: 1rem;
        padding-top: 3rem;
        font-size: 3rem;
    }

    .coins_header {
        padding-left: 3rem;
        font-size: 2rem;
        color: gray;
    }

    .coins_count {
        padding-left: 3rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
    }

    .coins_count-icon {
        padding: 0.45rem 0.9rem 0.45rem 0.9rem;
        background-color: #ffdd00;
        border-radius: 100%;
        border: 0.1rem solid darkorange;
        font-weight: bold;
        font-size: 2rem;
    }

    .coins_count-count_num {
        color: #363636;
        font-weight: bold;
        margin-left: 0.5rem;
        font-size: 3rem;
        font-variant-caps: all-petite-caps;
    }

    .tasks_span {
        margin: 0.3rem;
        border-bottom: 0.05rem solid dimgrey;
        opacity: 0.7;
        width: 30vw;
        text-align: center;
        font-weight: bolder;
    }

    .card {
        border: 0.05rem solid dimgrey;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }

    #tasks_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        overflow: auto;
    }

    .task {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        margin: 0.3rem;
        box-shadow: 0 0 0.3rem 0 lightgrey;
    }

    .task:hover {
        box-shadow: 0 0 0.3rem 0.2rem lightgrey;
    }

    .task-date {
        width: 100%;
        font-weight: bolder;
        font-size: 1.2rem;
        text-align: center;
        color: dimgrey;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .task-text {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 1.2rem;
        color: dimgrey;
    }

    .task-weight {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 1rem;
        color: darkorange;
        font-weight: bold;
    }

    .task-state {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: dimgrey;
        text-align: end;

    }

    .true {
        color: forestgreen;
    }

    .false {
        color: indianred;
    }

    .process {
        color: dodgerblue;
    }

    @keyframes news {
        from {
            margin-left: 0vw;
        }
        to {
            margin-left: -33.5vw;
        }
    }

    .kiber_nice {
        font-weight: bold;
        font-size: 1.3rem;
        font-family: cursive;
        color: darkorange;
        margin: 0.1rem 1rem;

    }

    .kiber_nice-block {
        margin: 0.3rem;
        text-align: center;
        width: 90%;
    }

    .img_wrapper {
        width: 40vw;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin:0.5rem;
    }

    #kiber_img {
        max-width: 35vw;
        flex-shrink: 0;
    }
</style>
<body>
<div class="wrapper">
    <div class="container">
        <div class="header">
            <h1><strong id="logo_name">KIBERBANK</strong></h1>
        </div>
        <div class="body">
            <div class="block">
                <div class="first_under_block">
                    <span class="hello"> Привет, ${usersList[users[id].login].name}</span>
                    <span class="coins_header">Твои кибероны:</span>
                    <div class="coins_count">
                        <span class="coins_count-icon">K</span>
                        <span class="coins_count-count_num">${users[id].coins}</span>
                    </div>
                </div>
                <div class="second_under_block">
                    <div class="card kiber_nice-block">
                        <span class="kiber_nice">КиберПриятности</span>
                    </div>
                    <div class="img_wrapper">
                        <img id="kiber_img" src="${DOMAIN}/nice_orig">
                    </div>
                </div>
            </div>
            <div class="block">
                <span class="tasks_span">Задания:</span>
                <div id="tasks_container">
                `
    for (const task of users[id].tasks) {
        page += `<div class="card task">
                            <span class="task-date">${task.date}</span>
                            <span class="task-text">${task.text}</span>
                            <span class="task-weight">${task.weight} Киберон</span>
                            <span class="task-state ${task.state === 0 ? "process" : task.state === -1 ? "false" : "true"}">${task.state === 0 ? "В процессе выполнения" : task.state === -1 ? "Не выполнено" : "Завершено"}</span>
                        </div>`
    }

    page += ` </div>
            </div>
        </div>
        <div class="footer">
            <span id="powered">powered by Tutors</span>
        </div>
    </div>
</div>
</body>
</html>
    `;
    return page;
};

export {getUserPage};