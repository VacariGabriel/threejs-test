import './style.css';
import * as THREE from 'three';

// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create object
const geometry = new THREE.TorusGeometry(10, 1, 30, 60);
const material = new THREE.MeshStandardMaterial({ color: 0x1244CB });
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 20;
scene.add(torus);

// Add light for object
const light = new THREE.PointLight(0xffffff);
light.position.set(80,80,80);

scene.add(light);

// Create effects
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));

  star.position.set(x, y, z);

  scene.add(star)
}

// Add background
const backgroundSpace = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = backgroundSpace;

// Add moon
const backgroundMoon = new THREE.TextureLoader().load('./images/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: backgroundMoon,
  })
);

scene.add(moon)



Array(2000).fill().forEach(addStar)

function rotateObject(object) {
  object.rotation.y += 0.008;
}

function animate() {
  requestAnimationFrame(animate);

  rotateObject(torus);
  rotateObject(moon);

  renderer.render(scene, camera);
}

animate();