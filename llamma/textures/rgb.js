window.onload = function() {

    let canvas;
    let ctx;
    let imgData;
    let data;

    let r;
    let g;
    let b;
    let row;

    let link;

    // ---- P1 --------------------------------------------------------

    canvas = document.getElementById("canvas1");
    canvas.width = 256;
    canvas.height = 256;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 255;
    g = 255;
    b = 255;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x] = r;
            data[y*row + x + 1] = g--;
            data[y*row + x + 2] = b;
            
            data[y*row + x + 3] = 255;
        }
        r--;
        g = 255;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p1.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

    // ---- P2 --------------------------------------------------------

    canvas = document.getElementById("canvas2");
    canvas.width = 256;
    canvas.height = 256;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 255;
    g = 0;
    b = 0;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x] = r;
            data[y*row + x + 1] = g++;

            data[y*row + x + 3] = 255;
        }
        r--;
        g = 0;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p2.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

    // ---- P3 --------------------------------------------------------

    canvas = document.getElementById("canvas3");
    canvas.width = 256;
    canvas.height = 256;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 255;
    g = 0;
    b = 0;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x] = r;
            data[y*row + x + 1] = g;
            data[y*row + x + 2] = b++;
            
            data[y*row + x + 3] = 255;
        }
        g++;
        b = 0;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p3.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

    // ---- P4 --------------------------------------------------------
    
    canvas = document.getElementById("canvas4");
    canvas.width = 256;
    canvas.height = 256;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 0;
    g = 255;
    b = 0;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x + 1] = g;
            data[y*row + x + 2] = b++;

            data[y*row + x + 3] = 255;
        }
        g--;
        b = 0;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p4.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

    // ---- P5 --------------------------------------------------------

    canvas = document.getElementById("canvas5");
    canvas.width = 256;
    canvas.height = 256;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 255;
    g = 255;
    b = 255;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x] = r;
            data[y*row + x + 1] = g;
            data[y*row + x + 2] = b++;
            
            data[y*row + x + 3] = 255;
        }
        r--;
        b = 0;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p5.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

    // ---- P6 --------------------------------------------------------

    canvas = document.getElementById("canvas6");
    canvas.width = 255;
    canvas.height = 255;
    ctx = canvas.getContext("2d");

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;

    r = 255;
    g = 0;
    b = 0;
    
    row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = row; x > 0; x-=4)
        {
            data[y*row + x] = r;
            data[y*row + x + 2] = b++;

            data[y*row + x + 3] = 255;
        }
        r--;
        b = 0;
    }
    
    ctx.putImageData(imgData, 0, 0);

    link = document.createElement('a');
    link.download = 'p6.png';
    link.href = canvas.toDataURL('image/png');
    // link.click();

}

