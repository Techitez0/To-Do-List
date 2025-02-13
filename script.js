document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = task => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 transform translate-y-2';
        
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.className = 'text-gray-700';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'px-3 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-xl font-semibold focus:outline-none hover:scale-110 active:scale-95';
        
        deleteBtn.onclick = () => {
            li.classList.add('scale-95', 'opacity-0', '-translate-x-full');
            li.style.transition = 'all 0.3s ease-out';
            setTimeout(() => {
                li.remove();
                saveTasks();
            }, 300);
        };

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Trigger entrance animation
        requestAnimationFrame(() => {
            li.classList.remove('opacity-0', 'translate-y-2');
            li.classList.add('animate-wiggle');
            setTimeout(() => {
                li.classList.remove('animate-wiggle');
            }, 500);
        });
    };

    // Add task with button animation
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskBtn.classList.add('animate-wiggle');
            setTimeout(() => {
                addTaskBtn.classList.remove('animate-wiggle');
            }, 200);
            
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    };

    // Add task button click
    addTaskBtn.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});