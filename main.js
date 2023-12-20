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
    let isTwoPoints = pointA != null && pointB != null
    if (isTwoPoints) {
        var pixels = bresenham(pointA, pointB)
    }

    if (dashed) {
        let removeIndices = []
        for (let i = 0; i < pixels.length; i++) {
            let gapLength = (thickness+3)
            if (i % gapLength == 0)
            {
                for (let j=0; j<gapLength;j++)
                {
                    removeIndices.push(i+j);
                }
                i += gapLength+1;
            }
        }

        let counter = 0
        removeIndices.forEach((index) => {
            pixels.splice(index-counter, 1)
            counter++
        })
    }

    // draw pixels
    if (isTwoPoints) {
        ctx.fillStyle = "black";
        pixels.forEach(([x, y]) => {
            ctx.fillRect(x-Math.floor((thickness-1)/2),
                         y-Math.floor((thickness-1)/2), thickness, thickness);
        })
    }

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