import make_selectable from "../draggable/selectable.js";
import make_draggable from "../draggable/draggable.js"
import { parse_path_to_list } from "../parser/parse_path_to_list.js";
import { svg } from "../configs/config.js"

export default function parse_path(element)
{
    // console.log(element);

    let attributes = [];
    let label = "";
    let attribute = "";

    for(let i = 6; i < element.length-1; i++)
    {
        if(element[i] === " ")
        {
            // do nothing
        }
        else if(label === "")
        {
            while(element[i] != "=")
            {
                label += element[i];
                i++;
            }
        }
        else if(element[i] === "\"")
        {
            i++;
            while(element[i] != "\"")
            {
                attribute += element[i];
                i++;
            }
            attributes.push({attr: label, val: attribute});
            attribute = "";
            label = "";
        }

    }

    let path = document.createElementNS(svg.svgns, 'path');
    for(let attr of attributes)
    {
        path.setAttributeNS(null, attr.attr, attr.val);
        if(attr.attr === "d")
        {
            let list = parse_path_to_list(attr.val);
            path.list = list;
        }
    }
    make_selectable(path);
    make_draggable(path);
    svg.image.appendChild(path);
}