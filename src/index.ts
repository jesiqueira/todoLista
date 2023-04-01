(() => {
  const todo = {
    description: "todo",
    done: false,
  };

  const remender = {
    description: "reminder",
    date: "15.12.2021",
  };

  const taskView = {
    render(tasks: Array<Object>) {
      const tasksList = document.querySelector("#tasksList");

      while (tasksList?.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
      }

      tasks.forEach((tasks) => {
        const li = document.createElement("li");
        const textNode = document.createTextNode(JSON.stringify(tasks));
        li.appendChild(textNode);
        tasksList?.appendChild(li);
      });

      const TaskController = () => {};
    },
  };
})();
