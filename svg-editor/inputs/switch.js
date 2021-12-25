function on(div)
{
    var x = document.getElementById(div);
    if (x.style.display === "none") 
    {
      x.style.display = "block";
    } 
}

function off(div)
{
    var x = document.getElementById(div);
    if (x.style.display === "block") 
    {
      x.style.display = "none";
    }
}

export {on, off}