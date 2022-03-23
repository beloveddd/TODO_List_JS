import { LIST_OF_TASKS, ENTER_KEY_CODE, MODAL, BTN_CLASSES, MODAL_EDITOR } from "./const.js";
import { Task } from "./Task.js";

export function addTaskToList(e) {
    if (e.key !== ENTER_KEY_CODE) {
        return;
    }

    const ev = e.target;
    const date = new Date(); 
    const task = new Task ({
        taskId: new Date(),
        taskName: ev.value,
        dateCreation: getDateCreation(date),
        dateExpiration: getDateExpiration(date),
    });

    ev.value = '';
    renderTask(task);   
}

export function getDateCreation(date) {
    if (date.getMonth() < 9) {
        return `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function getDateExpiration(date) {
    if (date.getMonth() < 9) {
        return `${date.getDate() + 1}.0${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    return `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function defineTarget(e) {
    const ev = e.target;
    const targetClass = ev.className;

    switch (targetClass) {
        case BTN_CLASSES.CHECKBOX:
            checkCheckbox(ev);
            break;
        case BTN_CLASSES.CROSSROW:
            const liTask = ev.parentNode.parentNode;

            Task.deleteTask(liTask);
            break;
        case BTN_CLASSES.CHANGE:
            const taskLi = ev.parentNode.parentNode;

            MODAL_EDITOR.chosenTask = taskLi;
            changeTaskData(taskLi);
    }
}

export function changeTaskData(taskLi) {
    const taskName = taskLi.querySelector('#taskInp').outerText;
    const dateCreation = taskLi.querySelector('#dateCreation').outerText;
    const dateExpiration = taskLi.querySelector('#dateExpiration').outerText;
    const objOfDataTask = {
        taskName: taskName,
        dateCreation: dateCreation,
        dateExpiration: dateExpiration,
    }
    
    MODAL_EDITOR.openModalEditorWindow(parseDataFromTask(objOfDataTask));
};

export function parseDataFromTask(objOfDataTask) {
    const valueTaskName = objOfDataTask.taskName.split(' ')[1];
    const valueCreationDate = objOfDataTask.dateCreation.split(' ')[2].split('.');
    const valueExpirationDate = objOfDataTask.dateExpiration.split(' ')[2].split('.');

    return {
        taskName: valueTaskName,
        dateCreation: {
            year: valueCreationDate[2],
            month: valueCreationDate[1],
            date: valueCreationDate[0],
        },
        dateExpiration: {
            year: valueExpirationDate[2],
            month: valueExpirationDate[1],
            date: valueExpirationDate[0],
        }
    }
}

export function checkCheckbox(ev) {
    const divTask = ev.parentNode.parentNode.children[0].children[0];
    
    if (ev.checked) {
        setTaskAsDone(divTask);
    } else {
        cancelTaskAsDone(divTask);
    }
}

export function setTaskAsDone(divTask) {
    const markDone = document.createElement('div');

    markDone.id = "done";
    markDone.innerHTML = "DONE";
    divTask.classList.add("done");
    divTask.parentNode.append(markDone);
}

export function cancelTaskAsDone(divTask) {
    const markDone = divTask.parentNode.querySelector('#done');

    markDone.remove();
    divTask.classList.remove("done");
}

export function getValueFromInput(e) {
    const ev = e.target;

    MODAL.valfromInput = ev.value;

    if (MODAL.valfromInput) {
        markAsValid(ev);
    }
}

export function getValueForCreation(e) {
    const ev = e.target;

    MODAL.valCreation = ev.value;

    if (MODAL.valCreation) {
        markAsValid(ev);
    }
}

export function getValueForExpiration(e) {
    const ev = e.target;

    MODAL.valExpiration = ev.value;

    if (MODAL.valExpiration) {
        markAsValid(ev);
    }

    if (new Date(MODAL.valExpiration) < new Date(MODAL.valCreation)) {
        markAsInvalid(ev); 
    }
}

export function markAsInvalid() {
    Array.from(arguments).forEach( (elem) => elem.classList.add('canceled') );
}

export function markAsValid(input) {
    input.classList.remove('canceled'); 
}

export function renderTask(task) {
    const newLi = document.createElement('li');

    newLi.innerHTML = task.getData();
    LIST_OF_TASKS.append(newLi);
}





