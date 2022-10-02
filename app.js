window.onload = loadTasks;

const items_active = document.querySelector(".items_active");
const items_completed = document.querySelector(".items_completed");
const items_delete = document.querySelector(".items_delete");

const tasksListElement = document.querySelector(`.tasks__list`);


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
    let div = document.createElement('div');
    let bxs_items = document.createElement('div');
    let bx_check = document.createElement('i');
    let bxs_trash = document.createElement('i');
    bxs_items.className = "bxs_items";
    div.className = "alert tasks__item";
    div.draggable = true;
    div.textContent = task;

    bx_check.className = "bx-check bx";
    bxs_trash.className = "bxs-trash bx";

    bxs_items.append(bx_check, bxs_trash)

    div.append(bxs_items)
    items_active.append(div);

    return document.querySelector(".input_task").value = "";
}

document.addEventListener("click", (e) => {
    target = e.target
    if (target.classList.contains("bxs-trash")) {
        let task_delete = target.parentNode.parentNode.textContent;
        localStorage.setItem("delete_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("delete_tasks") || "[]"), task_delete])
        );

        const getLocalStorage = JSON.parse(localStorage.getItem("active_tasks"));
        const index = getLocalStorage.findIndex(user => user == task_delete);
        getLocalStorage.splice(index, 1);
        localStorage.setItem('active_tasks', JSON.stringify(getLocalStorage));

        items_delete.append(target.parentNode.parentNode)
        target.parentNode.remove()
    }
    if (target.classList.contains("bx-check")) {
        let task_completed = target.parentNode.parentNode.textContent;
        localStorage.setItem("completed_tasks", JSON.stringify(
            [...JSON.parse(localStorage.getItem("completed_tasks") || "[]"), task_completed])
        );
        items_completed.append(target.parentNode.parentNode)
        target.remove()
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
                break;
            }
        case "completed":
            {
                items_active.style.display = "none";
                items_completed.style.display = "block"
                items_delete.style.display = "none";
                break;
            }
        case "delete": {
            items_active.style.display = "none";
            items_completed.style.display = "none";
            items_delete.style.display = "block";
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
            let div = document.createElement('div');
            div.className = "alert";
            div.textContent = task;
            items_delete.append(div);
        });
    }
    if (localStorage.getItem("completed_tasks") != null) {
        let tasks_completed = Array.from(JSON.parse(localStorage.getItem("completed_tasks")));
        tasks_completed.forEach(task => {
            let div = document.createElement('div');
            let bxs_items = document.createElement('div');
            let bxs_trash = document.createElement('i');
            div.className = "alert";
            bxs_items.className = "bxs_items";
            div.className = "alert";
            bxs_trash.className = "bxs-trash bx";
            bxs_items.append(bxs_trash)

            div.append(bxs_items)
            div.textContent = task;
            items_completed.append(div);
        });
    }
    else return;
}




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
        currentElement.classList.contains(`tasks__item`);

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