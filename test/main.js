const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let start_background = "white";
let ctx = canvas.getContext("2d");
ctx.fillStyle = start_background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

var check = true;

//insert text 
function enterText(){
    // alert("hello");
    // alert(check);
    if(check === false){
        check = true;
    }else if(check === true){
        check = false;
        
    }
    // alert(check);
    if(check === false){
        var mouseX = 0;
        var mouseY = 0;
        var startingX = 0;

        var recentWords = [];
        var undoList = [];

        function saveState(){
            undoList.push(canvas.toDataURL());
        }

        saveState();

        function undo(){
            undoList.pop();
            var imgData = undoList[undoList.length - 1];
            var image = new Image();

            image.src = imgData;
            image.onload = function (){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            }
        }

        canvas.addEventListener("click", function (e) {
            // alert("clicked");
            // mouseX = e.pageX - canvas.offsetLeft;
            // mouseY = e.pageY - canvas.offsetTop;
            mouseX = e.clientX - canvas.offsetLeft;
            mouseY = e.clientY - canvas.offsetTop;
            startingX = mouseX;


            recentWords = [];
            return false;
            // e.preventDefault();

        }, false);

        document.addEventListener("keydown", function (e){
            // alert("keypressed")
            // alert(e.key)
            ctx.font = "16px Arial";

            if(e.key === "Backspace"){
                undo();
                var recentWord = recentWords[recentWords.length - 1];
                mouseX -= ctx.measureText(recentWord).width;
                recentWords.pop();

            }else if (e.key === "Enter"){
                mouseX = startingX;
                mouseY += 20;
            }else{
                 
                ctx.strokeText(e.key, mouseX, mouseY);
                // alert("fill");
                mouseX += ctx.measureText(e.key).width;
                saveState();
                recentWords.push(e.key);
            }
            // ctx.fillText(e.key, mouseX, mouseY);
           

            
        }, false);
    }
    // alert(check);
}



// drawing board

    // alert(check);
    let draw_color = "black";
    let draw_width = "5";
    let erase_width = "50";
    let is_drawing = false;

    let store = [];
    let restore = [];
    let index = -1;

    function change_color(element){
        // draw_color = element.style.background;
        start_background = element.style.background;
        ctx.fillStyle = start_background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
// check = false;
function pencil(){
    if(check === true){
        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);


        function start(e) {
            is_drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            e.preventDefault();

        }

        function draw(e) {
            if(is_drawing){
                ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
                ctx.strokeStyle = draw_color;
                ctx.linewidth = 50;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }

        function stop(e){
            if(is_drawing){
                ctx.stroke();
                ctx.closePath();
                is_drawing = false;

            }
            e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
    }
}

function eraser(){
        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);


        function start(e) {
            is_drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            e.preventDefault();

        }

        function draw(e) {
            if(is_drawing){
                ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.strokeStyle = start_background;
                console.log(start_background);
                ctx.linewidth = erase_width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }

        function stop(e){
            if(is_drawing){
                ctx.stroke();
                ctx.closePath();
                is_drawing = false;

            }
            e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
}

function clear_canvas(){
    ctx.fillStyle = start_background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    store = [];
    index = -1;
}

function undo_last(){
    let tmp;
    if(index <= 0){
        clear_canvas();

    }else{
        index -= 1;
        tmp = store.pop();
        restore.push(tmp);
        ctx.putImageData(store[index], 0, 0);
    }

}
function redo_last(){
    let a;
    if(index == store.length){
        clear_canvas();

    }else{
        index += 1;
        a = restore.pop();
        store.push(a);
        ctx.putImageData(store[index], 0, 0);
    }

}