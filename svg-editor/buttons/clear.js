import toggle from "./toggle.js"
import unselectShape from "../edit/unselectShape.js";
import config from "../svg/config.js"

export default function clear()
{
    toggle(config.currentTool + "_fieldset");
    config.currentShape = null;
    unselectShape();
}
