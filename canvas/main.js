import { 
        get_gaussian_kernel_in_channels,
		convolve_canvas_with_kernel,
		multiply_canvas_by_value,
		multiply_canvas_by_factor,
		grayscale_image_filter,
		invert_image_filter,
		change_saturation,
} from './modules/filters.js'


window.addEventListener("load", () => {

    // -----------------------------------------------------------------
    // consts

    const canvas    = document.getElementById("myCanvas");
    const ctx       = canvas.getContext("2d");

    const reset_image_button    = document.getElementById("clear_canvas");
    const apple_image_button    = document.getElementById("apple_image" );
    const lenna_image_button    = document.getElementById("lenna_image" );

    const color_button_black    = document.getElementById("color_button_black" );
    const color_button_white    = document.getElementById("color_button_white" );
    const color_button_red      = document.getElementById("color_button_red"   );
    const color_button_green    = document.getElementById("color_button_green" );
    const color_button_blue     = document.getElementById("color_button_blue"  );
    const color_button_yellow   = document.getElementById("color_button_yellow");
    const color_input_custom    = document.getElementById("custom_color_input" );

    const brush_size_slider = document.getElementById("brush_size_slider");

    // --------------------------------------------------------------------
    // variables

    let painting;
    let brush_size = 10;
    brush_size_slider.value = brush_size;

    let last_selected_toolbar = "basics_tool_bar";
    let pinned_image = ctx.createImageData(512, 512);

    // -------------------------------------------------------------------
    // switch menu toolbar

    function switch_toolbar(current_selected_toolbar)
    {
        document.getElementById(last_selected_toolbar).style.display = 'none';
        document.getElementById(current_selected_toolbar).style.display = 'block';
        last_selected_toolbar = current_selected_toolbar;
    }

    const basics_tool_bar_button    = document.getElementById("basics_tool_bar_button"   );
    const filters_tool_bar_button   = document.getElementById("filters_tool_bar_button"  );
    
    basics_tool_bar_button  .addEventListener("click", function(){switch_toolbar("basics_tool_bar"    )});
    filters_tool_bar_button .addEventListener("click", function(){switch_toolbar("filters_tool_bar"   )});

    // -------------------------------------------------------------------
    // basics functions

    function startPosition(e)
    {
        painting = true;
        draw(e);
    }

    function finishPosition()
    {
        painting = false;
        ctx.beginPath();
    }

    function draw(e)
    {
        if(!painting)
        {
            return;
        }
        else
        {
            ctx.lineWidth = brush_size;
            ctx.lineCap = "round";

            var rect = e.target.getBoundingClientRect();

            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);//(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);//(e.clientX, e.clientY);
        }
    }

    function resetImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function putImageOnCanvas(image_path)
    {
        let image = new Image();
        image.src = image_path;
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
        }
    }

    function changeColor(color) {
        ctx.strokeStyle = color;
    }

    function changeBrushSize() {
        brush_size = brush_size_slider.value;
    }

    // -----------------------------------------------------------------------------------------
    // controls

    canvas.addEventListener("mousedown",  startPosition);
    canvas.addEventListener("mouseup",    finishPosition);
    canvas.addEventListener("mousemove",  draw);

    reset_image_button.addEventListener("click", resetImage);
    apple_image_button.addEventListener("click", function(){putImageOnCanvas("images/apple.png")});
    lenna_image_button.addEventListener("click", function(){putImageOnCanvas("images/lenna.png")});
    
    color_button_black .addEventListener("click", function(){changeColor("#000000")});
    color_button_white .addEventListener("click", function(){changeColor("#ffffff")});
    color_button_red   .addEventListener("click", function(){changeColor("#ff0000")});
    color_button_green .addEventListener("click", function(){changeColor("#00ff00")});
    color_button_blue  .addEventListener("click", function(){changeColor("#0000ff")});
    color_button_yellow.addEventListener("click", function(){changeColor("#ffff00")});
    color_input_custom .addEventListener("change", function(){changeColor(color_input_custom.value)});
    
    brush_size_slider.addEventListener("change", changeBrushSize);

    // --------------------------------------------------------------------
    // finters functions

    // --- pin image to process
    function pin_image()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        var dataCopy = new Uint8ClampedArray(original.data);
        pinned_image.data.set(dataCopy);
    }

    function restore_pined_image()
    {
        ctx.putImageData(pinned_image, 0, 0);
    }
    
    function apply_gaussian_blur(value)
    {
		let sigma = [value/100, value/100, value/100, value/100];
		let kernel = get_gaussian_kernel_in_channels(sigma, 4);
        let imgData = convolve_canvas_with_kernel(ctx, pinned_image, kernel);
        ctx.putImageData(imgData, 0, 0);
    }

	function apply_brightness_effect(value)
	{
		let imgData = multiply_canvas_by_value(ctx, pinned_image, value/100);
        ctx.putImageData(imgData, 0, 0);
	}

	function apply_contrast_effect(value)
	{
		let imgData = multiply_canvas_by_factor(ctx, pinned_image, value);
        ctx.putImageData(imgData, 0, 0);
	}

	function apply_grayscale_effect(value)
	{
        let imgData = grayscale_image_filter(ctx, pinned_image, value);
        ctx.putImageData(imgData, 0, 0);
	}

	function apply_invert_effect(value)
	{
        let imgData = invert_image_filter(ctx, pinned_image, value);
        ctx.putImageData(imgData, 0, 0);
	}

	function apply_saturation_effect(value)
	{
        let imgData = change_saturation(ctx, pinned_image, value);
        ctx.putImageData(imgData, 0, 0);
	}


    // -----------------------------------------------------------------------------------------
    // controls

    const pin_image_button = document.getElementById("pin_image_button");
    pin_image_button.addEventListener("click", function(){pin_image()});

    const restore_pined_image_button = document.getElementById("restore_pined_image_button");
    restore_pined_image_button.addEventListener("click", function(){restore_pined_image()});


    const blur_slider       = document.getElementById("blur_slider"         );
    const brightness_slider = document.getElementById("brightness_slider"   );
    const contrast_slider   = document.getElementById("contrast_slider"     );
    const grayscale_slider  = document.getElementById("grayscale_slider"    );
    const invert_slider     = document.getElementById("invert_slider"       );
    const saturate_slider   = document.getElementById("saturate_slider"     );
    const sepia_slider      = document.getElementById("sepia_slider"        );

    blur_slider         .addEventListener("change", function(){apply_gaussian_blur(			blur_slider.value		)});
    brightness_slider   .addEventListener("change", function(){apply_brightness_effect(		brightness_slider.value	)});
    contrast_slider     .addEventListener("change", function(){apply_contrast_effect(		contrast_slider.value	)});
    grayscale_slider    .addEventListener("change", function(){apply_grayscale_effect(		grayscale_slider.value	)});
    invert_slider       .addEventListener("change", function(){apply_invert_effect(			invert_slider.value		)});
    saturate_slider     .addEventListener("change", function(){apply_saturation_effect(		saturate_slider.value	)});
    sepia_slider        .addEventListener("change", function(){apply_filter(sepia_slider.value)});


})
