import addContent from "./tasks.mjs";

const fillTask = document.querySelector('.fillTask');
const taskBtn = document.querySelector('.taskBtn');
const addBtn = document.querySelector('.addBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const todoInput = document.querySelector('.todoInput');

const addContentPage = document.querySelector('.addContentPage');
const todoPage = document.querySelector('.todoPage');
const completedPage = document.querySelector('.completedPage');

const todoList = [];
const completedTasks = [];


addContentPage.addEventListener('click', addContent);

// taskBtn.addEventListener('click', () => {
//     fillTask.classList.toggle('showFill');
// })

// cancelBtn.addEventListener('click', () => {
//     fillTask.classList.remove('showFill');
// })

// addBtn.addEventListener('click', () => {
//     addToList();
//     clearInput();
// })



// function addToList(){
//     let task = todoInput.value;
//     todoList.push(task);
// }


function addToList(){
    todoList.push(todoInput.value);
  }

function clearInput(){
    todoInput.value = "";
}

export default { addToList, clearInput };



