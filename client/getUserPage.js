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
*{font-family:sans-serif}body{padding:0;margin:0}.wrapper{display:flex;align-items:center;justify-content:center}.container{width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column}.header,.footer{display:flex;align-items:center;justify-content:center;background-color:#19d5ff;width:100%;height:10vh}.body{width:80vw;height:80vh;background-color:#fafafa;border-radius:1rem;display:flex}#logo_name{color:#fff}#powered{font-size:.5rem;padding:.5rem;background-color:#e8f8ff;border-radius:3rem;color:#909090}.block{display:flex;flex-grow:1;border:.05rem solid #b1b1b1;border-radius:1rem;background-color:#fff;margin:.5rem;flex-direction:column;align-items:center}.first_under_block{display:flex;flex-grow:1;flex-direction:column;width:100%;margin-bottom:3rem}.second_under_block{display:flex;flex-grow:1;flex-direction:column;width:100%;align-items:center;overflow:hidden}.hello{padding-left:3rem;padding-bottom:1rem;padding-top:3rem;font-size:3rem}.coins_header{padding-left:3rem;font-size:2rem;color:gray}
.coins_count{padding-left:3rem;margin-top:1rem;display:flex;align-items:center}.coins_count-icon{padding:.45rem .9rem;background-color:#fd0;border-radius:100%;border:.1rem solid #ff8c00;font-weight:700;font-size:2rem}.coins_count-count_num{color:#363636;font-weight:700;margin-left:.5rem;font-size:3rem;font-variant-caps:all-petite-caps}.tasks_span{margin:.3rem;border-bottom:.05rem solid dimgrey;opacity:.7;width:30vw;text-align:center;font-weight:bolder}.card{border:.05rem solid dimgrey;border-radius:.5rem;padding:.5rem}#tasks_container{display:flex;flex-direction:column;align-items:center;width:100%;overflow:auto}.task{display:flex;flex-direction:column;justify-content:center;align-items:center;width:90%;margin:.3rem;box-shadow:0 0 .3rem 0 #d3d3d3}.task:hover{box-shadow:0 0 .3rem .2rem #d3d3d3}.task-date{width:100%;font-weight:bolder;font-size:1.2rem;text-align:center;color:dimgrey;margin-top:.5rem;margin-bottom:.5rem}.task-text{width:100%;margin-top:.5rem;font-size:1.2rem;color:dimgrey}
.task-weight{width:100%;margin-top:.5rem;font-size:1rem;color:#ff8c00;font-weight:700}.task-state{width:100%;margin-top:.5rem;font-size:.8rem;color:dimgrey;text-align:end}.true{color:#228b22}.false{color:#cd5c5c}.process{color:#1e90ff}@keyframes news{from{margin-left:0}to{margin-left:-33.5vw}}.kiber_nice{font-weight:700;font-size:1.3rem;font-family:cursive;color:#ff8c00;margin:.1rem 1rem}.kiber_nice-block{margin:.3rem;text-align:center;width:90%}.img_wrapper{width:40vw;overflow:auto;display:flex;justify-content:center;align-items:flex-start;margin:.5rem}#kiber_img{max-width:35vw;flex-shrink:0}#show_img{display:none;font-size:4rem;-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}@media screen and (max-width:800px){.body{flex-direction:column}.img_wrapper{width:75vw}#kiber_img{max-width:65vw}.header,.footer{height:4vh}.body{height:92vh}#powered{font-size:1rem}#logo_name{font-size:4.5rem}#show_img{display:block}.task-date{font-size:2.2rem}
.task-text{font-size:2.2rem}.task-weight{font-size:2rem}.task-state{font-size:1.6rem}}
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
                        <input id="show_img" type="checkbox">
                        <script>
                            document.getElementById("show_img").addEventListener("change",()=>{
                                if(document.getElementById("show_img").check){
                                    document.getElementById("kiber_img").style.display = "block";
                                }else{
                                    document.getElementById("kiber_img").style.display = "none";
                                }
                            })
                        </script>
                        <span class="kiber_nice">КиберПриятности</span>
                    </div>
                    <div class="img_wrapper">
                        <img id="kiber_img" src="${DOMAIN}/nice_orig" alt="КиберПриятности">
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