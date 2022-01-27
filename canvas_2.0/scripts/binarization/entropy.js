import apply from "./apply.js";
import set_value from "./last_value.js";

export default function entropy(canvas)
{
    let histogram_r = getHistogram(canvas, 0);
    let probabilities_r = getProbabilities(histogram_r);

    let histogram_g = getHistogram(canvas, 1);
    let probabilities_g = getProbabilities(histogram_g);

    let histogram_b = getHistogram(canvas, 2);
    let probabilities_b = getProbabilities(histogram_b);

    let value_r, value_g, value_b;

    for(let i = 0; i < 256; i++)
    {
        let value_1 = calculateEntropy(probabilities_r.slice(0, i));
        let value_0 = calculateEntropy(probabilities_r.slice(i, probabilities_r.length));

        if(value_1 >= value_0)
        {
            value_r = i;
            break;
        }
    }

    for(let i = 0; i < 256; i++)
    {
        let value_1 = calculateEntropy(probabilities_g.slice(0, i));
        let value_0 = calculateEntropy(probabilities_g.slice(i, probabilities_g.length));

        if(value_1 >= value_0)
        {
            value_g = i;
            break;
        }
    }

    for(let i = 0; i < 256; i++)
    {
        let value_1 = calculateEntropy(probabilities_b.slice(0, i));
        let value_0 = calculateEntropy(probabilities_b.slice(i, probabilities_b.length));

        if(value_1 >= value_0)
        {
            value_b = i;
            break;
        }
    }

    set_value("entropy_value", value_r, value_g, value_b);
    return apply(canvas, value_r, value_g, value_b);
}

function calculateEntropy(array)
{
    let value = 0;
    for(let i = 0; i < array.length; i++)
    {
        if(array[i] == 0)
        {
            value += 0;
        }
        else
        {
            value += array[i] * Math.log(array[i]);
        }
    }
    return -value;
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
            probabilities.push(histogram[i]/sum);
        }
    }

    return probabilities;
}