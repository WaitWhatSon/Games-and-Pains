import config from "../svg/config.js"
import editConfig from "./editConfig.js"

import {svgns, board, margin} from "./consts.js"


export default function createFrame(shape)
{
    let frame;

    if(config.currentShape.tagName == "line")
    {
        frame = document.createElementNS(svgns, 'line');
    
        frame.setAttribute('x1', parseFloat(shape.getAttribute("x1")));
        frame.setAttribute('y1', parseFloat(shape.getAttribute("y1")));
        frame.setAttribute('x2', parseFloat(shape.getAttribute("x2")));
        frame.setAttribute('y2', parseFloat(shape.getAttribute("y2")));
    }
    if(config.currentShape.tagName == "rect")
    {
        frame = document.createElementNS(svgns, 'rect');
    
        frame.setAttribute('x', parseFloat(shape.getAttribute("x")) - margin);
        frame.setAttribute('y', parseFloat(shape.getAttribute("y")) - margin);
        frame.setAttribute('width', parseFloat(shape.getAttribute("width")) + 2*margin);
        frame.setAttribute('height', parseFloat(shape.getAttribute("height")) + 2*margin);
    }
    if(config.currentShape.tagName == "circle")
    {
        frame = document.createElementNS(svgns, 'circle');
    
        frame.setAttribute('cx', shape.getAttribute("cx"));
        frame.setAttribute('cy', shape.getAttribute("cy"));
        frame.setAttribute('r', parseFloat(shape.getAttribute("r")) + margin);
    }

    frame.setAttribute('id', 'frame');
    frame.setAttribute("stroke", "red");
    frame.setAttribute("stroke-width", "2px");
    frame.setAttribute("stroke-dasharray", "4px");
    frame.setAttribute("fill", "#00000000");
    board.appendChild(frame);

    editConfig.frame = frame;
    return frame;
}