import config from "../svg/config.js"
import editConfig from "./editConfig.js"

import {svgns, board, margin} from "./consts.js"


export default function createStartPoint(shape)
{   
    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttribute('id', "startPoint");
    if(config.currentShape.tagName == "line")
    {
        circle.setAttribute('cx', parseFloat(shape.getAttribute("x1")));
        circle.setAttribute('cy', parseFloat(shape.getAttribute("y1")));
    }
    if(config.currentShape.tagName == "rect")
    {
        circle.setAttribute('cx', parseFloat(shape.getAttribute("x")) - margin);
        circle.setAttribute('cy', parseFloat(shape.getAttribute("y")) - margin);
    }
    if(config.currentShape.tagName == "circle")
    {
        circle.setAttribute('cx', shape.getAttribute("cx"));
        circle.setAttribute('cy', shape.getAttribute("cy"));
    }
    circle.setAttribute('r', margin);
    circle.setAttribute("stroke", "#111111");
    circle.setAttribute("stroke-width", 3);
    circle.setAttribute("fill", "#22ff00");
    board.appendChild(circle);

    editConfig.startPoint = circle;
    return circle;
}