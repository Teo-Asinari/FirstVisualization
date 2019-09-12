import {MeshPhysicalMaterial} from "three";

export const genericPhysicalMaterial = new MeshPhysicalMaterial({color: "green",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    reflectivity: 0.9});

export const dragonTorusMaterial = new MeshPhysicalMaterial({color: "green",
    roughness: 0.5,
    metalness: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    reflectivity: 0.9,
    flatShading: true});

