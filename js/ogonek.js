import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {createCamera} from "./camera";
import {createLights} from "./lights";
import {createRenderer} from "./renderer";
import {Scene} from "three";


const loader = new GLTFLoader();

export class Ogonek {
    constructor() {
        this.camera = createCamera(fov, aspect, near, far)
        this.camera.position.z = 5;

        this.light = createLights()

        this.renderer = createRenderer()
        this.renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);

        this.scene = new Scene()
    }

    async init() {
        await this.loadOgonekModel()
    }

    start() {
        this.scene.add(this.light, this.model.scene,)

        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
    }

    async loadOgonekModel() {
        this.model = await loader.loadAsync('models/poly.glb');
    }
}


