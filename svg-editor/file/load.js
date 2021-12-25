import parseLine from "./parseLine.js";
import parseRectangle from "./parseRectangle.js";
import parseCircle from "./parseCircle.js";

function initLoad()
{
    document.getElementById('load_svg').addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload=function()
        {
            let string = fr.result.toString();
            let re = /(<line|<rect|<circle)([^<]*|[^>]*)/g; 
            let array = string.match(re);
            loadToBoard(array);
        }
        let file = this.files[0];
        fr.readAsText(file);
    })
}

export {initLoad}

function loadToBoard(elements)
{   
    for(let element of elements)
    {
        let key = element.substring(1,5);
        if(key === "line")
        {
            parseLine(element);
        }
        if(key === "rect")
        {
            parseRectangle(element);
        }
        if(key === "circ")
        {
            parseCircle(element);
        }
    }
}