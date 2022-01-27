import { translate } from "../transformations/translate.js";
import { shape } from "../configs/config.js"
import { parse_list_to_path } from "../parser/parse_list_to_path.js";

export default function init_translation()
{
    const x_label = document.getElementById("translate_x");

    const y_label = document.getElementById("translate_y");

    document.getElementById("translation_do").addEventListener("click", function(){
        if(shape.current != null)
        {
            let delta_x = x_label.value;
            let delta_y = y_label.value;

            if(isNaN(delta_x) || isNaN(delta_y))
            {
                return;
            }

            let translation = {x: delta_x, y: delta_y};

            for(let i = 0; i < shape.current.list.length; i++)
            {
                let point = {x: shape.current.list[i].x, y: shape.current.list[i].y};
                let new_point = translate(point, translation);
                shape.current.list[i] = new_point;
            }

            let d = parse_list_to_path(shape.current.list);
            shape.current.setAttributeNS(null, 'd', d);
        }
    });

}