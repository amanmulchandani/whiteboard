let canvas = document.getElementById('art-board');
let pen = document.getElementById('pen-tool');
let eraser = document.getElementById('eraser-tool');
let clear = document.getElementById('clear');
let colorPicker = document.getElementById('colorpicker-tool');
let paintBucket = document.getElementById('paint-tool');
// let Save = document.getElementById('save');
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


makeBgWhite();

let drawColor = "black";
colorPicker.value = "black";

let lastX = 0,
    lastY = 0;
let isMouseDown = false;

// Download utility function
let download = function () {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('board').toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

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
    isMouseDown = true;
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

canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});

//! Controls

pen.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = drawColor;
    
    ctx.lineWidth = 1;
    console.log("Pen in Action");
});
eraser.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'white';
    console.log("Eraser in Action");
});

paintBucket.addEventListener('click', (e) =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintBucketFill();
});

clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeBgWhite();
});

// Save.addEventListener('click', (e) => {
//     download();
// });