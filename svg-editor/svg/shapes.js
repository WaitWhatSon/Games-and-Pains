import config from "./config.js"

const svgns = "http://www.w3.org/2000/svg";
const board = document.getElementById("board");

let lastId = 0;

function makeLine()
{
    var line = document.createElementNS(svgns, 'line');
    line.setAttribute('id', 'line'+(lastId++));
    line.setAttribute('x1', config.x1);
    line.setAttribute('y1', config.y1);
    line.setAttribute('x2', config.x2);
    line.setAttribute('y2', config.y2);
    line.setAttribute("stroke", config.stroke);
    line.setAttribute("stroke-width", config.stroke_width);
    board.appendChild(line);
    return line;
}

function makeRectangle()
{
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id', 'rect'+(lastId++));
    rect.setAttribute('x', config.x);
    rect.setAttribute('y', config.y);
    rect.setAttribute('width', config.width);
    rect.setAttribute('height', config.height);
    rect.setAttribute("stroke", config.stroke);
    rect.setAttribute("stroke-width", config.stroke_width);
    rect.setAttribute("fill", config.fill);
    board.appendChild(rect);
    return rect;
}

function makeCircle()
{
    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttribute('id', 'circle'+(lastId++));
    circle.setAttribute('cx', config.cx);
    circle.setAttribute('cy', config.cy);
    circle.setAttribute('r', config.r);
    circle.setAttribute("stroke", config.stroke);
    circle.setAttribute("stroke-width", config.stroke_width);
    circle.setAttribute("fill", config.fill);
    board.appendChild(circle);
    return circle;
}

export {makeLine, makeRectangle, makeCircle};