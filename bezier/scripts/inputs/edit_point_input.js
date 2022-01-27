export default function edit_point_input(id, attribute, input)
{
    let index = plist.findIndex(p => p.id === parseInt(id));
    let svg = document.getElementById(id);

    if(attribute === "x")
    {
        plist[index].x = input.value;
        svg.setAttribute("cx", input.value);
    }
    else if(attribute === "y")
    {
        plist[index].y = input.value;
        svg.setAttribute("cy", input.value);
    }
    draw();
}