import hit_or_miss from "./hit_or_miss.js";

const ZERO = 255;
const ONE = 0;

export default function thickening(canvas)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let hit_or_miss_data = hit_or_miss(canvas);

    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;

    for(let i = 0; i < data.length; i++)
    {
        if(data_original.data[i] === ONE || hit_or_miss_data.data[i] === ONE)
        {
            data[i] = ONE;
        }
        else
        {
            data[i] = ZERO;
        }
    }

    return imageData;
}