import HSVtoRGB from "./HSVtoRGB.js"

// window.onload = function() {

    // CUBE

    let R = 255;
    let G = 255;
    let B = 255;
    let ax = "XY";

    let r, g, b;
    let row;

    let Rslider = document.getElementById("Rcube");
    let Gslider = document.getElementById("Gcube");
    let Bslider = document.getElementById("Bcube");

    let XYbutton = document.getElementById("XY");
    let XZbutton = document.getElementById("XZ");
    let YZbutton = document.getElementById("YZ");

    let canvas = document.getElementById("cube_canvas_cross");
    canvas.width = 256;
    canvas.height = 256;
    let ctx = canvas.getContext("2d");

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    setCanvas();

    Rslider.addEventListener("change", function(){
        R = Rslider.value;
        setCanvas();
    })
    
    Gslider.addEventListener("change", function(){
        G = Gslider.value;
        setCanvas();
    })
    
    Bslider.addEventListener("change", function(){
        B = Bslider.value;
        setCanvas();
    })


    XYbutton.addEventListener("click", function(){
        ax = "XY";
        setCanvas();
    })
    
    XZbutton.addEventListener("click", function(){
        ax = "XZ";
        setCanvas();
    })
    
    YZbutton.addEventListener("click", function(){
        ax = "YZ";
        setCanvas();
    })


    function setCanvas()
    {
        if(ax === "XY")
        {
            XYdraw();
            ctx.putImageData(imgData, 0, 0);
            ctx.beginPath();
            ctx.arc(R, 255-G, 10, 0, 2*Math.PI);
        }
        else if(ax === "XZ")
        {
            XZdraw();
            ctx.putImageData(imgData, 0, 0);
            ctx.beginPath();
            ctx.arc(R, 255-B, 10, 0, 2*Math.PI);
        }
        else if(ax === "YZ")
        {
            YZdraw();
            ctx.putImageData(imgData, 0, 0);
            ctx.beginPath();
            ctx.arc(G, 255-B, 10, 0, 2*Math.PI);
        }
        else
        {
            return;
        }
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function XYdraw() // G(R)
    {
        r = 0;
        g = 255;
        b = B;
        
        row = canvas.width*4;

        for(let y = 0; y < canvas.height; y++)
        {
            for(let x = 0; x < row; x+=4)
            {
                data[y*row + x] = r++;
                data[y*row + x + 1] = g;
                data[y*row + x + 2] = b;
                data[y*row + x + 3] = 255;
            }
            r = 0;
            g--;
        }
    }

    function XZdraw() // B(R)
    {
        r = 0;
        g = G;
        b = 255;
        
        row = canvas.width*4;

        for(let y = 0; y < canvas.height; y++)
        {
            for(let x = 0; x < row; x+=4)
            {
                data[y*row + x] = r++;
                data[y*row + x + 1] = g;
                data[y*row + x + 2] = b;
                data[y*row + x + 3] = 255;
            }
            r = 0;
            b--;
        }
    }

    function YZdraw() // B(G)
    {
        r = R;
        g = 0;
        b = 255;
        
        row = canvas.width*4;

        for(let y = 0; y < canvas.height; y++)
        {
            for(let x = 0; x < row; x+=4)
            {
                data[y*row + x] = r;
                data[y*row + x + 1] = g++;
                data[y*row + x + 2] = b;
                data[y*row + x + 3] = 255;
            }
            g = 0;
            b--;
        }
    }



    // CONE

    let canvas2 = document.getElementById("cone_canvas_cross");
    canvas2.width = 100;
    canvas2.height = 100;
    let ctx2 = canvas2.getContext("2d");

    let imgData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    let data2 = imgData2.data;

    let H = 0;

    triangleDraw();

    function triangleDraw() // G(R)
    {
        let S = 0;
        let V = 1;

        let step = 0.01;
        
        row = canvas2.width*4;

        for(let y = 0; y < canvas2.height; y++)
        {
            for(let x = 0; x < row; x+=4)
            {
                if(y <= 100-x/4)
                {
                    let result = HSVtoRGB(H, S, V);

                    data2[y*row + x] = result.r;
                    data2[y*row + x + 1] = result.g;
                    data2[y*row + x + 2] = result.b;
                    data2[y*row + x + 3] = 255;
                }
                S += step;
            }
            step = 1/(100-y);
            S = 0;
            V -= 0.01;
        }

        ctx2.putImageData(imgData2, 0, 0);
        ctx2.beginPath();
        ctx2.moveTo(1, 100);
        ctx2.lineTo(100, 1);
        ctx2.stroke();
    }

    let Hslider = document.getElementById("Hcone");
    Hslider.addEventListener("change", function(){
        H = Hslider.value;
        triangleDraw();
        document.getElementById("Hval").innerText = Hslider.value + String.fromCharCode(176);
    })

// }