const svgns = "http://www.w3.org/2000/svg";

function displayHistogram(array, color)
{
    for(let i = 0; i < 256; i++)
    {
        let svgElem = document.getElementById("rect" + i + color);
        svgElem.setAttribute("height", array[i]/100+"px");
        svgElem.setAttribute("y", 100-array[i]/100 + "px");
        svgElem.style.fill = color;
    }
}

function initHistogram(histogram, color)
{
    for(let i = 0; i < 256; i++)
    {
        let rect = makeRectangle(i, i, 100, 1, 0, color);
        histogram.appendChild(rect);
    }
}

function makeRectangle(id, x, y, width, height, fill)
{
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id', 'rect' + id + fill);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute("fill", fill);
    return rect;
}

export {initHistogram, displayHistogram}