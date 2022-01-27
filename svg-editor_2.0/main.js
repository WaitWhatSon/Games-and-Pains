import {svg, tools} from "./scripts/configs/config.js"
import { init_minimalize } from "./scripts/buttons/minimalize.js"
import {mouse_init} from "./scripts/configs/mouse.js"
import { init_tools_buttons } from "./scripts/buttons/tools.js"

import init_translation from "./scripts/buttons/translation.js"
import init_scale from "./scripts/buttons/scale.js"
import init_rotate from "./scripts/buttons/rotate.js"
import init_files from "./scripts/buttons/files.js"
import init_colors from "./scripts/buttons/colors.js"

window.onload = function(){

    init_minimalize();
    init_tools_buttons();
    init_colors();

    init_translation();
    init_scale();
    init_rotate();

    svg.image = document.getElementById("svg");
    tools.tool = "draw";
    mouse_init();

    init_files();

}