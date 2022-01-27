import { colors, shape } from "../configs/config.js";

export default function init_colors()
{
    document.getElementById("fill_color").addEventListener("change", function(){
        colors.fill = this.value;

        if(shape.current != null)
        {
            shape.current.setAttributeNS(null, 'fill', colors.fill);
        }
    });

    document.getElementById("stroke_color").addEventListener("change", function(){
        colors.stroke = this.value;

        if(shape.current != null)
        {
            shape.current.setAttributeNS(null, 'stroke', colors.stroke);
        }
    });
}