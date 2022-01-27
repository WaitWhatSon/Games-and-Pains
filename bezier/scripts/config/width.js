import config_bezier from "./config_bezier.js";
import { draw } from "../bezier/draw.js";

export default function init_width()
{
    document.getElementById("width_input").addEventListener("change", function(){
        
        config_bezier.lineWidth = parseFloat(this.value);
        draw();

    });
}