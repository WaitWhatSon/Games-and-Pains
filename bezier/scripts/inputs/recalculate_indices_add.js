import plist from "../config/points_list.js";

export default function recalculate_indices_add(id)
{
    for(let i = plist.length-1; i >= id ; i --)
    {
        plist[i].id++;
        let new_id = plist[i].id;

        let p = document.getElementById("p" + (i));
        p.id  = "p" + (new_id);
        p.innerHTML = new_id;

        document.getElementById("row" + i).id       = "row"     + (new_id);
        document.getElementById("x" + i).id         = "x"       + (new_id);
        document.getElementById("y" + i).id         = "y"       + (new_id);
        document.getElementById("add" + i).id       = "add"     + (new_id);
        document.getElementById("remove" + i).id    = "remove"  + (new_id);
        // circle
        document.getElementById(i).id  = (new_id);
    }
}