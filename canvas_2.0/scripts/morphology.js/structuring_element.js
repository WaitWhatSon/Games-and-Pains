const ZERO = 255;
const ONE = 0;

function structuring_element_init()
{
    init_button("s_e_0");
    init_button("s_e_1");
    init_button("s_e_2");
    init_button("s_e_3");
    init_button("s_e_4");
    init_button("s_e_5");
    init_button("s_e_6");
    init_button("s_e_7");
    init_button("s_e_8");
}

function get_structuring_element()
{
    let element = [
        [decode_value("s_e_0"), decode_value("s_e_1"), decode_value("s_e_2")],
        [decode_value("s_e_3"), decode_value("s_e_4"), decode_value("s_e_5")],
        [decode_value("s_e_6"), decode_value("s_e_7"), decode_value("s_e_8")]
    ]
    return element;
}

function init_button(id)
{
    document.getElementById(id).addEventListener("click", function(){
        let value = parseInt(this.value);
        if(value === 0)
        {
            this.value = 1;
            this.innerHTML = "1";
        }
        else if(value === 1)
        {
            this.value = 2;
            this.innerHTML = "X";
        }
        else if(value === 2)
        {
            this.value = 0;
            this.innerHTML = "0";
        }
    });
}

function decode_value(id)
{
    let value = parseInt(document.getElementById(id).value);
    if(value === 0)
    {
        return ZERO;
    }
    else if(value === 1)
    {
        return ONE;
    }
    else
    {
        return undefined;
    }
}

export {structuring_element_init, get_structuring_element}