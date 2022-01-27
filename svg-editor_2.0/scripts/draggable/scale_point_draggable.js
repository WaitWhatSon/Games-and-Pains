import { shape, mouse, tools, svg } from "../configs/config.js";
import { translate } from "../transformations/translate.js";
import { scale } from "../transformations/scale.js";
import { parse_list_to_path } from "../parser/parse_list_to_path.js";

export default function makeScalePointDraggable(scale_point, zero_point) 
{
    scale_point.setAttribute("class","draggable");

    scale_point.addEventListener('mousemove', dragg);
    scale_point.addEventListener('mousedown', select_to_dragg);
    scale_point.addEventListener('mouseup', unselect);

    scale_point.addEventListener('mouseover', resize);
    scale_point.addEventListener('mouseout', resize2);

    // svg.addEventListener('mouseover', unselect);
    // svg.addEventListener('click', unselect);
    
    function select_to_dragg()
    {
        if(tools.tool === "scale")
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

            let scale_point_point = {   x: parseFloat(this.getAttribute("cx")), 
                                        y: parseFloat(this.getAttribute("cy"))  }; 
            let point = translate(scale_point_point, translation);
            
            this.setAttributeNS(null, 'cx', point.x);
            this.setAttributeNS(null, 'cy', point.y);

            // calculate scale:

            let zero_point_x = parseFloat(zero_point.getAttribute("cx"));
            let zero_point_y = parseFloat(zero_point.getAttribute("cy"));

            // poprzednia odległość między punktami
            let last_distance = Math.sqrt(((zero_point_x-mouse.prev_x)**2)+((zero_point_y-mouse.prev_y)**2));

            // console.log("last_distance " + last_distance);
            
            // aktualna odległość między punktami
            let current_distance = Math.sqrt(((zero_point_x-mouse.x)**2)+((zero_point_y-mouse.y)**2));

            // console.log("current_distance " + current_distance);

            // skala = aktualna odległość między punktami / poprzednia odległość między punktami

            let scale_size = current_distance/last_distance;

            if(!Number.isFinite(scale_size) || isNaN(scale_size))
            {
                scale_size = 1;
            };

            // console.log("scale " + scale_size);

            let scale_point = {x: zero_point_x, y: zero_point_y}

            scale_figure(scale_point, scale_size);

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


    function scale_figure(scale_point, size)
    {
        for(let i = 0; i < shape.current.list.length; i++)
        {
            let new_x = shape.current.list[i].x - scale_point.x;
            let new_y = shape.current.list[i].y - scale_point.y;
            let point = {x: new_x, y: new_y};
            let new_point = scale(point, {x: size, y: size});

            new_x = new_point.x + scale_point.x;
            new_y = new_point.y + scale_point.y;
            shape.current.list[i] = {x: new_x, y: new_y};
        }

        let d = parse_list_to_path(shape.current.list);
        shape.current.setAttributeNS(null, 'd', d);
    }
}