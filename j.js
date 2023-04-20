let tasks = [];
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
function addTask(task) {
  tasks.push(task);
  const taskItem = document.createElement('li');
  taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  taskItem.innerHTML = `
    <span>${task.title} - ${task.priority}</span>
    <div>
      <button class="btn btn-success mr-2 complete-task-btn"${task.status === 'completed' ? ' disabled' : ''}>Complete</button>
      <button class="btn btn-danger remove-task-btn">Remove</button>
    </div>`;
  const completeTaskBtn = taskItem.querySelector('.complete-task-btn');
  completeTaskBtn.addEventListener('click', () => {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    taskItem.classList.toggle('completed-task');
    completeTaskBtn.disabled = task.status === 'completed';
  });
  const removeTaskBtn = taskItem.querySelector('.remove-task-btn');
  removeTaskBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => t !== task);
    taskItem.remove();
  });
  taskList.appendChild(taskItem);
  if (task.status === 'completed') {
    taskItem.classList.add('completed-task');
    completeTaskBtn.disabled = true;
  }
}
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const priority = document.getElementById('task-priority').value;
  const status = document.querySelector('input[name="task-status"]:checked').value;
  const task = {
    title,
    priority,
    status
  };
  addTask(task);
  taskForm.reset();
});
