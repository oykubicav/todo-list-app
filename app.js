// app.js

// Selectors
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteOrCompleteTask);
taskList.addEventListener('dragstart', dragStart);
taskList.addEventListener('dragover', dragOver);
taskList.addEventListener('drop', drop);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

// Functions
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.draggable = true; // Enable dragging
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function deleteOrCompleteTask(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        target.closest('li').remove();
    } else if (target.tagName === 'SPAN') {
        target.closest('li').classList.toggle('completed');
    }
}

let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    setTimeout(() => {
        event.target.style.display = 'none'; // Hide the dragged item
    }, 0);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const dropTarget = event.target.closest('li');
    taskList.insertBefore(draggedItem, dropTarget);
    draggedItem.style.display = 'block'; // Show the dragged item
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const app = document.getElementById('app');
    app.classList.toggle('dark-mode');
    const taskInputs = document.querySelectorAll('#task-input, button[type="submit"], .delete-btn');
    taskInputs.forEach(input => input.classList.toggle('dark-mode'));
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => task.classList.toggle('dark-mode'));
}

