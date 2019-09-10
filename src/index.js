import {
    AmbientLight,
    BoxGeometry,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera, RepeatWrapping,
    Scene, Vector3,
    WebGLRenderer
} from "three";
import {TextureLoader} from "three/src/loaders/TextureLoader";

let scene = new Scene();
let ambientLight = new AmbientLight(0x404040);
scene.add(ambientLight);

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

let camera = new PerspectiveCamera(fov, aspect, near, far);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const rowSize = 10;
const colSize = 10;
const depthSize = 100;
const spacingFactor = 5;
let cubesArray3D = [];

function getCube(xOffset, yOffset, zOffset) {
    let geometry = new BoxGeometry(1, 1, 1);
    geometry.translate(xOffset, yOffset, zOffset);
    let texture = new TextureLoader().load("./assets/textures/texture-1909992__340.jpg");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(4, 4);
    let material = new MeshLambertMaterial({color: 0x00ff00, alphaMap: texture});
    return new Mesh(geometry, material);
}


for (let horiz_index = 0; horiz_index < rowSize; horiz_index++) {
    cubesArray3D.push(new Array(colSize));
    for (let vert_index = 0; vert_index < colSize; vert_index++) {
        cubesArray3D[horiz_index][vert_index] = new Array(depthSize);
        for (let depth_index = 0; depth_index < depthSize; depth_index++) {
            cubesArray3D[horiz_index][vert_index][depth_index] =
                getCube((horiz_index - rowSize / 2) * spacingFactor,
                    (vert_index - rowSize / 2) * spacingFactor,
                    -depth_index * spacingFactor);
            scene.add(cubesArray3D[horiz_index][vert_index][depth_index]);
        }
    }
}

console.log(cubesArray3D);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    for (let horiz_index = 0; horiz_index < rowSize; horiz_index++) {
        for (let vert_index = 0; vert_index < colSize; vert_index++) {
            for (let depth_index = 0; depth_index < depthSize; depth_index++) {
                cubesArray3D[horiz_index][vert_index][depth_index].rotation.z += 0.01;
                cubesArray3D[horiz_index][vert_index][depth_index].position.add(new Vector3(0,-0.01, -0.01));
            }
        }
    }
    renderer.render(scene, camera);
}

animate();
