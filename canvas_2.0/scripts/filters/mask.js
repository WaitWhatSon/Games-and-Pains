// - [ ] 1. Filtr wygładzający (uśredniający),
function smoothing(window)
{
    let value = window.reduce(
        function(prev, current)
        {
            return prev + current;
        }, 0
    ) / window.length;
    return value;
}

// - [ ] 2. Filtr medianowy,
function median(window)
{
    window.sort(
        function(a, b)
        {
            return a - b;
        });
      
    let half = Math.floor(window.length / 2);
        
    if (window.length % 2)
    {
        return window[half];
    }
    return (window[half - 1] + window[half]) / 2.0;
}

// - [ ] 3. Filtr wykrywania krawędzi (sobel),
function sobel(window, mask)
{
    let value = 0;

    for(let i = 0; i < window.length; i++)
    {
        value += window[i] * mask[i];
    }

    return value;
}

// - [ ] 4. Filtr górnoprzepustowy wyostrzający,
function sharpening(window)
{
    let mask = Array(window.length).fill(-1);
    let mid = Math.floor(window.length/2);
    mask[mid] = window.length;

    let value = 0;

    for(let i = 0; i < window.length; i++)
    {
        value += window[i] * mask[i];
    }

    return value;
}

// - [ ] 5. Filtr rozmycie gaussowskie,
function blur(window, mask)
{
    let value = 0;

    for(let i = 0; i < window.length; i++)
    {
        value += window[i] * mask[i];
    }

    return value;
}


export {smoothing, median, sobel, sharpening, blur}