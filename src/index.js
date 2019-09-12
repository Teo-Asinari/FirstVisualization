import {
    AmbientLight,
    HemisphereLight,
    PerspectiveCamera,
    PointLight,
    Scene, Vector3,
    WebGLRenderer
} from "three";
import shapesArray3D from "./compoundShapes/shapesArray3D";

let scene = new Scene();
let ambientLight = new AmbientLight('red', 0.01);
scene.add(ambientLight);


let pointLight = new PointLight( 'red', 3, 150, 2 );
pointLight.position.set( 0,0,0 );
scene.add( pointLight );

let hemisphereLight = new HemisphereLight( 'white', 'red', 1 );
scene.add(hemisphereLight);

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

let camera = new PerspectiveCamera(fov, aspect, near, far);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const arrayOfShapes = new shapesArray3D(new Vector3(0, 0, 0), 7, 7, 20);
arrayOfShapes.populate3DShapesGrid(scene);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    arrayOfShapes.rotateShapes();
    renderer.render(scene, camera);
}

animate();
