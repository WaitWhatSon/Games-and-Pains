import { shape, mouse, tools, svg } from "../configs/config.js";
import { translate } from "../transformations/translate.js";

export default function makeZeroPointDraggable(zero_point, control_point) 
{
    zero_point.setAttribute("class","draggable");

    zero_point.addEventListener('mousemove', dragg);
    zero_point.addEventListener('mousedown', select_to_dragg);
    zero_point.addEventListener('mouseup', unselect);

    zero_point.addEventListener('mouseover', resize);
    zero_point.addEventListener('mouseout', resize2);

    // svg.addEventListener('mouseover', unselect);
    // svg.addEventListener('click', unselect);
    
    function select_to_dragg()
    {
        if(tools.tool === "scale" || tools.tool === "rotate")
        {
            shape.dragged = this;
        }
    }

    function unselect() 
    {
        shape.dragged = null;
    }


    function dragg()
    {
        if(this === shape.dragged &&
            mouse.x != null && mouse.y != null && 
            mouse.prev_x != null && mouse.prev_y != null)
        {
            let delta_x = mouse.x - mouse.prev_x;
            let delta_y = mouse.y - mouse.prev_y;

            let translation = {x: delta_x, y: delta_y};

            let zero_point_point = {x: zero_point.getAttribute("cx"), y: zero_point.getAttribute("cy")}; 
            let point = translate(zero_point_point, translation);
            
            this.setAttributeNS(null, 'cx', point.x);
            this.setAttributeNS(null, 'cy', point.y);

            let control_point_point = {x: control_point.getAttribute("cx"), y: control_point.getAttribute("cy")}; 
            point = translate(control_point_point, translation);
            control_point.setAttributeNS(null, 'cx', point.x);
            control_point.setAttributeNS(null, 'cy', point.y);
        }
    }

    function resize()
    {
        this.setAttributeNS(null, 'r', 15);
    }

    function resize2()
    {
        this.setAttributeNS(null, 'r', 5);
    }
}