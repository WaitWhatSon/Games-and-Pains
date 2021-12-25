import toggle from "./toggle.js"
import config from "../svg/config.js"
import clear from "./clear.js"

export default function initShapesButtons() 
{
    initLineButton();
    initRectangleButton();
    initCircleButton();
}


function initLineButton()
{
    document.getElementById("line").addEventListener("click", () => 
    {
        if(config.currentTool != "line")
        {
            clear();
            toggle("line_fieldset");
            config.currentTool = "line";
        }
    });
}

function initRectangleButton()
{
    document.getElementById("rectangle").addEventListener("click", () => 
    {
        if(config.currentTool != "rectangle")
        {
            clear();
            toggle("rectangle_fieldset");
            config.currentTool = "rectangle";
        }
    });
}

function initCircleButton()
{
    document.getElementById("circle").addEventListener("click", () => 
    {
        if(config.currentTool != "circle")
        {
            clear();
            toggle("circle_fieldset");
            config.currentTool = "circle";
        }
    });
}