import makeDraggable from "./draggable.js";

var svgns = "http://www.w3.org/2000/svg";

export default function draw_circle_svg(x, y, id)
{
    let svg = document.getElementById("svg");

    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r',  5);
    circle.setAttributeNS(null, 'id', id);
    circle.setAttributeNS(null, 'style', 'fill: #00ff0022; stroke: #00ff00; stroke-width: 3px;' );
    svg.appendChild(circle);

    makeDraggable(circle);
}
