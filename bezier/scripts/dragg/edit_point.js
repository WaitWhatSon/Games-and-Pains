import { draw } from "../bezier/draw.js";
import actualize_input from "../inputs/actualize_input.js"
import plist from "../config/points_list.js";

export default function edit_point(point)
{
    let id = point.getAttribute("id");
    let index = plist.findIndex(p => p.id === parseInt(id));

    let x_point = parseInt(point.getAttribute("cx"));
    let y_point = parseInt(point.getAttribute("cy"));

    plist[index].x = x_point;
    plist[index].y = y_point;

    actualize_input(plist[index]);

    draw();
}