import { shape, svg, controls } from "../configs/config.js"
import makeRotatePointDraggable from "../draggable/rotation_point_draggable.js";
import makeScalePointDraggable from "../draggable/scale_point_draggable.js";
import makeZeroPointDraggable from "../draggable/zero_point_draggable.js";
import circle_svg from "../svg/circle.js";
import { translate } from "../transformations/translate.js";

function draw_scale_points()
{
    if(shape.current === null)
    {
        return;
    }

    let point = {   x: shape.current.list[0].x, 
                    y: shape.current.list[0].y     };

    const margin = 100;
    
    let zero_point = circle_svg(point.x, point.y, "zero_point", "#000000");
    controls.point_zero = zero_point;

    let scale_point = circle_svg(point.x+margin, point.y, "scale_point", "#00ff00");
    controls.point_scalable = scale_point;

    makeZeroPointDraggable(zero_point, scale_point);
    makeScalePointDraggable(scale_point, zero_point);

}

function draw_rotate_points()
{
    if(shape.current === null)
    {
        return;
    }

    let point = {   x: shape.current.list[0].x, 
                    y: shape.current.list[0].y     };

    const margin = 100;
    
    let zero_point = circle_svg(point.x, point.y, "zero_point", "#000000");
    controls.point_zero = zero_point;

    let rotate_point = circle_svg(point.x+margin, point.y, "rotate_point", "#ff0000");
    controls.point_rotation = rotate_point;

    makeZeroPointDraggable(zero_point, rotate_point);
    makeRotatePointDraggable(rotate_point, zero_point);
}

function remove_points()
{
    if(shape.current === null)
    {
        return;
    }

    if(controls.point_zero != null)
    {
        controls.point_zero.parentNode.removeChild(controls.point_zero);
        controls.point_zero = null;
    }

    if(controls.point_scalable != null)
    {
        controls.point_scalable.parentNode.removeChild(controls.point_scalable);
        controls.point_scalable = null;
    }

    if(controls.point_rotation != null)
    {
        controls.point_rotation.parentNode.removeChild(controls.point_rotation);
        controls.point_rotation = null;
    }
}

function move_points(translation)
{
    let point = {   x: controls.point_zero.getAttribute('cx'), 
                    y: controls.point_zero.getAttribute('cy')       };
    let new_point = translate(point, translation);

    point = {       x: controls.point_scalable.getAttribute('cx'), 
                    y: controls.point_scalable.getAttribute('cy')   };
    let new_point_scalable = translate(point, translation);

    point = {       x: controls.point_rotation.getAttribute('cx'), 
                    y: controls.point_rotation.getAttribute('cy')   };
    let new_point_rotation = translate(point, translation);

    controls.point_zero.setAttributeNS(null, 'cx', new_point.x);
    controls.point_zero.setAttributeNS(null, 'cy', new_point.y);
    
    controls.point_scalable.setAttributeNS(null, 'cx', new_point_scalable.x);
    controls.point_scalable.setAttributeNS(null, 'cy', new_point_scalable.y);
    
    controls.point_rotation.setAttributeNS(null, 'cx', new_point_rotation.x);
    controls.point_rotation.setAttributeNS(null, 'cy', new_point_rotation.y);
}

export {draw_scale_points, draw_rotate_points, remove_points, move_points}