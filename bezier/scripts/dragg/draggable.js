import config_svg from "../config/config_svg.js";

export default function makeDraggable(svg) 
{
    // set class
    svg.setAttribute("class","draggable");

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mouseup', endDrag);
    // svg.addEventListener('mouseleave', endDrag);

    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchend', endDrag);
    // svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

    
    function startDrag()
    {
        config_svg.selected = true;
        config_svg.element = svg;
    }

    function endDrag() 
    {
        config_svg.selected = false;
        config_svg.element = null;
    }

}




















// let elem = evt.target;
//     let selectedElement = false;

//     elem.addEventListener('mousedown', startDrag);
//     elem.addEventListener('mousemove', drag);
//     elem.addEventListener('mouseup', endDrag);
//     elem.addEventListener('mouseleave', endDrag);

//     function startDrag(evt) 
//     {
//         if (evt.target.classList.contains('draggable')) 
//         {
//             selectedElement = evt.target;
//         }
//       }

//     function drag(evt) 
//     {
//         if (selectedElement) 
//         {
//             evt.preventDefault();
//             let dragX = evt.clientX;
//             let dragY = evt.clientY;
//             selectedElement.setAttributeNS(null, "x", dragX);
//             selectedElement.setAttributeNS(null, "y", dragY);
//         }
//       }

//     function endDrag(evt) 
//     {
//         selectedElement = null;
//     }
