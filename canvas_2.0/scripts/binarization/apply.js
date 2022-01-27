export default function apply(canvas, value_r, value_g, value_b)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;


    let LUTr = [];

    for(let i = 0; i < value_r; i++) // 1
    {
        LUTr.push(0);
    }
    for(let i = value_r; i< 256; i++) // 0
    {
        LUTr.push(255);
    }

    let LUTg = [];

    for(let i = 0; i < value_g; i++) // 1
    {
        LUTg.push(0);
    }
    for(let i = value_g; i< 256; i++) // 0
    {
        LUTg.push(255);
    }

    let LUTb = [];

    for(let i = 0; i < value_b; i++) // 1
    {
        LUTb.push(0);
    }
    for(let i = value_b; i< 256; i++) // 0
    {
        LUTb.push(255);
    }


    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x    ] = LUTr[Math.floor(data_original.data[y*row + x    ])];
            data[y*row + x + 1] = LUTg[Math.floor(data_original.data[y*row + x + 1])];
            data[y*row + x + 2] = LUTb[Math.floor(data_original.data[y*row + x + 2])];
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;

}