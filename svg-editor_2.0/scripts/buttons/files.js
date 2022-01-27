import { load } from "../files/load_file.js";
import { save } from "../files/save_file.js";

export default function init_files()
{
    document.getElementById("load_file").addEventListener("change", function(){
        load(this);
    });

    document.getElementById("save_image").addEventListener("click", function(){
        save(document.getElementById("file_name").value);
    });

}