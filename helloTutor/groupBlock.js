import {studentBlock} from "./studentBlock.js";

const groupBlock = (group) => {

    let page = ``;
    const block = `
             <div class="accordion-item">
                <h2 class="accordion-header" id="g_${group.name}_header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#g_${group.name}" aria-expanded="true" aria-controls="g_${group.name}">
                        Работа с группой <strong style="padding: 0 5px;"> ${group.name}</strong>
                    </button>
                    <a id="g_${group.name}_delete_group" class="btn btn-secondary" style="margin: 5px 20px; padding: 2px; font-size: 12px;">Удалить группу</a>
                    <a id="g_${group.name}_add_task"  data-bs-toggle="modal" data-bs-target="#ModalTask" class="btn btn-secondary" style="margin: 5px 20px; padding: 2px; font-size: 12px;">Добавить задание</a>
                    <script>
                        document.getElementById("g_${group.name}_add_task").addEventListener("click",()=>{
                            document.getElementById("group").textContent = "${group.name}";
                        });
                         document.getElementById("g_${group.name}_delete_group").addEventListener("click",()=>{
                            requestDeleteGroup("${group.name}");
                        });
                    </script>
                </h2>
            <div id="g_${group.name}" class="accordion-collapse collapse" aria-labelledby="g_${group.name}_header" data-bs-parent="#accordionGroups">
            <div class="accordion-body">`;

    page += block;

    for (let user of group.users) {
        console.log(user);
        page += studentBlock(user, user.task);
    }

    const end_block = `</div></div></div>`;
    page += end_block;

    return page;
}

export {groupBlock};