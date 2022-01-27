import { add_point_to_path, new_path } from "../drawing/path.js";
import { svg, mouse, shape, tools } from "./config.js";

function mouse_init() {

    svg.image.onmousemove = function(event)
    {
        mouse.prev_x = mouse.x;
        mouse.prev_y = mouse.y;

        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }

    svg.image.onmousedown = function(event){

        if(mouse.last_click_x === null)
        {
            mouse.last_click_x = event.pageX;
            mouse.last_click_y = event.pageY;

            // console.log(mouse.last_click_x + " " + mouse.last_click_y);
        }

        if(shape.current === null)
        {
            if(tools.tool === "draw")
            {
                shape.current = new_path({x: mouse.x, y: mouse.y});
            }
            return;
        }
        else
        {
            if(tools.tool === "draw")
            {
                add_point_to_path({x: mouse.x, y: mouse.y});
            }
        }
    }

    svg.image.onmouseup = function(event){
        mouse.last_click_x = null;
        mouse.last_click_y = null;
    }

    svg.image.ondblclick = function(event){
        if(shape.current != null)
        {
            if(tools.tool === "draw")
            {
                add_point_to_path({x: mouse.x, y: mouse.y});
                shape.current = null;
            }
            return;
        }
    }

}

export {mouse_init}