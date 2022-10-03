window.onload = loadTasks;

const items_active = document.querySelector(".items_active");
const items_completed = document.querySelector(".items_completed");
const items_delete = document.querySelector(".items_delete");
const items_delayed = document.querySelector(".items_delayed");


const btn_add = document.getElementById('btn__add');
const btn_save_change = document.querySelector(".btn_save_change");

const btn_check = document.getElementsByClassName("bx-check");
const btn_trash = document.querySelector(".bxs_trash");
const btn_time = document.querySelector(".bx-time-five");

let tasksListElement = document.querySelector(`.tasks__list`);


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
        items_active.append(createTask(task, task_dop, dateFunc()));
        localStorage.setItem("active_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("active_tasks") || "[]"), { 'active_task': task, index: Date.now(), task_dop: task_dop, date: dateFunc()}])
        );
    }
});

const dateFunc = function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

function createTask(task, task_dop, date) {
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
    div.contentEditable = "true";
    div_out.className = "alert_out";
    div_out.draggable = true;
    div_dop.className = 'alert_dop';
    div_dop.contentEditable = "true";

    divAndBxs_items.className = "divAndBxs_items";

    div_dop.textContent = task_dop
    div.textContent = task + " " + date;

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
            [...JSON.parse(localStorage.getItem("delete_tasks") || "[]"), {"delete_task": task_delete, index: Date.now(), task_dop: task_delete_dop, date: dateFunc()}])
        );
        // удаление из localStorage значения, которое переносится на лист удаленных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_delete);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

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
            [...JSON.parse(localStorage.getItem("completed_tasks") || "[]"), {"completed_tasks": task_completed, index: Date.now(), task_dop: task_completed_dop, date: dateFunc()}])
        );
       
        // удаление из localStorage значения, которое переносится на лист выполненных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_completed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_completed.append(target.parentNode.parentNode.parentNode)
    }
    // поиск клика на кнопке отложенные
    if (target.classList.contains("bx-time-five")) {
        let tasks_delayed = target.parentNode.parentNode.textContent;
        let tasks_delayed_dop = target.parentNode.parentNode.nextSibling.nextSibling.textContent;
        // добавление данных в localStorage списка отложенные
        localStorage.setItem("delayed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delayed_tasks") || "[]"), {"delayed_tasks": tasks_delayed, index: Date.now(), task_dop: tasks_delayed_dop, date: dateFunc()}])
        );

        // удаление из localStorage значения, которое переносится на лист отложенные
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == tasks_delayed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_delayed.append(target.parentNode.parentNode.parentNode)
        // target.parentNode.remove()
    }
    // появление и исчезание дополнительной задачи
    if (target.classList.contains("bxs-down-arrow")) {
        document.querySelector(".alert_dop").contentEditable = "true";
        target.nextSibling.style.display != "block" ? target.nextSibling.style.display = "block"
            : target.nextSibling.style.display = "none";
    }
    if (target.classList.contains("alert")) {
        //изменения при редактировать текст, появление кнопки для сохранения текста
        task = target.textContent;
        btn_save_change.style.display = "block";
    }

});

btn_save_change.addEventListener("click", () => {
    btn_save_change.style.display = "none";

});

function changeSelect() {
    const select = document.getElementById('select');
    const value = select.options[select.selectedIndex].value;
    const btn_trash_all = document.getElementsByClassName("bxs-trash");
    const btn_time_all = document.getElementsByClassName("bx-time-five");
    const btn_check_all = document.getElementsByClassName("bx-check");

    switch (value) {
        case "active": {
            items_active.style.display = "block";
            items_completed.style.display = "none";
            items_delete.style.display = "none";
            items_delayed.style.display = "none";

            items_active.classList.add("tasks__list");
            items_completed.classList.remove("tasks__list");
            items_delete.classList.remove("tasks__list");
            items_delayed.classList.remove("tasks__list");



            for (let i = 0; i < btn_check_all.length; i++) {
                btn_trash_all[i].style.display = "block";
                btn_check_all[i].style.display = "block";
                btn_time_all[i].style.display = "block";
            }

            break;
        }
        case "completed": {
            items_active.style.display = "none";
            items_completed.style.display = "block"
            items_delete.style.display = "none";
            items_delayed.style.display = "none";

            items_completed.classList.add("tasks__list");
            items_active.classList.remove("tasks__list");
            items_delete.classList.remove("tasks__list");
            items_delayed.classList.remove("tasks__list");

            for (let i = 0; i < btn_check_all.length; i++) {
                btn_trash_all[i].style.display = "block";
                btn_check_all[i].style.display = "none";
                btn_time_all[i].style.display = "block";
            }

            break;
        }
        case "delete": {
            items_active.style.display = "none";
            items_completed.style.display = "none";
            items_delete.style.display = "block";
            items_delayed.style.display = "none";

            items_delete.classList.add("tasks__list");
            items_active.classList.remove("tasks__list");
            items_completed.classList.remove("tasks__list");
            items_delayed.classList.remove("tasks__list");


            for (let i = 0; i < btn_trash_all.length; i++) {
                btn_trash_all[i].style.display = "none";
                btn_time_all[i].style.display = "none";
                btn_check_all[i].style.display = "none";
            }

            break;
        }
        case "delayed": {
            items_active.style.display = "none";
            items_completed.style.display = "none";
            items_delete.style.display = "none";
            items_delayed.style.display = "block";

            items_delayed.classList.add("tasks__list");
            items_active.classList.remove("tasks__list");
            items_completed.classList.remove("tasks__list");
            items_delete.classList.remove("tasks__list");

            for (let i = 0; i < btn_time_all.length; i++) {
                btn_time_all[i].style.display = "none";
                btn_trash_all[i].style.display = "block";
                btn_check_all[i].style.display = "block";
            }
            break;
        }
    }
}

function loadTasks() {
    if (localStorage.getItem("active_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_active = Array.from(JSON.parse(localStorage.getItem("active_tasks")));
        // передача данных и построение tasks
        for (let i = 0; i < tasks_active.length; i++) {
            items_active.append(createTask(tasks_active[i].active_task, tasks_active[i].task_dop, tasks_active[i].date));
        }
    }
    if (localStorage.getItem("delete_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_delete = Array.from(JSON.parse(localStorage.getItem("delete_tasks")));
        // передача данных и построение tasks
        for (let i = 0; i < tasks_delete.length; i++) {
            items_delete.append(createTask(tasks_delete[i].delete_task,tasks_delete[i].task_dop, tasks_delete[i].date))
        }
    }
    if (localStorage.getItem("completed_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_completed = Array.from(JSON.parse(localStorage.getItem("completed_tasks")));
        for (let i = 0; i < tasks_completed.length; i++) {
            items_completed.append(createTask(tasks_completed[i].completed_tasks, tasks_completed[i].task_dop,tasks_completed[i].date))
        }
    }
    if (localStorage.getItem("delayed_tasks") != null) {
        // получение данных из локального хранилища
        let tasks_delayed = Array.from(JSON.parse(localStorage.getItem("delayed_tasks")));
        for (let i = 0; i < tasks_delayed.length; i++) {
            items_delayed.append(createTask(tasks_delayed[i].delayed_tasks, tasks_delayed[i].task_dop, tasks_delayed[i].date))
        }
    }
    else return;
}

// перетаскивание task
tasksListElement.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();

    const activeElement = tasksListElement.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`alert_out`);

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    tasksListElement.insertBefore(activeElement, nextElement);
});