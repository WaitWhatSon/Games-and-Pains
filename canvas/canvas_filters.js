
window.addEventListener("load", () => {

    // -----------------------------------------------------------------
    // consts

    const canvas    = document.getElementById("myCanvas");
    const ctx       = canvas.getContext("2d");

    // --------------------------------------------------------------------
    // variables


    // --------------------------------------------------------------------
    // functions
    
    function apply_filter(kernel)
    {
        console.log(kernel)
        
        var imgData = ctx.getImageData(0, 0, 512, 512);
        var tempData = ctx.getImageData(0, 0, 512, 512);
        
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

    function apply_gaussian_blur(value)
    {

        console.log(value)

    }













/*Function: Two-dimensional Gaussian kernel generation
 //kernel: Store the generated Gaussian kernel
 //size: the size of the core
 //sigma: standard deviation of normal distribution
*/

function get_gau_kernel(size, sigma)
{
	if (size <= 0 || sigma == 0)
		return;
 
	var x, y;
	var m = size / 2;
	var sum = 0;
    var kernel = [[],[],[]];
 
	//get kernel
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
			kernel[y][x] = (1 / (2 * PI * sigma * sigma)) * exp(-((x - m) * (x - m) + (y - m) * (y - m)) / (2 * sigma * sigma));
			sum += kernel[y][x];
		}
	}
 
	//normal
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
			kernel[y][x] /= sum;
		}
	}

    return kernel;
}
 
 
// https://www.programmersought.com/article/91255056564/

 /*Function: Gaussian Blur
 //src: input original image
 //dst: Blurred image
 //size: the size of the core
 //sigma: standard deviation of normal distribution
*/


function gaussian(src, dst, size, sigma)
{
	kernel = get_gau_kernel(3, sigma);
 
	 //gaussian convolution, the boundary is not processed at this time
	for (y = m; y <  h - m ; y++)
	{
		for (x = m; x < w - m; x++)
		{
 
			let value = 0;
			let k = 0;
			for (j = -m; j < m;j++)
			{
				for (i = -m; i < m; i++)
				{
					temp = src_ptr[(y + j) * w + (x + i)];
					temp1 = kernel_vec[k++];
					value += temp * temp1;
				}
			}
 
			dst_ptr[x] = (uchar)(value);
		}
 
		dst_ptr += w;
	}

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


    blur_slider         .addEventListener("change", function(){apply_gaussian_blur(blur_slider.value)});
    brightness_slider   .addEventListener("change", function(){apply_filter(brightness_slider.value)});
    contrast_slider     .addEventListener("change", function(){apply_filter(contrast_slider.value)});
    grayscale_slider    .addEventListener("change", function(){apply_filter(grayscale_slider.value)});
    invert_slider       .addEventListener("change", function(){apply_filter(invert_slider.value)});
    saturate_slider     .addEventListener("change", function(){apply_filter(saturate_slider.value)});
    sepia_slider        .addEventListener("change", function(){apply_filter(sepia_slider.value)});


})










/*Function: Two-dimensional Gaussian kernel generation
 //kernel: Store the generated Gaussian kernel
 //size: the size of the core
 //sigma: standard deviation of normal distribution
*/

/* 
void get_gau_kernel(float **kernel, int size, float sigma)
{
	if (size <= 0 || sigma == 0)
		return;
 
	int x, y;
	int m = size / 2;
	float sum = 0;
 
	//get kernel
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
			kernel[y][x] = (1 / (2 * PI * sigma * sigma)) * exp(-((x - m) * (x - m) + (y - m) * (y - m)) / (2 * sigma * sigma));
			sum += kernel[y][x];
		}
	}
 
	//normal
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
			kernel[y][x] /= sum;
		}
	}
}
 
 
// https://www.programmersought.com/article/91255056564/

 /*Function: Gaussian Blur
 //src: input original image
 //dst: Blurred image
 //size: the size of the core
 //sigma: standard deviation of normal distribution
*/

/*
void gaussian(image_t *src, image_t *dst, int size, float sigma)
{
	if (src->w == 0 || src->h == 0)
		return;
 
	int y, x;
	int i, j;
	int m = size / 2;
	float value;
 
	float **kernel = (float**)malloc(size * sizeof(float*));
	for (i = 0; i < size; i++)
		kernel[i] = (float*)malloc(size * sizeof(float));
 
	get_gau_kernel(kernel,size,sigma);
 
	float *kernel_vec = (float*)malloc(size * size * sizeof(float));
 
	 //kernel two-dimensional to one-dimensional
	int k = 0;
	for (j = 0; j < size; j++)
	{
		for (i = 0; i < size; i++)
		{
			kernel_vec[k++] = kernel[j][i];
		}
	}
 
	uchar *src_ptr = src->data + m * src -> w;
	uchar *dst_ptr = dst->data + m * dst -> w;
	 //gaussian convolution, the boundary is not processed at this time
	for (y = m; y < src -> h - m ; y++)
	{
		for (x = m; x < src->w - m; x++)
		{
 
			value = 0;
			k = 0;
			for (j = -m; j < m;j++)
			{
				for (i = -m; i < m; i++)
				{
					uchar temp = src_ptr[(y + j) * src->w + (x + i)];
					float temp1 = kernel_vec[k++];
					value += temp * temp1;
				}
			}
 
			dst_ptr[x] = (uchar)(value);
		}
 
		dst_ptr += dst->w;
	}
 
	free(kernel_vec);
	for (i = 0; i < size; i++)
		free(kernel[i]);
	free(kernel);
}

*/