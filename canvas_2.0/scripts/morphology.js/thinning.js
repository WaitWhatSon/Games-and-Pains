import hit_or_miss from "./hit_or_miss.js";

const ZERO = 255;
const ONE = 0;

export default function thinning(canvas)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let hit_or_miss_data = hit_or_miss(canvas);

    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;

    for(let i = 0; i < data.length; i++)
    {
        if(hit_or_miss_data.data[i] === ONE)
        {
            data[i] = ZERO;
        }
        else
        {
            data[i] = data_original.data[i]; 
        }
    }

    return imageData;
}