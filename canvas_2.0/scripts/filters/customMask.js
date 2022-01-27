import filterConv from "./filterConv.js"
import buttons from "../controls/buttons.js"

export default function custom_mask_init()
{
    const mask_size_input = document.getElementById("mask_size");
    const mask_div = document.getElementById("mask_div");

    let mask_size = 3;

    generate_inputs(mask_div, mask_size);

    mask_size_input.addEventListener("change", function()
    {
        mask_size = this.value;
        generate_inputs(mask_div, mask_size);
    });


    // ------------- mask ----------------
    buttons.mask.addEventListener("click", function(){

        if(mask_size%2 == 0 || mask_size < 3)
        {
            alert("mask size not supported");
            return;
        }

        let mask_array = init_mask(mask_div);
        let mask = {data: mask_array, width: mask_size, height: mask_size};
        let data = filterConv(canvas, mask);
        document.getElementById("canvas").getContext("2d").putImageData(data, 0, 0);
    });


    document.getElementById("normalize_mask").addEventListener("click", function(){
        let children = mask_div.childNodes;
        let sum = 0;

        for(let child of children)
        {
            if(child.tagName === "INPUT")
            {
                sum += parseFloat(child.value);
            }
        }

        for(let child of children)
        {
            if(child.tagName === "INPUT")
            {
                child.value = child.value/sum;
            }
        }

    });

}

function init_mask(parent)
{
    let mask = [];
    let temp = [];

    let children = parent.childNodes;

    for(let child of children)
    {
        if(child.tagName === "INPUT")
        {
            temp.push(child.value);
        }
        else if(child.tagName === "BR")
        {
            mask.push(temp.slice(0));
            temp = [];
        }
    }

    return mask;
}

function generate_inputs(parent, size)
{
    // clear prev
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }

    // set new
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            let input = document.createElement("input");
            input.type = "number";
            input.value = "1";
            parent.appendChild(input);
        }
        let br = document.createElement("br");
        parent.appendChild(br);
    }

}