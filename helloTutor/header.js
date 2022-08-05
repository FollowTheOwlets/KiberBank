
const header = (DOMAIN) => `
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
            .my-card-body .btn-outline-secondary {
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
                min-width: 45vw;
                margin-bottom: 20px;
            }
            </style>
                <script>
                const token = localStorage.getItem("token") || "";
                const requestAddCoins = (coins,id) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/addCoins?coins=\$\{coins\}&id=\$\{id\}&token=\$\{token\}\`);
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
                const requestAddTask = (date,text,group,weight) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/addTask?date=\$\{date\}&text=\$\{text\}&group=\$\{group\}&weight=\$\{weight\}&token=\$\{token\}\`);
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

                    xhr.open("GET", \`${DOMAIN}/completeTask?id=\$\{id\}&state=\$\{state\}&token=\$\{token\}\`);
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

                    xhr.open("GET", \`${DOMAIN}/addGroup?group=\$\{group\}&token=\$\{token\}\`);
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
                const requestDeleteGroup = (group) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/deleteGroup?group=\$\{group\}&token=\$\{token\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        const response = xhr.response;
                        alert(response.state ? "Группа удалена":"Такой группы не найдено");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
                const requestDeleteStudent = (id) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/deleteStudent?id=\$\{id\}&token=\$\{token\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        alert("Удаление студента прошло успешно");
                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
                let trueList;
                let falseList ;
                let neitList ;
            </script>
            <body>
            <p style="padding:20px;display: flex;"><a  style="width: 20vw; font-size: 20px; margin-right: 20px;" class="btn btn-success" id="new_group_btn">Добавить группу:</a> <input style="width: 60vw;" type="text" id="new_group" class="form-control"  ></p>
            <script>
                document.getElementById("new_group_btn").addEventListener("click", ()=>{
                    if(document.getElementById("new_group").value.trim() === ""){
                        alert("Пустая строка");
                        return;
                    }
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
                    <div class="form-check form-check-inline">
                      <input class="btn-check" type="radio" name="options-outlined" id="k_5" value="5" autocomplete="off" checked>
                      <label class="btn btn-outline-secondary" for="k_5">5 киберон</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="btn-check" type="radio" name="options-outlined" id="k_10" value="10" autocomplete="off">
                      <label class="btn btn-outline-success" for="k_10">10 киберон</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="btn-check" type="radio" name="options-outlined" id="k_15" value="15" autocomplete="off">
                      <label class="btn  btn-outline-danger" for="k_15">15 киберон</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" id="modal_button" class="btn btn-primary">Добавить</button>
                    <script>
                        document.getElementById("modal_button").addEventListener("click",()=>{
                            const group = document.getElementById("group").textContent;
                            const date = document.getElementById("date").value;
                            let weight = 5;
                            if(document.getElementById("k_10").checked){
                                weight = 10;
                            }
                            if(document.getElementById("k_15").checked){
                                weight = 15;
                            }
                            const task = document.getElementById("task").value;
                            requestAddTask(date,task,group,weight);
                            document.getElementById("close_modal").click();
                            document.getElementById("task").value = "";
                        });
                        
                    </script>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion" id="accordionGroups">`;

export {header};