function multiply(M, N)
{
    let M_width = M[0].length;
    let M_height = M.length;
    let N_width = N[0].length;
    let N_height = N.length;

    if(M_width != N_height)
    {
        return;
    }

    let result = [];

    for(let m = 0; m < M_height; m++) // for rząd
    {
        let row = [];
        for(let n = 0; n < N_width; n++) // for kolumna
        {
            let sum = 0;
            // for każdy element w rzędzie razy w kolumnie
            for(let i = 0; i < M_width; i++)
            {
                sum += M[m][i] * N[i][n];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;

}

export {multiply}