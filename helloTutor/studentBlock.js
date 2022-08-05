const studentBlock = ({name, login,coins, id}, task) => {

    return `
                   <div class="card my-card" id ="${id}">
                        <div class="card-header">
                            Имя: <strong style="padding: 0 5px;">${name}</strong>
                            Логин: ${login}
                            ID: ${id}
                            <a style="margin: 0 30px;" class="btn btn-danger" id="delete_${id}">Удалить</a>
                            <script>
                            document.getElementById("delete_${id}").addEventListener("click",()=> {
                                requestDeleteStudent("${id}");
                                document.getElementById("${id}").remove();
                            });
                            
                            </script>
                        </div>
                        <div class="card-body my-card-body">
                            <strong class="card-text" id="${id}_p">${coins} K</strong>
                            <div class="mb-3 my-mb-3">
                                <strong style="padding: 0 5px;">K</strong>
                                <input type="number" class="form-control my-form-control" id="${id}_addKiberon">
                                <a class="btn btn-info" id="${id}_button">Добавить</a>
                                ${task !== null && task !== [] && +task.state === 0
        ? ` <span style="padding-left: 25px; font-size: 12px;">Последнее ДЗ (${task.text}) :</span>
                                    <a class="btn btn-success" id="${id}_button_HW_true">Выполнено</a>
                                    <a class="btn btn-danger" id="${id}_button_HW_false">Не выполнено</a>
                                    <a class="btn btn-secondary" id="${id}_button_HW_neitral">Вернуть на доработку</a>
                                        <script>
                                             trueList = document.getElementById("${id}_button_HW_true").classList;
                                             falseList = document.getElementById("${id}_button_HW_false").classList;
                                             neitList = document.getElementById("${id}_button_HW_neitral").classList;
               
                                            document.getElementById("${id}_button_HW_true").addEventListener("click",()=>{
                                                if(!trueList.contains("btn-secondary")){
                                                    const p = document.getElementById("${id}_p");
                                                    const coins = parseInt(p.textContent);
                                                    p.textContent = "" + (coins + Number(${task.weight})) + " K";
                                                    requestCompleteTask("${id}",1);
                                                }
                                                falseList.remove("btn-secondary");
                                                falseList.add("btn-danger");
                                                trueList.add("btn-secondary");
                                                trueList.remove("btn-success");
                                                neitList.remove("btn-secondary");
                                                neitList.add("btn-outline-secondary");
                                            });
                                            document.getElementById("${id}_button_HW_false").addEventListener("click",()=>{
                                                if(trueList.contains("btn-secondary")){
                                                    const p = document.getElementById("${id}_p");
                                                    const coins = parseInt(p.textContent);
                                                    p.textContent = "" + (coins - Number(${task.weight})) + " K";
                                                    requestCompleteTask("${id}",-1);
                                                }else if (neitList.contains("btn-secondary")){
                                                    requestCompleteTask("${id}",-1);
                                                }
                                                
                                                falseList.add("btn-secondary");
                                                falseList.remove("btn-danger");
                                                trueList.remove("btn-secondary");
                                                trueList.add("btn-success");
                                                neitList.remove("btn-secondary");
                                                neitList.add("btn-outline-secondary");
                                            });
                                            document.getElementById("${id}_button_HW_neitral").addEventListener("click",()=>{
                                                if(neitList.contains("btn-outline-secondary")){
                                                    if(trueList.contains("btn-secondary")){
                                                        const p = document.getElementById("${id}_p");
                                                        const coins = parseInt(p.textContent);
                                                        p.textContent = "" + (coins - Number(${task.weight})) + " K";
                                                    }
                                                    requestCompleteTask("${id}",0);
                                                }
                                                
                                                falseList.remove("btn-secondary");
                                                falseList.add("btn-danger");
                                                trueList.remove("btn-secondary");
                                                trueList.add("btn-success");
                                                neitList.add("btn-secondary");
                                                neitList.remove("btn-outline-secondary");
                                            });
                                        </script>
                                    ` : ``
    }
                            </div>
                            <script>
                                document.getElementById("${id}_button").addEventListener("click",()=>{
                                    const input  = document.getElementById("${id}_addKiberon");
                                    requestAddCoins(input.value,"${id}");
                                    const p = document.getElementById("${id}_p");
                                    const coins = parseInt(p.textContent);
                                    p.textContent = "" + (coins + Number(input.value)) + " K";
                                });
                            </script>
                        </div>
                   </div>`;
}
export {studentBlock};
