import config from "../svg/config.js"
import initMouseEdit from "../mouse/edit.js"
import {initInputsEdit} from "../inputs/edit.js"

import unselectShape from "./unselectShape.js"

import editConfig from "./editConfig.js"

import createFrame from "./createFrame.js"
import createStartPoint from "./createStartPoint.js"
import createEndPoint from "./createEndPoint.js"


export default function selectShape(element){
    unselectShape();
    config.currentTool = "select";
    config.currentShape = element.shape;
    editConfig.frame = createFrame(element.shape);
    editConfig.startPoint = createStartPoint(element.shape);
    editConfig.endPoint = createEndPoint(element.shape);
    initMouseEdit(editConfig.frame, editConfig.startPoint, editConfig.endPoint);
    initInputsEdit(editConfig.frame, editConfig.startPoint, editConfig.endPoint);
}