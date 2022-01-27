import config_bezier from "../config/config_bezier.js";

export default function bezier_draw(plist, points, ctx)
{
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = config_bezier.lineWidth;
    ctx.lineCap = "round";

    ctx.moveTo(plist[0].x, plist[0].y);

    for (let i = 0; i < points.length; i++)
    {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.stroke();
    ctx.closePath();

}