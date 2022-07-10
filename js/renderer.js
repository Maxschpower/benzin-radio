import {WebGLRenderer} from "three";

export function createRenderer() {
    return new WebGLRenderer({antialias: true});
}