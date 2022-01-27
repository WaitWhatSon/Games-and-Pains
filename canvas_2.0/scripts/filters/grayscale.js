function grayscale1(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = (r + g + b) / 3;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale2(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale3(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale4(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = Math.max(r, g, b);
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale5(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = Math.min(r, g, b);
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale6(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = r;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale7(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = g;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

function grayscale8(canvas, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let r = data_original.data[y*row + x    ];
            let g = data_original.data[y*row + x + 1];
            let b = data_original.data[y*row + x + 2];
            let gray = b;
		
            data[y*row + x    ] = r*(100-value)/100 + gray*value/100;
            data[y*row + x + 1] = g*(100-value)/100 + gray*value/100;
            data[y*row + x + 2] = b*(100-value)/100 + gray*value/100;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;
}

export {grayscale1, grayscale2, grayscale3,
        grayscale4, grayscale5, grayscale6,
        grayscale7, grayscale8}