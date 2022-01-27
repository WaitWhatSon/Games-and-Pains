import { multiply } from "../matrices/multiply.js";

function rotate(p, r)
{
    let P = [[p.x], [p.y], [1]];

    let fi = r * Math.PI / 180;

    let R = [   [Math.cos(fi),  -Math.sin(fi),  0],
                [Math.sin(fi),  Math.cos(fi),   0],
                [0,             0,              1]    ];

    let result = multiply(R, P);

    let new_point = {x: result[0][0], y: result[1][0]};

    return new_point;
}

export {rotate}