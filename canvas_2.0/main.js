import filter from "./scripts/filters/filter.js"
import filterHSV from "./scripts/filters/filterHSV.js"
import buttons from "./scripts/controls/buttons.js"
import {add, subtract, multiply, divide} from "./scripts/filters/simple.js"
import {grayscale1, grayscale2, grayscale3,
        grayscale4, grayscale5, grayscale6,
        grayscale7, grayscale8} from "./scripts/filters/grayscale.js"
import filterWin from "./scripts/filters/filterWin.js"
import {smoothing, median, sobel, sharpening, blur} from "./scripts/filters/mask.js"
import get_gaussian_kernel from "./scripts/filters/gaussian.js"

import toolbox_init from './scripts/controls/toolbox.js'
import resize_init from './scripts/controls/resize.js'
import images_init from './scripts/controls/images.js'

import custom_mask_init from './scripts/filters/customMask.js'
import init_histogram from "./scripts/histogram/start_histogram.js"
import {update_histogram} from "./scripts/histogram/start_histogram.js"

import init_binarization from "./scripts/binarization/init.js"
import init_morphology from "./scripts/morphology.js/init.js"

let add_sub_value = 1;
let mul_div_value = 1;

let brightness_factor = 1;
let saturation_factor = 1;

let sobel_direction = "edges";

let grayscale_option = "grayscale1";
let grayscale_value = 100;


// ---------- IMAGE LOADING ------------------
const file_input = document.getElementById("file_input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img;

file_input.addEventListener("change", imageLoad)


function imageLoad()
{
    let file = file_input.files[0];
    let fr = new FileReader();
    fr.onload = function() 
    {
        createImage(fr.result);
    }
    fr.readAsDataURL(file); 
}

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
    update_histogram();
}

