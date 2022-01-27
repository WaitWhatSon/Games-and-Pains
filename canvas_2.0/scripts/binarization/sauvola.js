export default function sauvola(canvas, winSize)
{
    let data_original = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let imageData = canvas.getContext("2d").createImageData(data_original);
    let data = imageData.data;
    let row = canvas.width*4;

    // loop with window of size 3
    // image x y // window j k

    for(let y = 0; y < canvas.height; y++)
	{	
		for(let x = 0; x < row; x+=4)
		{
			let windowR = [];
            let windowG = [];
            let windowB = [];
            
            for (let j = -(winSize-1)/2; j <= (winSize-1)/2; j++)
            {
                for (let k = -(winSize-1)/2; k <= (winSize-1)/2; k++)
                {
                    windowR.push(data_original.data[ ((y+j) * row ) + ( x + (4*k + 0)) ]);
                    windowG.push(data_original.data[ ((y+j) * row ) + ( x + (4*k + 1)) ]);
                    windowB.push(data_original.data[ ((y+j) * row ) + ( x + (4*k + 2)) ]);
                }                
            }
            
            let sumR = windowR.reduce((acc, val) => acc + val, 0);
            let sumG = windowG.reduce((acc, val) => acc + val, 0);
            let sumB = windowB.reduce((acc, val) => acc + val, 0);

            let meanR = sumR / (winSize * winSize);
            let meanG = sumG / (winSize * winSize);
            let meanB = sumB / (winSize * winSize);
            
            let varianceR = 0;
            let varianceG = 0;
            let varianceB = 0;

            windowR.forEach(value => {
                varianceR += ((value - meanR) * (value - meanR));
            });
            windowG.forEach(value => {
                varianceG += ((value - meanG) * (value - meanG));
            });
            windowB.forEach(value => {
                varianceB += ((value - meanB) * (value - meanB));
            });

            varianceR /= (winSize * winSize);
            varianceG /= (winSize * winSize);
            varianceB /= (winSize * winSize);
            
            let sigmaR = Math.sqrt(varianceR);
            let sigmaG = Math.sqrt(varianceG);
            let sigmaB = Math.sqrt(varianceB);
            
            let k = 0.5;
            let div = 128;

            let thresholdR = meanR + (1 + k * (sigmaR / div - 1));
            let thresholdG = meanG + (1 + k * (sigmaG / div - 1));
            let thresholdB = meanB + (1 + k * (sigmaB / div - 1));

			// set new values
			data[y*row + x    ] = data_original.data[y*row + x    ] >= thresholdR ? 255 : 0;
			data[y*row + x + 1] = data_original.data[y*row + x + 1] >= thresholdG ? 255 : 0;
			data[y*row + x + 2] = data_original.data[y*row + x + 2] >= thresholdB ? 255 : 0;
            data[y*row + x + 3] = 255;
		}
	}
    
    return imageData;
}