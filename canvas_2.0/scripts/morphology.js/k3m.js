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

function phase(imgData, canvas, W)
{
	let row = canvas.width*4;
    let shift = 1;
    
    for(let y = shift; y < canvas.height-shift; y++)
    {
        for(let x = shift*4; x < row-shift*4; x+=4)
        { // iterate through pixels
			let pixelB = B.data[y*row + x];
			if(pixelB == BORDER) // pixel is marked
			{
				let weight = 0;
				for(let j = -shift; j <= shift; j++)
                {
                    for(let k = -shift; k <= shift; k++)
                    {
                        let pixelVal = imgData.data[ ((y+j) * row ) + ( x + (4*k)) ];
						weight += N[j+shift][k+shift] * pix(pixelVal);
					}
				}
				if(W.includes(weight)) // remove pixel from border
				{
					change = true;
					// on image
					imgData.data[y*row + x + 0] = 255;
					imgData.data[y*row + x + 1] = 255;
					imgData.data[y*row + x + 2] = 255;
					// on Bimage
					B.data[y*row + x + 0] = 255;
				}
			}
		}
	}
    return imgData;
}
 
function border(imgData, canvas, A0)
{
    let ctx = canvas.getContext("2d");
	var B =   ctx.createImageData(canvas.width, canvas.height); // image with borders
	let row = canvas.width*4;
    let shift = 1;
    
    for(let y = shift; y < canvas.height-shift; y++)
    {
        for(let x = shift*4; x < row-shift*4; x+=4)
        { // iterate through pixels
			let pixelVal = imgData.data[y*row + x];
			let bit = pix(pixelVal); // 0 or 1
			if(bit == 0) // white -> background
			{ // remains white
				B.data[y*row + x + 0] = 255; 
				B.data[y*row + x + 1] = 255;
				B.data[y*row + x + 2] = 255;
				B.data[y*row + x + 3] = 255;
			}
			else // black -> mark border
			{ // calculate weight to check if border
				let weight = 0;
				for(let j = -shift; j <= shift; j++)
                {
                    for(let k = -shift; k <= shift; k++)
                    {
                        let pixelVal = imgData.data[ ((y+j) * row ) + ( x + (4*k)) ];
						weight += N[j+shift][k+shift] * pix(pixelVal);
					}
				}
				if(A0.includes(weight))
				{ // mark as border
					B.data[y*row + x + 0] = BORDER; 
					B.data[y*row + x + 1] = 255;
					B.data[y*row + x + 2] = 255;
					B.data[y*row + x + 3] = 255;
				}
				else
				{ // remains black
					B.data[y*row + x + 0] = 0; 
					B.data[y*row + x + 1] = 0;
					B.data[y*row + x + 2] = 0;
					B.data[y*row + x + 3] = 255;
				}
			}
		}
	}
	return B;
} 

function skeletize(canvas, imgData){
    let flag = true;
	change = true;
    while(change){
		change = false;
		B    	= border(imgData, canvas, A0); // Mark borders on image
        imgData = phase( imgData, canvas, A1); // delete borders with 3 neighbours
        imgData = phase( imgData, canvas, A2); // delete borders with 3, 4 neighbours
        imgData = phase( imgData, canvas, A3); // ...
        imgData = phase( imgData, canvas, A4);
        imgData = phase( imgData, canvas, A5);
        if(!change)
		{
			flag = false;
		} 
	}
	return imgData;
}

export default function K3M(canvas)
{
	// K3M main
    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let data = skeletize(canvas, imgData)
    
	return data;
}





// based on Python implementatnion:
// https://pyamenities.wordpress.com/2011/12/12/python-implementation-of-k3m-skeletonization-algorithm/
// ------------------------------------------------
// algorithm:
// K3M: A UNIVERSAL ALGORITHM FOR IMAGE SKELETONIZATION
// AND A REVIEW OF THINNING TECHNIQUES
// K. SAEED, M. TABĘDZKI, M. RYBNIK, M. ADAMSKI
// 2010
