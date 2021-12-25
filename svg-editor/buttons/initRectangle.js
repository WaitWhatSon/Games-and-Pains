import config from "../svg/config.js"
import serialize from "../svg/list.js"
import {makeRectangle} from "../svg/shapes.js"


export default function initCreateRectangle()
{
    document.getElementById("x").addEventListener('change', (event) => {
        config.x = event.target.value;
    });

    document.getElementById("y").addEventListener('change', (event) => {
        config.y = event.target.value;
    });
    
    document.getElementById("width").addEventListener('change', (event) => {
        config.width = event.target.value;
    });

    document.getElementById("height").addEventListener('change', (event) => {
        config.height = event.target.value;
    });

    document.getElementById("create_rectangle").addEventListener("click", () => 
    {
        let rect = makeRectangle();
        serialize(rect);
    });
}