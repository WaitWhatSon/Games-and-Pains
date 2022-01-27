function parse_path_to_list(path)
{
    let list = []

    let temp_list = path.split(/[ ,]+/);

    if(temp_list[0] === "M" || temp_list === "m")
    {
        for(let i = 1; i < temp_list.length; i+=2)
        {
            let point = {x: parseFloat(temp_list[i]), y: parseFloat(temp_list[i+1])};
            list.push(point);
        }
    }

    return list;
}

export {parse_path_to_list}