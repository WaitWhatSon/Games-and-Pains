import config from "../svg/config.js"

let cx_edit = document.getElementById("cx_edit");
let cy_edit = document.getElementById("cy_edit");
let r_edit = document.getElementById("r_edit");

const margin = 10;

export default function initCircleInputs(frame, startPoint, endPoint)
{
    cx_edit.value = config.currentShape.getAttribute("cx");
    cx_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        let radius = parseFloat(config.currentShape.getAttribute("r"));

        config.currentShape.setAttribute("cx", value);
        startPoint.setAttribute("cx", value);
        frame.setAttribute("cx", value);

        endPoint.setAttribute("cx", parseFloat(config.currentShape.getAttribute("cx")) + radius + margin);
        endPoint.setAttribute("cy", parseFloat(config.currentShape.getAttribute("cy")));
    });

    cy_edit.value = config.currentShape.getAttribute("cy");
    cy_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        let radius = parseFloat(config.currentShape.getAttribute("r"));

        config.currentShape.setAttribute("cy", value);
        startPoint.setAttribute("cy", value);
        frame.setAttribute("cy", value);

        endPoint.setAttribute("cx", parseFloat(config.currentShape.getAttribute("cx")) + radius + margin);
        endPoint.setAttribute("cy", parseFloat(config.currentShape.getAttribute("cy")));
    });

    r_edit.value = config.currentShape.getAttribute("r");
    r_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        if(value < 0)
        {
            width_edit.value = config.currentShape.getAttribute("r");
            return;
        }
        config.currentShape.setAttribute("r", value);
        frame.setAttribute("r", value + margin);
                
        endPoint.setAttribute("cx", parseFloat(config.currentShape.getAttribute("cx")) + value + margin);
        endPoint.setAttribute("cy", parseFloat(config.currentShape.getAttribute("cy")));
    });
}