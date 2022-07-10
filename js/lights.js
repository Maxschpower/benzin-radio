import {AmbientLight} from "three";

export function createLights() {
    return new AmbientLight('white', 2);
}