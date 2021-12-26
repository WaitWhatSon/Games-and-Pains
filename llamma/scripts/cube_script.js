import {config} from "./config.js";

// ----- setup -----
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x333333 );
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 350, 350 );
document.getElementById("cube_render_element").appendChild( renderer.domElement );

// ----- textures -----

var materials = [
	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p1.png') } ),
  	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p2.png') } ),
  	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p3.png') } ),
  	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p4.png') } ),
  	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p5.png') } ),
  	new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( 'textures/cube/p6.png') } ),
];

// ----- cube -----
var geometry = new THREE.BoxGeometry( 255, 255, 255 );
var cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 450;

// ----- render -----
var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += config.speedCubeX;
	cube.rotation.y += config.speedCubeY;

	renderer.render( scene, camera );
};


animate();



