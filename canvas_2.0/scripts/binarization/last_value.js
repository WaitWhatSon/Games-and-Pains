export default function set_value(id, value_r, value_g, value_b)
{
    document.getElementById(id).innerHTML = "r" + value_r + " / g" + value_g + " / b" + value_b;
}