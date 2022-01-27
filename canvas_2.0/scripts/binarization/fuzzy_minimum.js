import apply from "./apply.js"
import set_value from "./last_value.js";

export default function fuzzy_minimum(canvas)
{    
    let value_r = calculateThreshold(canvas, 0);
    let value_g = calculateThreshold(canvas, 1);
    let value_b = calculateThreshold(canvas, 2);

    set_value("fuzzy_value", value_r, value_g, value_b);
    return apply(canvas, value_r, value_g, value_b);
}

function calculateThreshold(canvas, channel)
{
    let histogram = getHistogram(canvas, channel);
    let h = getProbabilities(histogram);
    let value = 255;

    for(let t = 1; t < 255; t++)
    {
        let value_0 = E0(h, t);
        let value_1 = E1(h, t);

        if(value_0 >= value_1)
        {
            return t;
        }
    }
    return value;
}

function E0(h, t)
{
    let N = h.reduce(function(a, b) {return a + b});
    let sum = 0;
    for(let i = 0; i <= t; i++)
    {
        let mi0 = MI0(h, t);
        let hf = Hf(mi0);
        sum += hf * h[i];
    }
    return 1/N * sum;
}

function E1(h, t)
{
    let N = h.reduce(function(a, b) {return a + b});
    let sum = 0;
    for(let i = t+1; i < 256; i++)
    {
        sum += Hf(MI1(h, t)) * h[i];
    }
    return 1/N * sum;
}

function Hf(x)
{
    if(x <= 0 || (1-x) <= 0)
    {
        return 0;
    }
    else
    {
        let val = ((-x) * Math.log(x)) - ((1 - x) * Math.log(1 - x));
        return val;
    }
}

// function MI0(h, t)
// {
//     let sum1 = 0;
//     let sum2 = 0;
//     for(let i = 0; i <= t; i++)
//     {
//         sum1 += i * h[i];
//         sum2 += h[i];
//     }
//     if(sum2 == 0)
//     {
//         return 0;
//     }
//     else
//     {
//         return sum1/sum2;
//     }
// }

function MI0(h, t)
{
    let sum = 0;
    for(let i = 0; i <= t; i++)
    {
        sum += h[i];
    }
    return sum/t;
}

// function MI1(h, t)
// {
//     let sum1 = 0;
//     let sum2 = 0;
//     for(let i = t+1; i < 256; i++)
//     {
//         sum1 += i * h[i];
//         sum2 += h[i];
//     }
//     if(sum2 == 0)
//     {
//         return 0;
//     }
//     else
//     {
//         return sum1/sum2;
//     }
// }

function MI1(h, t)
{
    let sum = 0;
    for(let i = t+1; i < 256; i++)
    {
        sum += h[i];
    }
    return sum/(256-t);
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

function getProbabilities(histogram)
{
    let sum = histogram.reduce(function(a, b) {
        return a + b;
    });

    let probabilities = [];

    if(sum == 0)
    {
        for(let i = 0; i < histogram.length; i++)
        {
            probabilities.push(0);
        }
    }
    else
    {
        for(let i = 0; i < histogram.length; i++)
        {
            probabilities.push(histogram[i]/sum);
        }
    }

    return probabilities;
}