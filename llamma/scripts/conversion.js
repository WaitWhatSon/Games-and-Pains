function RGBtoCMYK(R, G, B)
{
    let K = Math.min(1-R/255, 1-G/255, 1-B/255);
    let C, M, Y;
    C = (1-R/255-K)/(1-K);
    M = (1-G/255-K)/(1-K);
    Y = (1-B/255-K)/(1-K);
    C = isNaN(C) ? 0 : C;
    M = isNaN(M) ? 0 : M;
    Y = isNaN(Y) ? 0 : Y;  
    return {"C":C, "M":M, "Y":Y, "K":K}
}

function CMYKtoRGB(C, M, Y, K)
{
    let R = 255 * (1-C) * (1-K);
    let G = 255 * (1-M) * (1-K);
    let B = 255 * (1-Y) * (1-K);
    return {"R":R, "G":G, "B":B}
}

export {RGBtoCMYK, CMYKtoRGB}