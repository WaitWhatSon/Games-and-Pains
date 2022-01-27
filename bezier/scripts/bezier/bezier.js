import config_bezier from "../config/config_bezier.js";

export default function bezier(plist)
{
    // https://stackoverflow.com/questions/31167663/how-to-code-an-nth-order-bezier-curve/31169371

    function binom(n, k) 
    {
        // from: http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
        let coeff = 1;
        for (let i = n - k + 1; i <= n; i++) 
        {
            coeff *= i;
        }
        for (let i = 1; i <= k; i++) 
        {
            coeff /= i;
        }
        return coeff;
    }

    function bezierN(t, plist) 
    {
        // based on: https://stackoverflow.com/questions/16227300
        let  order = plist.length - 1;

        let y = 0;
        let x = 0;

        for (let i = 0; i <= order; i++) 
        {
            x = x + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].x));
            y = y + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].y));
        }

        return { x: x, y: y };
    }

    let points = [];

    for (let i = 0; i < 1; i += config_bezier.accuracy)
    {
        let p = bezierN(i, plist);
        points.push(p);
    }

    return points;

}