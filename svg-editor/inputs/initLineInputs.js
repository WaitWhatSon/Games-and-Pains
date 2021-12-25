import config from "../svg/config.js"

let x1_edit = document.getElementById("x1_edit");
let y1_edit = document.getElementById("y1_edit");
let x2_edit = document.getElementById("x2_edit");
let y2_edit = document.getElementById("y2_edit");

export default function initLineInputs(frame, startPoint, endPoint)
{
    x1_edit.value = config.currentShape.getAttribute("x1");
    x1_edit.addEventListener("change", e => {
        let value = e.target.value;
        config.currentShape.setAttribute("x1", value);
        frame.setAttribute("x1", value);
        startPoint.setAttribute("cx", value);
    });

    y1_edit.value = config.currentShape.getAttribute("y1");
    y1_edit.addEventListener("change", e => {
        let value = e.target.value;
        config.currentShape.setAttribute("y1", value);
        frame.setAttribute("y1", value);
        startPoint.setAttribute("cy", value);
    });

    x2_edit.value = config.currentShape.getAttribute("x2");
    x2_edit.addEventListener("change", e => {
        let value = e.target.value;
        config.currentShape.setAttribute("x2", value);
        frame.setAttribute("x2", value);
        endPoint.setAttribute("cx", value);
    });

    y2_edit.value = config.currentShape.getAttribute("y2");
    y2_edit.addEventListener("change", e => {
        let value = e.target.value;
        config.currentShape.setAttribute("y2", value);
        frame.setAttribute("y2", value);
        endPoint.setAttribute("cy", value);
    });
}