import list_data from "./list_data.js";

const list = document.getElementById("content_list");

for(let element of list_data)
{
    addListPosition(element);
}

console.log();


function addListPosition(element)
{
    let outer_box = document.createElement("div");
    outer_box.className = "outer_box";

    outer_box.appendChild(getImageButton(element.image_button));
    outer_box.appendChild(getInfoTable(element.info_table));

    list.appendChild(outer_box);
}

function getImageButton(data)
{
    let image_button_box = document.createElement("div");
    image_button_box.className = "image_button_box";

    let image = document.createElement("img");
    image.className = "image_button_box_img";
    image.src = data.image_src;
    
    let link_box = document.createElement("a");
    link_box.className = "link_box";
    link_box.innerHTML = data.name;
    link_box.href = data.href;

    image_button_box.appendChild(image);
    image_button_box.appendChild(link_box);

    return image_button_box;
}

function getInfoTable(data)
{
    let info_table = document.createElement("fieldset");
    info_table.className = "info_table";

    let legend = document.createElement("legend");
    legend.innerHTML = "Credits";

    let grid_container = document.createElement("div");
    grid_container.className = "grid-container";

    for(let element of data)
    {
        let row = document.createElement("div");
        row.className = "grid-container-row"
        row.innerHTML = element;
        grid_container.appendChild(row);
    }
    
    info_table.appendChild(legend);
    info_table.appendChild(grid_container);

    return info_table;
}