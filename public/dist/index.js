"use strict";
;
(() => {
    const todo = {
        description: 'todo',
        done: false,
    };
    const remender = {
        description: 'reminder',
        date: '15.12.2021',
    };
    const taskView = {
        render(tasks) {
            // selecionar lista no html
            const tasksList = document.querySelector('#tasksList');
            // Limpar a lista
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            // add itens da lista
            tasks.forEach((tasks) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(JSON.stringify(tasks));
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    const TaskController = (view) => {
        var _a;
        const tasks = [todo, remender];
        const handleEvent = (event) => {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.querySelector('#taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
