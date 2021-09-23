import { 
        get_gaussian_kernel_in_channels,
		convolve_canvas_with_kernel,
		multiply_canvas_by_value,
		multiply_canvas_by_factor,
		grayscale_image_filter,
		invert_image_filter,
		change_saturation,
        sepia_filter,
} from './modules/filters.js'

import {
    get_grayscale_histogram,
    get_rgba_histogram,
    convert_to_grayscale,
    normalize_image_histogram,
    normalize_rgb_image_histogram,
    otsu_thresholding,
    niblack_thresholding,
    sauvola_thresholding,
    threshold_thresholding,
} from './modules/biometrics.js'

import {
    K3M,
} from './modules/K3M.js'


window.addEventListener("load", () => {

    // -----------------------------------------------------------------
    // consts

    const canvas    = document.getElementById("myCanvas");
    const ctx       = canvas.getContext("2d");

    const reset_image_button        = document.getElementById("clear_canvas");
    const apple_image_button        = document.getElementById("apple_image" );
    const lenna_image_button        = document.getElementById("lenna_image" );
    const fingerprint_image_button  = document.getElementById("fingerprint_image");

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

    const basics_tool_bar_button     = document.getElementById("basics_tool_bar_button"   );
    const filters_tool_bar_button    = document.getElementById("filters_tool_bar_button"  );
    const biometrics_tool_bar_button = document.getElementById("biometrics_tool_bar_button"  );
    
    basics_tool_bar_button      .addEventListener("click", function(){switch_toolbar("basics_tool_bar"      )});
    filters_tool_bar_button     .addEventListener("click", function(){switch_toolbar("filters_tool_bar"     )});
    biometrics_tool_bar_button  .addEventListener("click", function(){switch_toolbar("biometrics_tool_bar"  )});

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
    // images

    reset_image_button      .addEventListener("click", resetImage);
    apple_image_button      .addEventListener("click", function(){putImageOnCanvas("images/apple.png")});
    lenna_image_button      .addEventListener("click", function(){putImageOnCanvas("images/lenna.png")});
    fingerprint_image_button.addEventListener("click", function(){putImageOnCanvas("images/fingerprint.png")});

    // -----------------------------------------------------------------------------------------
    // controls

    canvas.addEventListener("mousedown",  startPosition);
    canvas.addEventListener("mouseup",    finishPosition);
    canvas.addEventListener("mousemove",  draw);
    
    color_button_black .addEventListener("click", function(){changeColor("#000000")});
    color_button_white .addEventListener("click", function(){changeColor("#ffffff")});
    color_button_red   .addEventListener("click", function(){changeColor("#ff0000")});
    color_button_green .addEventListener("click", function(){changeColor("#00ff00")});
    color_button_blue  .addEventListener("click", function(){changeColor("#0000ff")});
    color_button_yellow.addEventListener("click", function(){changeColor("#ffff00")});
    color_input_custom .addEventListener("change", function(){changeColor(color_input_custom.value)});
    
    brush_size_slider.addEventListener("change", changeBrushSize);

    // --------------------------------------------------------------------
    // filters functions

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

    function apply_sepia_effect(value)
	{
        let imgData = sepia_filter(ctx, pinned_image, value);
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
    sepia_slider        .addEventListener("change", function(){apply_sepia_effect(          sepia_slider.value      )});

    // --------------------------------------------------------------------
    // biometrics functions

    function temp_apply()
    {
		console.log("ELO");
        let temp = get_grayscale_histogram(ctx.getImageData(0, 0, 512, 512));
        console.log(temp);
        
        let temp2 = get_rgba_histogram(ctx.getImageData(0, 0, 512, 512));
        console.log(temp2);
    }

    function fingerprint_grayscale()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = convert_to_grayscale(ctx, original);
        ctx.putImageData(data, 0, 0);
    }

    function histogram_normalization()
    {   
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = normalize_image_histogram(ctx, original);
        ctx.putImageData(data, 0, 0);
    }

    function rgb_histogram_normalization()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = normalize_rgb_image_histogram(ctx, original);
        ctx.putImageData(data, 0, 0);
    }
    
    function otsu_thresholding_apply()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = otsu_thresholding(ctx, original);
        ctx.putImageData(data, 0, 0);
    }

    function niblack_thresholding_apply()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = niblack_thresholding(ctx, original, 9);
        ctx.putImageData(data, 0, 0);
    }
    
    function sauvola_thresholding_apply()
    {
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = sauvola_thresholding(ctx, original, 15);
        ctx.putImageData(data, 0, 0);
    }

    function threshold_thresholding_apply()
    {
        let threshold_value = 100;
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = threshold_thresholding(ctx, original, threshold_value);
        ctx.putImageData(data, 0, 0);
    }
    
    function KMM_thinning()
    {
        console.log("KMM_thinning")
    }

    function K3M_thinning()
    {
        console.log("K3M_thinning")
        let original = ctx.getImageData(0, 0, 512, 512);
        let data = K3M(ctx, original, 15);
        ctx.putImageData(data, 0, 0);
    }

    function minutiae_apply()
    {
        console.log("minutiae_apply")
    }

	// -----------------------------------------------------------------------------------------
    // controls

    const temp_button                           = document.getElementById("temp_button"                         );
    const fingerprint_grayscale_button          = document.getElementById("fingerprint_grayscale_button"        );
    const histogram_normalization_button        = document.getElementById("histogram_normalization_button"      );
    const rgb_histogram_normalization_button    = document.getElementById("rgb_histogram_normalization_button"  );
    const otsu_thresholding_button              = document.getElementById("otsu_thresholding"                   );
    const niblack_thresholding_button           = document.getElementById("niblack_thresholding"                );
    const sauvola_thresholding_button           = document.getElementById("sauvola_thresholding"                );
    const threshold_thresholding_button         = document.getElementById("threshold_thresholding"              );
    const thinning_KMM_button                   = document.getElementById("thinning_KMM_button"                 );
    const thinning_K3M_button                   = document.getElementById("thinning_K3M_button"                 );
    const minutiae_searching_button             = document.getElementById("minutiae_searching_button"           );

    temp_button                         .addEventListener("click", function(){temp_apply()                  });
    fingerprint_grayscale_button        .addEventListener("click", function(){fingerprint_grayscale()       });
    histogram_normalization_button      .addEventListener("click", function(){histogram_normalization()     });
    rgb_histogram_normalization_button  .addEventListener("click", function(){rgb_histogram_normalization() });
    otsu_thresholding_button            .addEventListener("click", function(){otsu_thresholding_apply()     });
    niblack_thresholding_button         .addEventListener("click", function(){niblack_thresholding_apply()  });
    sauvola_thresholding_button         .addEventListener("click", function(){sauvola_thresholding_apply()  });
    threshold_thresholding_button       .addEventListener("click", function(){threshold_thresholding_apply()});
    thinning_KMM_button                 .addEventListener("click", function(){KMM_thinning()                });
    thinning_K3M_button                 .addEventListener("click", function(){K3M_thinning()                });
    minutiae_searching_button           .addEventListener("click", function(){minutiae_apply()              });

    // TODO: window size slider

})
