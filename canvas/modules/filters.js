// ------------------------------------------------------
// CONVOLUTION

function convolve_canvas_with_kernel(ctx, imgData, kernel)
{   
	var tempData = ctx.createImageData(512, 512);
	for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{
			let new_pixel_value_r = 0;
			let new_pixel_value_g = 0;
			let new_pixel_value_b = 0;
			let new_pixel_value_a = 0;
			// pixel 1 // -1 -1
			new_pixel_value_r += imgData.data[((x-1)*512*4)+((y-4)+0)] * kernel[0][0][0];
			new_pixel_value_g += imgData.data[((x-1)*512*4)+((y-4)+1)] * kernel[1][0][0];
			new_pixel_value_b += imgData.data[((x-1)*512*4)+((y-4)+2)] * kernel[2][0][0];
			new_pixel_value_a += imgData.data[((x-1)*512*4)+((y-4)+3)] * kernel[3][0][0];
			// pixel 2 // -1  0
			new_pixel_value_r += imgData.data[((x-1)*512*4)+((y+0)+0)] * kernel[0][0][1];
			new_pixel_value_g += imgData.data[((x-1)*512*4)+((y+0)+1)] * kernel[1][0][1];
			new_pixel_value_b += imgData.data[((x-1)*512*4)+((y+0)+2)] * kernel[2][0][1];
			new_pixel_value_a += imgData.data[((x-1)*512*4)+((y+0)+3)] * kernel[3][0][1];
			// pixel 3 // -1  1
			new_pixel_value_r += imgData.data[((x-1)*512*4)+((y+4)+0)] * kernel[0][0][2];
			new_pixel_value_g += imgData.data[((x-1)*512*4)+((y+4)+1)] * kernel[1][0][2];
			new_pixel_value_b += imgData.data[((x-1)*512*4)+((y+4)+2)] * kernel[2][0][2];
			new_pixel_value_a += imgData.data[((x-1)*512*4)+((y+4)+3)] * kernel[3][0][2];
			// pixel 4 //  0 -1
			new_pixel_value_r += imgData.data[((x+0)*512*4)+((y-4)+0)] * kernel[0][1][0];
			new_pixel_value_g += imgData.data[((x+0)*512*4)+((y-4)+1)] * kernel[1][1][0];
			new_pixel_value_b += imgData.data[((x+0)*512*4)+((y-4)+2)] * kernel[2][1][0];
			new_pixel_value_a += imgData.data[((x+0)*512*4)+((y-4)+3)] * kernel[3][1][0];
			// pixel 5 //  0  0
			new_pixel_value_r += imgData.data[((x+0)*512*4)+((y+0)+0)] * kernel[0][1][1];
			new_pixel_value_g += imgData.data[((x+0)*512*4)+((y+0)+1)] * kernel[1][1][1];
			new_pixel_value_b += imgData.data[((x+0)*512*4)+((y+0)+2)] * kernel[2][1][1];
			new_pixel_value_a += imgData.data[((x+0)*512*4)+((y+0)+3)] * kernel[3][1][1];
			// pixel 6 //  0  1
			new_pixel_value_r += imgData.data[((x+0)*512*4)+((y+4)+0)] * kernel[0][1][2];
			new_pixel_value_g += imgData.data[((x+0)*512*4)+((y+4)+1)] * kernel[1][1][2];
			new_pixel_value_b += imgData.data[((x+0)*512*4)+((y+4)+2)] * kernel[2][1][2];
			new_pixel_value_a += imgData.data[((x+0)*512*4)+((y+4)+3)] * kernel[3][1][2];
			// pixel 7 //  1 -1
			new_pixel_value_r += imgData.data[((x+1)*512*4)+((y-4)+0)] * kernel[0][2][0];
			new_pixel_value_g += imgData.data[((x+1)*512*4)+((y-4)+1)] * kernel[1][2][0];
			new_pixel_value_b += imgData.data[((x+1)*512*4)+((y-4)+2)] * kernel[2][2][0];
			new_pixel_value_a += imgData.data[((x+1)*512*4)+((y-4)+3)] * kernel[3][2][0];
			// pixel 8 //  1  0
			new_pixel_value_r += imgData.data[((x+1)*512*4)+((y+0)+0)] * kernel[0][2][1];
			new_pixel_value_g += imgData.data[((x+1)*512*4)+((y+0)+1)] * kernel[1][2][1];
			new_pixel_value_b += imgData.data[((x+1)*512*4)+((y+0)+2)] * kernel[2][2][1];				
			new_pixel_value_a += imgData.data[((x+1)*512*4)+((y+0)+3)] * kernel[3][2][1];
			// pixel 9 //  1  1
			new_pixel_value_r += imgData.data[((x+1)*512*4)+((y+4)+0)] * kernel[0][2][2];
			new_pixel_value_g += imgData.data[((x+1)*512*4)+((y+4)+1)] * kernel[1][2][2];
			new_pixel_value_b += imgData.data[((x+1)*512*4)+((y+4)+2)] * kernel[2][2][2];
			new_pixel_value_a += imgData.data[((x+1)*512*4)+((y+4)+3)] * kernel[3][2][2];
			// set new values
			tempData.data[(x*512*4)+(y+0)] = new_pixel_value_r;
			tempData.data[(x*512*4)+(y+1)] = new_pixel_value_g;
			tempData.data[(x*512*4)+(y+2)] = new_pixel_value_b;
			tempData.data[(x*512*4)+(y+3)] = new_pixel_value_a;
		}
	}
	return tempData;
}

// --------------------------------------------------------------
// GAUSSIAN FILTER

