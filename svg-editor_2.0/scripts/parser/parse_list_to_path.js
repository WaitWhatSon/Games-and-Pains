function parse_list_to_path(list)
{
    let string = "M";

    for(let i = 0; i < list.length; i++)
    {
        string = string + " " + list[i].x + "," + list[i].y;
    }

    return string;
}

export {parse_list_to_path}