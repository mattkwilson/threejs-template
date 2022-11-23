// ----------------------SCENE SETUP-------------------------

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 100);
camera.position.set(0,12,0);

const ambientLight = new THREE.AmbientLight(0x4a4a4a);
scene.add(ambientLight);
const light = new THREE.PointLight(0xffffff);
scene.add(light);

// -------------------------BODY----------------------------



// ------------------------CONTROLS--------------------------

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
const pressedKeys = new Set();

function keydown(event) {
    pressedKeys.add(event.keyCode);
}

function keyup(event) {
    pressedKeys.delete(event.keyCode);
}

const controls = new THREE.PointerLockControls(camera, document.body);

// lock cursor to window
document.addEventListener('click', () => {
    controls.lock();
});
  
var clock = new THREE.Clock();

function inputHandler() {
    const speed = 5;
    var delta = clock.getDelta();

    // handle flying WASD/EQ
    if (pressedKeys.has(68)) { // D
        camera.translateX(speed * delta);
    } else if (pressedKeys.has(65)) // A
        camera.translateX(-speed * delta);
    if (pressedKeys.has(87)) // W
        camera.translateZ(-speed * delta);
    else if (pressedKeys.has(83)) // S
        camera.translateZ(speed * delta);
    if (pressedKeys.has(69)) // E
        camera.translateY(speed * delta);
    else if (pressedKeys.has(81)) // Q
        camera.translateY(-speed * delta);
}

// -------------------------UPDATE---------------------------

window.addEventListener('resize', resize);
function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function update() {
    light.position.set(camera.position.x, camera.position.y, camera.position.z);

    inputHandler();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

update();
