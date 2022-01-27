// import makeDraggable from "./draggable.js";

var svgns = "http://www.w3.org/2000/svg";

export default function circle_svg(x, y, id, color)
{
    let svg = document.getElementById("svg");

    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r',  5);
    circle.setAttributeNS(null, 'id', id);

    circle.setAttributeNS(null, 'fill', color+"55");
    circle.setAttributeNS(null, 'stroke', color);
    circle.setAttributeNS(null, 'stroke-width', "3px");

    svg.appendChild(circle);

    // makeDraggable(circle);

    return circle;
}
