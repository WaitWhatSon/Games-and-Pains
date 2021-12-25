import config from "../svg/config.js"
import serialize from "../svg/list.js"
import {makeCircle} from "../svg/shapes.js"


export default function initCreateCircle()
{
    document.getElementById("cx").addEventListener('change', (event) => {
        config.cx = event.target.value;
    });

    document.getElementById("cy").addEventListener('change', (event) => {
        config.cy = event.target.value;
    });
    
    document.getElementById("r").addEventListener('change', (event) => {
        config.r = event.target.value;
    });

    document.getElementById("create_circle").addEventListener("click", () => 
    {
        let circle = makeCircle();
        serialize(circle);
    });
}