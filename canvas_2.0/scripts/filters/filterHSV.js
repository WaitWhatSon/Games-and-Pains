import RGBtoHSV from "../convert/RGBtoHSV.js";
import HSVtoRGB from "../convert/HSVtoRGB.js";

export default function filterHSV(canvas, saturationFactor, brightnessFactor)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            let result = RGBtoHSV(  data_original.data[y*row + x], 
                                    data_original.data[y*row + x + 1], 
                                    data_original.data[y*row + x + 2]
                                );
            let newVal = HSVtoRGB(  result.h, 
                                    result.s*saturationFactor, 
                                    result.v*brightnessFactor
                                );

            data[y*row + x    ] = newVal.r;
            data[y*row + x + 1] = newVal.g;
            data[y*row + x + 2] = newVal.b;
            data[y*row + x + 3] = data_original.data[y*row + x + 3];
        }
    }

    return imageData;

}