import { draw } from "../bezier/draw.js";
import plist from "../config/points_list.js";
import draw_circle_svg from "../dragg/svg_circle.js";
import list_div from "../config/list_div.js";
import edit_point_input from "./edit_point_input.js";
import recalculate_indices_add from "./recalculate_indices_add.js";
import recalculate_indices_delete from "./recalculate_indices_delete.js";
import point_new_point from "../dragg/point_new_point.js";

export default function add_point_inputs(point, next_div)
{
    let div = document.createElement("div");
    div.id = "row" + point.id;

    let id_div = document.createElement("div");
    id_div.id        = "p" + point.id;
    id_div.innerHTML = point.id;

    let labelX = document.createElement("span");
    labelX.innerHTML = " x: ";

    let inputX = document.createElement("input");
    inputX.type     = "number";
    inputX.id       = "x" + point.id;
    inputX.value    = point.x;

    let labelY = document.createElement("span");
    labelY.innerHTML = " y: ";

    let inputY = document.createElement("input");
    inputY.type     = "number";
    inputY.id       = "y" + point.id;
    inputY.value    = point.y;

    let add = document.createElement("button");
    add.id = "add" + point.id;
    add.innerHTML = "add before";

    let remove = document.createElement("button");
    remove.id = "remove" + point.id;
    remove.innerHTML = "remove";

    div.appendChild(id_div);
    div.appendChild(labelX);
    div.appendChild(inputX);
    div.appendChild(labelY);
    div.appendChild(inputY);
    div.appendChild(add);
    div.appendChild(remove);

    // at index
    if(next_div != null)
    {
        list_div.list.insertBefore(div, next_div);
    }
    // at the end
    else
    {
        list_div.list.appendChild(div);
    }

    inputX.addEventListener("change", function()
    {
        let id = parseInt(this.id.slice(1));
        edit_point_input(id, "x", this);
    });

    inputY.addEventListener("change", function()
    {
        let id = parseInt(this.id.slice(1));
        edit_point_input(id, "y", this);
    });

    add.addEventListener("click", function()
    {
        let id = parseInt(this.id.slice(3));
        let index = plist.findIndex(p => p.id === id);

        if(index > -1)
        {
            // recalculate indices
            recalculate_indices_add(id);
            let element = point_new_point(id);
            // add new point to array
            plist.splice(index, 0, element);
            // if not last element
            if(id+1 <= plist.length-1)
            {
                let next = document.getElementById("row" + (id+1));
                add_point_inputs(element, next);
            }
            else
            {
                add_point_inputs(element);
            }
            // add circle
            draw_circle_svg(element.x, element.y, element.id);
            // redraw curve
            draw();
        }
    });

    remove.addEventListener("click", function()
    {
        let id = parseInt(this.id.slice(6));
        let index = plist.findIndex(p => p.id === id);
        if(index > -1)
        {
            // remove from array
            plist.splice(index, 1);
            // remove circle
            document.getElementById(id).remove();
            // remove row
            document.getElementById("row" + id).remove();
            // recalculate indices
            recalculate_indices_delete(id);
            // redraw curve
            draw();
        }
    });

    div.addEventListener("mouseover", function()
    {
        document.getElementById(point.id).setAttribute("r", 10);
    });

    div.addEventListener("mouseleave", function()
    {
        document.getElementById(point.id).setAttribute("r", 5);
    });
}