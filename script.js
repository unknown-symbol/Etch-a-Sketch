var canDraw = false;
var currentSize = 0;
var colorTool = "Solid";
var blankCanvas = true;
var solidColor = "#000";

const modalElement = document.querySelector(".modal");
const cancelButton = document.querySelector(".cancel-button");
const continueButton = document.querySelector(".continue-button");
const colorPicker = document.querySelector(".color-picker");
const rangeElement = document.querySelector(".grid-size-range");
const clearButton = document.querySelector(".clear-button");
const colorButtons = document.querySelectorAll(".color-tool");
const solidColorButton = document.querySelector(".color-button");
const gridContainer = document.querySelector(".grid-container");

colorPicker.addEventListener("input", () => {
  solidColorButton.style[
    "box-shadow"
  ] = `inset 100px 0px 0px -60px ${colorPicker.value}`;
  solidColor = colorPicker.value;
});

rangeElement.addEventListener("change", () => {
  modal(() => createGrid(rangeElement.value));
});

clearButton.addEventListener("click", () => {
  modal(() => clearGrid());
});

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    colorTool = button.textContent;

    let previous = document.querySelector(".checked") || false;

    if (document.querySelector(".checked")) {
      previous.classList.remove("checked");
    }

    button.classList.add("checked");
  });
});

function createGrid(size = 32) {
  if (size < 16) size = 16;
  if (size > 100) size = 100;

  currentSize = size;

  blankCanvas = true;

  let gridElements = gridContainer.querySelectorAll("div");

  gridElements.forEach((element) => element.remove());

  gridContainer.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
  gridContainer.style["grid-template-columns"] = `repeat(${size}, 1fr)`;

  size = size * size;

  for (size > 0; size--; ) {
    let gridElement = document.createElement("div");

    gridElement.classList = "grid-element";

    gridElement.style.background = "#fff";

    gridContainer.insertAdjacentElement("beforeend", gridElement);
  }

  gridElements = gridContainer.querySelectorAll("div");

  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      canDraw = true;
    }
  });

  document.addEventListener("mouseup", () => {
    canDraw = false;
  });

  window.addEventListener("blur", () => {
    isMouseDown = false;
  });

  gridElements.forEach((element) => {
    element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      element.style.background = newElementColor(element);
    });

    element.addEventListener("mouseover", () => {
      if (canDraw) {
        element.style.background = newElementColor(element);
      }
    });

    element.addEventListener(
      "mouseover",
      () => {
        if (canDraw) {
          blankCanvas = false;
        }
      },
      { once: true }
    );
  });
}

function clearGrid() {
  const gridElements = document.querySelectorAll(".grid-element");

  gridElements.forEach((element) => {
    element.style.background = "#fff";
  });

  blankCanvas = true;
}

function newElementColor(element) {
  const currentColor = element.style.background
    .replace("rgb(", "")
    .replace(")", "")
    .split(", ");

  let newColor = [];

  switch (colorTool) {
    case "Darker":
      currentColor.forEach((color) => newColor.push(+color - 20));
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;

    case "Lighter":
      currentColor.forEach((color) => newColor.push(+color + 20));
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;

    case "Rainbow":
      for (let i = 0; i < 3; i++) {
        newColor[i] = Math.random() * 220 + 35;
      }
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;

    default:
      return solidColor;
  }
}

function modal(onConfirm) {
  if (!onConfirm) return;
  if (blankCanvas) return onConfirm();

  cancelButton.addEventListener(
    "click",
    () => {
      modalElement.style.display = "none";
      rangeElement.value = currentSize;
    },
    { once: true }
  );

  continueButton.addEventListener(
    "click",
    () => {
      modalElement.style.display = "none";
      onConfirm();
    },
    { once: true }
  );

  modalElement.style.display = "block";
}

createGrid();
