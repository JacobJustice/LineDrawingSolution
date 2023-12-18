let DRAWPOINTS = true; // change to false if you don't want pointA and pointB to be drawn
var pointA = null;
var pointB = null;
var updatePointA = true;
var ctx = canvas.getContext("2d", {willReadFrequently: true});
canvas = document.getElementById('canvas');

canvas.addEventListener("click", function(event) {
    // update points
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
    if (DRAWPOINTS) {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "red";
        if (pointA != null){ ctx.fillRect(pointA[0]-2,pointA[1]-2, 5, 5); }
        ctx.fillStyle = "green";
        if (pointB != null){ ctx.fillRect(pointB[0]-2,pointB[1]-2, 5, 5); }
        console.log(pointA, pointB);
    }

    // draw lines
    if (pointA != null && pointB != null) {
        if (document.getElementById('solid').checked) {
            var pixels = bresenham(pointA, pointB)
        }
        else {
            var pixels = bresenham(pointA, pointB);
        }
    }

    ctx.fillStyle = "black";
    pixels.forEach(([x, y]) => {
        ctx.fillRect(x, y, 1, 1);
    })
    
})

function convertPixel(i)
{
    let x = (i/4)%canvas.width
    let y = Math.floor((i/4)/canvas.width)
    return [x,y]
}

function bresenham(pointA, pointB)
{
    let [x0, y0] = pointA;
    let [x1, y1] = pointB;
    const pixels = [];
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        pixels.push([ x0, y0]);

        if (x0 === x1 && y0 === y1) {
            break;
        }

        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    return pixels;
}