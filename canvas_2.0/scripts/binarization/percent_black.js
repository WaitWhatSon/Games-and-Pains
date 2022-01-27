import apply from "./apply.js";
import set_value from "./last_value.js";

export default function percent_black(canvas, value)
{
    let histogram_r = getHistogram(canvas, 0);
    let histogram_g = getHistogram(canvas, 1);
    let histogram_b = getHistogram(canvas, 2);

    let cumulative_histogram_r = get_cumulative_histogram(histogram_r);
    let cumulative_histogram_g = get_cumulative_histogram(histogram_g);
    let cumulative_histogram_b = get_cumulative_histogram(histogram_b);

    let value_r = 255;
    let value_g = 255;
    let value_b = 255;

    for(let i = 0; i < 255; i++)
    {
        if(cumulative_histogram_r[i]/cumulative_histogram_r[255]*100 >= value)
        {
            value_r = i;
            break;
        }
    }

    
    for(let i = 0; i < 255; i++)
    {
        if(cumulative_histogram_g[i]/cumulative_histogram_g[255]*100 >= value)
        {
            value_g = i;
            break;
        }
    }

    
    for(let i = 0; i < 255; i++)
    {
        if(cumulative_histogram_b[i]/cumulative_histogram_b[255]*100 >= value)
        {
            value_b = i;
            break;
        }
    }

    set_value("percent_black_value", value_r, value_g, value_b);
    return apply(canvas, value_r, value_g, value_b);
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

function get_cumulative_histogram(histogram)
{
    let cumulative_histogram = histogram.map((x)=>x);
    for(let i = 1; i < histogram.length; i++)
    {
        cumulative_histogram[i] += cumulative_histogram[i-1];
    }
    cumulative_histogram = cumulative_histogram.map((x) => Math.floor(255*x/cumulative_histogram[255]));
    return cumulative_histogram;
}
