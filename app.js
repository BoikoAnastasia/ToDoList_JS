window.onload = loadTasks;

const items_active = document.querySelector(".items_active");
const items_completed = document.querySelector(".items_completed");
const items_delete = document.querySelector(".items_delete");
const items_delayed = document.querySelector(".items_delayed");


const btn_add = document.getElementById('btn__add');
const trash = document.querySelector(".bxs_trash");

document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        btn_add.click();
    }
});

btn_add.addEventListener("click", () => {
    let task = document.querySelector(".input_task").value;
    if (task == "" || task == " ") { return }
    else {
        createTask(task);
        localStorage.setItem("active_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("active_tasks") || "[]"), task])
        );
    }
});

function createTask(task) {
    let div_out = document.createElement("div");
    let div = document.createElement('div');
    let bxs_items = document.createElement('div');
    let bx_check = document.createElement('i');
    let bxs_trash = document.createElement('i');
    let bx_time_five = document.createElement('i');

    bxs_items.className = "bxs_items";
    div.className = "alert";
    div_out.className = "alert_out";
    div.textContent = task;

    bx_check.className = "bx-check bx";
    bxs_trash.className = "bxs-trash bx";
    bx_time_five.className = "bx-time-five bx";

    bxs_items.append(bx_check, bx_time_five, bxs_trash)
    div_out.append(div)
    div_out.append(bxs_items)
    
    items_active.append(div_out);
    document.querySelector(".input_task").value = "";
    return div_out;
}






document.addEventListener("click", (e) => {
    target = e.target
    // поиск клика на кнопке удаления
    if (target.classList.contains("bxs-trash")) {
        let task_delete = target.parentNode.parentNode.textContent;
        // добавление данных в localStorage списка удаленных
        localStorage.setItem("delete_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delete_tasks") || "[]"), task_delete])
        );
        // удаление из localStorage значения, которое переносится на лист удаленных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_delete);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_delete.append(target.parentNode.parentNode)
        // target.parentNode.remove()
    }
    // поиск клика на кнопке завершено
    if (target.classList.contains("bx-check")) {
        let task_completed = target.parentNode.parentNode.textContent;
        // добавление данных в localStorage списка выполненных
        localStorage.setItem("completed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("completed_tasks") || "[]"), task_completed])
        );
        // удаление из localStorage значения, которое переносится на лист выполненных
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_completed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_completed.append(target.parentNode.parentNode)

        // target.remove()
    }
    // поиск клика на кнопке отложенные
    if (target.classList.contains("bx-time-five")) {
        let tasks_delayed = target.parentNode.parentNode.textContent;
        // добавление данных в localStorage списка отложенные
        localStorage.setItem("delayed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delayed_tasks") || "[]"), tasks_delayed])
        );
        // удаление из localStorage значения, которое переносится на лист отложенные
        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == tasks_delayed);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_delayed.append(target.parentNode.parentNode)
        // target.parentNode.remove()
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
        let tasks_active = Array.from(JSON.parse(localStorage.getItem("active_tasks")));
        tasks_active.forEach(task => {
            createTask(task)
        });
    }
    if (localStorage.getItem("delete_tasks") != null) {
        let tasks_delete = Array.from(JSON.parse(localStorage.getItem("delete_tasks")));
        tasks_delete.forEach(task => {
            items_delete.append(createTask(task));
        });
    }
    if (localStorage.getItem("completed_tasks") != null) {
        let tasks_completed = Array.from(JSON.parse(localStorage.getItem("completed_tasks")));
        tasks_completed.forEach(task => {
            items_completed.append(createTask(task));
        });
    }
    if (localStorage.getItem("delayed_tasks") != null) {
        let tasks_delayed = Array.from(JSON.parse(localStorage.getItem("delayed_tasks")));
        tasks_delayed.forEach(task => {
            items_delayed.append(createTask(task))
        });
    }
    else return;
}