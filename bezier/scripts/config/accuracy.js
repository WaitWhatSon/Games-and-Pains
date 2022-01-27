import { draw } from "../bezier/draw.js";
import config_bezier from "./config_bezier.js";

export default function init_accuracy()
{
    document.getElementById("accuracy_input").addEventListener("change", function(){
        
        config_bezier.accuracy = parseFloat(this.value);
        draw();

    });
}