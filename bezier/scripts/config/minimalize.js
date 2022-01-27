export default function init_minimalize()
{

    const minimalize = document.getElementById("minimalize");
    const div = document.getElementById("minimalizable");

    minimalize.addEventListener("click", function(){

        if(div.style.display === "none")
        {
            div.style.display = "grid"
        }
        else
        {
            div.style.display = "none"
        }


    });

}