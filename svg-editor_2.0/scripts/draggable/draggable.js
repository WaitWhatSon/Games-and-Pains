import { shape, mouse, tools, svg } from "../configs/config.js";
import { translate } from "../transformations/translate.js";
import { parse_list_to_path } from "../parser/parse_list_to_path.js";

export default function make_draggable(element) 
{
    element.setAttribute("class","draggable");

    element.addEventListener('mousemove', dragg);    
    element.addEventListener('mousedown', select_to_dragg);
    element.addEventListener('mouseup', unselect);
    // svg.addEventListener('mouseover', unselect);
    // svg.addEventListener('click', unselect);


    svg.image.addEventListener('click', function(){
        shape.dragged = null;
    })
    
    
    
    function select_to_dragg()
    {
        if(tools.tool === "select" && shape.current === this)
        {
            shape.dragged = this;
            shape.current = this;
        }
    }

    function unselect() 
    {
        if(tools.tool != "draw" && shape.current === this)
        {
            shape.dragged = null;
        }
    }


    function dragg()
    {
        if(this === shape.dragged && tools.tool != "draw" &&
            mouse.x != null && mouse.y != null && 
            mouse.prev_x != null && mouse.prev_y != null)
        {
            let delta_x = mouse.x - mouse.prev_x;
            let delta_y = mouse.y - mouse.prev_y;

            let translation = {x: delta_x, y: delta_y};

            for(let i = 0; i < element.list.length; i++)
            {
                let point = translate(element.list[i], translation);
                element.list[i] = point;
            }

            let d = parse_list_to_path(element.list);
            element.setAttributeNS(null, 'd', d);
        }
    }
}