// ---------------------------------
// HISTOGRAM
function get_grayscale_histogram(imgData) 
{
    // przechodzi przez jeden kanał
    let histogram = new Array(256).fill(0);
    for(let i = 0; i < imgData.data.length; i += 4)
    {
        histogram[imgData.data[i]] += 1;
    }
    return histogram;
}

function get_rgba_histogram(imgData)
{
    let r_channel = new Array(256).fill(0);
    let g_channel = new Array(256).fill(0);
    let b_channel = new Array(256).fill(0);
    let a_channel = new Array(256).fill(0);
    
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        r_channel[imgData.data[i]] += 1;
        g_channel[imgData.data[i]] += 1;
        b_channel[imgData.data[i]] += 1;
        a_channel[imgData.data[i]] += 1;
    }
    return { 
        r_histogram: r_channel,
        g_histogram: g_channel,
        b_histogram: b_channel,
        a_histogram: a_channel
    }
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


// ----------------------------------------
// GRAYSCALE
function convert_to_grayscale(ctx, imgData)
{
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        let gray = (imgData.data[i] * 0.2126 + imgData.data[i+1] * 0.7152 + imgData.data[i+2] * 0.0722)
		tempData.data[i]   = gray;
        tempData.data[i+1] = gray;
        tempData.data[i+2] = gray;
        tempData.data[i+3] = 255;
    }
    return tempData;
}

function normalize_image_histogram(ctx, imgData)
{
    let histogram = get_grayscale_histogram(imgData);
    let cumulative_histogram = get_cumulative_histogram(histogram);
    var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i]   = cumulative_histogram[Math.floor(imgData.data[i])];
        tempData.data[i+1] = cumulative_histogram[Math.floor(imgData.data[i])];
        tempData.data[i+2] = cumulative_histogram[Math.floor(imgData.data[i])];
        tempData.data[i+3] = 255;
    }   
    return tempData;
}

function normalize_rgb_image_histogram(ctx, imgData)
{
    let histogram = get_rgba_histogram(imgData);
    let cumulative_histogram_r = get_cumulative_histogram(histogram.r_histogram);
    let cumulative_histogram_g = get_cumulative_histogram(histogram.g_histogram);
    let cumulative_histogram_b = get_cumulative_histogram(histogram.b_histogram);
    var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i]   = cumulative_histogram_r[Math.floor(imgData.data[i])];
        tempData.data[i+1] = cumulative_histogram_g[Math.floor(imgData.data[i+1])];
        tempData.data[i+2] = cumulative_histogram_b[Math.floor(imgData.data[i+2])];
        tempData.data[i+3] = 255;
    }   
    return tempData;
}


/*
                    zmiana na odcienie szarości
                    normalizacja histogramu
                    binaryzacja
                    ścienianie
                    szukanie minucji
*/


export {
    get_grayscale_histogram, 
    get_rgba_histogram,
    convert_to_grayscale,
    get_cumulative_histogram,
    normalize_image_histogram,
    normalize_rgb_image_histogram,
}