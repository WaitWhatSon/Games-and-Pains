import {config} from "./config.js";

// ----- setup -----
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x333333 );
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 350, 350 );
document.getElementById("cone_render_element").appendChild( renderer.domElement );

// ----- cone -----
let step = 1;

var geometry = new THREE.ConeGeometry( 100, 255, 360/step ).toNonIndexed();
var material = new THREE.MeshBasicMaterial( {vertexColors: true} );

const colors = [];

let H = 0;
let S = 1;
let V = 1;

		
for ( let i = 0; i < 360/step; i++ ) 
{
	let result = HSVtoRGB(H, S, V);

	colors.push( result.r, result.g, result.b );
	colors.push( result.r, result.g, result.b );
	colors.push( 0, 0, 0 );

	colors.push( result.r, result.g, result.b );
	colors.push( result.r, result.g, result.b );
	colors.push( 0, 0, 0 );

	H+=step;
}

H = 0;

for ( let i = 0; i < 360/step; i++ ) 
{
	let result = HSVtoRGB(H, S, V);
	
	colors.push( result.r, result.g, result.b );	
	colors.push( result.r, result.g, result.b );
	
	colors.push( 1, 1, 1 );
	// colors.push( 0, 0, 0 );

	H+=step;
}
		
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

var cone = new THREE.Mesh( geometry, material );
scene.add( cone );


camera.position.z = 300;

// ----- render -----
var animate = function () {
	requestAnimationFrame( animate );

	cone.rotation.x += config.speedConeX;
	cone.rotation.y += config.speedConeY;

	renderer.render( scene, camera );
};


animate();


function HSVtoRGB(H, S, V)
{
	let C = V * S;
	let X = C * (1 - Math.abs((H / 60) % 2 - 1));
	let m = V - C;

	let r, g, b;
	if(0<=H && H < 60)
	{
		r = C + m;
		g = X + m;
		b = 0 + m;
	}
	else if(60<=H && H < 120)
	{
		r = X + m;
		g = C + m;
		b = 0 + m;
	}
	else if(120<=H && H < 180)
	{
		r = 0 + m;
		g = C + m;
		b = X + m;
	}

	else if(180<=H && H < 240)
	{
		r = 0 + m;
		g = X + m;
		b = C + m;
	}

	else if(240<=H && H < 300)
	{
		r = X + m;
		g = 0 + m;
		b = C + m;
	}
	else if(300<=H && H < 360)
	{
		r = C + m;
		g = 0 + m;
		b = X + m;
	}
	else
	{
		r = 0;
		g = 0;
		b = 0;
	}

	return {r: r, g: g, b: b}
}
