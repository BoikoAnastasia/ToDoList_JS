window.onload = loadTasks;

const items_active = document.querySelector(".items_active");
const items_completed = document.querySelector(".items_completed");
const items_delete = document.querySelector(".items_delete");
const items_delayed = document.querySelector(".items_delayed");


const btn_add = document.getElementById('btn__add');

const btn_check = document.getElementsByClassName("bx-check");
const btn_trash = document.querySelector(".bxs_trash");
const btn_time = document.querySelector(".bx-time-five");

document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        btn_add.click();
    }
});

btn_add.addEventListener("click", () => {
    let task = document.querySelector(".input_task").value;
    let task_dop = document.querySelector(".input_dop_task").value;
    if (task == "" || task == " ") { return }
    else {
        items_active.append(createTask(task, task_dop));
        localStorage.setItem("active_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("active_tasks") || "[]"), task])
        );
        localStorage.setItem("active_tasks_dop", JSON.stringify(
            [...JSON.parse(localStorage.getItem("active_tasks_dop") || "[]"), task_dop])
        );
    }
});

function createTask(task, task_dop) {
    let div_out = document.createElement("div");
    let div = document.createElement('div');
    let div_dop = document.createElement('div');
    let divAndBxs_items = document.createElement('div');
    let bxs_items = document.createElement('div');
    let bx_check = document.createElement('i');
    let bxs_trash = document.createElement('i');
    let bx_time_five = document.createElement('i');
    let bxs_down_arrow = document.createElement('i');

    bx_check.className = "bx-check bx";
    bxs_trash.className = "bxs-trash bx";
    bx_time_five.className = "bx-time-five bx";
    bxs_down_arrow.className = "bxs-down-arrow bx";
    bxs_items.className = "bxs_items";

    div.className = "alert";
    div_out.className = "alert_out";
    div_dop.className = 'alert_dop';
    divAndBxs_items.className = "divAndBxs_items";

    div_dop.textContent = task_dop
    div.textContent = task;

    bxs_items.append(bx_check, bx_time_five, bxs_trash)
    divAndBxs_items.append(div, bxs_items)
    div_out.append(divAndBxs_items, bxs_down_arrow, div_dop)

    document.querySelector(".input_task").value = "";
    document.querySelector(".input_dop_task").value = "";
    return div_out;
}

document.addEventListener("click", (e) => {
    target = e.target
    // поиск клика на кнопке удаления
    if (target.classList.contains("bxs-trash")) {
        let task_delete = target.parentNode.parentNode.textContent;
        let task_delete_dop = target.parentNode.parentNode.nextSibling.nextSibling.textContent;
        // добавление данных в localStorage списка удаленных
        localStorage.setItem("delete_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delete_tasks") || "[]"), task_delete])
        );
        // добавление дополнение задачи в localStorage списка удаленных
        localStorage.setItem("delete_tasks_dop", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delete_tasks_dop") || "[]"), task_delete_dop])
        );
        // удаление из localStorage значения, которое переносится на лист удаленных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_delete);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        // удаление дополнительного описания задачи из localStorage значения, которое переносится на лист удаленных
        const getDopLocalStorage = JSON.parse(localStorage.getItem("active_tasks_dop"));
        const index_dop = getDopLocalStorage.findIndex(user => user == task_delete_dop);
        getDopLocalStorage.splice(index_dop, 1);
        localStorage.setItem('active_tasks_dop', JSON.stringify(getDopLocalStorage));

        //добавление задачи в удаленные
        items_delete.append(target.parentNode.parentNode.parentNode)
        // target.parentNode.remove()
    }
    // поиск клика на кнопке завершено
    if (target.classList.contains("bx-check")) {
        let task_completed = target.parentNode.parentNode.textContent;
        let task_completed_dop = target.parentNode.parentNode.nextSibling.nextSibling.textContent;
        // добавление данных в localStorage списка выполненных
        localStorage.setItem("completed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("completed_tasks") || "[]"), task_completed])
        );
        // // добавление дополнительнения задачи в localStorage списка выполненных 
        localStorage.setItem("completed_tasks_dop", JSON.stringify(
            [...JSON.parse(localStorage.getItem("completed_tasks_dop") || "[]"), task_completed_dop])
        );

        // удаление из localStorage значения, которое переносится на лист выполненных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_completed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        // удаление дополнительного описания задачи из localStorage значения, которое переносится на лист удаленных
        const getDopLocalStorage = JSON.parse(localStorage.getItem("active_tasks_dop"));
        const index_dop = getDopLocalStorage.findIndex(user => user == task_completed_dop);
        getDopLocalStorage.splice(index_dop, 1);
        localStorage.setItem('active_tasks_dop', JSON.stringify(getDopLocalStorage));

        items_completed.append(target.parentNode.parentNode.parentNode)

        // target.remove()
    }
    // поиск клика на кнопке отложенные
    if (target.classList.contains("bx-time-five")) {
        let tasks_delayed = target.parentNode.parentNode.textContent;
        let tasks_delayed_dop = target.parentNode.parentNode.nextSibling.nextSibling.textContent;
        // добавление данных в localStorage списка отложенные
        localStorage.setItem("delayed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delayed_tasks") || "[]"), tasks_delayed])
        );
        // // добавление дополнительнения задачи в localStorage списка отложенные 
        localStorage.setItem("delayed_tasks_dop", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delayed_tasks_dop") || "[]"), tasks_delayed_dop])
        );
        // удаление из localStorage значения, которое переносится на лист отложенные
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == tasks_delayed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        // удаление дополнительного описания задачи из localStorage значения, которое переносится на лист удаленных
        const getDopLocalStorage = JSON.parse(localStorage.getItem("active_tasks_dop"));
        const index_dop = getDopLocalStorage.findIndex(user => user == tasks_delayed_dop);
        getDopLocalStorage.splice(index_dop, 1);
        localStorage.setItem('active_tasks_dop', JSON.stringify(getDopLocalStorage));

        items_delayed.append(target.parentNode.parentNode.parentNode)
        // target.parentNode.remove()
    }
    if (target.classList.contains("bxs-down-arrow")) {
        target.nextSibling.style.display != "block" ? target.nextSibling.style.display = "block"
            : target.nextSibling.style.display = "none";
    }
})

