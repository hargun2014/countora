const imageInput =
    document.getElementById("imageInput");

const uploadButton =
    document.getElementById("uploadButton");

const uploadArea =
    document.getElementById("uploadArea");

const workspace =
    document.getElementById("workspace");

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

const numberSize =
    document.getElementById("numberSize");

const numberSizeValue =
    document.getElementById("numberSizeValue");

const colorOptions =
    document.querySelectorAll(".color-option");


let count = 0;

let markerList = [];

let currentColor = "#4f46e5";


// ============================
// UPLOAD IMAGE
// ============================

uploadButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        imageInput.click();
    }
);


uploadArea.addEventListener(
    "click",
    function () {

        imageInput.click();
    }
);


imageInput.addEventListener(
    "change",
    function () {

        const file =
            imageInput.files[0];

        if (!file) return;
