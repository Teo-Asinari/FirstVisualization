import {
    Mesh,
    OctahedronGeometry,
    SphereGeometry,
    TorusKnotGeometry,
    Vector3
} from "three";
import {
    dragonTorusMaterial,
    genericPhysicalMaterial
} from "../materials/materials";

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
        return new Mesh(geometry, genericPhysicalMaterial);
    }

    getOctahedron(xOffset, yOffset, zOffset) {
        let geometry = new OctahedronGeometry(1, 1);
        geometry.translate(xOffset, yOffset, zOffset);
        return new Mesh(geometry, dragonTorusMaterial);
    }

    getDragonTorusKnot(xOffset, yOffset, zOffset) {
        let geometry = new TorusKnotGeometry( 1, 0.4,
            112, 15, 9, 12);
        geometry.translate(xOffset, yOffset, zOffset);
        return new Mesh(geometry, dragonTorusMaterial);
    }

    getSmoothTorusKnot(xOffset, yOffset, zOffset) {
        let geometry = new TorusKnotGeometry( 1, 0.4,
            112, 15);
        geometry.translate(xOffset, yOffset, zOffset);
        return new Mesh(geometry, genericPhysicalMaterial);
    }

    getShape(horiz_index, vert_index, depth_index) {
        let xOffset = (horiz_index - this.rowSize / 2) * this.spacingFactor;
        let yOffset = (vert_index - this.rowSize / 2) * this.spacingFactor;
        let zOffset = -depth_index * this.spacingFactor;

        let shapeFunctions = [this.getSphere, this.getOctahedron, this.getDragonTorusKnot, this.getSmoothTorusKnot];
        let roll = (horiz_index + vert_index + depth_index) % 4;

        return shapeFunctions[roll](xOffset, yOffset, zOffset);
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

    rotateShapes() {
        for (let horiz_index = 0; horiz_index < this.rowSize; horiz_index++) {
            for (let vert_index = 0; vert_index < this.colSize; vert_index++) {
                for (let depth_index = 0; depth_index < this.depthSize; depth_index++) {
                    this.shapes[horiz_index][vert_index][depth_index].rotation.z += 0.01;
                }
            }
        }
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
}

export default shapesArray3D;