// --------- filters buttons ------------
buttons.add.addEventListener("click", function(){
    let data = filter(canvas, add, parseInt(add_sub_value));
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.substract.addEventListener("click", function(){
    let data = filter(canvas, subtract, parseInt(add_sub_value));
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.multiply.addEventListener("click", function(){
    let data = filter(canvas, multiply, parseInt(mul_div_value));
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.divide.addEventListener("click", function(){
    if(parseInt(mul_div_value) === 0)
    {
        alert("division by zero impossible");
        return;
    }
    let data = filter(canvas, divide, parseInt(mul_div_value));
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

// ----------------------------------------
buttons.add_subtract_range.addEventListener("change", function(){
    buttons.add_subtract_number.value = this.value;
    add_sub_value = this.value;
});

buttons.add_subtract_number.addEventListener("change", function(){
    buttons.add_subtract_range.value = this.value;
    add_sub_value = this.value;
});

buttons.multiply_divide_range.addEventListener("change", function(){
    buttons.multiply_divide_number.value = this.value;
    mul_div_value = this.value;
});

buttons.multiply_divide_number.addEventListener("change", function(){
    buttons.multiply_divide_range.value = this.value;
    mul_div_value = this.value;
});

// --------- brightness buttons ------------
buttons.brightness.addEventListener("click", function(){
    let data = filterHSV(canvas, 1, parseFloat(brightness_factor));
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

// ----------------------------------------
buttons.brightness_range.addEventListener("change", function(){
    buttons.brightness_number.value = this.value;
    brightness_factor = this.value;
});

buttons.brightness_number.addEventListener("change", function(){
    buttons.brightness_range.value = this.value;
    brightness_factor = this.value;
});

// --------- saturation buttons ------------
buttons.saturation.addEventListener("click", function(){
    let data = filterHSV(canvas, parseFloat(saturation_factor), 1);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

// ----------------------------------------
buttons.saturation_range.addEventListener("change", function(){
    buttons.saturation_number.value = this.value;
    saturation_factor = this.value;
});

buttons.saturation_number.addEventListener("change", function(){
    buttons.saturation_range.value = this.value;
    saturation_factor = this.value;
});

// ------------ greyscale -----------------
buttons.grayscale_range.addEventListener("change", function(){
    buttons.grayscale_number.value = this.value;
    grayscale_value = parseFloat(this.value);
});

buttons.grayscale_number.addEventListener("change", function(){
    buttons.grayscale_range.value = this.value;
    grayscale_value = parseFloat(this.value);
});

buttons.grayscale_button.addEventListener("click", function(){
    let data;
    switch (grayscale_option) {
        case "grayscale1":
            data = grayscale1(canvas, grayscale_value);
            break;
        case "grayscale2":
            data = grayscale2(canvas, grayscale_value);
            break;
        case "grayscale3":
            data = grayscale3(canvas, grayscale_value);
            break;
        case "grayscale2":
            data = grayscale4(canvas, grayscale_value);
            break;
        case "grayscale5":
            data = grayscale5(canvas, grayscale_value);
            break;
        case "grayscale6":
            data = grayscale6(canvas, grayscale_value);
            break;
        case "grayscale7":
            data = grayscale7(canvas, grayscale_value);
            break;
        case "grayscale8":
            data = grayscale8(canvas, grayscale_value);
            break;
        default:
            data = grayscale1(canvas, grayscale_value);
            break;
    }
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.grayscale1.addEventListener("click", function(){
    grayscale_option = "grayscale1";
});

buttons.grayscale2.addEventListener("click", function(){
    grayscale_option = "grayscale2";
});

buttons.grayscale3.addEventListener("click", function(){
    grayscale_option = "grayscale3";
});

buttons.grayscale4.addEventListener("click", function(){
    grayscale_option = "grayscale4";
});

buttons.grayscale5.addEventListener("click", function(){
    grayscale_option = "grayscale5";
});

buttons.grayscale6.addEventListener("click", function(){
    grayscale_option = "grayscale6";
});

buttons.grayscale7.addEventListener("click", function(){
    grayscale_option = "grayscale7";
});

buttons.grayscale8.addEventListener("click", function(){
    grayscale_option = "grayscale8";
});



// ------------- filters ----------------
buttons.smoothing.addEventListener("click", function(){
    let data = filterWin(canvas, 3, smoothing, null);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.median.addEventListener("click", function(){
    let data = filterWin(canvas, 3, median, null);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.sobel_h.addEventListener("click", function(){
    sobel_direction = "horizontal";
});

buttons.sobel_v.addEventListener("click", function(){
    sobel_direction = "vertical";
});

buttons.sobel_e.addEventListener("click", function(){
    sobel_direction = "edges";
});

buttons.sobel.addEventListener("click", function(){
    let sobelFilter;
    if(sobel_direction === "vertical")
    {
        sobelFilter = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    }
    else if(sobel_direction === "horizontal")
    {
        sobelFilter = [-1, -2, -1, 0, 0, 0, 1, 2, 1]; 
    }
    else if(sobel_direction === "edges")
    {
        sobelFilter = [-1, -2, -1, 0, 0, 0, 1, 2, 1]; 
        let data_h = filterWin(canvas, 3, sobel, sobelFilter);
        sobelFilter = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        let data_v = filterWin(canvas, 3, sobel, sobelFilter);
        for(let i = 0; i < data_h.data.length; i++)
        {
            data_h.data[i] = (data_h.data[i] + data_v.data[i])/2
        }
        ctx.putImageData(data_h, 0, 0);
        return;
    }
    let data = filterWin(canvas, 3, sobel, sobelFilter);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.sharpening.addEventListener("click", function(){
    let data = filterWin(canvas, 3, sharpening, null);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});

buttons.blur.addEventListener("click", function(){
    let win_size = 3;
    let sigma = 10;
    let mask = get_gaussian_kernel(sigma, win_size);

    let data = filterWin(canvas, win_size, blur, mask);
    ctx.putImageData(data, 0, 0);
    update_histogram();
});


// --------------------
window.onload = function()
{
    toolbox_init();
    resize_init();
    images_init();
    custom_mask_init();
    init_histogram();
    init_binarization();
    init_morphology();
}
