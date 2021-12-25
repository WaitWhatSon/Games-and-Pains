import toggle from "./toggle.js"
import config from "../svg/config.js"
import clear from "./clear.js"

function initSelect()
{
    document.getElementById("select").addEventListener("click", () => 
    {
        if(config.currentTool != "select")
        {
            clear();
            toggle("select_fieldset");
            config.currentTool = "select";
        }
    });
}

function initUnselect()
{
    document.getElementById("unselect").addEventListener("click", () => 
    {
        if(config.currentTool == "select")
        {
            clear();
            toggle("unselect_fieldset");
            config.currentTool = "unselect";   
        }
    });
}

export {initSelect, initUnselect}