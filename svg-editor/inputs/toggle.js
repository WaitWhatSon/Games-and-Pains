import {on, off} from "./switch.js"

export default function toggleInputs(shape)
{
    off("edit_line");
    off("edit_rectangle");
    off("edit_circle");

    if(shape == null)
    {
        return;
    }
    
    if(shape.tagName == "line")
    {
        on("edit_line");
    }
    if(shape.tagName == "rect")
    {
        on("edit_rectangle");
    }
    if(shape.tagName == "circle")
    {
        on("edit_circle");
    }
}