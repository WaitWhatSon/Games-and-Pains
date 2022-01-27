import { shape, tools } from "../configs/config.js";
import { draw_scale_points, draw_rotate_points, remove_points } from "../drawing/controls.js";

function init_tools_buttons()
{
    document.getElementById("select_button").addEventListener('click', function(){
        tools.tool = "select"
        remove_points();
    });

    document.getElementById("unselect_button").addEventListener('click', function(){
        remove_points();
        tools.tool = null;
        shape.current = null;
    });
    
    document.getElementById("draw_button").addEventListener('click', function(){
        tools.tool = "draw"
        remove_points();
    });

    document.getElementById("scale_points_button").addEventListener('click', function(){
        remove_points();
        if(tools.tool == "scale")
        {
            tools.tool = null;
        }
        else
        {
            tools.tool = "scale";
            if(shape.current != null)
            {
                // console.log("scale");
                draw_scale_points();
            }
        }
    });

    document.getElementById("rotate_points_button").addEventListener('click', function(){
        remove_points();
        if(tools.tool == "rotate")
        {
            tools.tool = null;
        }
        else
        {
            tools.tool = "rotate";
            if(shape.current != null)
            {
                // console.log("rotate");
                draw_rotate_points();
            }
        }
    });
}

export {init_tools_buttons}