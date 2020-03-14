const taskList = document.querySelector(".taskList");
const inputTask = document.querySelector("#task");
const date = document.querySelector("#date");
const img = document.querySelector("#img-header");
const clearButton = document.querySelector(".clear");

let tasksArray = [];
let id = 0;
let day = "";
let hour = "";
let min = "";
let sec = "";

// Función para eliminar tarea
function deleteTask(taskToDelete) {
  taskList.removeChild(document.getElementById(taskToDelete.id));
  tasksArray.splice(tasksArray.findIndex(task => task.id == taskToDelete.id), 1);
}

// Función para completar tarea
function completeTask(li, task) {
  let completedButton = li.firstChild;

  if (task.completed == false) {
    completedButton.style.color = "green";
    completedButton.className = "fas fa-check-circle";
    li.childNodes[2].style.textDecoration = "line-through";
    li.childNodes[2].style.color = "grey";

    task.completed = true;
  } else {
    li.childNodes[2].style.color = "black";
    li.childNodes[2].style.textDecoration = "none";
    completedButton.className = "far fa-circle done";
    completedButton.style.color = "black";
    task.completed = false;
  }
}

// Función para añadir tarea
function addTask(text) {
  let task = {
    text: text,
    id: id,
    completed: false
  };

  let li = document.createElement("li");
  li.setAttribute("id", id);
  li.innerHTML = `<i class="far fa-circle done"></i>
            <p>${text}</p>
            <i class="fas fa-trash-alt trash"></i>`;
  taskList.appendChild(li);

  // Añadimos el evento de click al boton delete generado

  let lastTask = document.querySelector("ul").lastChild;

  lastTask.lastElementChild.addEventListener("click", event => {
    deleteTask(li);
  });

  // Añadimos el evento de click en el boton de completed

  lastTask.firstChild.addEventListener("click", event => {
    completeTask(li, task);
  });
  tasksArray.push(task);
}

// Evento que captura el valor de la tarea y se la pasa como parametro a la funcion addTask()
document.addEventListener("keyup", event => {
  if (event.keyCode == 13 && inputTask.value != "") {
    id++;
    addTask(inputTask.value);
    inputTask.value = "";
  }
});

// Funcion para limpiar completos
function clearCompleted() {
  tasksCompleted = tasksArray.filter(task => task.completed == true);
  tasksCompleted.forEach(element => {
    deleteTask(element);
    console.log(`Tarea ${element.text} eliminada`);
  });
}

// Evento boton clear
clearButton.addEventListener("click", event => {
  clearCompleted();
});

// Añadir fecha
function updateTime() {
  let time = new Date();

  let update = setTimeout("updateTime()", 500);
  switch (time.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";

      break;
    case 3:
      day = "Wednesday";

      break;
    case 4:
      day = "Thursday";

      break;
    case 5:
      day = "Friday";

      break;
    case 6:
      day = "Saturday";

      break;
    default:
      break;
  }

  time.getHours() < 10
    ? (hour = "0" + time.getHours())
    : (hour = time.getHours());

  time.getMinutes() < 10
    ? (min = "0" + time.getMinutes())
    : (min = time.getMinutes());

  time.getSeconds() < 10
    ? (sec = "0" + time.getSeconds())
    : (sec = time.getSeconds());

  date.innerHTML =
    day + " " + time.toLocaleDateString() + " " + hour + ":" + min + ":" + sec;
}
updateTime();

// Cambio de fondos en función de la hora

function headerImgSwitch() {
  switch (true) {
    case hour < 7:
      img.setAttribute("src", "assets/noche.jpg");

      break;

    case hour > 7 && hour <= 15:
      img.setAttribute("src", "assets/dia.jpg");

      break;

    case hour > 15 && hour <= 20:
      img.setAttribute("src", "assets/tarde.jpg");

      break;

    case hour > 20:
      img.setAttribute("src", "assets/noche.jpg");
      console.log("noche");

      break;

    default:
      console.log("no entra");
      console.log(hour);

      break;
  }
}
headerImgSwitch();
