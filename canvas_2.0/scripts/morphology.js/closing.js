import dilation from "./dilation.js";
import erosion from "./erosion.js";

export default function closing(canvas)
{
    let ctx = canvas.getContext("2d");

    // dilation
    let imageData = dilation(canvas);
    ctx.putImageData(imageData, 0, 0);
    
    // erosion
    imageData = erosion(canvas);
    return imageData;
}