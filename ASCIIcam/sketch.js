const density = "809435271+-.   ";

let video;

function setup() {

    if(windowWidth > windowHeight) // horizontal
    {
        createCanvas(0.9*windowHeight, 0.9*windowHeight);
    }
    else
    {
        createCanvas(0.9*windowWidth, 0.9*windowWidth);
    }

    video = createCapture(VIDEO);
    video.size(40, 40);
    video.hide();
}

function draw()
{
    background(0);
    let w = width / video.width;
    let h = height / video.height;

    video.loadPixels();

    for(let j = 0; j < video.height; j++)
    {
        for (let i = 0; i < video.width; i++)
        {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, len, 0));
            
            let c = density.charAt(charIndex);
            
            noStroke();
            fill(255);

            textSize(w);
            textAlign(CENTER, CENTER);
            text(c, i * w + w * 0.5, j * h + h * 0.5);
        }
    }
}