import config from "../svg/config.js"
const margin = 10;

export default function initMouseEdit(frame, startPoint, endPoint){
    let startDragged = false;
    let endDragged = false;
    
    board.addEventListener("mousemove", e => {
        if(startDragged)
        {
            if(config.currentShape.tagName == "line")
            {
                startPoint.setAttribute("cx", config.mouseX);
                startPoint.setAttribute("cy", config.mouseY);

                let width = config.currentShape.getAttribute("x2") - config.currentShape.getAttribute("x1");
                let height = config.currentShape.getAttribute("y2") - config.currentShape.getAttribute("y1");

                endPoint.setAttribute("cx", config.mouseX + width);
                endPoint.setAttribute("cy", config.mouseY + height);

                frame.setAttribute("x1", config.mouseX);
                frame.setAttribute("y1", config.mouseY);

                frame.setAttribute("x2", config.mouseX + width);
                frame.setAttribute("y2", config.mouseY + height);
            
                config.currentShape.setAttribute("x1", config.mouseX);
                config.currentShape.setAttribute("y1", config.mouseY);

                config.currentShape.setAttribute("x2", config.mouseX + width);
                config.currentShape.setAttribute("y2", config.mouseY + height);
            }
            if(config.currentShape.tagName == "rect")
            { 
                startPoint.setAttribute("cx", config.mouseX);
                startPoint.setAttribute("cy", config.mouseY);

                endPoint.setAttribute("cx", config.mouseX + parseFloat(config.currentShape.getAttribute("width")) + 2*margin);
                endPoint.setAttribute("cy", config.mouseY + parseFloat(config.currentShape.getAttribute("height")) + 2*margin);

                frame.setAttribute("x", config.mouseX);
                frame.setAttribute("y", config.mouseY);

                config.currentShape.setAttribute("x", config.mouseX + margin);
                config.currentShape.setAttribute("y", config.mouseY + margin);
            }
            if(config.currentShape.tagName == "circle")
            {
                let x = Math.abs(startPoint.getAttribute("cx") - endPoint.getAttribute("cx"));
                let y = Math.abs(startPoint.getAttribute("cy") - endPoint.getAttribute("cy"));
                
                startPoint.setAttribute("cx", config.mouseX);
                startPoint.setAttribute("cy", config.mouseY);
                
                endPoint.setAttribute("cx", config.mouseX + x);
                endPoint.setAttribute("cy", config.mouseY + y);

                frame.setAttribute("cx", config.mouseX);
                frame.setAttribute("cy", config.mouseY);

                config.currentShape.setAttribute("cx", config.mouseX);
                config.currentShape.setAttribute("cy", config.mouseY);
            }
        }

        if(endDragged)
        {
            if(config.currentShape.tagName == "line")
            {
                endPoint.setAttribute("cx", config.mouseX);
                endPoint.setAttribute("cy", config.mouseY);

                frame.setAttribute("x2", config.mouseX);
                frame.setAttribute("y2", config.mouseY);

                config.currentShape.setAttribute("x2", config.mouseX);
                config.currentShape.setAttribute("y2", config.mouseY);
            }
            if(config.currentShape.tagName == "rect")
            { 
                let width = config.mouseX - parseFloat(config.currentShape.getAttribute("x")) - margin;
                let height = config.mouseY - parseFloat(config.currentShape.getAttribute("y")) - margin;
                
                if(width >= 0)
                {
                    endPoint.setAttribute("cx", config.mouseX);
                    frame.setAttribute("width", width + 2*margin);
                    config.currentShape.setAttribute("width", width);
                }

                if(height >= 0)
                {
                    endPoint.setAttribute("cy", config.mouseY);
                    frame.setAttribute("height", height + 2*margin);
                    config.currentShape.setAttribute("height", height);
                }
            }
            if(config.currentShape.tagName == "circle")
            {
                let x = parseFloat(config.currentShape.getAttribute("cx"));
                let y = parseFloat(config.currentShape.getAttribute("cy"));
                
                let xx = (Math.abs(x-config.mouseX)-margin)*(Math.abs(x-config.mouseX)-margin);
                let yy = (Math.abs(y-config.mouseY)-margin)*(Math.abs(y-config.mouseY)-margin);

                let xxf = (Math.abs(x-config.mouseX))*(Math.abs(x-config.mouseX));
                let yyf = (Math.abs(y-config.mouseY))*(Math.abs(y-config.mouseY));

                let radius = Math.sqrt(xx + yy);
                let frameRadius = Math.sqrt(xxf + yyf);
                
                endPoint.setAttribute("cx", config.mouseX);
                endPoint.setAttribute("cy", config.mouseY);

                frame.setAttribute("r", frameRadius);
                config.currentShape.setAttribute("r", radius);

            }
        }
    });

    startPoint.addEventListener("mousedown", e => {
        if(config.currentShape != null)
        {
            startDragged = true;
        }
    });

    endPoint.addEventListener("mousedown", e => {
        if(config.currentShape != null)
        {
            endDragged = true;
        }
    });

    startPoint.addEventListener("mouseup", e => {

        if(config.currentShape != null)
        {
            startDragged = false;
        }
    });

    endPoint.addEventListener("mouseup", e => {

        if(config.currentShape != null)
        {
            endDragged = false;
        }
    });

}