const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");
const uploadArea = document.getElementById("uploadArea");
const workspace = document.getElementById("workspace");

const uploadedImage =
    document.getElementById("uploadedImage");

const imageContainer =
    document.getElementById("imageContainer");

const markers =
    document.getElementById("markers");

const countDisplay =
    document.getElementById("count");

const undoButton =
    document.getElementById("undoButton");

const clearButton =
    document.getElementById("clearButton");

const markerSize =
    document.getElementById("markerSize");

const markerSizeValue =
    document.getElementById("markerSizeValue");

const colorOptions =
    document.querySelectorAll(".color-option");


let count = 0;

let markerList = [];

let currentColor = "#4f46e5";


// ============================
// UPLOAD IMAGE
// ============================

uploadButton.addEventListener("click", function (event) {

    event.stopPropagation();

    imageInput.click();

});


uploadArea.addEventListener("click", function () {

    imageInput.click();

});


imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) return;


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


// ============================
// IMAGE LOADED
// ============================

uploadedImage.addEventListener("load", function () {

    markers.style.width =
        uploadedImage.clientWidth + "px";

    markers.style.height =
        uploadedImage.clientHeight + "px";

});


// ============================
// MANUAL COUNTING
// ============================

imageContainer.addEventListener("click", function (event) {

    if (event.target !== uploadedImage) {
        return;
    }


    const rect =
        uploadedImage.getBoundingClientRect();


    const x =
        event.clientX - rect.left;


    const y =
        event.clientY - rect.top;


    count++;


    const marker =
        document.createElement("div");


    marker.className =
        "marker";


    marker.textContent =
        count;


    marker.style.left =
        x + "px";


    marker.style.top =
        y + "px";


    const size =
        Number(markerSize.value);


    marker.style.width =
        size + "px";


    marker.style.height =
        size + "px";


    marker.style.backgroundColor =
        currentColor;


    markers.appendChild(marker);


    markerList.push(marker);


    countDisplay.textContent =
        count;

});


// ============================
// MARKER SIZE
// ============================

markerSize.addEventListener("input", function () {

    const size =
        Number(markerSize.value);


    markerSizeValue.textContent =
        size + "px";


    markerList.forEach(function (marker) {

        marker.style.width =
            size + "px";


        marker.style.height =
            size + "px";

    });

});


// ============================
// COLOR GRID
// ============================

colorOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        currentColor =
            button.dataset.color;


        colorOptions.forEach(function (option) {

            option.classList.remove("selected");

        });


        button.classList.add("selected");


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


    const lastMarker =
        markerList.pop();


    lastMarker.remove();


    count--;


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

    count = 0;


    countDisplay.textContent =
        "0";


    markerList.forEach(function (marker) {

        marker.remove();

    });


    markerList = [];


    markerSize.value =
        20;


    markerSizeValue.textContent =
        "20px";

}
