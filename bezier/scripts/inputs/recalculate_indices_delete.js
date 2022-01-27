import plist from "../config/points_list.js"

export default function recalculate_indices_delete(id)
{
    for(let i = id; i < plist.length; i ++)
    {
        plist[i].id--;

        let p = document.getElementById("p" + (i + 1));
        p.id  = "p" + (i);
        p.innerHTML = (i);

        document.getElementById("row" + (i + 1)).id       = "row"     + (i);
        document.getElementById("x" + (i + 1)).id         = "x"       + (i);
        document.getElementById("y" + (i + 1)).id         = "y"       + (i);
        document.getElementById("add" + (i + 1)).id       = "add"     + (i);
        document.getElementById("remove" + (i + 1)).id    = "remove"  + (i);
        // circle
        document.getElementById(i + 1).id  = i;
    }
}