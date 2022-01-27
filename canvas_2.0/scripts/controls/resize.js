export default function resize_init(){

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    document.getElementById("resize").addEventListener("click", ()=>resizeCanvas())

    function resizeCanvas()
    {
        let inMemCanvas = document.createElement('canvas');
        let inMemCtx = inMemCanvas.getContext('2d');

        let ratio;   
        if(ctx.canvas.width > ctx.canvas.height)
        {
            ratio = window.innerWidth/ctx.canvas.width * 0.98;
        }
        else
        {
            ratio = window.innerHeight/ctx.canvas.height * 0.98;
        }
        
        inMemCanvas.width = ctx.canvas.width;
        inMemCanvas.height = ctx.canvas.height;
        inMemCtx.drawImage(ctx.canvas, 0, 0);
        
        ctx.canvas.width  = ratio * ctx.canvas.width;
        ctx.canvas.height = ratio * ctx.canvas.height;

        ctx.drawImage(inMemCanvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }

}