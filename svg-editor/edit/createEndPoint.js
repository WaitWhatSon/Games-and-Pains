import config from "../svg/config.js"
import editConfig from "./editConfig.js"

import {svgns, board, margin} from "./consts.js"


export default function createEndPoint(shape)
{
    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttribute('id', "startPoint");
    if(config.currentShape.tagName == "line")
    {
        circle.setAttribute('cx', parseFloat(shape.getAttribute("x2")));
        circle.setAttribute('cy', parseFloat(shape.getAttribute("y2")));
    }
    if(config.currentShape.tagName == "rect")
    {
        circle.setAttribute('cx', parseFloat(shape.getAttribute("x")) + parseFloat(shape.getAttribute("width")) + margin);
        circle.setAttribute('cy', parseFloat(shape.getAttribute("y")) + parseFloat(shape.getAttribute("height")) + margin);
    }
    if(config.currentShape.tagName == "circle")
    {
        circle.setAttribute('cx', parseFloat(shape.getAttribute("cx")) + parseFloat(shape.getAttribute("r")) + margin);
        circle.setAttribute('cy', shape.getAttribute("cy"));
    }
    circle.setAttribute('r', margin);
    circle.setAttribute("stroke", "#111111");
    circle.setAttribute("stroke-width", 3);
    circle.setAttribute("fill", "#ff2200");
    board.appendChild(circle);

    editConfig.endPoint = circle;
    return circle;
}
