import percent_black from "../binarization/percent_black.js";
import { grayscale2 } from "../filters/grayscale.js";
import { update_histogram } from "../histogram/start_histogram.js";
import closing from "./closing.js";
import dilation from "./dilation.js";
import erosion from "./erosion.js";
import hit_or_miss from "./hit_or_miss.js";
import K3M from "./k3m.js";
import opening from "./opening.js";
import { structuring_element_init } from "./structuring_element.js";
import thickening from "./thickening.js";
import thinning from "./thinning.js";

export default function init_morphology()
{
    structuring_element_init();

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let image_copy = [];

    document.getElementById("morphology_grayscale").addEventListener("click", function(){
        make_copy();
        let data = grayscale2(canvas, 100);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("morphology_binarization").addEventListener("click", function(){
        make_copy();
        let data = percent_black(canvas, 50);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("morphology_undo").addEventListener("click", function(){
        if(image_copy.length > 0)
        {
            ctx.putImageData(image_copy.pop(), 0, 0);
            update_histogram();
        }
    });

    document.getElementById("dilation_button").addEventListener("click", function(){
        make_copy();
        let data = dilation(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("erosion_button").addEventListener("click", function(){
        make_copy();
        let data = erosion(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("opening_button").addEventListener("click", function(){
        make_copy();
        let data = opening(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("closing_button").addEventListener("click", function(){
        make_copy();
        let data = closing(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("hit_or_miss_button").addEventListener("click", function(){
        make_copy();
        let data = hit_or_miss(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("hit_or_miss_thinning_button").addEventListener("click", function(){
        make_copy();
        let data = thinning(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("hit_or_miss_thickening_button").addEventListener("click", function(){
        make_copy();
        let data = thickening(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    document.getElementById("K3M_button").addEventListener("click", function(){
        make_copy();
        let data = K3M(canvas);
        ctx.putImageData(data, 0, 0);
        update_histogram();
    });

    function make_copy()
    {
        let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
        image_copy.push(data_original);
    }
}