export default function filterConv(canvas, mask)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    let shift = (mask.height-1)/2;

    // APPLY FILTER
    for(let y = shift; y < canvas.height-shift; y++)
    {
        for(let x = shift*4; x < row-shift*4; x+=4)
        {
            let newValR = 0;
            let newValG = 0;
            let newValB = 0;

            for(let j = -shift; j <= shift; j++)
            {
                for(let k = -shift; k <= shift; k++)
                {                                 //    Y (rząd)        X (kolumna)
                    newValR += data_original.data[ ((y+j) * row ) + ( x + (4*k + 0)) ] * mask.data[j+shift][k+shift];
                    newValG += data_original.data[ ((y+j) * row ) + ( x + (4*k + 1)) ] * mask.data[j+shift][k+shift];
                    newValB += data_original.data[ ((y+j) * row ) + ( x + (4*k + 2)) ] * mask.data[j+shift][k+shift];
                }
            }

            data[y*row + x    ] = newValR;
            data[y*row + x + 1] = newValG;
            data[y*row + x + 2] = newValB;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    // COPY MARGINS
    // TOP
    for(let y = 0; y < shift; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x    ] = data_original.data[y*row + x    ];
            data[y*row + x + 1] = data_original.data[y*row + x + 1];
            data[y*row + x + 2] = data_original.data[y*row + x + 2];
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }
    // BOTTOM
    for(let y = canvas.height-shift; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x    ] = data_original.data[y*row + x    ];
            data[y*row + x + 1] = data_original.data[y*row + x + 1];
            data[y*row + x + 2] = data_original.data[y*row + x + 2];
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }
    // LEFT
    for(let y = shift; y < canvas.height-shift; y++)
    {
        for(let x = 0; x < shift*4; x+=4)
        {
            data[y*row + x    ] = data_original.data[y*row + x    ];
            data[y*row + x + 1] = data_original.data[y*row + x + 1];
            data[y*row + x + 2] = data_original.data[y*row + x + 2];
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }
    // RIGHT
    for(let y = shift; y < canvas.height-shift; y++)
    {
        for(let x = row-shift*4; x < row; x+=4)
        {
            data[y*row + x    ] = data_original.data[y*row + x    ];
            data[y*row + x + 1] = data_original.data[y*row + x + 1];
            data[y*row + x + 2] = data_original.data[y*row + x + 2];
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;

}