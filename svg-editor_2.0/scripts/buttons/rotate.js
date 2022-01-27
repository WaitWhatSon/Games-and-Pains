import { rotate } from "../transformations/rotate.js";
import { shape } from "../configs/config.js"
import { parse_list_to_path } from "../parser/parse_list_to_path.js";
import circle_svg from "../svg/circle.js";

export default function init_rotate()
{
    const x_label = document.getElementById("rotate_x");

    const y_label = document.getElementById("rotate_y");

    const angle_label = document.getElementById("rotate_angle");

    let rotation_circle = null;

    document.getElementById("rotation_do").addEventListener("click", function(){
        if(shape.current != null)
        {
            let delta_x = parseFloat(x_label.value);
            let delta_y = parseFloat(y_label.value);
            let angle = parseFloat(angle_label.value);

            if(isNaN(delta_x) || isNaN(delta_y) || isNaN(angle))
            {
                return;
            }

            for(let i = 0; i < shape.current.list.length; i++)
            {
                let new_x = shape.current.list[i].x - delta_x;
                let new_y = shape.current.list[i].y - delta_y;
                let point = {x: new_x, y: new_y};
                let new_point = rotate(point, -angle);

                new_x = new_point.x + delta_x;
                new_y = new_point.y + delta_y;
                shape.current.list[i] = {x: new_x, y: new_y};
                // console.log(shape.current.list[i]);
            }

            let d = parse_list_to_path(shape.current.list);
            shape.current.setAttributeNS(null, 'd', d);
        }
    });

    document.getElementById("rotation_show_point").addEventListener("click", function(){
        if(rotation_circle === null)
        {
            let delta_x = parseFloat(x_label.value);
            let delta_y = parseFloat(y_label.value);
            rotation_circle = circle_svg(delta_x, delta_y, "circle_rotation", "#ff0000");
        }
        else
        {
            rotation_circle.parentNode.removeChild(rotation_circle);
            rotation_circle = null;
        }
        
    });
}