import config from "../svg/config.js"

let x_edit = document.getElementById("x_edit");
let y_edit = document.getElementById("y_edit");
let width_edit = document.getElementById("width_edit");
let height_edit = document.getElementById("height_edit");

const margin = 10;

export default function initRectangleInputs(frame, startPoint, endPoint)
{
    x_edit.value = config.currentShape.getAttribute("x");
    x_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        let width = parseFloat(config.currentShape.getAttribute("width"));
        config.currentShape.setAttribute("x", value);
        frame.setAttribute("x", value - margin);
        startPoint.setAttribute("cx", value - margin);
        endPoint.setAttribute("cx", value + width + margin);
    });

    y_edit.value = config.currentShape.getAttribute("y");
    y_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        let height = parseFloat(config.currentShape.getAttribute("height"));
        config.currentShape.setAttribute("y", value);
        frame.setAttribute("y", value - margin);
        startPoint.setAttribute("cy", value - margin);
        endPoint.setAttribute("cy", value + height + margin);
    });

    width_edit.value = config.currentShape.getAttribute("width");
    width_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        if(value < 0)
        {
            width_edit.value = config.currentShape.getAttribute("width");
            return;
        }
        let x = parseFloat(config.currentShape.getAttribute("x"));
        config.currentShape.setAttribute("width", value);
        frame.setAttribute("width", value + 2*margin);
        endPoint.setAttribute("cx", x + value + margin);
    });

    height_edit.value = config.currentShape.getAttribute("height");
    height_edit.addEventListener("change", e => {
        let value = parseFloat(e.target.value);
        if(value < 0)
        {
            height_edit.value = config.currentShape.getAttribute("height");
            return;
        }
        let y = parseFloat(config.currentShape.getAttribute("y"));
        config.currentShape.setAttribute("height", value);
        frame.setAttribute("height", value + 2*margin);
        endPoint.setAttribute("cy", y + value + margin);
    });
}