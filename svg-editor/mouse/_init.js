import config from "../svg/config.js"
import serialize from "../svg/list.js"
import {makeLine, makeRectangle, makeCircle} from "../svg/shapes.js"

const board = document.getElementById("board");

function initMouse(){
    document.addEventListener("mousemove", e => {
        var rect = board.getBoundingClientRect();
        config.mouseX = e.clientX - rect.left;
        config.mouseY = e.clientY - rect.top;

        if(config.currentShape != null)
        {
            if(config.currentTool == "line")
            {
                config.currentShape.setAttribute('x2', config.mouseX);
                config.currentShape.setAttribute('y2', config.mouseY);
            }
            if(config.currentTool == "rectangle")
            {
                let width = config.mouseX - config.x;
                let height = config.mouseY - config.y;
                if(width < 0)
                {
                    let x = config.x - -width;
                    config.currentShape.setAttribute('x', x);
                }
                if(height < 0)
                {
                    let y = config.y - -height;
                    config.currentShape.setAttribute('y', y);
                }
                config.currentShape.setAttribute('width', Math.abs(width));
                config.currentShape.setAttribute('height', Math.abs(height));
            }
            if(config.currentTool == "circle")
            {
                let xx = (config.mouseX - config.cx)*(config.mouseX - config.cx);
                let yy = (config.mouseY - config.cy)*(config.mouseY - config.cy);
                let r = Math.sqrt(xx + yy);
                config.currentShape.setAttribute('r', r);
            }
        }
    });

    board.addEventListener("mousedown", e => {
        if(config.currentShape == null)
        {
            if(config.currentTool == "line")
            {
                config.x1 = config.mouseX; config.y1 = config.mouseY;
                config.x2 = config.mouseX; config.y2 = config.mouseY;
                config.currentShape = makeLine();
            }
            if(config.currentTool == "rectangle")
            {
                config.x = config.mouseX;  config.y = config.mouseY;
                config.width = 0;   config.height = 0;
                config.currentShape = makeRectangle();
            }
            if(config.currentTool == "circle")
            {
                config.cx = config.mouseX; config.cy = config.mouseY;
                config.r = 0;
                config.currentShape = makeCircle();
            } 
        }
    });

    board.addEventListener("mouseup", e => {
        if (config.currentShape != null && config.currentTool != "select") {
            serialize(config.currentShape);
            config.currentShape = null;
        }
    });

}

export {initMouse}