import config from "../svg/config.js"
import editConfig from "./editConfig.js"

import {removeInputsEvents} from "../inputs/edit.js"
import {board} from "./consts.js"

export default function unselectShape(){
    if(editConfig.frame)
    {
        board.removeChild(editConfig.frame); 
        editConfig.frame = null;
    }
    if(editConfig.startPoint)
    {
        board.removeChild(editConfig.startPoint); 
        editConfig.startPoint = null;
    }
    if(editConfig.endPoint)
    {
        board.removeChild(editConfig.endPoint); 
        editConfig.endPoint = null;
    }
    removeInputsEvents();
    config.currentShape = null;
}