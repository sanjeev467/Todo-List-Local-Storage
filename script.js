const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

// fun to get items from localstorage
const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("TodoList"));
  // JSON.parse to again convert the string stored in localstorage into the actual array
  // we passed the key in getItem bracket because locstorage works on key value pair
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem("TodoList", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];
// creating empty array to store todolist tasks emements
// [] we used empty array beacuse though if we dont have data atleast we can show empty array or empty todo

// adding add to list dynamically

const addTodoDynamicElement = (currElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div"); // prop to assign class to a div
  divElement.innerHTML = `<li>${currElem}</li>  <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};
const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim(); // trim to remove white spaces

  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue); // push used to add element in array
    localTodoLists = [...new Set(localTodoLists)];
    // ... is spread operator and set is used to remove duplicate items from the todolist
    console.log(localTodoLists);
    localStorage.setItem("TodoList", JSON.stringify(localTodoLists));
    // in localstorage we only store data in string format so the elements we are storing are in an array so we converted the array into string type using JSON.stringfy

    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoLists);

  localTodoLists.forEach((currElem) => {
    addTodoDynamicElement(currElem);
  });
};

showTodoList();

//remove todo item
const removeTodoElem = (e) => {
  // console.log(event.target);
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;
  console.log(todoListContent);
  // let parentElem = todoToRemove.console.log(todoListContent);

  localTodoLists = localTodoLists.filter((currTodo) => {
    return currTodo != todoListContent;
  });

  addTodoListLocalStorage(localTodoLists);
  parentElem.remove();

  console.log(localTodoLists);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target.classList.contains("deleteBtn"));
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
