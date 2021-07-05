let canvas = document.getElementById('art-board');
let pen = document.getElementById('pen-tool');
let eraser = document.getElementById('eraser-tool');
let clear = document.getElementById('clear');
let colorPicker = document.getElementById('colorpicker-tool');
let paintBucket = document.getElementById('paint-tool');
let lineTool = document.getElementById('line-tool');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineCap = 'round';
ctx.lineWidth = 2;

let makeBgWhite = function () {
    ctx.fillStyle = '#ffffff';
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
let posX, posY;

makeBgWhite();

let drawColor = "black";
colorPicker.value = "black";

let lastX = 0,
    lastY = 0;
let isMouseDown = false;


function pencilColor(){
    drawColor = colorPicker.value;
    console.log(drawColor);
    ctx.strokeStyle = drawColor;
}

let paintBucketFill = () =>{
    ctx.fillStyle = drawColor;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(ctx.fillStyle)
}


canvas.addEventListener('mousedown', (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    posX = e.offsetX;
    posY = e.offsetY;
    isMouseDown = true;
});

canvas.addEventListener('mouseup', (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    posX = e.offsetX;
    posY = e.offsetY;
    isMouseDown = false;
});

canvas.addEventListener('mouseenter', (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
});



//! Controls

pen.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = drawColor;
    
    ctx.lineWidth = 3;
    console.log("Pen in Action");
});
eraser.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'white';
    console.log("Eraser in Action");
});

paintBucket.addEventListener('click', (e) =>{
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintBucketFill();
});

lineTool.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath(); 

   ctx.moveTo(posX, posY);
    ctx.lineTo(posX, posY);
  ctx.stroke();
});

clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeBgWhite();
});



//Instractions
const openButton = document.getElementById('open');
const modalContainer = document.getElementById('modal_container')
// const closeButton = document.getElementById('close');

openButton.addEventListener('click', () => {
    modalContainer.classList.toggle('show');
});

// closeButton.addEventListener('click', () => {
//     modalContainer.classList.toggle('show');
// });