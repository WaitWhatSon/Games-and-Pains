const ONE   = 1;
const TWO   = 2;
const THREE = 3;
const FOUR  = 200;
const BLACK = 0;
const WHITE = 255;

let change;

const pix = (x) => 
	{ 
		if(x == WHITE)	{ return 0; } // - white -> background
	 	else		    { return 1; } // - black -> foreground
	}

const Fours = [ 3, 6, 12, 24, 48, 96, 192, 129, 7, 14, 28, 56, 112, 
    224, 193, 131, 15, 30, 60, 120, 240, 225, 195, 135 ];

const Deletions = [ 3, 5, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 
    30, 31, 48, 52, 53, 54, 55, 56, 60, 61, 62, 63, 65, 67, 69, 71, 
    77, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 
    97, 99, 101, 103, 109, 111, 112, 113, 115, 116, 117, 118, 119, 
    120, 121, 123, 124, 125, 126, 127, 131, 133, 135, 141, 143, 149, 
    151, 157, 159, 181, 183, 189, 191, 192, 193, 195, 197, 199, 205, 
    207, 208, 209, 211, 212, 213, 214, 215, 216, 217, 219, 220, 221, 
    222, 223, 224, 225, 227, 229, 231, 237, 239, 240, 241, 243, 244, 
    245, 246, 247, 248, 249, 251, 252, 253, 254, 255 ];
		

const M = [[128,  1, 2], [64,  0, 4], [32, 16, 8]];

function bitmapImage(imgData)
{
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        if(pix(imgData.data[i])==1)
        {
            imgData.data[i] = ONE;
        }
    }
    return imgData;
}

function markTWO(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == ONE)
            {
                if(
                    imgData.data[((x-1)*512*4)+(y)] == WHITE ||
                    imgData.data[((x+1)*512*4)+(y)] == WHITE ||
                    imgData.data[((x)*512*4)+(y+(4*1))] == WHITE ||
                    imgData.data[((x)*512*4)+(y+(4*-1))] == WHITE
                )
                {
                    imgData.data[((x)*512*4)+(y)] = TWO;
                }
            }
        }
    }
    return imgData;
}

function markTHREE(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == ONE)
            {
                if(
                    imgData.data[((x-1)*512*4)+(y+(4*-1))] == WHITE ||
                    imgData.data[((x-1)*512*4)+(y+(4*1))] == WHITE ||
                    imgData.data[((x+1)*512*4)+(y+(4*-1))] == WHITE ||
                    imgData.data[((x+1)*512*4)+(y+(4*1))] == WHITE
                )
                {
                    imgData.data[((x)*512*4)+(y)] = THREE;
                }
            }
        }
    }
    return imgData;
}

function markFOUR(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == ONE || pixelVal == TWO || pixelVal == THREE)
            {
                let weight = 0;
				for(let i = -1; i<=1; i++)
				{
					for(let j = -1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += M[i+1][j+1] * pix(pixelVal);
					}
				}
				if(Fours.includes(weight))
				{
					imgData.data[((x)*512*4)+(y)] = FOUR;
				}
            }
        }
    }
    return imgData;
}

function deleteFOUR(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == FOUR)
            {
                let weight = 0;
				for(let i = -1; i<=1; i++)
				{
					for(let j = -1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += M[i+1][j+1] * pix(pixelVal);
					}
				}
				if(Deletions.includes(weight))
				{
					imgData.data[((x)*512*4)+(y)]   = WHITE;
                    imgData.data[((x)*512*4)+(y)+1] = WHITE;
                    imgData.data[((x)*512*4)+(y)+2] = WHITE;
				}
            }
        }
    }
    return imgData;
}

function deleteTWO(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == TWO)
            {
                let weight = 0;
				for(let i = -1; i<=1; i++)
				{
					for(let j = -1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += M[i+1][j+1] * pix(pixelVal);
					}
				}
				if(Deletions.includes(weight))
				{
					imgData.data[((x)*512*4)+(y)]   = WHITE;
                    imgData.data[((x)*512*4)+(y)+1] = WHITE;
                    imgData.data[((x)*512*4)+(y)+2] = WHITE;

                    change = true;
				}
            }
        }
    }
    return imgData;
}

function deleteTHREE(imgData)
{
    for(let x = 0; x < imgData.data.length/(512*4); x++)
	{	
		for(let y = 0; y < imgData.data.length/512; y+=4)
		{ // iterate through pixels
            let pixelVal = imgData.data[((x)*512*4)+(y)];
            if(pixelVal == THREE)
            {
                let weight = 0;
				for(let i = -1; i<=1; i++)
				{
					for(let j = -1; j<=1; j++)
					{
						let pixelVal = imgData.data[((x+i)*512*4)+(y+(4*j))];
						weight += M[i+1][j+1] * pix(pixelVal);
					}
				}
				if(Deletions.includes(weight))
				{
					imgData.data[((x)*512*4)+(y)]   = WHITE;
                    imgData.data[((x)*512*4)+(y)+1] = WHITE;
                    imgData.data[((x)*512*4)+(y)+2] = WHITE;

                    change = true;
				}
            }
        }
    }
    return imgData;
}

function convertBinary(imgData)
{
    for (let i = 0; i < imgData.data.length; i += 4) 
	{
        if(pix(imgData.data[i])==1)
        {
            imgData.data[i] = BLACK;
            imgData.data[i+1] = BLACK;
            imgData.data[i+2] = BLACK;
        }
    }
    return imgData;
}

function KMM(ctx, imgData)
{
    change = true;
    while(change)
    {
        change = false;
        imgData = bitmapImage(imgData);
        imgData = markTWO(imgData);
        imgData = markTHREE(imgData);
        imgData = markFOUR(imgData);
        imgData = deleteFOUR(imgData);
        imgData = deleteTWO(imgData);
        imgData = deleteTHREE(imgData);
        imgData = convertBinary(imgData);
    }
    return imgData;
}

// ---EXPORT---
export {
    KMM,
}



// --------------------------------------------------
// http://home.agh.edu.pl/~saeed/arts/2001%20CAIP.pdf