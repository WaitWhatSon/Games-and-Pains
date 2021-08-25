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
// ----------------------------------------
// GRAYSCALE
function convert_to_grayscale(ctx, imgData, value)
{
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        let gray = (imgData.data[i] * 0.2126 + imgData.data[i+1] * 0.7152 + imgData.data[i+2] * 0.0722)
		tempData.data[i]   = imgData.data[i]  *(100-value)/100 	+ gray*value/100;
        tempData.data[i+1] = imgData.data[i+1]*(100-value)/100 	+ gray*value/100;
        tempData.data[i+2] = imgData.data[i+2]*(100-value)/100 	+ gray*value/100;
        tempData.data[i+3] = 255;
    }
    return tempData;
}


export {
    get_grayscale_histogram, 
    get_rgba_histogram,
    convert_to_grayscale,
}