import parse_path from "./parse_path.js";

function load(element)
{
    var fr = new FileReader();
    fr.onload=function()
    {
        let string = fr.result.toString();
        let re = /(<path)([^<]*|[^>]*)/g; 
        let array = string.match(re);
        load_to_board(array);
    }
    let file = element.files[0];
    fr.readAsText(file);
}

export {load}

function load_to_board(elements)
{   
    for(let element of elements)
    {
        parse_path(element);
    }
}