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
            const taskText = listItem.querySelector('.task-text').textContent;
            tasks.push({
                text: taskText,
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const createTaskElement = (taskText, completed = false) => {
        const listItem = document.createElement('li');

        // Criar o span para o texto da tarefa
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        if (completed) {
            taskSpan.classList.add('completed');
        }

        listItem.appendChild(taskSpan);

        // Adicionar evento para marcar como completo
        taskSpan.addEventListener('click', () => {
            taskSpan.classList.toggle('completed');
            saveTasks();
        });

        // Criar o botão de remover
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique remova a tarefa ao marcar como completa
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
