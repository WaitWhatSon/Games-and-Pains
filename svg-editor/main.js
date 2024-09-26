import {initButtons} from "./buttons/b_init.js"
import {initMouse} from "./mouse/m_init.js"
import {initSave} from "./file/save.js"
import {initLoad} from "./file/load.js"


window.addEventListener('load', () => 
{
    initButtons();
    initMouse();

    initSave();
    initLoad();
});

