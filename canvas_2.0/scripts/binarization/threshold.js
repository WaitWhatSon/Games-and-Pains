import apply from "./apply.js"
import set_value from "./last_value.js";

export default function threshold(canvas, value)
{
    set_value("selected_value", value, value, value);
    return apply(canvas, value, value, value);
}