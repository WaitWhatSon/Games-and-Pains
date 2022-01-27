export default function init_grid()
{
    let canvas = document.getElementById("grid");
    let ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    // TO DO: GRIDA RYSOWAĆ, DODAĆ WŁĄCZANIE I WYŁĄCZANIE, DODAĆ KRÓTKIE LOGI DO OKIENKA

    for(let i = 0; i < window.innerWidth; i+=100)
    {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, window.innerHeight);
        ctx.stroke();
    }

    for(let i = 0; i < window.innerHeight; i+=100)
    {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(window.innerWidth, i);
        ctx.stroke();
    }

    document.getElementById("grid_on_off").addEventListener("click", function(){
        
        if(canvas.style.display === "none")
        {
            canvas.style.display = "block"
        }
        else
        {
            canvas.style.display = "none"
        }

    });

}