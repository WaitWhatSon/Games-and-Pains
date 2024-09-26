import initShapesButtons from "./shapeselect.js" // toolbar

import initCreateLine from "./initLine.js"
import initCreateRectangle from "./initRectangle.js"
import initCreateCircle from "./initCircle.js"

import initStyle from "./initStyle.js"

import { initSelect, initUnselect } from "./initSelectUnselect.js"

function initButtons()
{    
    initShapesButtons();

    initCreateLine();
    initCreateRectangle();
    initCreateCircle();

    initStyle();

    initSelect();
    initUnselect();
}

export {initButtons};