import config from "../svg/config.js";
import {makeLine} from "../svg/shapes.js"
import serialize from "../svg/list.js";

export default function parseLine(svgString)
{
    let attributes = svgString.substring(0, svgString.length-1).split(" ");
    attributes.shift();

    for(let attr of attributes)
    {
        let splited = attr.split("=");
        if(splited[0] === "x1" || splited[0] === "y1" ||  splited[0] === "x2" ||  splited[0] === "y2")
        {
            let num = parseFloat(splited[1].substring(1, splited[1].length-1));
            splited[1] = num;
        }
        else
        {
            splited[1] = splited[1].substring(1, splited[1].length-1)
        }
        config[splited[0]] = splited[1];
    }
    let line = makeLine();
    serialize(line);
}