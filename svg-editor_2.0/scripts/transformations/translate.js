import { multiply } from "../matrices/multiply.js";

function translate(p, t)
{
    let P = [[p.x], [p.y], [1]];

    let T = [   [1, 0,  t.x],
                [0, 1,  t.y],
                [0, 0,  1  ]    ];

    let result = multiply(T, P);

    let new_point = {x: result[0][0], y: result[1][0]};

    return new_point;
}

export {translate}