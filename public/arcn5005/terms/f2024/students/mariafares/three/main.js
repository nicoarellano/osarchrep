const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspect = size.width / size.height;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById('three-canvas-f2024');
console.log(threeCanvas);

const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//everytime I try deleting anything cube related the entire scene disapears//
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const yellowMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const blueMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const redMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

const yellowCube = new THREE.Mesh(geometry, yellowMaterial);
const blueCube = new THREE.Mesh(geometry, blueMaterial);
const redCube = new THREE.Mesh(geometry, redMaterial);
const greenCube = new THREE.Mesh(geometry, greenMaterial);

const gltfLoader = new THREE.GLTFLoader();

let mesh;

gltfLoader.load(
  'mariaaaa.glb',
  function (gltf) {
    mesh = gltf.scene;
    mesh.scale.x = 100;
    mesh.scale.y = 100;
    mesh.scale.z = 100;
    mesh.position.y = 2.5;
    mesh.position.x = -3;
    mesh.position.z = 2;

    scene.add(mesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

gltfLoader.load(
  'waffle.glb',
  function (gltf) {
    mesh = gltf.scene;
    mesh.scale.x = 5;
    mesh.scale.y = 5;
    mesh.scale.z = 5;

    scene.add(mesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const fontLoader = new THREE.FontLoader();

function createText(text, elevation = 1, textColor = '0x000000', size = 0.5) {
  const textValue = text;
  const textSize = size;
  fontLoader.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeo = new THREE.TextGeometry(textValue, {
      font: font,
      size: textSize,
      height: 0.1,
      curveSegments: 4,
    });

    const color = new THREE.Color();
    color.setHex(textColor);
    const textMaterial = new THREE.MeshLambertMaterial({ color: color });
    const text = new THREE.Mesh(textGeo, textMaterial);

    text.position.x = 4;
    text.position.y = elevation;

    scene.add(text);
  });
}

createText('SUSPECT: MARIA FARES', 6, '0XFF00FF');
createText("5'2, brown eyes, green shirt, jeans ", 5, '0XFF0000');
createText('Master of Architecture Student', 4, '0XFF0000');
createText('loves waffles', 3, '0XFF0000');
createText('favourite colour: red', 2, '0XFF0000');

camera.position.z = 13;
camera.position.x = 5;
camera.position.y = 2;

scene.position.x = -5;
scene.position.z = 5;
scene.position.y = -3;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//Creates the lights of the scene
const lightColor = 0xffffff;

const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(lightColor, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.target.position.set(0, 3, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

function animate() {
  requestAnimationFrame(animate);

  if (mesh) mesh.rotation.y += 0.01;

  yellowCube.rotation.x += 0.01;
  yellowCube.rotation.y += 0.01;

  blueCube.rotation.x += 0.02;
  blueCube.rotation.y -= 0.01;

  redCube.rotation.x -= 0.01;
  redCube.rotation.y -= 0.02;

  greenCube.rotation.x += 0.02;
  greenCube.rotation.y -= 0.01;

  renderer.render(scene, camera);
}

animate();

//Adjust the viewport to the size of the browser
window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});
