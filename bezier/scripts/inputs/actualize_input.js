export default function actualize_input(point)
{
    let inputX = document.getElementById("x" + point.id);
    let inputY = document.getElementById("y" + point.id);
    
    inputX.value = point.x;
    inputY.value = point.y;
}