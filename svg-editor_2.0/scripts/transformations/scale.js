import { multiply } from "../matrices/multiply.js";

function scale(p, s)
{
    let P = [[p.x], [p.y], [1]];

    let S = [   [s.x,   0,      0],
                [0,     s.y,    0],
                [0,     0,      1]    ];

    let result = multiply(S, P);

    let new_point = {x: result[0][0], y: result[1][0]};

    return new_point;
}

export {scale}