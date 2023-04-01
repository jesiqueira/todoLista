;(() => {
  const todo = {
    description: 'todo',
    done: false,
  }

  const remender = {
    description: 'reminder',
    date: '15.12.2021',
  }

  const taskView = {
    render(tasks: Array<Object>) {
      // selecionar lista no html
      const tasksList = document.querySelector('#tasksList')

      // Limpar a lista
      while (tasksList?.firstChild) {
        tasksList.removeChild(tasksList.firstChild)
      }

      // add itens da lista
      tasks.forEach((tasks) => {
        const li = document.createElement('li')
        const textNode = document.createTextNode(JSON.stringify(tasks))
        li.appendChild(textNode)
        tasksList?.appendChild(li)
      })
    },
  }
  const TaskController = (view: typeof taskView) => {
    const tasks: Array<Object> = [todo, remender]

    const handleEvent = (event: Event) => {
      event.preventDefault()
      view.render(tasks)
    }

    document.querySelector('#taskForm')?.addEventListener('submit', handleEvent)
  }
  TaskController(taskView)
})()
