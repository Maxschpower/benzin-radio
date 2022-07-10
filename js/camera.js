import {PerspectiveCamera} from "three";

export function createCamera(fov, aspect, near, far) {
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10)
    return camera
}