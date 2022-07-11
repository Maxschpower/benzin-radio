import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {setupModel} from './setupModel.js';

async function loadOgonek() {
    const loader = new GLTFLoader();

    const ogonekData = await loader.loadAsync('web/assets/models/ogonek.glb');

    const ogonek = setupModel(ogonekData);

    return ogonek;
}

export {loadOgonek};