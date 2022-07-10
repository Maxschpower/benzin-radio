import {Ogonek} from './ogonek'

async function main() {
    document.body.appendChild(renderer.domElement);

    const ogonek = new Ogonek();

    await ogonek.init();

    ogonek.start();
}

main().catch((err) => {
    console.error(err);
});