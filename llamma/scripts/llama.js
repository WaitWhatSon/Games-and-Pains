import HSVtoRGB from "./HSVtoRGB.js"

let red = [
    "path881", "path889", "path913", "path907", "path901", "path899"
];
let green = [
    "path885", "path891", "path909", "path905", "path903"
];
let blue = [
    "path887", "path911", "path893"
];

let magenta = [
    "path881", "path889", "path913", "path907", "path901", "path899"
];
let yellow = [
    "path885", "path891", "path909", "path905", "path903"
];
let cyan = [
    "path887", "path911", "path893"
];

let svg;
let svgDoc;

let svg2;
let svgDoc2;

let svg3;
let svgDoc3;

// --------------- COLORS CONTROLS ------------------//

let Rrange, Grange, Brange;
let Rnumber, Gnumber, Bnumber;

let Crange, Mrange, Yrange, Krange;
let Cnumber, Mnumber, Ynumber, Knumber;

let Hrange;

window.onload = function() {
    svg = document.getElementById("rgbllama");
    svgDoc = svg.contentDocument;

    svg2 = document.getElementById("cmykllama");
    svgDoc2 = svg2.contentDocument;

    svg3 = document.getElementById("hsvllama");
    svgDoc3 = svg3.contentDocument;

    Rrange = document.getElementById("Rrange");
    Grange = document.getElementById("Grange");
    Brange = document.getElementById("Brange");

    Rnumber = document.getElementById("Rnumber");
    Gnumber = document.getElementById("Gnumber");
    Bnumber = document.getElementById("Bnumber");

    Crange = document.getElementById("Crange");
    Mrange = document.getElementById("Mrange");
    Yrange = document.getElementById("Yrange");
    Krange = document.getElementById("Krange");
    
    Cnumber = document.getElementById("Cnumber");
    Mnumber = document.getElementById("Mnumber");
    Ynumber = document.getElementById("Ynumber");
    Knumber = document.getElementById("Knumber");

    Hrange = document.getElementById("Hcone");

    changeCyan(Cnumber.value);
    changeMagenta(Mnumber.value);
    changeYellow(Ynumber.value);

    changeRed(Rrange.value);
    changeGreen(Grange.value);
    changeBlue(Brange.value);

    changeHSV(0);

    // ------------------- RGB -----------------------

    Rrange.addEventListener("change", function(){
        changeRed(Rrange.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });
    
    Grange.addEventListener("change", function(){
        changeGreen(Grange.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });
    
    Brange.addEventListener("change", function(){
        changeBlue(Brange.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });
    
    Rnumber.addEventListener("change", function(){
        changeRed(Rnumber.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });
    
    Gnumber.addEventListener("change", function(){
        changeGreen(Gnumber.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });
    
    Bnumber.addEventListener("change", function(){
        changeBlue(Bnumber.value);

        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);
    });

    // ----------------- CMYK ------------------------
    
    Crange.addEventListener("change", function(){
        changeCyan(Crange.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });
    
    Cnumber.addEventListener("change", function(){
        changeCyan(Cnumber.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });
    
    Mrange.addEventListener("change", function(){
        changeMagenta(Mrange.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });
    
    Mnumber.addEventListener("change", function(){
        changeMagenta(Mnumber.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });
    
    Yrange.addEventListener("change", function(){
        changeYellow(Yrange.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });
    
    Ynumber.addEventListener("change", function(){
        changeYellow(Ynumber.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });    

    Knumber.addEventListener("change", function(){
        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });   

    Krange.addEventListener("change", function(){
        changeCyan(Crange.value);
        changeMagenta(Mrange.value);
        changeYellow(Yrange.value);

        changeRed(Rrange.value);
        changeGreen(Grange.value);
        changeBlue(Brange.value);
    });   

    // ----------------------- HSV -------------------------

    Hrange.addEventListener("change", function(){
        changeHSV(Hrange.value);
    })

}

function changeRed(r)
{
    for(let element of red)
    {
        let svgElem = svgDoc.getElementById(element);
        svgElem.style.fill = RGBtoHEX(r, 0, 0);
    }
}

function changeGreen(g)
{
    for(let element of green)
    {
        let svgElem = svgDoc.getElementById(element);
        svgElem.style.fill = RGBtoHEX(0, g, 0);
    }
}

function changeBlue(b)
{
    for(let element of blue)
    {
        let svgElem = svgDoc.getElementById(element);
        svgElem.style.fill = RGBtoHEX(0, 0, b);
    }
}


function changeCyan()
{
    for(let element of cyan)
    {
        let svgElem = svgDoc2.getElementById(element);
        svgElem.style.fill = RGBtoHEX(Rnumber.value, 255, 255);
    }
}

function changeMagenta()
{
    for(let element of magenta)
    {
        let svgElem = svgDoc2.getElementById(element);
        svgElem.style.fill = RGBtoHEX(255, Gnumber.value, 255);
    }
}

function changeYellow()
{
    for(let element of yellow)
    {
        let svgElem = svgDoc2.getElementById(element);
        svgElem.style.fill = RGBtoHEX(255, 255, Bnumber.value);
    }
}


function changeHSV(angle)
{
    let color1 = HSVtoRGB((0+angle)%360, 1, 1);
    let color2 = HSVtoRGB((120+angle)%360, 1, 1);
    let color3 = HSVtoRGB((240+angle)%360, 1, 1);

    for(let element of red)
    {
        let svgElem = svgDoc3.getElementById(element);
        svgElem.style.fill = RGBtoHEX(color1.r, color1.g, color1.b);
    }
    for(let element of green)
    {
        let svgElem = svgDoc3.getElementById(element);
        svgElem.style.fill = RGBtoHEX(color2.r, color2.g, color2.b);
    }
    for(let element of blue)
    {
        let svgElem = svgDoc3.getElementById(element);
        svgElem.style.fill = RGBtoHEX(color3.r, color3.g, color3.b);
    }
}


function RGBtoHEX(r, g, b) {
    try {
        var r = parseInt(r).toString(16).padStart(2, '0');
        var g = parseInt(g).toString(16).padStart(2, '0');
        var b = parseInt(b).toString(16).padStart(2, '0');
    } catch (e) {
        return false;
    }
    if (r.length > 2 || g.length > 2 || b.length > 2) return false;
    return '#' + r + g + b;
}




