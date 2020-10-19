const container = document.querySelector(".container");
//Tools
const blackBtn = document.querySelector(".shade");
const rgbBtn = document.querySelector(".rgb");
const colorPick = document.querySelector("input[type=color]");
const clearBtn = document.querySelector(".clear");
const newGridBtn = document.querySelector(".new-grid");
const penIndicator = document.querySelector(".pen-indicator");
let toolIndicator = document.querySelector(".tool-indicator");

//Modal
const modal = document.querySelector(".modal-container");
const message = document.querySelector(".message");
const modalClose = document.querySelector(".close");
const modalButtons = document.querySelector(".modal-buttons");
let modalDecision;

//Form
const gridForm = document.getElementById("grid-form");
const gridChoices = document.querySelector(".grid-choices-container");
let customGrid = document.getElementById("custom-grid");
let grid = document.getElementById("grid");
let colorHandler = hoverDefault;
let gridValue = 16;

window.onload = createDiv(gridValue);
container.addEventListener("mouseover", colorHandler);

window.addEventListener("keyup", function (e) {
  if (e.keyCode == 49) {
    container.addEventListener("mouseover", colorHandler);
    penIndicator.classList.remove("disabled");
  } else if (e.keyCode == 50) {
    container.removeEventListener("mouseover", colorHandler);
    penIndicator.classList.add("disabled");
    2;
  }
});

//Modal
modal.addEventListener("click", function (e) {
  if (e.target.classList[0] === "modal-container") {
    modalClose.click();
  }
});

modalClose.addEventListener("click", function () {
  modal.classList.remove("open");
  message.innerText = "";
});

//Grid Choices

customGrid.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    if (customGrid.value <= 100 && customGrid.value >= 2) {
      container.innerHTML = "";
      gridValue = customGrid.value;
      createDiv(gridValue);
      gridForm.reset();
      gridChoices.classList.toggle("open");
      customGrid.style.display = "none";
      grid.style.display = "none";
    } else {
      customGrid.value = "";
      return;
    }
  }
});

grid.addEventListener("change", function () {
  container.innerHTML = "";
  gridValue = grid.value;
  createDiv(grid.value);
  gridForm.reset();
  gridChoices.classList.toggle("open");
  customGrid.style.display = "none";
  grid.style.display = "none";
});

newGridBtn.addEventListener("click", function () {
  modal.classList.add("open");
  message.innerText =
    "WARNING: Your progress will be lost after creating a new grid. Do you wish to continue?";
  modalButtons.removeEventListener("click", openForClear);
  modalButtons.addEventListener("click", openForGrid);
});

function openForGrid(e) {
  if (e.target.id === "ok") {
    gridChoices.classList.add("open");
    modalClose.click();
    customGrid.style.display = "block";
    grid.style.display = "block";
  } else {
    modalClose.click();
  }
}

//Color Tools
colorPick.addEventListener("change", function () {
  removeContainerEvent();
  colorHandler = hoverColorPick;
  addContainerEvent();
  penIndicator.classList.remove("disabled");
  toolIndicator.style.top = "28%";
});

colorPick.addEventListener("click", function () {
  removeContainerEvent();
  colorHandler = hoverColorPick;
  addContainerEvent();
  penIndicator.classList.remove("disabled");
  toolIndicator.style.top = "28%";
});



blackBtn.addEventListener("click", function () {
  removeContainerEvent();
  colorHandler = hoverDefault;
  addContainerEvent();
  penIndicator.classList.remove("disabled");
  toolIndicator.style.top = "45%";
});

rgbBtn.addEventListener("click", function () {
  removeContainerEvent();
  colorHandler = hoverRgb;
  addContainerEvent();
  penIndicator.classList.remove("disabled");
  toolIndicator.style.top = "62%";
});

clearBtn.addEventListener("click", function () {
  modal.classList.add("open");
  message.innerText = "Your art will be erased. Are you sure?";
  modalButtons.removeEventListener("click", openForGrid);
  modalButtons.addEventListener("click", openForClear);
});

function openForClear(e) {
  if (e.target.id === "ok") {
    container.innerHTML = "";
    createDiv(gridValue);
    modalClose.click();
  } else {
    modalClose.click();
  }
}
// Create Divs
function createDiv(num) {
  container.style.cssText = `
    grid-template-columns: repeat(${num},1fr);
    grid-template-rows: repeat(${num},1fr);
    `;
  for (let i = 0; i < num ** 2; i++) {
    const div = document.createElement("div");
    div.className = "box";
    div.style.height = "100%";
    div.style.width = "100%";
    container.appendChild(div);
  }
}

function removeContainerEvent() {
  container.removeEventListener("mouseover", colorHandler);
}

function addContainerEvent() {
  container.addEventListener("mouseover", colorHandler);
}

function hoverColorPick(e) {
  if (e.target.className == "box") {
    e.target.style.backgroundColor = colorPick.value;
  }
}

function hoverDefault(e) {
  if (e.target.className == "box") {
    if (e.target.getAttribute("data-black")) {
      if (
        e.target.dataset.black == 0 &&
        e.target.style.backgroundColor !== "rgb(0, 0, 0)"
      ) {
        e.target.dataset.black = 200;
        e.target.style.backgroundColor = "rgb(200, 200, 200)";
      } else if (e.target.dataset.black == 0) {
        return;
      } else {
        e.target.dataset.black -= 20;
        let x = e.target.dataset.black;
        e.target.style.backgroundColor = `rgb(${x},${x},${x})`;
      }
    } else {
      e.target.setAttribute("data-black", 200);
      let x = e.target.dataset.black;
      e.target.style.backgroundColor = `rgb(${x},${x},${x})`;
    }
  }
}

function hoverRgb(e) {
  if (e.target.className == "box") {
    e.target.style.backgroundColor = `${randomColor(
      Math.floor(Math.random() * 256)
    )}`;
  }
}

function randomColor(brightness) {
  function randomChannel(brightness) {
    var r = 255 - brightness;
    var n = 0 | (Math.random() * r + brightness);
    var s = n.toString(16);
    return s.length == 1 ? "0" + s : s;
  }
  return (
    "#" +
    randomChannel(brightness) +
    randomChannel(brightness) +
    randomChannel(brightness)
  );
}