function get_gaussian_kernel_in_channels(sigma, channels_number)
{
	let kernel_in_channels = new Array(channels_number).fill(0);
	for(let i = 0; i < channels_number; i++)
	{
		let kernel = get_gaussian_kernel(sigma[i]);
		kernel_in_channels[i] = kernel;
	}

	return kernel_in_channels;
}

function get_gaussian_kernel(sigma)
{
	let kernel = new Array(3).fill(0).map(() => new Array(3).fill(0));
	let two_sigma_squared = 2.0 * sigma * sigma;
	let sum = 0;
	for(let x = -1; x <= 1; x ++)
	{
		for(let y = -1; y <= 1; y++)
		{
			let x_squared_plus_y_squared = x * x + y * y;
			let e_power = Math.exp(- x_squared_plus_y_squared / two_sigma_squared);
			kernel[x + 1][y + 1] = e_power / (two_sigma_squared * Math.PI);
			sum += kernel[x + 1][y + 1];
		}
	}
	for (let i = 0; i < 3; ++i)
	{
		for (let j = 0; j < 3; ++j)
		{
			kernel[i][j] /= sum;
		}
	}
	return kernel;
}

// -----------------------------------------------
// BRIGHTNESS

function multiply_canvas_by_value(ctx, imgData, value)
{   
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i] 	= imgData.data[i]	* value;
        tempData.data[i+1] 	= imgData.data[i+1]	* value;
        tempData.data[i+2] 	= imgData.data[i+2]	* value;
        tempData.data[i+3] 	= 255;
    }
    return tempData;
}

// ----------------------------------------------------------
// CONTRAST

function multiply_canvas_by_factor(ctx, imgData, contrast)
{   
	contrast = (contrast/100) + 1;
	var intercept = 128 * (1 - contrast);
	// contrast apply
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i] 	= imgData.data[i]	*contrast + intercept;
        tempData.data[i+1] 	= imgData.data[i+1]	*contrast + intercept;
        tempData.data[i+2] 	= imgData.data[i+2]	*contrast + intercept;
        tempData.data[i+3] 	= 255;
    }
    return tempData;
}

// -----------------------------------------------------------
// GRAYSCALE
	
function grayscale_image_filter(ctx, imgData, value)
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

// ------------------------------------------------------------
// INVERT

function invert_image_filter(ctx, imgData, value)
{
    let factor = (value - 50) * 2 / 100;
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        tempData.data[i] 	= 255*value/100 - imgData.data[i]   * factor;
        tempData.data[i+1] 	= 225*value/100 - imgData.data[i+1] * factor;
        tempData.data[i+2] 	= 255*value/100 - imgData.data[i+2] * factor;
        tempData.data[i+3] 	= 255;
    }
		// if 100 -> 255 - val
		// if 50 -> 255/2
		// if 0 -> val
	return tempData;
}

// -----------------------------------------------------------
// SATURATION

function change_saturation(ctx, imgData, value)
{
	var tempData = ctx.createImageData(512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
		// convert to hsv
		let hsv = convertRGBtoHSV(imgData.data[i]/255, imgData.data[i+1]/255, imgData.data[i+2]/255);
		hsv.s = Math.min(hsv.s + value/100, 1);
		let rgb = convertHSVtoRGB(hsv.h, hsv.s, hsv.v);

            tempData.data[i] 	= 255 * rgb.r;
            tempData.data[i+1] 	= 225 * rgb.g;
            tempData.data[i+2] 	= 255 * rgb.b;
            tempData.data[i+3] 	= 255;
    }
    return tempData;
}


// -------------------------------------------------------------------
// COLOR SPACE CONVERSION

// na podstawie:
// http://www.algorytm.org/modele-barw/transformacja-hsv-rgb.html
// HSV: H: 0.0 - 359.9, S, V:  0.0 - 1.0
// RGB: 0.0 - 1.0
function convertRGBtoHSV(r, g, b)
{
	let hue, sat, i, f;
	let x = 	Math.min(Math.min(r, g), b);
	let val = 	Math.max(Math.max(r, g), b);
	if (x == val)	{ hue = 0; sat = 0; }
	else {
		if		(r == x) 	{ f = g - b; i = 3; }
		else if	(g == x)	{ f = b - r; i = 5; }
 		else 				{ f = r - g; i = 1; }		
 		hue = ((i-f/(val-x))*60)%360;
		sat = ((val-x)/val);
	}
	return { 'h': hue, 's': sat, 'v': val }
}

// HSV: H: 0.0 - 359.9, S, V:  0.0 - 1.0
// RGB: 0.0 - 1.0
function convertHSVtoRGB(hue, sat, val)
{
	let r, g, b;
	if(val==0) { r = 0; g = 0; b = 0; }
	else {
		hue /= 60;
		let i = Math.floor(hue);
		let f = hue - i;
		let p = val * (1 - sat);
		let q = val * (1 - (sat*f));
		let t = val * (1 - (sat*(1-f)));
		if 		(i==0) { r = val;	g = t; 		b = p; }
		else if (i==1) { r = q; 	g = val; 	b = p; }
		else if (i==2) { r = p; 	g = val; 	b = t; }
		else if (i==3) { r = p; 	g = q; 		b = val; }
		else if (i==4) { r = t; 	g = p; 		b = val; }
		else if (i==5) { r = val; 	g = p; 		b = q; }
	}
	return { 'r': r, 'g': g, 'b': b }
}





export { 
	get_gaussian_kernel_in_channels,
	convolve_canvas_with_kernel,
	multiply_canvas_by_value,
	multiply_canvas_by_factor,
	grayscale_image_filter,
	invert_image_filter,
	change_saturation,

}