function changeSelect() {
    const select = document.getElementById('select');
    value = select.options[select.selectedIndex].value;
    switch (value) {
        case "active":
            {
                items_active.style.display = "block";
                items_completed.style.display = "none";
                items_delete.style.display = "none";
                items_delayed.style.display = "none";
                break;
            }
        case "completed":
            {
                items_active.style.display = "none";
                items_completed.style.display = "block"
                items_delete.style.display = "none";
                items_delayed.style.display = "none";

                break;
            }
        case "delete": {
            items_active.style.display = "none";
            items_completed.style.display = "none";
            items_delete.style.display = "block";
            items_delayed.style.display = "none";
            break;
        }
        case "delayed": {
            items_active.style.display = "none";
            items_completed.style.display = "none";
            items_delete.style.display = "none";
            items_delayed.style.display = "block";
            break;
        }
    }
}

function loadTasks() {
    if (localStorage.getItem("active_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_active = Array.from(JSON.parse(localStorage.getItem("active_tasks")));
        let tasks_active_dop = Array.from(JSON.parse(localStorage.getItem("active_tasks_dop")));
        // передача данных и построение tasks
        for (let i = 0; i < tasks_active.length; i++) {
            items_active.append(createTask(tasks_active[i], tasks_active_dop[i]));
        }
    }
    if (localStorage.getItem("delete_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_delete = Array.from(JSON.parse(localStorage.getItem("delete_tasks")));
        let tasks_delete_dop = Array.from(JSON.parse(localStorage.getItem("delete_tasks_dop")));
        // передача данных и построение tasks
        for (let i = 0; i < tasks_delete.length; i++) {
            items_delete.append(createTask(tasks_delete[i], tasks_delete_dop[i]))
        }
    }
    if (localStorage.getItem("completed_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_completed = Array.from(JSON.parse(localStorage.getItem("completed_tasks")));
        let tasks_completed_dop = Array.from(JSON.parse(localStorage.getItem("completed_tasks_dop")));
        for (let i = 0; i < tasks_completed.length; i++) {
            items_completed.append(createTask(tasks_completed[i], tasks_completed_dop[i]))
        }
    }
    if (localStorage.getItem("delayed_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_delayed = Array.from(JSON.parse(localStorage.getItem("delayed_tasks")));
        let tasks_delayed_dop = Array.from(JSON.parse(localStorage.getItem("delayed_tasks_dop")));
        for (let i = 0; i < tasks_delayed.length; i++) {
            items_delayed.append(createTask(tasks_delayed[i], tasks_delayed_dop[i]))
        }
    }
    else return;
}