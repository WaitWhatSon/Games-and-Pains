export default function HSVtoRGB(H, S, V)
{
    let C = V * S;
    let X = C * (1 - Math.abs((H / 60) % 2 - 1));
    let m = V - C;

    let r, g, b;
    if(0<=H && H < 60)
    {
        r = C + m;
        g = X + m;
        b = 0 + m;
    }
    else if(60<=H && H < 120)
    {
        r = X + m;
        g = C + m;
        b = 0 + m;
    }
    else if(120<=H && H < 180)
    {
        r = 0 + m;
        g = C + m;
        b = X + m;
    }

    else if(180<=H && H < 240)
    {
        r = 0 + m;
        g = X + m;
        b = C + m;
    }

    else if(240<=H && H < 300)
    {
        r = X + m;
        g = 0 + m;
        b = C + m;
    }
    else if(300<=H && H < 360)
    {
        r = C + m;
        g = 0 + m;
        b = X + m;
    }
    else
    {
        r = 0;
        g = 0;
        b = 0;
    }

    return {r: r*255, g: g*255, b: b*255}
}
