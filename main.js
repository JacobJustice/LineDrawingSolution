let DRAWPOINTS = true; // change to false if you don't want pointA and pointB to be drawn
// --------------------- DO NOT EDIT BELOW ---------------------
var pointA = null;
var pointB = null;
var updatePointA = true;
var ctx = canvas.getContext("2d", {willReadFrequently: true});
canvas = document.getElementById('canvas');

canvas.addEventListener("click", function(event) {
    // update point positions
    let x = event.offsetX;
    let y = event.offsetY;
    if (updatePointA) {
        pointA = [x, y];
    }
    else {
        pointB = [x, y]
    }
    updatePointA = !updatePointA;
    // clear canvas and draw points
    clearAndDraw()
})

function clearAndDraw()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let thickness = Number(document.getElementById('thickness').value)
    let dashed = document.getElementById('dashed').checked
// --------------------- DO NOT EDIT ABOVE ---------------------

// Your code goes here!



// --------------------- DO NOT EDIT BELOW ---------------------
    if (DRAWPOINTS) {
        ctx.fillStyle = "red";
        if (pointA != null){ ctx.fillRect(pointA[0]-2,pointA[1]-2, 5, 5); }
        ctx.fillStyle = "green";
        if (pointB != null){ ctx.fillRect(pointB[0]-2,pointB[1]-2, 5, 5); }
        console.log(pointA, pointB);
    }
// --------------------- DO NOT EDIT ABOVE ---------------------
}

function bresenham(pointA, pointB)
{
    // Your code goes here!
    let pixels = []
    
    return pixels;
}