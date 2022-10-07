let input = document.querySelector(".input");
let button = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let arrayOfTasks = [];
let deleteAllBtn = document.createElement("button");
deleteAllBtn.textContent = "delete All";
deleteAllBtn.className = "deleteBtn";
document.createAttribute("checked");

if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

getDataFromLs();

button.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
  addArrayToTasksDiv(arrayOfTasks);
  dataToLocalStorage(arrayOfTasks);
};

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteFromLSWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    toggleStatusWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
    e.target.firstChild.toggleAttribute("checked");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  arrayOfTasks.push(task);
}

function addArrayToTasksDiv(arrayOfTasks) {
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    let doneInput = document.createElement("input");
    doneInput.setAttribute("type", "checkbox");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
      doneInput.setAttribute("checked", "");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(doneInput);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.innerHTML = `delete`;
    span.className = "delete";
    div.appendChild(span);
    tasks.appendChild(div);
    tasks.appendChild(deleteAllBtn);
  });
}

function dataToLocalStorage(arrayOfTasks) {
  let data = JSON.stringify(arrayOfTasks);
  localStorage.setItem("task", data);
}

function getDataFromLs() {
  let data = localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addArrayToTasksDiv(tasks);
  }
}

function deleteFromLSWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  dataToLocalStorage(arrayOfTasks);
}

function toggleStatusWith(taskId) {
  for (let index = 0; index < arrayOfTasks.length; index++) {
    if (arrayOfTasks[index].id == taskId) {
      if (arrayOfTasks[index].completed == false) {
        arrayOfTasks[index].completed = true;
      } else {
        arrayOfTasks[index].completed = false;
      }
    }
  }
  dataToLocalStorage(arrayOfTasks);
}

deleteAllBtn.onclick = function () {
  tasks.innerHTML = "";
  localStorage.removeItem("task");
};
