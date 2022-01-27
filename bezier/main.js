import {init_draw} from "./scripts/bezier/draw.js";
import init_minimalize from "./scripts/config/minimalize.js";
import init_dragging from "./scripts/dragg/dragging.js";
import init_html_list from "./scripts/config/html_list.js";
import init_accuracy from "./scripts/config/accuracy.js";
import init_width from "./scripts/config/width.js";
import init_grid from "./scripts/config/grid.js";


window.onload = function(){

    init_minimalize();
    init_draw();
    init_dragging();
    init_html_list();
    init_accuracy();
    init_width();
    init_grid();

}