export default function toolbox_init(){

    const on_off = document.getElementById("on_off_toolbox");
    const toolbox = document.getElementById("tools_box");

    const on_off_histogram = document.getElementById("on_off_histogram");
    const histogram = document.getElementById("histogram_box");

    const on_off_binarization = document.getElementById("on_off_binarization");
    const binarization = document.getElementById("binarization_box");

    const on_off_morphology = document.getElementById("on_off_morphology");
    const morphology = document.getElementById("morphology_box");


    on_off.addEventListener("click", function(){
        
        if(toolbox.style.display != "none")
        {
            toolbox.style.display = "none";
        }
        else
        {
            toolbox.style.display = "block";
            histogram.style.display = "none";
            binarization.style.display = "none";
            morphology.style.display = "none";
        }
    })

    on_off_histogram.addEventListener("click", function(){
        
        if(histogram.style.display != "none")
        {
            histogram.style.display = "none";
        }
        else
        {
            histogram.style.display = "block";
            toolbox.style.display = "none";
            binarization.style.display = "none";
            morphology.style.display = "none";
        }
    })

    on_off_binarization.addEventListener("click", function(){
        
        if(binarization.style.display != "none")
        {
            binarization.style.display = "none";
        }
        else
        {
            binarization.style.display = "block";
            toolbox.style.display = "none";
            histogram.style.display = "none";
            morphology.style.display = "none";
        }
    })

    on_off_morphology.addEventListener("click", function(){
        
        if(morphology.style.display != "none")
        {
            morphology.style.display = "none";
        }
        else
        {
            morphology.style.display = "block";
            toolbox.style.display = "none";
            histogram.style.display = "none";
            binarization.style.display = "none";
        }
    })

}