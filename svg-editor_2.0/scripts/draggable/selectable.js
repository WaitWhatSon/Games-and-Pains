import { shape, tools } from "../configs/config.js";
import { remove_points } from "../drawing/controls.js";

export default function make_selectable(svg) 
{
    svg.addEventListener('mousedown', select);

    // svg.addEventListener('mouseup', unselect);
    
    // svg.addEventListener('mouseover', unselect);
    
    
    function select()
    {
        if(tools.tool === "select")
        {
            if(shape.current != null)
            {
                unselect();
            }
            shape.current = this;
        }
    }

    function unselect() 
    {
        if(tools.tool != "draw" && shape.current!=null)
        {
            shape.current = null;
        }
    }

}