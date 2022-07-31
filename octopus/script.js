let elements_happy = [];
let elements_angry = [];

let svg;
let svgDoc;

let size;

let pageWidth;
let pageHeight;

let last_angle = 180


window.onload = function() {

    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;

    if(pageHeight < pageWidth){
        size = 0.5 * pageHeight;
    }
    else{
        size = 0.5 * pageWidth;
    }

    document.getElementById("content").style.width = size+"px";
    document.getElementById("content").style.height = size+"px";

    document.getElementById("hitbox").style.width = size+"px";
    document.getElementById("hitbox").style.height = size+"px";

    load_happy();
    load_angry();

    document.getElementById("content").style.position = "absolute";
    document.getElementById("content").style.top = "50%";
    document.getElementById("content").style.left = "50%";
    document.getElementById("content").style.transform = "translate(-50%, -50%)";

    document.getElementById("hitbox").style.position = "absolute";
    document.getElementById("hitbox").style.top = "50%";
    document.getElementById("hitbox").style.left = "50%";
    document.getElementById("hitbox").style.transform = "translate(-50%, -50%)";

    // computer events
    document.addEventListener("click", change_octopus);

    onmousemove = function(e){
        on_move(e);
    }

    // mobile events
    document.addEventListener("touchstart", change_octopus);
    
    ontouchmove = function(e){
        on_touch_move(e);
    }
}

function on_move(e){
    angle = Math.round(Math.atan(e.clientX/e.clientY) * 4 * 180 / Math.PI);
    angle = 0.01*angle + 0.99*last_angle;
    last_angle = angle;

    if(document.getElementById("octopus_happy").style.display == "block")
    {
        change_happy(angle)
    }
    else
    {
        change_angry(angle)
    }
}

function on_touch_move(e){
    angle = Math.round(Math.atan(e.touches[0].clientX/e.touches[0].clientY) * 4 * 180 / Math.PI);
    angle = 0.01*angle + 0.99*last_angle;
    last_angle = angle;

    if(document.getElementById("octopus_happy").style.display == "block")
    {
        change_happy(angle)
    }
    else
    {
        change_angry(angle)
    }
}

function change_octopus()
{
    if(document.getElementById("octopus_happy").style.display == "block")
    {
        svg = document.getElementById("octopus_happy");
        svg.style.display = "none";
        svg = document.getElementById("octopus_angry");
        svg.style.display = "block";
    }
    else
    {
        svg = document.getElementById("octopus_happy");
        svg.style.display = "block";
        svg = document.getElementById("octopus_angry");
        svg.style.display = "none";
    }
    
    last_angle = (last_angle + 180)%360;
    document.body.style.backgroundColor = "hsl(" + (last_angle) + ", 100%, 50%)";
    
}

function change_happy(angle)
{
    for(let element of elements_happy)
    {
        let rgb = element.style.fill;
        rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
        let hsl = rgb2hsl(rgb[0], rgb[1], rgb[2]);
        element.style.fill = "hsl(" + angle + "," + hsl[1] + "%," + hsl[2] + "%)";
    }
    document.body.style.backgroundColor = "hsl(" + (angle+180) + ", 100%, 50%)";
}

function change_angry(angle)
{
    for(let element of elements_angry)
    {
        let rgb = element.style.fill;
        rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
        let hsl = rgb2hsl(rgb[0], rgb[1], rgb[2]);
        element.style.fill = "hsl(" + (angle + 180) + "," + hsl[1] + "%," + hsl[2] + "%)";
    }
    document.body.style.backgroundColor = "hsl(" + (angle) + ", 100%, 50%)";
}


// https://www.30secondsofcode.org/js/s/rgb-to-hsl
function rgb2hsl(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
}


function load_happy()
{
    svg = document.getElementById("octopus_happy");
    svg.width = size + "px";
    svgDoc = svg.contentDocument;

    path_1 = svgDoc.getElementById("path_1");
    path_2_0 = svgDoc.getElementById("path_2_0");
    path_2_1 = svgDoc.getElementById("path_2_1");
    path_3_0 = svgDoc.getElementById("path_3_0");
    path_3_1 = svgDoc.getElementById("path_3_1");
    path_3_2 = svgDoc.getElementById("path_3_2");
    path_3_3 = svgDoc.getElementById("path_3_3");

    elements_happy.push(path_1);
    elements_happy.push(path_2_0);
    elements_happy.push(path_2_1);
    elements_happy.push(path_3_0);
    elements_happy.push(path_3_1);
    elements_happy.push(path_3_2);
    elements_happy.push(path_3_3);

    svg.style.display = "block";
}

function load_angry()
{
    svg = document.getElementById("octopus_angry");
    svg.width = size + "px";;
    svgDoc = svg.contentDocument;

    path_1 = svgDoc.getElementById("path_1");
    path_2 = svgDoc.getElementById("path_2");
    path_3 = svgDoc.getElementById("path_3");
    path_4_0 = svgDoc.getElementById("path_4_0");
    path_4_1 = svgDoc.getElementById("path_4_1");
    path_4_2 = svgDoc.getElementById("path_4_2");
    path_4_3 = svgDoc.getElementById("path_4_3");

    elements_angry.push(path_1);
    elements_angry.push(path_2);
    elements_angry.push(path_3);
    elements_angry.push(path_4_0);
    elements_angry.push(path_4_1);
    elements_angry.push(path_4_2);
    elements_angry.push(path_4_3);

    svg.style.display = "none";
}
