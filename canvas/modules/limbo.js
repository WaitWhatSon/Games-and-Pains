// never used in project


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