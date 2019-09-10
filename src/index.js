import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

let scene = new Scene();

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

let camera = new PerspectiveCamera(fov, aspect, near, far);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new BoxGeometry(1, 1, 1);
geometry.translate(-1, 1,1);
let material = new MeshBasicMaterial({ color: 0x00ff00 });
let cube = new Mesh( geometry, material );



// for (let horiz_index = 0; horiz_index <= 5; horiz_index++) {
//     let geometry = new BoxGeometry(1, 1, 1);
//     geometry.translate(horiz_index, 1, 1);
//     let material = new MeshBasicMaterial({ color: 0x00ff00 });
//     let cube = new Mesh( geometry, material );
//     scene.add(cube);
// }

scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
