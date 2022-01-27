import { scale } from "../transformations/scale.js";
import { shape } from "../configs/config.js"
import { parse_list_to_path } from "../parser/parse_list_to_path.js";
import circle_svg from "../svg/circle.js";

export default function init_scale()
{
    const x_label = document.getElementById("scale_x");

    const y_label = document.getElementById("scale_y");

    const size_label = document.getElementById("scale_size");

    let scale_circle = null;

    document.getElementById("scale_do").addEventListener("click", function(){
        if(shape.current != null)
        {
            let delta_x = parseFloat(x_label.value);
            let delta_y = parseFloat(y_label.value);
            let size = parseFloat(size_label.value);

            // console.log(delta_x + " " + delta_y + " " + size);

            if(isNaN(delta_x) || isNaN(delta_y) || isNaN(size))
            {
                return;
            }

            for(let i = 0; i < shape.current.list.length; i++)
            {
                let new_x = shape.current.list[i].x - delta_x;
                let new_y = shape.current.list[i].y - delta_y;
                let point = {x: new_x, y: new_y};
                let new_point = scale(point, {x: size, y: size});

                new_x = new_point.x + delta_x;
                new_y = new_point.y + delta_y;
                shape.current.list[i] = {x: new_x, y: new_y};
                // console.log(shape.current.list[i]);
            }

            let d = parse_list_to_path(shape.current.list);
            shape.current.setAttributeNS(null, 'd', d);
        }
    });

    document.getElementById("scale_show_point").addEventListener("click", function(){
        if(scale_circle === null)
        {
            let delta_x = parseFloat(x_label.value);
            let delta_y = parseFloat(y_label.value);
            scale_circle = circle_svg(delta_x, delta_y, "circle_scalation", "#00ff00");
        }
        else
        {
            scale_circle.parentNode.removeChild(scale_circle);
            scale_circle = null;
        }
        
    });
}