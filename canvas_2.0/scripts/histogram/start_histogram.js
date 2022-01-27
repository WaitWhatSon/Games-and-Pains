import {initHistogram, displayHistogram} from "./histogram.js"

let canvas;
let ctx;
let img;

let svgRED;
let svgGREEN;
let svgBLUE;

let stretching_button;
let equalization_button;

let stretching_all;
let stretching_red;
let stretching_green;
let stretching_blue;

let equalization_all;
let equalization_red;
let equalization_green;
let equalization_blue;

let tolerance;

function createImage(result)
{
    img = new Image();
    img.onload = imageLoaded;
    img.src = result;
}

function imageLoaded()
{
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    canvas.toDataURL("image/png");

    let histogramR = getHistogram(0);
    displayHistogram(histogramR, "#ff0000");

    let histogramG = getHistogram(1);
    displayHistogram(histogramG, "#00ff00");

    let histogramB = getHistogram(2);
    displayHistogram(histogramB, "#0000ff");
}

function getHistogram(channel)
{
    let array = new Array(256).fill(0);

    let data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            array[Math.floor(data.data[y*row + x + channel])] += 1;
        }
    }

    return array;
}

function getMinIndex(array)
{
    for(let i = 0; i < array.length; i++)
    {
        if(array[i] > tolerance.value)
        {
            return i;
        }
    }
    return array.length;
}

function getMaxIndex(array)
{
    for(let i = array.length; i > 0; i--)
    {
        if(array[i] > tolerance.value)
        {
            return i;
        }
    }
    return 0;
}

function histogramStretching(histogram, channel)
{
    let min = getMinIndex(histogram);
    let max = getMaxIndex(histogram);

    let data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data.data[y*row + x + channel] = Math.floor((data.data[y*row + x + channel] - min)/(max - min) * 256);
        }
    }

    ctx.putImageData(data, 0, 0);
}

function get_cumulative_histogram(histogram)
{
    let cumulative_histogram = histogram.map((x)=>x);
    for(let i = 1; i < histogram.length; i++)
    {
        cumulative_histogram[i] += cumulative_histogram[i-1];
    }
    cumulative_histogram = cumulative_histogram.map((x) => Math.floor(255*x/cumulative_histogram[255]));
    return cumulative_histogram;
}

function histogramEqualization(histogram, channel)
{
    let cumulative_histogram = get_cumulative_histogram(histogram);

    let data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data.data[y*row + x + channel] = cumulative_histogram[Math.floor(data.data[y*row + x + channel])];
        }
    }
    
    ctx.putImageData(data, 0, 0);
}


export default function init_histogram()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    stretching_button = document.getElementById("histogram_stretching");
    equalization_button = document.getElementById("histogram_equalization");

    stretching_all = document.getElementById("stretching_all");
    stretching_red = document.getElementById("stretching_r");
    stretching_green = document.getElementById("stretching_g");
    stretching_blue = document.getElementById("stretching_b");

    tolerance = document.getElementById("stretching_tolerance");

    equalization_all = document.getElementById("equalization_all");
    equalization_red = document.getElementById("equalization_r");
    equalization_green = document.getElementById("equalization_g");
    equalization_blue = document.getElementById("equalization_b");

    svgRED = document.getElementById("histogram_svg_R");
    initHistogram(svgRED, "#ff0000");
    svgGREEN = document.getElementById("histogram_svg_G");
    initHistogram(svgGREEN, "#00ff00");
    svgBLUE = document.getElementById("histogram_svg_B");
    initHistogram(svgBLUE, "#0000ff");

    // createImage('./images/lenna.png');
    createImage('./images/temp.png');

    stretching_button.addEventListener("click", function() {
        if(stretching_red.checked || stretching_all.checked)
        {
            let histogram = getHistogram(0);
            histogramStretching(histogram, 0);
            let histogramR = getHistogram(0);
            displayHistogram(histogramR, "#ff0000");
        }
        if(stretching_green.checked || stretching_all.checked)
        {
            let histogram = getHistogram(1);
            histogramStretching(histogram, 1);
            let histogramG = getHistogram(1);
            displayHistogram(histogramG, "#00ff00");
        }
        if(stretching_blue.checked || stretching_all.checked)
        {
            let histogram = getHistogram(2);
            histogramStretching(histogram, 2);
            let histogramB = getHistogram(2);
            displayHistogram(histogramB, "#0000ff");
        }
    })

    equalization_button.addEventListener("click", function() {
        if(equalization_red.checked || equalization_all.checked)
        {
            let histogram = getHistogram(0);
            histogramEqualization(histogram, 0);
            let histogramR = getHistogram(0);
            displayHistogram(histogramR, "#ff0000");
        }
        if(equalization_green.checked || equalization_all.checked)
        {
            let histogram = getHistogram(1);
            histogramEqualization(histogram, 1);
            let histogramG = getHistogram(1);
            displayHistogram(histogramG, "#00ff00");
        }
        if(equalization_blue.checked || equalization_all.checked)
        {
            let histogram = getHistogram(2);
            histogramEqualization(histogram, 2);
            let histogramB = getHistogram(2);
            displayHistogram(histogramB, "#0000ff");
        }
    })
}

export function update_histogram()
{
    let histogramR = getHistogram(0);
    displayHistogram(histogramR, "#ff0000");

    let histogramG = getHistogram(1);
    displayHistogram(histogramG, "#00ff00");

    let histogramB = getHistogram(2);
    displayHistogram(histogramB, "#0000ff");
}