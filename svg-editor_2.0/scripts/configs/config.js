let svg = {
    image: null,
    svgns: "http://www.w3.org/2000/svg",
}

let mouse = {
    x: null,
    y: null,
    last_click_x: null,
    last_click_y: null,
    prev_x: null,
    prev_y: null,
}

let shape = {
    current: null,
    dragged: null,
    id: 0,
}

let controls = {
    point_zero: null,
    point_scalable: null,
    point_rotation: null,
}

let tools = {
    tool: null,
}

let colors = {
    fill: "#000000",
    stroke: "#000000",
}

let shapes_list = [];

export {svg, mouse, shape, shapes_list, tools, controls, colors}