import toggle from "./toggle.js"
import config from "../svg/config.js"

import initLineInputs from "./initLineInputs.js";
import initRectangleInputs from "./initRectangleInputs.js"
import initCircleInputs from "./initCircleInputs.js";

function initInputsEdit(frame, startPoint, endPoint){

    toggle(config.currentShape);

    if(config.currentShape.tagName == "line")
    {    
        initLineInputs(frame, startPoint, endPoint);
    }

    if(config.currentShape.tagName == "rect")
    {    
        initRectangleInputs(frame, startPoint, endPoint);
    }

    if(config.currentShape.tagName == "circle")
    {    
        initCircleInputs(frame, startPoint, endPoint);
    }

}


let x1_edit     = document.getElementById("x1_edit");
let y1_edit     = document.getElementById("y1_edit");
let x2_edit     = document.getElementById("x2_edit");
let y2_edit     = document.getElementById("y2_edit");

let x_edit      = document.getElementById("x_edit");
let y_edit      = document.getElementById("y_edit");
let width_edit  = document.getElementById("width_edit");
let height_edit = document.getElementById("height_edit");

let cx_edit     = document.getElementById("cx_edit");
let cy_edit     = document.getElementById("cy_edit");
let r_edit      = document.getElementById("r_edit");

let inputsList = 
[
    x1_edit, y1_edit, x2_edit, y2_edit,
    x_edit, y_edit, width_edit, height_edit,
    cx_edit, cy_edit, r_edit,
];

function removeInputsEvents()
{
    for(let input of inputsList)
    {
        input.value = 0;
    }
    toggle(config.currentShape);
}

export {initInputsEdit, removeInputsEvents}