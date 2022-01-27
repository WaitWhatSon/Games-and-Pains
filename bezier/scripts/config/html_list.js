import plist from "./points_list.js";
import list_div from "./list_div.js";
import add_point_inputs from "../inputs/add_point_inputs.js"

export default function init_html_list()
{
    list_div.list = document.getElementById("points_list");

    for(let i = 0; i < plist.length; i++)
    {
        add_point_inputs(plist[i]);
    }
}