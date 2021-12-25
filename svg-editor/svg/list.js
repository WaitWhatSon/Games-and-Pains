import selectShape from "../edit/selectShape.js"
import config from "./config.js";

let list = []
const list_div = document.getElementById("shapeslist");

function addShape(shape)
{
    list.push(shape)
}

function dispalyOnList(shape)
{
    let element = document.createElement("li");
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', '51.2');
    svg.setAttribute('width', '51.2');
    svg.setAttribute('id', 't');
    let newShape = shape.cloneNode();
    newShape.style.transform = "scale(0.1)"
    svg.appendChild(newShape);
    var text = document.createTextNode(shape.getAttribute("id"));
    var textdiv = document.createElement("div");
    textdiv.className = "textdiv";
    textdiv.appendChild(text);  
    var deleteButton = document.createElement("button");
    deleteButton.className = "deletebutton";
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", () => deleteElement(element, shape));
    element.appendChild(svg);
    element.appendChild(textdiv);
    element.appendChild(deleteButton);
    element.onclick = () => { selectElement(element) };
    shape.addEventListener("click", ()=> selectElement(element) );
    list_div.appendChild(element);
    return {"element": element, "shape": shape};
}

function selectElement(element){
    if(config.currentTool == "select")
    {
        let result = list.filter(obj => {
            return obj.element === element;
        })
        if(result != null)
        {
            selectShape(result[0]);
        }
    }
}

function deleteElement(element, shape)
{
    const index = list.indexOf(element);
    if (index > -1) {
        list.splice(index, 1);
    }

    shape.remove();
    element.remove();
}

function update(shape, newShape)
{
    console.log("eloeloeloelo");
    newShape = shape.cloneNode();
    newShape.style.transform = "scale(0.1)";
}

export default function serialize(shape)
{
    let element = dispalyOnList(shape);
    addShape(element);
}