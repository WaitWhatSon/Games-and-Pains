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

// ------------------------------------------------
// HISTOGRAM NORMALIZATION
function normalize_image_histogram(ctx, imgData)
{
    imgData = convert_to_grayscale(ctx, imgData);
    let histogram = get_grayscale_histogram(imgData);
    let cumulative_histogram = get_cumulative_histogram(histogram);
    let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i]   = cumulative_histogram[imgData.data[i]];
        tempData.data[i+1] = cumulative_histogram[imgData.data[i+1]];
        tempData.data[i+2] = cumulative_histogram[imgData.data[i+2]];
        tempData.data[i+3] = imgData.data[i+3];
    }   
    return tempData;
}

function normalize_rgb_image_histogram(ctx, imgData)
{
    let histogram = get_rgba_histogram(imgData);
    let cumulative_histogram_r = get_cumulative_histogram(histogram.r_histogram);
    let cumulative_histogram_g = get_cumulative_histogram(histogram.g_histogram);
    let cumulative_histogram_b = get_cumulative_histogram(histogram.b_histogram);
    let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i]   = cumulative_histogram_r[Math.floor(imgData.data[i])];
        tempData.data[i+1] = cumulative_histogram_g[Math.floor(imgData.data[i+1])];
        tempData.data[i+2] = cumulative_histogram_b[Math.floor(imgData.data[i+2])];
        tempData.data[i+3] = 255;
    }   
    return tempData;
}

// ----------------------------------------
// GRAYSCALE
function convert_to_grayscale(ctx, imgData)
{
	let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        let gray = Math.floor(imgData.data[i] * 0.2126 + imgData.data[i+1] * 0.7152 + imgData.data[i+2] * 0.0722)
		tempData.data[i]   = gray;
        tempData.data[i+1] = gray;
        tempData.data[i+2] = gray;
        tempData.data[i+3] = imgData.data[i+3];
    }
    return tempData;
}

// -----------------------------------------------
// BINARIZATION
function otsu_thresholding(ctx, imgData)
{
    let grayscaleData = convert_to_grayscale(ctx, imgData);
    let histogram = get_grayscale_histogram(grayscaleData);
    let histSum = histogram.reduce((prev, next) => prev + next, 0);
    let sum = 0;
    for (let i = 0; i < 256; i++)
    {
        sum += i * histogram[i];
    }
    let sumB = 0;
    let varMax = 0;
    let back = 0;
    let threshold = 0;

    for (let i = 0; i < 256; i++)
	{
		back += histogram[i];
		if (back == 0)
        {
            continue;
        }
		let fore = histSum - back;
		if (fore == 0)
        {
            break;
        }
		sumB += i * histogram[i];

		let backMean = sumB / back;
		let foreMean = (sum - sumB) / fore;

		let varBetween = back * fore * (backMean - foreMean) * (backMean - foreMean);

		if (varBetween > varMax)
		{
			varMax = varBetween;
			threshold = i;
		}
	}

    let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i++) 
	{
        tempData.data[i] = imgData.data[i] > threshold ? 255 : 0;
    }
    return tempData;
}

function niblack_thresholding(ctx, imgData)
{
    let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i++) 
	{
        tempData.data[i] = imgData.data[i] > 100 ? 255 : 0;
    }
    return tempData;
}

function sauvola_thresholding(ctx, imgData)
{
    let tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i++) 
	{
        tempData.data[i] = imgData.data[i] > 100 ? 255 : 0;
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
    otsu_thresholding,
    niblack_thresholding,
    sauvola_thresholding,
}