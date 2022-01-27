export default function filter(canvas, operation, value)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            data[y*row + x    ] = operation(data_original.data[y*row + x    ], value);
            data[y*row + x + 1] = operation(data_original.data[y*row + x + 1], value);
            data[y*row + x + 2] = operation(data_original.data[y*row + x + 2], value);
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;

}