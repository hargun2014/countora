```javascript
// ============================
// GET ELEMENTS
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

const colorOptions =
    document.querySelectorAll(".color-option");


// ============================
// VARIABLES
// ============================

let count = 0;

let markerList = [];

let currentColor = "#4f46e5";


// ============================
// OPEN IMAGE PICKER
// ============================

uploadButton.addEventListener("click", function (event) {

    event.stopPropagation();

    imageInput.click();

});


// Clicking the upload box also opens picker

uploadArea.addEventListener("click", function (event) {

    if (event.target === uploadButton) {
        return;
    }

    imageInput.click();

});


// ============================
// IMAGE SELECTED
// ============================

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }


    // Make sure the file is an image

    if (!file.type.startsWith("image/")) {

        alert("Please choose an image file.");

        return;
    }


    // Create temporary image URL

    const imageURL =
        URL.createObjectURL(file);


    // Put image into website

    uploadedImage.src = imageURL;


    // Hide upload screen

    uploadArea.style.display = "none";


    // Show workspace

    workspace.style.display = "block";


    // Reset counting

    resetCounter();

});


// ============================
// IMAGE LOADED
// ============================

uploadedImage.addEventListener("load", function () {

    updateMarkerLayer();

});


// Keep marker layer the same size as image

function updateMarkerLayer() {

    markers.style.width =
        uploadedImage.clientWidth + "px";

    markers.style.height =
        uploadedImage.clientHeight + "px";

}


// ============================
// CLICK IMAGE TO COUNT
// ============================

imageContainer.addEventListener("click", function (event) {

    // Only count when the actual image is clicked

    if (event.target !== uploadedImage) {
        return;
    }


    const rect =
        uploadedImage.getBoundingClientRect();


    // Position of click INSIDE image

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;


    // Increase count

    count++;


    // Create marker

    const marker =
        document.createElement("div");


    marker.className = "marker";


    // Put number inside marker

    marker.textContent = count;


    // Position marker

    marker.style.left =
        x + "px";

    marker.style.top =
        y + "px";


    // Get marker size

    const markerSizeNumber =
        Number(markerSize.value);


    // Get number size

    const numberSizeNumber =
        Number(numberSize.value);


    // Apply marker size

    marker.style.width =
        markerSizeNumber + "px";

    marker.style.height =
        markerSizeNumber + "px";


    // Apply number size

    marker.style.fontSize =
        numberSizeNumber + "px";


    // Apply color

    marker.style.backgroundColor =
        currentColor;


    // Add marker to page

    markers.appendChild(marker);


    // Save marker

    markerList.push(marker);


    // Update total

    countDisplay.textContent =
        count;

});


// ============================
// MARKER SIZE SLIDER
// ============================

markerSize.addEventListener("input", function () {

    const size =
        Number(markerSize.value);


    // Update text

    markerSizeValue.textContent =
        size + "px";


    // Update every existing marker

    markerList.forEach(function (marker) {

        marker.style.width =
            size + "px";

        marker.style.height =
            size + "px";

    });

});


// ============================
// NUMBER SIZE SLIDER
// ============================

numberSize.addEventListener("input", function () {

    const size =
        Number(numberSize.value);


    // Update text

    numberSizeValue.textContent =
        size + "px";


    // Update numbers on existing markers

    markerList.forEach(function (marker) {

        marker.style.fontSize =
            size + "px";

    });

});


// ============================
// COLOR PICKER
// ============================

colorOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get selected color

        currentColor =
            button.dataset.color;


        // Remove selected from all colors

        colorOptions.forEach(function (option) {

            option.classList.remove("selected");

        });


        // Select clicked color

        button.classList.add("selected");


        // Change existing markers

        markerList.forEach(function (marker) {

            marker.style.backgroundColor =
                currentColor;

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


    // Get last marker

    const lastMarker =
        markerList.pop();


    // Remove it

    lastMarker.remove();


    // Reduce count

    count--;


    // Update total

    countDisplay.textContent =
        count;

});


// ============================
// CLEAR
// ============================

clearButton.addEventListener("click", function () {

    resetCounter();

});


// ============================
// RESET
// ============================

function resetCounter() {

    // Reset count

    count = 0;


    countDisplay.textContent =
        "0";


    // Remove all markers

    markerList.forEach(function (marker) {

        marker.remove();

    });


    markerList = [];


    // Reset marker size

    markerSize.value = 20;

    markerSizeValue.textContent =
        "20px";


    // Reset number size

    numberSize.value = 12;

    numberSizeValue.textContent =
        "12px";

}


// ============================
// DRAG & DROP IMAGE
// ============================

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.style.borderColor =
        "#635bff";

});


uploadArea.addEventListener("dragleave", function () {

    uploadArea.style.borderColor =
        "";

});


uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();


    uploadArea.style.borderColor =
        "";


    const file =
        event.dataTransfer.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert("Please drop an image file.");

        return;
    }


    const imageURL =
        URL.createObjectURL(file);


    uploadedImage.src =
        imageURL;


    uploadArea.style.display =
        "none";


    workspace.style.display =
        "block";


    resetCounter();

});
```
