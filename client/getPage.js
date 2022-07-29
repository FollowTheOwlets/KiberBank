import {GROUPS, readFile, USER_INFO, USER_LIST} from "../fileSystemWork.js";

//const DOMAIN = "http://localhost:3000";
const DOMAIN = "https://kiber-bank-server.herokuapp.com";
const getPage = () => {
    let page = ``;
    const header = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <title>Title</title>
            </head>
            <style>
            .accordion-item .accordion-button {
                padding: 3px;
                font-size: 13px;
                background-color: #e7f1ff;
            }
            .accordion-body{
                padding-bottom: 0px;
            }
            .card-body {
                padding: 5px;
            }
            p {
                margin-bottom: 1px;
            }
            .my-mb-3{
                display: flex;
                align-items: center;
                margin-bottom: 4px!important;
            }
            .my-form-control{
                margin: 0px 5px 0 1px;
                padding: 2px;
                width: 50px;
            }
            .card-header{
                font-size: 12px;
            }
            .btn-info {
                color: #f9fafb;
                padding: 2px;
                font-size: 12px;
            }
            .btn-success {
                color: #f9fafb;
                padding: 2px;
                margin-left: 3px;
                font-size: 12px;
            }
            .btn-secondary {
                padding: 2px;
                margin-left: 3px;
                font-size: 12px;
            }
            .btn-danger {
                color: #f9fafb;
                padding: 2px;
                margin-left: 3px;
                font-size: 12px;
            }
            .accordion-body {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
            .my-card{
                width: 45vw;
                margin-bottom: 20px;
            }
            </style>
                <script>
                const requestAddCoins = (coins,id) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/addCoins?coins=\$\{coins\}&id=\$\{id\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        alert("Кибероны успешно добавлены");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
                const requestAddTask = (date,text,group) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/addTask?date=\$\{date\}&text=\$\{text\}&group=\$\{group\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        alert("Задача успешно добавлена");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
                const requestCompleteTask = (id,state) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/completeTask?id=\$\{id\}&state=\$\{state\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        alert("Статус задачи изменен");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
                const requestAddGroup = (group) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/addGroup?group=\$\{group\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        const response = xhr.response;
                        alert(response.state ? "Группа добавлена" : "Такая группа уже существует");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
            </script>
            <body>
            <p style="padding:20px;display: flex;"><a  style="width: 20vw; font-size: 20px; margin-right: 20px;" class="btn btn-success" id="new_group_btn">Добавить группу:</a> <input style="width: 60vw;" type="text" id="new_group" class="form-control"  ></p>
            <script>
                document.getElementById("new_group_btn").addEventListener("click", ()=>{
                    requestAddGroup(document.getElementById("new_group").value);
                });
            </script>
            <div class="modal" tabindex="-1" id="ModalTask">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Добавление нового задания</h5>
                    <button type="button" id="close_modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <span style="padding: 0 5px;">Группа: </span><strong id="group" style="padding: 0 5px;"></strong>
                    <div class="mb-3">
                      <label for="date" class="form-label">Дата получения задания</label>
                      <input type="date" class="form-control" id="date">
                    </div>
                    <div class="mb-3">
                      <label for="task" class="form-label">Задание</label>
                      <textarea class="form-control" id="task" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" id="modal_button" class="btn btn-primary">Добавить</button>
                    <script>
                        document.getElementById("modal_button").addEventListener("click",()=>{
                            const group = document.getElementById("group").textContent;
                            const date = document.getElementById("date").value;
                       
                            const task = document.getElementById("task").value;
                            requestAddTask(date,task,group);
                            document.getElementById("close_modal").click();
                            document.getElementById("task").value = "";
                        });
                        
                    </script>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion" id="accordionGroups">`;

    page += header;

    const groups = readFile(GROUPS);
    const usersInfo = readFile(USER_INFO);
    const users = readFile(USER_LIST);

    for (let group in groups) {
        const block = `
             <div class="accordion-item">
                <h2 class="accordion-header" id="g_${group}_header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#g_${group}" aria-expanded="true" aria-controls="g_${group}">
                        Работа с группой <strong style="padding: 0 5px;"> ${group}</strong>
                    </button>
                    <a id="g_${group}_add_task"  data-bs-toggle="modal" data-bs-target="#ModalTask" class="btn btn-secondary" style="margin: 5px 20px; padding: 2px; font-size: 12px;">Добавить задание</a>
                    <script>
                        document.getElementById("g_${group}_add_task").addEventListener("click",()=>{
                            document.getElementById("group").textContent = "${group}";
                        });
                    </script>
                </h2>
            <div id="g_${group}" class="accordion-collapse collapse" aria-labelledby="g_${group}_header" data-bs-parent="#accordionGroups">
            <div class="accordion-body">`;

        page += block;

        for (let child of groups[group]) {
            const child_block = `
                   <div class="card my-card" id ="${child}">
                        <div class="card-header">
                            Имя: <strong style="padding: 0 5px;">${users[usersInfo[child].login].name}</strong>
                            Логин: ${usersInfo[child].login}
                            ID: ${child}
                        </div>
                        <div class="card-body">
                            <strong class="card-text" id="${child}_p">${usersInfo[child].coins} K</strong>
                            <div class="mb-3 my-mb-3">
                                <strong style="padding: 0 5px;">K</strong>
                                <input type="number" class="form-control my-form-control" id="${child}_addKiberon">
                                <a class="btn btn-info" id="${child}_button">Добавить</a>
                                ${usersInfo[child].tasks.length !== 0 && usersInfo[child].tasks[0].state === 0
                ? ` <span style="padding-left: 25px; font-size: 12px;">Последнее ДЗ:</span>
                                    <a class="btn btn-success" id="${child}_button_HW_true">Выполнено</a>
                                    <a class="btn btn-danger" id="${child}_button_HW_false">Не выполнено</a>
                                        <script>
                                            document.getElementById("${child}_button_HW_true").addEventListener("click",()=>{
                                                requestCompleteTask("${child}",1);
                                                document.getElementById("${child}_button_HW_true").classList.add("btn-secondary");
                                                document.getElementById("${child}_button_HW_false").classList.remove("btn-secondary");
                                                document.getElementById("${child}_button_HW_true").classList.remove("btn-success");
                                                document.getElementById("${child}_button_HW_false").classList.add("btn-danger");
                                            })
                                            document.getElementById("${child}_button_HW_false").addEventListener("click",()=>{
                                                requestCompleteTask("${child}",-1);
                                                document.getElementById("${child}_button_HW_false").classList.add("btn-secondary");
                                                document.getElementById("${child}_button_HW_false").classList.remove("btn-danger");
                                                document.getElementById("${child}_button_HW_true").classList.add("btn-success");
                                                document.getElementById("${child}_button_HW_true").classList.remove("btn-secondary");
                                            })
                                        </script>
                                    ` : ``
            }
                            </div>
                            <script>
                                document.getElementById("${child}_button").addEventListener("click",()=>{
                                    const input  = document.getElementById("${child}_addKiberon");
                                    const p = document.getElementById("${child}_p");
                                    requestAddCoins(input.value,"${child}");
                                    const coins = parseInt(p.textContent);
                                    p.textContent = "" + (coins + Number(input.value)) + " K";
                                });
                            </script>
                        </div>
                   </div>`;
            page += child_block;
        }
        const end_block = `</div></div></div>`;
        page += end_block;
    }

    const footer = `
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </html>`;
    page += footer;
    return page;
};

export {getPage};