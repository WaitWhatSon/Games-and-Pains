import dilation from "./dilation.js";
import erosion from "./erosion.js";

export default function opening(canvas)
{
    let ctx = canvas.getContext("2d");

    // erosion
    let imageData = erosion(canvas);
    ctx.putImageData(imageData, 0, 0);
    
    // dilation
    imageData = dilation(canvas);
    return imageData;
}