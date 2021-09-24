const BORDER = 100;

let N = [[32,64,128], [16,0,1], [8,4,2]];
const A0 = [3,6,7,12,14,15,24,28,30,31,48,56,60,62,63,96,112,120,124,
      126,127,129,131,135,143,159,191,192,193,195,199,207,223,224,
      225,227,231,239,240,241,243,247,248,249,251,252,253,254];
const A1 = [7, 14, 28, 56, 112, 131, 193, 224];
const A2 = [7, 14, 15, 28, 30, 56, 60, 112, 120, 131, 135, 193, 195, 224, 225, 240];
const A3 = [7, 14, 15, 28, 30, 31, 56, 60, 62, 112, 120, 124, 131, 135, 143, 193, 195, 
	199, 224, 225, 227, 240, 241, 248];
const A4 = [7, 14, 15, 28, 30, 31, 56, 60, 62, 63, 112, 120, 124, 126, 131, 135, 143, 
	159, 193, 195, 199, 207, 224, 225, 227, 231, 240, 241, 243, 248, 249, 252];
const A5 = [7, 14, 15, 28, 30, 31, 56, 60, 62, 63, 112, 120, 124, 126, 131, 135, 143, 159, 191, 
      193, 195, 199, 207, 224, 225, 227, 231, 239, 240, 241, 243, 248, 249, 251, 252, 254];

const pix = (x) => 
	{ 
		if(x > 0)	{ return 0; } // - white -> background
	 	else		{ return 1; } // - black -> foreground
	}
 
let change;
let B;

function phase(imgData, W)
{
	for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{
			let pixelB = B.data[((x)*512*4)+(y)];
			if(pixelB == BORDER) // pixel is marked
			{
				let weight = 0;
				for(let i = -1; i<=1; i++)
				{
					for(let j = -1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += N[i+1][j+1] * pix(pixelVal);
					}
				}
				if(W.includes(weight)) // remove pixel from border
				{
					change = true;
					// on image
					imgData.data[((x)*512*4)+(y)+0] = 255;
					imgData.data[((x)*512*4)+(y)+1] = 255;
					imgData.data[((x)*512*4)+(y)+2] = 255;
					// on Bimage
					B.data[((x)*512*4)+(y)+0] = 255;
				}
			}
		}
	}
    return imgData;
}
 
function border(imgData, ctx, A0)
{
	var B = ctx.createImageData(512, 512); // image with borders
	for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
			let pixelVal = imgData.data[((x)*512*4)+(y)];
			let bit = pix(pixelVal); // 0 or 1
			if(bit == 0) // white -> background
			{ // remains white
				B.data[((x)*512*4)+(y)+0] = 255; 
				B.data[((x)*512*4)+(y)+1] = 255;
				B.data[((x)*512*4)+(y)+2] = 255;
				B.data[((x)*512*4)+(y)+3] = 255;
			}
			else // black -> mark border
			{ // calculate weight to check if border
				let weight = 0;
				for(let i=-1; i<=1; i++)
				{
					for(let j=-1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += N[i+1][j+1] * pix(pixelVal);
					}
				}
				if(A0.includes(weight))
				{ // mark as border
					B.data[((x)*512*4)+(y)+0] = BORDER; 
					B.data[((x)*512*4)+(y)+1] = 255;
					B.data[((x)*512*4)+(y)+2] = 255;
					B.data[((x)*512*4)+(y)+3] = 255;
				}
				else
				{ // remains black
					B.data[((x)*512*4)+(y)+0] = 0; 
					B.data[((x)*512*4)+(y)+1] = 0;
					B.data[((x)*512*4)+(y)+2] = 0;
					B.data[((x)*512*4)+(y)+3] = 255;
				}
			}
		}
	}
	return B;
} 

function skeletize(ctx, imgData){
    let flag = true;
	change = true;
    while(change){
		change = false;
		B    	= border(imgData, ctx, A0); // Mark borders on image
        imgData = phase( imgData,	   A1); // delete borders with 3 neighbours
        imgData = phase( imgData,	   A2); // delete borders with 3, 4 neighbours
        imgData = phase( imgData,	   A3); // ...
        imgData = phase( imgData,	   A4);
        imgData = phase( imgData,	   A5);
        if(!change)
		{
			flag = false;
		} 
	}
	return imgData;
}

function K3M(ctx, imgData)
{
	// K3M main
	return skeletize(ctx, imgData);
}

// ---EXPORT---
export { 
	K3M, 
}





// based on Python implementatnion:
// https://pyamenities.wordpress.com/2011/12/12/python-implementation-of-k3m-skeletonization-algorithm/
// ------------------------------------------------
// algorithm:
// K3M: A UNIVERSAL ALGORITHM FOR IMAGE SKELETONIZATION
// AND A REVIEW OF THINNING TECHNIQUES
// K. SAEED, M. TABĘDZKI, M. RYBNIK, M. ADAMSKI
// 2010
