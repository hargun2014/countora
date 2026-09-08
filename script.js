// ============================
// ELEMENTS
// ============================

const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");
const uploadArea = document.getElementById("uploadArea");
const workspace = document.getElementById("workspace");

const uploadedImage = document.getElementById("uploadedImage");
const imageContainer = document.getElementById("imageContainer");
const markers = document.getElementById("markers");

const countDisplay = document.getElementById("count");

const undoButton = document.getElementById("undoButton");
const clearButton = document.getElementById("clearButton");

const markerSize = document.getElementById("markerSize");
const markerSizeValue = document.getElementById("markerSizeValue");

const numberSize = document.getElementById("numberSize");
const numberSizeValue = document.getElementById("numberSizeValue");

const colorOptions = document.querySelectorAll(".color-option");


// ============================
// SETTINGS
// ============================

let count = 0;
let markerList = [];
let currentColor = "#4f46e5";


// ============================
// OPEN FILE PICKER
// ============================

uploadButton.addEventListener("click", function (event) {
    event.stopPropagation();

    imageInput.value = "";
    imageInput.click();
});


uploadArea.addEventListener("click", function (event) {
    if (event.target === uploadButton) {
        return;
    }

    imageInput.value = "";
    imageInput.click();
});


// ============================
// LOAD IMAGE
// ============================

function loadImageFile(file) {

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please choose an image file.");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    uploadedImage.src = imageURL;

    uploadArea.style.display = "none";
    workspace.style.display = "block";

    resetCounter();
}


// ============================
// IMAGE SELECTED
// ============================

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    loadImageFile(file);

});


// ============================
// IMAGE LOADED
// ============================

uploadedImage.addEventListener("load", function () {
    updateMarkerLayer();
});


function updateMarkerLayer() {

    markers.style.width = uploadedImage.clientWidth + "px";
    markers.style.height = uploadedImage.clientHeight + "px";

}


// ============================
// COUNT OBJECTS
// ============================

imageContainer.addEventListener("click", function (event) {

    if (event.target !== uploadedImage) {
        return;
    }

    const rect = uploadedImage.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    count++;

    const marker = document.createElement("div");

    marker.className = "marker";

    marker.textContent = count;

    marker.style.left = x + "px";
    marker.style.top = y + "px";

    const markerSizeNumber = Number(markerSize.value);

    marker.style.width = markerSizeNumber + "px";
    marker.style.height = markerSizeNumber + "px";

    const numberSizeNumber = Number(numberSize.value);

    marker.style.fontSize = numberSizeNumber + "px";

    marker.style.backgroundColor = currentColor;

    markers.appendChild(marker);

    markerList.push(marker);

    countDisplay.textContent = count;

});


// ============================
// MARKER SIZE
// ============================

markerSize.addEventListener("input", function () {

    const size = Number(markerSize.value);

    markerSizeValue.textContent = size + "px";

    markerList.forEach(function (marker) {

        marker.style.width = size + "px";
        marker.style.height = size + "px";

    });

});


// ============================
// NUMBER SIZE
// ============================

numberSize.addEventListener("input", function () {

    const size = Number(numberSize.value);

    numberSizeValue.textContent = size + "px";

    markerList.forEach(function (marker) {

        marker.style.fontSize = size + "px";

    });

});


// ============================
// COLOR PICKER
// ============================

colorOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        currentColor = button.dataset.color;

        colorOptions.forEach(function (option) {
            option.classList.remove("selected");
        });

        button.classList.add("selected");

        markerList.forEach(function (marker) {
            marker.style.backgroundColor = currentColor;
        });

    });

});


// ============================
// UNDO
// ============================

undoButton.addEventListener("click", function () {

    if (markerList.length === 0) {
        return;
    }

    const lastMarker = markerList.pop();

    lastMarker.remove();

    count--;

    countDisplay.textContent = count;

});


// ============================
// CLEAR
// ============================

clearButton.addEventListener("click", function () {

    resetCounter();

});


// ============================
// RESET COUNTER
// ============================

function resetCounter() {

    count = 0;

    countDisplay.textContent = "0";

    markerList.forEach(function (marker) {
        marker.remove();
    });

    markerList = [];

    markerSize.value = 20;
    markerSizeValue.textContent = "20px";

    numberSize.value = 12;
    numberSizeValue.textContent = "12px";

}


// ============================
// DRAG & DROP
// ============================

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.style.borderColor = "#635bff";

});


uploadArea.addEventListener("dragleave", function () {

    uploadArea.style.borderColor = "";

});


uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadArea.style.borderColor = "";

    const file = event.dataTransfer.files[0];

    loadImageFile(file);

});
