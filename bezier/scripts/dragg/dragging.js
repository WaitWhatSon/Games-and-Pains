import config_svg from "../config/config_svg.js";
import edit_point from "./edit_point.js";

export default function init_dragging()
{
    document.addEventListener('mousemove', drag);

    function drag(event)
    {
        if(config_svg.selected)
        {
            let x = event.pageX;
            let y = event.pageY;

            config_svg.element.setAttributeNS(null, 'cx', x);
            config_svg.element.setAttributeNS(null, 'cy', y);

            edit_point(config_svg.element);
        }
    }
}