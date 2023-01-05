const fillTask = document.querySelector(".fillTask");
const taskBtn = document.querySelector(".taskBtn");
const addBtn = document.querySelector(".addBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const todoInput = document.querySelector(".todoInput");
const contentPage = document.querySelector(".content");
const addContentPage = document.querySelector(".addContentPage");
const todoPage = document.querySelector(".todoPage");
const completedPage = document.querySelector(".completedPage");



// const todoList = [];
// var completedTaskList = [];
var completedTaskList = loadCompletedList();
var todoList = loadToDoList();


addContentPage.addEventListener("click", ContentPage);
todoPage.addEventListener('click', toDoPage);
completedPage.addEventListener('click', completedTasks);


function loadPage(){
  completedTaskList = loadCompletedList();
   todoList = loadToDoList();
}


function setLocalStorage(listname, list){
  let todoList_serialized = JSON.stringify(list);
  localStorage.setItem(`${listname}`, todoList_serialized);
}

function getLocalStorage(listname){
  return JSON.parse(localStorage.getItem(`${listname}`));
}

function loadToDoList(){
  var todoList = getLocalStorage('todoList');
  if(todoList !== null){
    return todoList;
  }else{
    return [];
  }  
}

function loadCompletedList(){
  var completedTaskList = getLocalStorage('completedTaskList');
  if(completedTaskList !== null){
    return completedTaskList;
  }else{
    return [];
  }  
}


function ContentPage() {
  clearDivs();
  loadPage();

  let taskBtn = document.createElement("button");
  taskBtn.textContent = "+ Add Task";
  let fillTask = document.createElement("div");
  taskBtn.classList.add("taskBtn");
  fillTask.classList.add("fillTask");

  contentPage.appendChild(taskBtn);
  contentPage.appendChild(fillTask);

  let todoInput = document.createElement("input");
  let addBtn = document.createElement("button");
  let cancelBtn = document.createElement("button");
  let added = document.createElement('h1');

  todoInput.classList.add("todoInput");
  addBtn.classList.add("addBtn");
  cancelBtn.classList.add("cancelBtn");
  added.classList.add("added");

  todoInput.type = "text";
  todoInput.placeholder = "What needs to be done?";
  todoInput.minLength = "2";
  todoInput.maxLength = "200";
  addBtn.textContent = "Add";
  cancelBtn.textContent = "Cancel";
  added.textContent = "Task added!";

  fillTask.appendChild(todoInput);
  fillTask.appendChild(addBtn);
  fillTask.appendChild(cancelBtn);
  fillTask.appendChild(added);

  taskBtn.addEventListener("click", () => {
    fillTask.classList.toggle("showFill");
  });

  cancelBtn.addEventListener("click", () => {
    fillTask.classList.remove("showFill");
  });

  addBtn.addEventListener("click", () => {
    if(todoInput.value.length > 0){
      addToTodo();
      clearInput();
      addIt();
    }else{
      shake();
    }

  });

  function clearInput(){
    todoInput.value = "";
  }

  function addToTodo() {
    todoList.push(todoInput.value);
    setLocalStorage('todoList', todoList);
  }

  function shake(){
    todoInput.classList.add('shakeIt');
    setTimeout(removeShake, 500);
  }
  
  function removeShake(){
    todoInput.classList.remove('shakeIt');
  }

  function addIt(){
    added.classList.add('addIt');
    setTimeout(removeaddIt, 800);
  }

  function removeaddIt(){
    added.classList.remove('addIt');
  }


}

function toDoPage(){
  clearDivs();
  loadPage();
  if(todoList.length === 0){
    return;
  }

  let titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  contentPage.appendChild(titleDiv);
  
  let doIt = document.createElement('h1');
  doIt.textContent = "Todo:";
  titleDiv.appendChild(doIt);

  let mainTaskDiv = document.createElement('div');
  mainTaskDiv.classList.add('taskDiv');
  contentPage.appendChild(mainTaskDiv);

  /* Loop through the todolist array, and generate a box for each task */
  for(let i = 0; i <= todoList.length -1; i++){
    let taskBox = document.createElement('div');
    taskBox.classList.add('taskBox');
    mainTaskDiv.appendChild(taskBox);

    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskBox.appendChild(taskDiv);

    let taskTitle = document.createElement('h2');
    let okBtn = document.createElement('button');
    let delBtn = document.createElement('button');

    taskTitle.classList.add('taskGiven');
    okBtn.classList.add('okBtn');
    delBtn.classList.add('delBtn');

    taskTitle.textContent = todoList[i];
    okBtn.textContent = "Done";
    delBtn.textContent = "Del";

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(okBtn);
    taskDiv.appendChild(delBtn);

    delBtn.addEventListener('click', () => {
      removeItem();
      setLocalStorage('todoList', todoList);
    })

    okBtn.addEventListener('click', () => {
      completedTaskList.push(taskTitle.textContent);
      removeItem();
      setLocalStorage('completedTaskList', completedTaskList);
      setLocalStorage('todoList', todoList);
    })

    function removeItem(){
      taskBox.remove();
      todoList.splice(i, 1);
    }
  }

}

function completedTasks(){
  clearDivs();
  loadPage();

  if(completedTaskList.length === 0){
    alert("No completed tasks!");
    return;
  }

  let titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  contentPage.appendChild(titleDiv);
  
  let doneTasksTitle = document.createElement('h1');
  doneTasksTitle.textContent = "Completed tasks:";
  titleDiv.appendChild(doneTasksTitle);

  let mainCompletedDiv = document.createElement('div');
  mainCompletedDiv.classList.add('completedDiv');
  contentPage.appendChild(mainCompletedDiv);

  for(let i = 0; i <= completedTaskList.length-1; i++){
    let compTask = document.createElement('div');
    compTask.classList.add('completedTask');
    mainCompletedDiv.appendChild(compTask);

    let compText = document.createElement('h2');
    let reAddBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    compText.classList.add('completedTaskText');
    reAddBtn.classList.add('reAdd');
    removeBtn.classList.add('remove');

    compText.textContent = completedTaskList[i];
    reAddBtn.textContent = "Re-add";
    removeBtn.textContent = "Remove";

    compTask.appendChild(compText);
    compTask.appendChild(reAddBtn);
    compTask.appendChild(removeBtn);

    removeBtn.addEventListener('click', () => {
      compTask.remove();
      completedTaskList.splice(i, 1);
      setLocalStorage('completedTaskList', completedTaskList);
    })

    reAddBtn.addEventListener('click', () => {
      todoList.push(completedTaskList[i]);
      compTask.remove();
      completedTaskList.splice(i, 1);
      setLocalStorage('completedTaskList', completedTaskList);
      setLocalStorage('todoList', todoList);
    })
  }
}

function clearDivs(){
  while(contentPage.lastElementChild){
    contentPage.removeChild(contentPage.lastElementChild);
  }
}
