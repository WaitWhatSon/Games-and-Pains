import { update_histogram } from "../histogram/start_histogram.js";
import threshold from "./threshold.js"
import percent_black from "./percent_black.js"
import mean_iterative from "./mean_iterative.js"
import entropy from "./entropy.js"
import minimum from "./minimum.js"
import fuzzy_minimum from "./fuzzy_minimum.js";
import {grayscale1} from "../filters/grayscale.js"
import niblack from "./niblack.js";
import sauvola from "./sauvola.js";



export default function init_binarization(){

    const grayscale_binarization = document.getElementById("grayscale_binarization");
    const undo_binarization      = document.getElementById("undo_binarization");

    const threshold_button      = document.getElementById("threshold_button");
    const percent_black_button  = document.getElementById("percent_black_button");
    const mean_iterative_button = document.getElementById("mean_iterative_button");
    const entropy_button        = document.getElementById("entropy_button");
    const minimum_button        = document.getElementById("minimum_button");
    const fuzzy_minimum_button  = document.getElementById("fuzzy_minimum_button");

    const threshold_range       = document.getElementById("threshold_range");
    const percent_black_range   = document.getElementById("percent_black_range");

    const niblack_button        = document.getElementById("niblack_button");
    const sauvola_button        = document.getElementById("sauvola_button");

    const window_size           = document.getElementById("binarization_window_range");
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let image_copy = [];

    grayscale_binarization.addEventListener("click", function(){
        make_copy();
        let data = grayscale1(canvas, 100);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    undo_binarization.addEventListener("click", function(){
        if(image_copy.length > 0)
        {
            ctx.putImageData(image_copy.pop(), 0, 0);
            update_histogram();
        }
    });

    threshold_button.addEventListener("click", function(){
        make_copy();
        let data = threshold(canvas, threshold_range.value);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    percent_black_button.addEventListener("click", function(){
        make_copy();
        let data = percent_black(canvas, percent_black_range.value);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    mean_iterative_button.addEventListener("click", function(){
        make_copy();
        let data = mean_iterative(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    entropy_button.addEventListener("click", function(){
        make_copy();
        let data = entropy(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    minimum_button.addEventListener("click", function(){
        make_copy();
        let data = minimum(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    fuzzy_minimum_button.addEventListener("click", function(){
        make_copy();
        let data = fuzzy_minimum(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    niblack_button.addEventListener("click", function(){
        make_copy();
        let data = niblack(canvas, window_size.value);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    sauvola_button.addEventListener("click", function(){
        make_copy();
        let data = sauvola(canvas, window_size.value);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    function make_copy()
    {
        let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
        image_copy.push(data_original);
    }

}

// https://www.olympus-lifescience.com/en/microscope-resource/primer/java/digitalimaging/processing/automaticthresholding/?fbclid=IwAR1RoOqIF1XELpm4UXO8u7oUVJ6_ehqADuzagi28t2AySetIbQw8v9kTinU