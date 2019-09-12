import {Mesh, MeshPhysicalMaterial, SphereGeometry, Vector3} from "three";

class shapesArray3D {
    constructor(origin = new Vector3(0, 0, 0), rowSize = 5, colSize = 5,
                depthSize = 20, spacingFactor = 5, shapes = []) {
        this.origin = origin;
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.depthSize = depthSize;
        this.spacingFactor = spacingFactor;
        this.shapes = shapes;
    }

    getSphere(xOffset, yOffset, zOffset) {
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

    populate3DShapesGrid(scene) {
        this.initializeShapes();

        for (let horiz_index = 0; horiz_index < this.rowSize; horiz_index++) {
            for (let vert_index = 0; vert_index < this.colSize; vert_index++) {
                for (let depth_index = 0; depth_index < this.depthSize; depth_index++) {
                    this.shapes[horiz_index][vert_index][depth_index] =
                        this.getShape(horiz_index, vert_index, depth_index);
                    scene.add(this.shapes[horiz_index][vert_index][depth_index]);
                }
            }
        }
    }

    initializeShapes() {
        for (let horiz_index = 0; horiz_index < this.rowSize; horiz_index++) {
            this.shapes.push(new Array(this.colSize));
        }

        for (let horiz_index = 0; horiz_index < this.rowSize; horiz_index++) {
            for (let vert_index = 0; vert_index < this.colSize; vert_index++) {
                this.shapes[horiz_index][vert_index] = new Array(this.depthSize);
            }
        }
    }

    getShape(horiz_index, vert_index, depth_index) {
        return this.getSphere((horiz_index - this.rowSize / 2) * this.spacingFactor,
            (vert_index - this.rowSize / 2) * this.spacingFactor,
            -depth_index * this.spacingFactor);
    }

    rotateShapes() {
        for (let horiz_index = 0; horiz_index < this.rowSize; horiz_index++) {
            for (let vert_index = 0; vert_index < this.colSize; vert_index++) {
                for (let depth_index = 0; depth_index < this.depthSize; depth_index++) {
                    this.shapes[horiz_index][vert_index][depth_index].rotation.z += 0.01;
                }
            }
        }
    }
}

export default shapesArray3D;

