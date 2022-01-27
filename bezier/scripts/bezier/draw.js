import bezier from "./bezier.js";
import bezier_draw from "./bezier_draw.js";
import plist from "../config/points_list.js";
import draw_circle_svg from "../dragg/svg_circle.js";

let canvas;
let ctx;

function init_draw()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var w = window.innerWidth;
    var h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    let points = bezier(plist);

    for (let i = 0; i < plist.length; i++)
    {
        draw_circle_svg(plist[i].x, plist[i].y, plist[i].id);
    }

    bezier_draw(plist, points, ctx);
}

function draw()
{
    if(plist.length < 1)
    {
        return;
    }

    let points = bezier(plist);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bezier_draw(plist, points, ctx);
}


export {init_draw, draw};