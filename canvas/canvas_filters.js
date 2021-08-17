
window.addEventListener("load", () => {

    // -----------------------------------------------------------------
    // consts

    const canvas    = document.getElementById("myCanvas");
    const ctx       = canvas.getContext("2d");

    // --------------------------------------------------------------------
    // variables


    // --------------------------------------------------------------------
    // functions
    
    function apply_gaussian_blur(value)
    {
		let sigma = [value/100, value/100, value/100, value/100];
		let kernel = get_gaussian_kernel_in_channels(sigma, 4);
		convolve_canvas_with_kernel(kernel);
    }

	function apply_brightness_effect(value)
	{
		multiply_canvas_by_value(value/100);
	}

	function apply_contrast_effect(value)
	{
		multiply_canvas_by_factor(value);
	}

	function apply_grayscale_effect(value)
	{
		grayscale_image_filter(value);
	}

	function apply_invert_effect(value)
	{
		invert_image_filter(value);
	}

	function apply_saturation_effect(value)
	{
		change_saturation(value);
	}

	// ----------------------------------
	// utils

	function sum_in_channels(values, channels_number)
	{
		let sum = new Array(channels_number).fill(0);
		for(let i = 0; i < values.length; i += channels_number)
		{
			for(let j = 0; j < channels_number; j++)
			{
				sum[j] += values[i+j];
			}
		}
		return sum;
	}

	function mean_value_in_channels(values, channels_number)
	{
		let sum = sum_in_channels(values, channels_number);
		let mean = new Array(channels_number).fill(0);
		for(let i = 0; i < channels_number; i++)
		{
			mean[i] = sum[i]/(values.length/channels_number);
		}
		return mean;
	}

	function variance_in_channels(values, channels_number)
	{
		let mean = mean_value_in_channels(values, channels_number);
		let value_minus_mean_squared = new Array(values.length).fill(0);
		for(let i = 0; i < values.length; i += channels_number)
		{
			for(let j = 0; j < channels_number; j++)
			{
				value_minus_mean_squared[i+j] += (values[i+j]-mean[j])**2;
			}
		}
		let sum = sum_in_channels(value_minus_mean_squared, channels_number);
		let variance = new Array(channels_number).fill(0);
		for(let i = 0; i < channels_number; i++)
		{
			variance[i] = sum[i]/(values.length/channels_number);
		}
		return variance;
	}

	function standard_deviation_in_channels(values, channels_number)
	{
		let variance = variance_in_channels(values, channels_number);
		let standard_deviation = new Array(channels_number).fill(0);
		for(let i = 0; i < channels_number; i++)
		{
			standard_deviation[i] = Math.sqrt(variance[i])
		}
		return standard_deviation;
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

	function convolve_canvas_with_kernel(kernel)
	{   
		
		console.log(kernel);

        let imgData = ctx.getImageData(0, 0, 512, 512);
        let tempData = ctx.getImageData(0, 0, 512, 512);
		for(let x = 0; x < imgData.data.length/(512*4); x++)
		{	
			for(let y = 0; y < imgData.data.length/512; y+=4)
			{
				let new_pixel_value_r = 0;
				let new_pixel_value_g = 0;
				let new_pixel_value_b = 0;
				let new_pixel_value_a = 0;
				// pixel 1 // -1 -1
				new_pixel_value_r += tempData.data[((x-1)*512*4)+((y-4)+0)] * kernel[0][0][0];
				new_pixel_value_g += tempData.data[((x-1)*512*4)+((y-4)+1)] * kernel[1][0][0];
				new_pixel_value_b += tempData.data[((x-1)*512*4)+((y-4)+2)] * kernel[2][0][0];
				new_pixel_value_a += tempData.data[((x-1)*512*4)+((y-4)+3)] * kernel[3][0][0];
				// pixel 2 // -1  0
				new_pixel_value_r += tempData.data[((x-1)*512*4)+((y+0)+0)] * kernel[0][0][1];
				new_pixel_value_g += tempData.data[((x-1)*512*4)+((y+0)+1)] * kernel[1][0][1];
				new_pixel_value_b += tempData.data[((x-1)*512*4)+((y+0)+2)] * kernel[2][0][1];
				new_pixel_value_a += tempData.data[((x-1)*512*4)+((y+0)+3)] * kernel[3][0][1];
				// pixel 3 // -1  1
				new_pixel_value_r += tempData.data[((x-1)*512*4)+((y+4)+0)] * kernel[0][0][2];
				new_pixel_value_g += tempData.data[((x-1)*512*4)+((y+4)+1)] * kernel[1][0][2];
				new_pixel_value_b += tempData.data[((x-1)*512*4)+((y+4)+2)] * kernel[2][0][2];
				new_pixel_value_a += tempData.data[((x-1)*512*4)+((y+4)+3)] * kernel[3][0][2];
				// pixel 4 //  0 -1
				new_pixel_value_r += tempData.data[((x+0)*512*4)+((y-4)+0)] * kernel[0][1][0];
				new_pixel_value_g += tempData.data[((x+0)*512*4)+((y-4)+1)] * kernel[1][1][0];
				new_pixel_value_b += tempData.data[((x+0)*512*4)+((y-4)+2)] * kernel[2][1][0];
				new_pixel_value_a += tempData.data[((x+0)*512*4)+((y-4)+3)] * kernel[3][1][0];
				// pixel 5 //  0  0
				new_pixel_value_r += tempData.data[((x+0)*512*4)+((y+0)+0)] * kernel[0][1][1];
				new_pixel_value_g += tempData.data[((x+0)*512*4)+((y+0)+1)] * kernel[1][1][1];
				new_pixel_value_b += tempData.data[((x+0)*512*4)+((y+0)+2)] * kernel[2][1][1];
				new_pixel_value_a += tempData.data[((x+0)*512*4)+((y+0)+3)] * kernel[3][1][1];
				// pixel 6 //  0  1
				new_pixel_value_r += tempData.data[((x+0)*512*4)+((y+4)+0)] * kernel[0][1][2];
				new_pixel_value_g += tempData.data[((x+0)*512*4)+((y+4)+1)] * kernel[1][1][2];
				new_pixel_value_b += tempData.data[((x+0)*512*4)+((y+4)+2)] * kernel[2][1][2];
				new_pixel_value_a += tempData.data[((x+0)*512*4)+((y+4)+3)] * kernel[3][1][2];
				// pixel 7 //  1 -1
				new_pixel_value_r += tempData.data[((x+1)*512*4)+((y-4)+0)] * kernel[0][2][0];
				new_pixel_value_g += tempData.data[((x+1)*512*4)+((y-4)+1)] * kernel[1][2][0];
				new_pixel_value_b += tempData.data[((x+1)*512*4)+((y-4)+2)] * kernel[2][2][0];
				new_pixel_value_a += tempData.data[((x+1)*512*4)+((y-4)+3)] * kernel[3][2][0];
				// pixel 8 //  1  0
				new_pixel_value_r += tempData.data[((x+1)*512*4)+((y+0)+0)] * kernel[0][2][1];
				new_pixel_value_g += tempData.data[((x+1)*512*4)+((y+0)+1)] * kernel[1][2][1];
				new_pixel_value_b += tempData.data[((x+1)*512*4)+((y+0)+2)] * kernel[2][2][1];
				new_pixel_value_a += tempData.data[((x+1)*512*4)+((y+0)+3)] * kernel[3][2][1];
				// pixel 9 //  1  1
				new_pixel_value_r += tempData.data[((x+1)*512*4)+((y+4)+0)] * kernel[0][2][2];
				new_pixel_value_g += tempData.data[((x+1)*512*4)+((y+4)+1)] * kernel[1][2][2];
				new_pixel_value_b += tempData.data[((x+1)*512*4)+((y+4)+2)] * kernel[2][2][2];
				new_pixel_value_a += tempData.data[((x+1)*512*4)+((y+4)+3)] * kernel[3][2][2];
				// set new values
				imgData.data[(x*512*4)+(y+0)] = new_pixel_value_r;
				imgData.data[(x*512*4)+(y+1)] = new_pixel_value_g;
				imgData.data[(x*512*4)+(y+2)] = new_pixel_value_b;
				imgData.data[(x*512*4)+(y+3)] = new_pixel_value_a;
			}
		}
        ctx.putImageData(imgData, 0, 0);
	}

	function temp_filter()
	{   
        var imgData = ctx.getImageData(0, 0, 512, 512);
        var tempData = ctx.getImageData(0, 0, 512, 512);
        
		for(let x = 0; x < imgData.data.length/(512*4); x++)
		{	
			for(let y = 0; y < imgData.data.length/512; y+=4)
			{
				imgData.data[(x*512*4)+(y+0)] = 255 - tempData.data[(x*512*4)+(y+0)];
				imgData.data[(x*512*4)+(y+1)] = 225 - tempData.data[(x*512*4)+(y+1)];
				imgData.data[(x*512*4)+(y+2)] = 255 - tempData.data[(x*512*4)+(y+2)];
				imgData.data[(x*512*4)+(y+3)] = 255;
			}
		}
        ctx.putImageData(imgData, 0, 0);
	}

	function apply_given_treshhold_in_channels(treshhold)
	{   
        var imgData = ctx.getImageData(0, 0, 512, 512);
		for(let x = 0; x < imgData.data.length/(512*4); x++)
		{	
			for(let y = 0; y < imgData.data.length/512; y+=4)
			{
				for(let c = 0; c < treshhold.length; c++)
				{
					if(imgData.data[(x*512*4)+(y+c)] >= treshhold[c])
					{
						imgData.data[(x*512*4)+(y+c)] = 255;
					}
					else
					{
						imgData.data[(x*512*4)+(y+c)] = 0;
					}
				}
			}
		}
        ctx.putImageData(imgData, 0, 0);
	}

	function multiply_canvas_by_value(value)
	{   
        var imgData = ctx.getImageData(0, 0, 512, 512);
		for(let x = 0; x < imgData.data.length/(512*4); x++)
		{	
			for(let y = 0; y < imgData.data.length/512; y+=4)
			{
				imgData.data[(x*512*4)+(y+0)] = imgData.data[(x*512*4)+(y+0)] * value;
				imgData.data[(x*512*4)+(y+1)] = imgData.data[(x*512*4)+(y+1)] * value;
				imgData.data[(x*512*4)+(y+2)] = imgData.data[(x*512*4)+(y+2)] * value;
			}
		}
        ctx.putImageData(imgData, 0, 0);
	}

	function add_given_value(value)
	{   
        var imgData = ctx.getImageData(0, 0, 512, 512);
		for(let x = 0; x < imgData.data.length/(512*4); x++)
		{	
			for(let y = 0; y < imgData.data.length/512; y+=4)
			{
				imgData.data[(x*512*4)+(y+0)] = Math.max(imgData.data[(x*512*4)+(y+0)] + value, 255);
				imgData.data[(x*512*4)+(y+1)] = Math.max(imgData.data[(x*512*4)+(y+1)] + value, 255);
				imgData.data[(x*512*4)+(y+2)] = Math.max(imgData.data[(x*512*4)+(y+2)] + value, 255);
			}
		}
        ctx.putImageData(imgData, 0, 0);
	}

	function multiply_canvas_by_factor(contrast)
	{   
		var imgData = ctx.getImageData(0, 0, 512, 512);
        contrast = (contrast/100) + 1;
		var intercept = 128 * (1 - contrast);
		// contrast apply
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] 	= imgData.data[i]	*contrast + intercept;
            imgData.data[i+1] 	= imgData.data[i+1]	*contrast + intercept;
            imgData.data[i+2] 	= imgData.data[i+2]	*contrast + intercept;
            imgData.data[i+3] 	= 255;
        }
        ctx.putImageData(imgData, 0, 0);
	}
	
	function grayscale_image_filter(value)
    {
        var imgData = ctx.getImageData(0, 0, 512, 512);
        for (let i = 0; i < imgData.data.length; i += 4) {
            gray = (imgData.data[i] * 0.2126 + imgData.data[i+1] * 0.7152 + imgData.data[i+2] * 0.0722)
			imgData.data[i] = 	imgData.data[i]  *(100-value)/100 	+ gray*value/100;
            imgData.data[i+1] = imgData.data[i+1]*(100-value)/100 	+ gray*value/100;
            imgData.data[i+2] = imgData.data[i+2]*(100-value)/100 	+ gray*value/100;
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

	function invert_image_filter(value)
    {
        var imgData = ctx.getImageData(0, 0, 512, 512);
		factor = (value - 50) * 2 / 100;
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] 	= 255*value/100 - imgData.data[i]   * factor;
            imgData.data[i+1] 	= 225*value/100 - imgData.data[i+1] * factor;
            imgData.data[i+2] 	= 255*value/100 - imgData.data[i+2] * factor;
            imgData.data[i+3] 	= 255;
        }
		// if 100 -> 255 - val
		// if 50 -> 255/2
		// if 0 -> val
        ctx.putImageData(imgData, 0, 0);
    }

	function change_saturation(value)
    {
        var imgData = ctx.getImageData(0, 0, 512, 512);
		for (let i = 0; i < imgData.data.length; i += 4) {
			// convert to hsv
			hsv = convertRGBtoHSV(imgData.data[i]/255, imgData.data[i+1]/255, imgData.data[i+2]/255);
			hsv.s = Math.min(hsv.s + value/100, 1);
			rgb = convertHSVtoRGB(hsv.h, hsv.s, hsv.v);

            imgData.data[i] 	= 255 * rgb.r;
            imgData.data[i+1] 	= 225 * rgb.g;
            imgData.data[i+2] 	= 255 * rgb.b;
            imgData.data[i+3] 	= 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

	function apply_filter()
    {   
        var imgData = ctx.getImageData(0, 0, 512, 512);
        // invert colors
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i+1] = 225 - imgData.data[i+1];
            imgData.data[i+2] = 255 - imgData.data[i+2];
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }


	// na podstawie:
	// http://www.algorytm.org/modele-barw/transformacja-hsv-rgb.html
	// HSV: H: 0.0 - 359.9, S, V:  0.0 - 1.0
	// RGB: 0.0 - 1.0
	function convertRGBtoHSV(r, g, b)
	{
		let hue, sat;
		let i, f;
		
		let x = Math.min(Math.min(r, g), b);
		let val = Math.max(Math.max(r, g), b);
		if (x == val)
		{
			hue = 0; sat = 0;
		}
		else 
		{
			if(r == x)
			{
				f = g - b; i = 3;
			}
			else if(g == x)
			{
				f = b - r; i = 5;
			}
 			else
			{
				f = r - g; i = 1;
			}		
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
		if(val==0) 
		{
			r = 0; g = 0; b = 0;
		}
		else
		{
			hue /= 60;
			let i = Math.floor(hue);
			let f = hue - i;
			let p = val * (1 - sat);
			let q = val * (1 - (sat*f));
			let t = val * (1 - (sat*(1-f)));
			if (i==0) 
			{
				r = val; g = t; b = p;
			}
			else if (i==1) 
			{
				r = q; g = val; b = p;
			}
			else if (i==2) 
			{
				r = p; g = val; b = t;
			}
			else if (i==3) 
			{
				r = p; g = q; b = val;
			}
			else if (i==4) 
			{
				r = t; g = p; b = val;
			}
			else if (i==5) 
			{
				r = val; g = p; b = q;
			}
		}
		return { 'r': r, 'g': g, 'b': b }
	}


    // -----------------------------------------------------------------------------------------
    // controls

    const blur_slider       = document.getElementById("blur_slider"         );
    const brightness_slider = document.getElementById("brightness_slider"   );
    const contrast_slider   = document.getElementById("contrast_slider"     );
    const grayscale_slider  = document.getElementById("grayscale_slider"    );
    const invert_slider     = document.getElementById("invert_slider"       );
    const saturate_slider   = document.getElementById("saturate_slider"     );
    const sepia_slider      = document.getElementById("sepia_slider"        );


    blur_slider         .addEventListener("change", function(){apply_gaussian_blur(			blur_slider.value		)});
    brightness_slider   .addEventListener("change", function(){apply_brightness_effect(		brightness_slider.value	)});
    contrast_slider     .addEventListener("change", function(){apply_contrast_effect(		contrast_slider.value	)});
    grayscale_slider    .addEventListener("change", function(){apply_grayscale_effect(		grayscale_slider.value	)});
    invert_slider       .addEventListener("change", function(){apply_invert_effect(			invert_slider.value		)});
    saturate_slider     .addEventListener("change", function(){apply_saturation_effect(		saturate_slider.value	)});
    sepia_slider        .addEventListener("change", function(){apply_filter(sepia_slider.value)});


})
