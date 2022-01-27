export default function RGBtoHSV(R, G, B)
{
    let r = R/255;
    let g = G/255;
    let b = B/255;

	let Cmax = Math.max(r, g, b);
	let Cmin = Math.min(r, g, b);

    let hue, sat, val;

    val = Cmax

    if(Cmax == Cmin)
    {
        hue = 0;
        sat = 0;
    }
    else
    {
        let i, f;

        if		(r == Cmin) 	{ f = g - b; i = 3; }
		else if	(g == Cmin)	    { f = b - r; i = 5; }
 		else 				{ f = r - g; i = 1; }		
 		hue = ((i-f/(val-Cmin))*60)%360;
		sat = ((val-Cmin)/val);
    }
   
	return { h: hue, s: sat, v: val }
}