import { update_histogram } from "../histogram/start_histogram.js";

export default function images_init()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let img;

    function createImage(result)
    {
        img = new Image();
        img.onload = imageLoaded;
        img.src = result;
    }

    function imageLoaded()
    {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL("image/png");
        update_histogram();
    }

    document.getElementById("lena").addEventListener("click", function()
    {
        createImage('./images/lenna.png');
    });

    document.getElementById("apple").addEventListener("click", function()
    {
        createImage('./images/apple.png');   
    });

    document.getElementById("teapot").addEventListener("click", function()
    {
        createImage('./images/teapot.jpeg');   
    });

}