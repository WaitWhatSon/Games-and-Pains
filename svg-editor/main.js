import {initButtons} from "./buttons/_init.js"
import {initMouse} from "./mouse/_init.js"
import {initSave} from "./file/save.js"
import {initLoad} from "./file/load.js"


window.addEventListener('load', () => 
{
    initButtons();
    initMouse();

    initSave();
    initLoad();
});

