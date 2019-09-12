import {
    AmbientLight,
    HemisphereLight,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    WebGLRenderer
} from "three";

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

const rowSize = 10;
const colSize = 10;
const depthSize = 100;
const spacingFactor = 5;
let spheresArray3D = [];

function getSphere(xOffset, yOffset, zOffset) {
    let geometry = new SphereGeometry(1,10, 10);
    geometry.translate(xOffset, yOffset, zOffset);
    let material = new MeshPhysicalMaterial({color: "green",
        roughness: 0.5,
        metalness: 0.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.5,
        reflectivity: 0.9});
    return new Mesh(geometry, material);
}


for (let horiz_index = 0; horiz_index < rowSize; horiz_index++) {
    spheresArray3D.push(new Array(colSize));
    for (let vert_index = 0; vert_index < colSize; vert_index++) {
        spheresArray3D[horiz_index][vert_index] = new Array(depthSize);
        for (let depth_index = 0; depth_index < depthSize; depth_index++) {
            spheresArray3D[horiz_index][vert_index][depth_index] =
                getSphere((horiz_index - rowSize / 2) * spacingFactor,
                    (vert_index - rowSize / 2) * spacingFactor,
                    -depth_index * spacingFactor);
            scene.add(spheresArray3D[horiz_index][vert_index][depth_index]);
        }
    }
}

console.log(spheresArray3D);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    for (let horiz_index = 0; horiz_index < rowSize; horiz_index++) {
        for (let vert_index = 0; vert_index < colSize; vert_index++) {
            for (let depth_index = 0; depth_index < depthSize; depth_index++) {
                spheresArray3D[horiz_index][vert_index][depth_index].rotation.z += 0.01;
            }
        }
    }
    renderer.render(scene, camera);
}

animate();
