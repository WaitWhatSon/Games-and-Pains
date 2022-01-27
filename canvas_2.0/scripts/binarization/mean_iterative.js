import apply from "./apply.js";
import set_value from "./last_value.js";

export default function mean_iterative(canvas)
{
    let histogram_r = getHistogram(canvas, 0);
    let histogram_g = getHistogram(canvas, 1);
    let histogram_b = getHistogram(canvas, 2);

    let T0r;
    let Tkr = 128;

    do
    {
        T0r = Tkr;
        Tkr = Math.floor(thresholdEstimation(T0r, histogram_r));
    }
    while(T0r != Tkr);

    let T0g;
    let Tkg = 128;

    do
    {
        T0g = Tkg;
        Tkg = Math.floor(thresholdEstimation(T0g, histogram_g));
    }
    while(T0g != Tkg);

    let T0b;
    let Tkb = 128;

    do
    {
        T0b = Tkb;
        Tkb = Math.floor(thresholdEstimation(T0b, histogram_b));
    }
    while(T0b != Tkb);

    set_value("mean_iterative_value", Tkr, Tkg, Tkb);
    return apply(canvas, Tkr, Tkg, Tkb);
}

function getHistogram(canvas, channel)
{
    let array = new Array(256).fill(0);

    let data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let row = canvas.width*4;

    for(let y = 0; y < canvas.height; y++)
    {
        for(let x = 0; x < row; x+=4)
        {
            array[Math.floor(data.data[y*row + x + channel])] += 1;
        }
    }

    return array;
}

function thresholdEstimation(T_last/*last estimation*/, h /*histogram*/)
{
    let a = 0;
    let b = 0;

    for(let t = 0; t <= T_last; t++)
    {
        a += t * h[t];
        b += h[t]
    }

    let c = 0;
    let d = 0;

    for(let t = T_last + 1; t < 256; t++)
    {
        c += t * h[t];
        d += h[t]
    }

    if(b == 0)
    {
        b = 0.00001;
    }
    if(d == 0)
    {
        d = 0.00001;
    }

    let Tk = (a / (2 * b)) + (c / (2 * d));

    return Tk;
}