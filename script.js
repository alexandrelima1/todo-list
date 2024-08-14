
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const taskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');

    
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

 
    const saveTasks = () => {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.textContent.replace('Remover', '').trim(),
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    
    const createTaskElement = (taskText, completed = false) => {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        if (completed) {
            listItem.classList.add('completed');
        }

       
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveTasks();
        });

  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTasks();
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    };


    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Por favor, insira uma tarefa!');
            return;
        }

        createTaskElement(taskText);
        saveTasks();
        taskInput.value = ''; 
    };

    
    addTaskButton.addEventListener('click', addTask);

   
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
