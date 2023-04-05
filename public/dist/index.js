"use strict";
;
(() => {
    let NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    let ViewMode;
    (function (ViewMode) {
        ViewMode["TODO"] = "TODO";
        ViewMode["REMINDER"] = "REMINDER";
    })(ViewMode || (ViewMode = {}));
    const UUID = () => {
        return Math.random().toString(32).substring(2, 9);
    };
    const DATEUTILS = {
        tomorrow() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today() {
            return new Date();
        },
        formatDate(date) {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
    };
    class Reminder {
        constructor(descricao, date, notifications) {
            this.id = UUID();
            this.dateCreated = DATEUTILS.today();
            this.dateUpdated = DATEUTILS.today();
            this.description = '';
            this.date = new Date();
            this.notifications = [NotificationPlatform.EMAIL];
            this.description = descricao;
            this.date = date;
            this.notifications = notifications;
        }
        render() {
            return `--->REMINDER <--- 
      description: ${this.description} 
      date: ${DATEUTILS.formatDate(this.date)} 
      platform: ${this.notifications.join(',')}`;
        }
    }
    class Todo {
        constructor(description) {
            this.id = UUID();
            this.dateCreated = DATEUTILS.today();
            this.dateUpdated = DATEUTILS.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        render() {
            return `---> TODO <--- 
      description: ${this.description}
      done: ${this.done}`;
        }
    }
    const todo = new Todo('Todo criado com a classe');
    const reminder = new Reminder('Reminder criado com a classe', new Date(), [NotificationPlatform.EMAIL]);
    const taskView = {
        getTodo(form) {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder(form) {
            const reminderNotifications = [form.notification.value];
            const reminderDate = new Date(form.scheduleDate.value);
            const reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(reminderDescription, reminderDate, reminderNotifications);
        },
        render(tasks, modo) {
            // selecionar lista no html
            const tasksList = document.querySelector('#tasksList');
            // Limpar a lista
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            // add itens da lista
            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
            const todoSet = document.querySelector('#todoSet');
            const reminderSet = document.querySelector('#reminderSet');
            if (modo === ViewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display:block');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute('disabled');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('style', 'display:none');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('disabled', 'true');
            }
            else {
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('style', 'display:block');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.removeAttribute('disabled');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display:none');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('disabled', 'true');
            }
        },
    };
    const TaskController = (view) => {
        var _a, _b;
        const tasks = [];
        let mode = ViewMode.TODO;
        const handleEvent = (event) => {
            event.preventDefault();
            console.log('clicou-me');
            const form = event.target;
            switch (mode) {
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        const handleToggleMode = () => {
            switch (mode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document.querySelector('#toggleMode')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleToggleMode);
        (_b = document.querySelector('#taskForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
