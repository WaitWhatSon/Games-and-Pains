import apply from "./apply.js"
import set_value from "./last_value.js";

export default function minimum() // Kittler Minimim Error Thresholding
{
    let index_r = calculateThreshold(canvas, 0);
    let index_g = calculateThreshold(canvas, 1);
    let index_b = calculateThreshold(canvas, 2);

    
    set_value("minimum_error_value", index_r, index_g, index_b);
    return apply(canvas, index_r, index_g, index_b);
}

function calculateThreshold(canvas, channel)
{
    let J = new Array(256).fill(Number.POSITIVE_INFINITY);
    let histogram = getHistogram(canvas, channel);
    let h = getProbabilities(histogram);

    for(let t = 1; t < 255; t++)
    {
        let p1 = P1(h, t);
        let p2 = P2(h, t);

        if((p1 > 0) && (p2 > 0))
        {
            let sigma1 = SIGMA1(h, t);
            let sigma2 = SIGMA2(h, t);

            if((sigma1 > 0) && (sigma2 > 0))
            {
                J[t] = 1 + 2 * (p1 * Math.log(sigma1) + p2 * Math.log(sigma2)) 
                         - 2 * (p1 * Math.log(p1)     + p2 * Math.log(p2)    );

            }
        }

    }
    return J.indexOf(Math.min(...J));
}

function P1(h, t)
{
    let sum = 0;
    for(let g = 0; g <= t; g++)
    {
        sum += h[g];
    }
    return sum;
}

function P2(h, t)
{
    let sum = 0;
    for(let g = t+1; g < 256; g++)
    {
        sum += h[g];
    }
    return sum;
}

function MI1(h, t)
{
    let sum = 0;
    for(let g = 0; g <= t; g++)
    {
        sum += h[g] * g;
    }
    return sum / P1(h, t);
}

function MI2(h, t)
{
    let sum = 0;
    for(let g = t+1; g < 256; g++)
    {
        sum += h[g] * g;
    }
    return sum / P2(h, t);
}

function SIGMA1(h, t)
{
    let sum = 0;
    for(let g = 0; g <= t; g++)
    {
        sum += ((g - MI1(h, t))**2) * h[g]; 
    }
    return Math.sqrt(sum/P1(h, t))
}

function SIGMA2(h, t)
{
    let sum = 0;
    for(let g = t+1; g < 256; g++)
    {
        sum += ((g - MI2(h, t))**2) * h[g]; 
    }
    return Math.sqrt(sum/P2(h, t))
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
            probabilities.push(Number.POSITIVE_INFINITY);
        }
    }
    else
    {
        for(let i = 0; i < histogram.length; i++)
        {
            probabilities.push(histogram[i]/sum * 100);
        }
    }

    return probabilities;
}