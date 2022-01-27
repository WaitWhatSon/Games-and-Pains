export default function get_gaussian_kernel(sigma, size)
{
	let kernel = [];
	let two_sigma_squared = 2.0 * sigma * sigma;
	let sum = 0;
	for(let x = -(size-1)/2; x <= (size-1)/2; x ++)
	{
		for(let y = -(size-1)/2; y <= (size-1)/2; y++)
		{
			let x_squared_plus_y_squared = x * x + y * y;
			let e_power = Math.exp(- x_squared_plus_y_squared / two_sigma_squared);
			let val = e_power / (two_sigma_squared * Math.PI);
            kernel.push(val);
			sum += val;
		}
	}
	for (let i = 0; i < kernel.length; ++i)
	{
		kernel[i] /= sum;
	}
	return kernel;
}