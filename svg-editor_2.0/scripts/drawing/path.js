import {svg, shape, colors} from "../configs/config.js";
import { parse_list_to_path } from "../parser/parse_list_to_path.js";
import make_selectable from "../draggable/selectable.js";
import make_draggable from "../draggable/draggable.js";

function new_path(start_point)
{
    let path = document.createElementNS(svg.svgns, 'path');
    path.list = [start_point];
    let d = parse_list_to_path(path.list);
    path.setAttributeNS(null, 'd', d);
    path.setAttributeNS(null, 'id', shape.id++);

    path.setAttributeNS(null, 'fill', colors.fill);
    path.setAttributeNS(null, 'stroke', colors.stroke);
    path.setAttributeNS(null, 'stroke-width', "5px");
    
    make_selectable(path);
    make_draggable(path);
    svg.image.appendChild(path);

    shape.current = path;
    return path;
}

function add_point_to_path(point)
{
    shape.current.list.push(point);
    let d = parse_list_to_path(shape.current.list);
    shape.current.setAttributeNS(null, 'd', d);
}

export {new_path, add_point_to_path}