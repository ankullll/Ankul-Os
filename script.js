const start = document.querySelector(".window-logo");
const startMenu = document.querySelector("#start-menu");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const app = document.querySelectorAll(".app");
const appView = document.querySelector(".appView");
const notepad = document.querySelectorAll(".notepad");
const close = document.querySelector(".close");
const minimize = document.querySelector(".minimize");
const changeSize = document.querySelector(".changeSize");
const taskbarNotepad = document.querySelector(".taskbar-notepad");
const working = document.querySelector(".working");
const appHeader = document.querySelector(".nav-center");

start.addEventListener("click", (e) => {
  e.stopPropagation();
  startMenu.classList.toggle("open");
});

startMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", () => {
  startMenu.classList.remove("open");
  app.forEach((app) => {
    app.classList.remove("gray");
  });
});
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // 0 ko 12 bana do

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  time.textContent = `${hours}:${minutes} ${ampm}`;
  date.textContent = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
}

updateClock();
setInterval(updateClock, 1000);

app.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    app.forEach((e) => {
      e.classList.remove("gray");
    });
    item.classList.add("gray");
  });
});

let topZindex = 100;

notepad.forEach((e) => {
  e.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    // appView.classList.add('fullsize')
    appView.classList.remove("hide");
    taskbarNotepad.classList.remove("hide");
    taskbarNotepad.classList.add("active");
    working.classList.add("running");
    startMenu.classList.remove("open");
    topZindex++;
    appView.style.zIndex = topZindex;
  });
});

close.addEventListener("click", () => {
  appView.classList.add("hide");
  taskbarNotepad.classList.add("hide");
  taskbarNotepad.classList.remove("active");
  working.classList.remove("running");
});
minimize.addEventListener("click", () => {
  appView.classList.add("hide");
  taskbarNotepad.classList.remove("active");
  topZindex++;
  appView.style.zIndex = topZindex;
});

let prevLeft;
let prevTop;

changeSize.addEventListener("click", () => {
  topZindex++;
  appView.style.zIndex = topZindex;

  if (!appView.classList.contains("fullsize")) {
    prevLeft = appView.offsetLeft;
    prevTop = appView.offsetTop;

    appView.classList.add("fullsize");
    appView.style.left = "0px";
    appView.style.top = "0px";
  } else {
    appView.classList.remove("fullsize");
    appView.style.left = `${prevLeft}px`;
    appView.style.top = `${prevTop}px`;
  }
});

taskbarNotepad.addEventListener("click", () => {
  if (appView.classList.contains("hide")) {
    appView.classList.remove("hide");
    taskbarNotepad.classList.add("active");
    working.classList.add("running");
  } else {
    appView.classList.add("hide");
    taskbarNotepad.classList.remove("active");
    working.classList.add("running");
  }
  topZindex++;
  appView.style.zIndex = topZindex;
});

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

appHeader.addEventListener("mousedown", (e) => {
  // maximize state me drag disable
  if (appView.classList.contains("fullsize")) return;

  if (e.target === minimize || e.target === changeSize || e.target === close) {
    return;
  }

  isDragging = true;
  appHeader.classList.add("dragging");

  const rect = appView.getBoundingClientRect();
  

  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  // screen ke bahar jaane se roko
  const taskbarHeight = 40;
  const maxLeft = window.innerWidth - appView.offsetWidth;
  const maxTop = window.innerHeight - taskbarHeight - appView.offsetHeight;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newTop > maxTop) newTop = maxTop;

  appView.style.left = `${newLeft}px`;
  appView.style.top = `${newTop}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  appHeader.classList.remove("dragging");
});


appHeader.addEventListener('dblclick',()=>{
  console.log("working")
  appView.classList.toggle('fullsize')
})