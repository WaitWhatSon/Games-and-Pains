function createSquare()
{
    const section = document.querySelector("section");
    const square = document.createElement("span");

    var size = Math.random() * 50;

    square.style.width  = size + 'px';
    square.style.height = size + 'px';

    square.style.top  = (Math.random() * section.clientHeight-2*size) + size + 'px';
    square.style.left = (Math.random() * section.clientWidth- 2*size) + size  + 'px';
    
    section.appendChild(square);

    setTimeout(() => {
        square.remove();
    }, 5000);

}

setInterval(createSquare, 150);

function createBaby()
{
    const section = document.querySelector("section");
    const baby = document.createElement("img");
    baby.src = "baby.svg"

    var size = Math.random() * 50;

    baby.style.width  = size + 'px';
    baby.style.height = size + 'px';

    baby.style.top  = (Math.random() * section.clientHeight-2*size) + size + 'px';
    baby.style.left = (Math.random() * section.clientWidth- 2*size) + size  + 'px';
    
    section.appendChild(baby);

    setTimeout(() => {
        baby.remove();
    }, 5000);

}

setInterval(createBaby, 150);

function createLogo()
{
    const section = document.querySelector("section");
    const logo = document.createElement("img");
    logo.src = "PB.svg"

    var size = Math.random() * 50;

    logo.style.width  = size + 'px';
    logo.style.height = size + 'px';

    logo.style.top  = (Math.random() * section.clientHeight-2*size) + size + 'px';
    logo.style.left = (Math.random() * section.clientWidth- 2*size) + size  + 'px';
    
    section.appendChild(logo);

    setTimeout(() => {
        logo.remove();
    }, 5000);

}

setInterval(createLogo, 150);