import config from "../svg/config.js"
import serialize from "../svg/list.js"
import {makeLine} from "../svg/shapes.js"

export default function initCreateLine()
{
    document.getElementById("x1").addEventListener('change', (event) => {
        config.x1 = event.target.value;
    });

    document.getElementById("y1").addEventListener('change', (event) => {
        config.y1 = event.target.value;
    });

    document.getElementById("x2").addEventListener('change', (event) => {
        config.x2 = event.target.value;
    });

    document.getElementById("y2").addEventListener('change', (event) => {
        config.y2 = event.target.value;
    });

    document.getElementById("create_line").addEventListener("click", () => 
    {
        let line = makeLine();
        serialize(line);
    });
}