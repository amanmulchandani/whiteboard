var canvas = document.getElementById('art-board');

var BlackPen = document.getElementById('pen-tool');
var Rubber = document.getElementById('eraser-tool');
var Clear = document.getElementById('clear');
var Save = document.getElementById('save');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineCap = 'round';
ctx.lineWidth = 2;

var makeBgWhite = function () {
    ctx.fillStyle = '#ffffff';
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

makeBgWhite();

var lastX = 0,
    lastY = 0;
var isMouseDown = false;

// Download utility function
var download = function () {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('board').toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

canvas.addEventListener('mousedown', (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    isMouseDown = true;
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
BlackPen.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    console.log("writing");
});
Rubber.addEventListener('click', (e) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'rgba(255,255,255,1)';
});

Clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeBgWhite();
});
Save.addEventListener('click', (e) => {
    download();
});