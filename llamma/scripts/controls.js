import {config} from "./config.js";
import { RGBtoCMYK, CMYKtoRGB } from "./conversion.js";


// --------------- COLORS CONTROLS ------------------//

const Rrange = document.getElementById("Rrange");
const Grange = document.getElementById("Grange");
const Brange = document.getElementById("Brange");

const Rnumber = document.getElementById("Rnumber");
const Gnumber = document.getElementById("Gnumber");
const Bnumber = document.getElementById("Bnumber");

const Crange = document.getElementById("Crange");
const Mrange = document.getElementById("Mrange");
const Yrange = document.getElementById("Yrange");
const Krange = document.getElementById("Krange");

const Cnumber = document.getElementById("Cnumber");
const Mnumber = document.getElementById("Mnumber");
const Ynumber = document.getElementById("Ynumber");
const Knumber = document.getElementById("Knumber");

const color_display = document.getElementById("color_display"); 


function setRGB(result)
{
    Rrange.value = result.R; Rnumber.value = result.R;
    Grange.value = result.G; Gnumber.value = result.G;
    Brange.value = result.B; Bnumber.value = result.B;
}

function setCMYK(result)
{
    Crange.value = result.C; Cnumber.value = result.C;
    Mrange.value = result.M; Mnumber.value = result.M;
    Yrange.value = result.Y; Ynumber.value = result.Y;
    Krange.value = result.K; Knumber.value = result.K;
}

function setSelectedColor()
{
    color_display.style.backgroundColor = "rgb(" + parseInt(Rnumber.value) + 
                                            ", " + parseInt(Gnumber.value) + 
                                            ", " + parseInt(Bnumber.value) + 
                                            ")";
}

Rrange.addEventListener("change", function(){
    Rnumber.value = Rrange.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});

Grange.addEventListener("change", function(){
    Gnumber.value = Grange.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});

Brange.addEventListener("change", function(){
    Bnumber.value = Brange.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});

Rnumber.addEventListener("change", function(){
    Rrange.value = Rnumber.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});

Gnumber.addEventListener("change", function(){
    Grange.value = Gnumber.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});

Bnumber.addEventListener("change", function(){
    Brange.value = Bnumber.value;
    let result = RGBtoCMYK(parseInt(Rnumber.value), parseInt(Gnumber.value), parseInt(Bnumber.value));
    setCMYK(result);
    setSelectedColor();
});


Crange.addEventListener("change", function(){
    Cnumber.value = Crange.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Cnumber.addEventListener("change", function(){
    Crange.value = Cnumber.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Mrange.addEventListener("change", function(){
    Mnumber.value = Mrange.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Mnumber.addEventListener("change", function(){
    Mrange.value = Mnumber.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Yrange.addEventListener("change", function(){
    Ynumber.value = Yrange.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Ynumber.addEventListener("change", function(){
    Yrange.value = Ynumber.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Krange.addEventListener("change", function(){
    Knumber.value = Krange.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

Knumber.addEventListener("change", function(){
    Krange.value = Knumber.value;
    let result = CMYKtoRGB(parseFloat(Cnumber.value), parseFloat(Mnumber.value), parseFloat(Ynumber.value), parseFloat(Knumber.value));
    setRGB(result);
    setSelectedColor();
});

// --------------- CUBE CONTROLS ------------------- //

document.getElementById("top_cube_button").addEventListener("click", function(){
    if(config.speedCubeX < 0.1)
    {
        config.speedCubeX += 0.01;
    }
});

document.getElementById("bottom_cube_button").addEventListener("click", function(){
    if(config.speedCubeX > -0.1)
    {
        config.speedCubeX -= 0.01;
    }
});

document.getElementById("right_cube_button").addEventListener("click", function(){
    if(config.speedCubeY < 0.1)
    {
        config.speedCubeY += 0.01;
    }
});

document.getElementById("left_cube_button").addEventListener("click", function(){
    if(config.speedCubeY > -0.1)
    {
        config.speedCubeY -= 0.01;
    }
});

document.getElementById("cube_render_element").addEventListener("click", function(){
    config.speedCubeX = 0;
    config.speedCubeY = 0;
});

// --------------- CONE CONTROLS ------------------- //

document.getElementById("top_cone_button").addEventListener("click", function(){
    if(config.speedConeX < 0.1)
    {
        config.speedConeX += 0.01;
    }
});

document.getElementById("bottom_cone_button").addEventListener("click", function(){
    if(config.speedConeX > -0.1)
    {
        config.speedConeX -= 0.01;
    }
});

document.getElementById("right_cone_button").addEventListener("click", function(){
    if(config.speedConeY < 0.1)
    {
        config.speedConeY += 0.01;
    }
});

document.getElementById("left_cone_button").addEventListener("click", function(){
    if(config.speedConeY > -0.1)
    {
        config.speedConeY -= 0.01;
    }
});

document.getElementById("cone_render_element").addEventListener("click", function(){
    config.speedConeX = 0;
    config.speedConeY = 0;
});



