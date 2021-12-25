import config from "../svg/config.js"

export default function initStyle()
{
    document.getElementById("stroke").addEventListener('change', (event) => {
        config.stroke = event.target.value;
        if(config.currentShape != null)
        {
            config.currentShape.setAttribute("stroke", event.target.value);
        }
    });

    document.getElementById("fill").addEventListener('change', (event) => {
        config.fill = event.target.value;
        if(config.currentShape != null)
        {
            config.currentShape.setAttribute("fill", event.target.value);
        }
    });
}