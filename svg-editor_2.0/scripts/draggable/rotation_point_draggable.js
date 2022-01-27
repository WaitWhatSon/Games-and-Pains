import { shape, mouse, tools, svg } from "../configs/config.js";
import { translate } from "../transformations/translate.js";
import { rotate } from "../transformations/rotate.js";
import { parse_list_to_path } from "../parser/parse_list_to_path.js";

export default function makeRotatePointDraggable(rotate_point, zero_point) 
{
    rotate_point.setAttribute("class","draggable");

    rotate_point.addEventListener('mousemove', dragg);
    rotate_point.addEventListener('mousedown', select_to_dragg);
    rotate_point.addEventListener('mouseup', unselect);

    rotate_point.addEventListener('mouseover', resize);
    rotate_point.addEventListener('mouseout', resize2);

    // svg.addEventListener('mouseover', unselect);
    // svg.addEventListener('click', unselect);
    
    function select_to_dragg()
    {
        if(tools.tool === "rotate")
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

            let rotate_point_point = {x: this.getAttribute("cx"), y: this.getAttribute("cy")}; 
            let point = translate(rotate_point_point, translation);
            
            this.setAttributeNS(null, 'cx', point.x);
            this.setAttributeNS(null, 'cy', point.y);

            // calculate angle:

            let zero_point_x = parseFloat(zero_point.getAttribute("cx"));
            let zero_point_y = parseFloat(zero_point.getAttribute("cy"));

            // poprzedni kąt
            let last_r = Math.sqrt(((zero_point_x-mouse.prev_x)**2)+((zero_point_y-mouse.prev_y)**2));
            let last_y = zero_point_y-mouse.prev_y;
            let last_sin = last_y/last_r;

            // console.log("last_sin: " + last_sin);
            
            let last_angle = Math.asin(last_sin) * 180 / Math.PI;

            if(zero_point_x-mouse.prev_x > 0)
            {
                last_angle = 180 - last_angle;
            }

            // console.log(last_angle);
            
            // aktualny kąt
            let current_r = Math.sqrt(((zero_point_x-mouse.x)**2)+((zero_point_y-mouse.y)**2));
            let current_y = zero_point_y-mouse.y;
            let current_sin = current_y/current_r;

            // console.log("current_sin: " + current_sin);
            
            let current_angle = Math.asin(current_sin) * 180 / Math.PI;

            if(zero_point_x-mouse.x > 0)
            {
                current_angle = 180 - current_angle;
            }

            // console.log(current_angle);

            // kąt do rotacji
            let delta_angle = last_angle - current_angle;

            // console.log("delta_angle " + delta_angle);

            let rotate_point = {x: zero_point_x, y: zero_point_y}

            rotate_figure(rotate_point, delta_angle);

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

    function rotate_figure(rotate_point, angle)
    {
        for(let i = 0; i < shape.current.list.length; i++)
        {
            let new_x = shape.current.list[i].x - rotate_point.x;
            let new_y = shape.current.list[i].y - rotate_point.y;
            let point = {x: new_x, y: new_y};
            let new_point = rotate(point, angle);

            new_x = new_point.x + rotate_point.x;
            new_y = new_point.y + rotate_point.y;
            shape.current.list[i] = {x: new_x, y: new_y};
        }

        let d = parse_list_to_path(shape.current.list);
        shape.current.setAttributeNS(null, 'd', d);
    }
}