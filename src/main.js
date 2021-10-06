import '../index.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { BoxGeometry, MeshToonMaterial, SphereGeometry } from 'three';
import duck from './duck.jpg'
import yasuo from './space.jpg'
import mastery from './moon.jpg'
console.log('hello')
function ThreeWrapper()
{const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)//angle of eyes watching the camera, aspect ratio (size of the monitor), viewer's size,and monitor's size.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
}
)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5,5,5);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(lightHelper, gridHelper);
scene.add(pointLight,ambientLight);

function addStart() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material); 
  const [x,y,z] = new Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStart);

const duckTexture = new THREE.TextureLoader().load(yasuo);
scene.background = duckTexture;

const avatarTexture = new THREE.TextureLoader().load(duck);
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: avatarTexture})
);
scene.add(avatar);

const masteryTexture = new THREE.TextureLoader().load(mastery);
const master = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: masteryTexture})
)
master.position.z =30;
master.position.setX(-10);
scene.add(master);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  master.rotation.x += 0.5;
  master.rotation.y += 0.075;
  master.rotation.z += 0.5;

  avatar.rotation.y += 0.01;
  avatar.rotation.z +=0.01;
  
  camera.position.z = t*-0.01;
  camera.position.x=t*-0.0002;
  camera.position.y=t*-0.0002;
}

document.body.onscroll = moveCamera




function animate() {
  requestAnimationFrame(animate); //enter the game loop
  renderer.render(scene, camera);
  torus.rotation.x += 0.01;
  torus.rotation.y +=0.005;
  torus.rotation.z += 0.01;
  controls.update();
}
animate();}
ThreeWrapper();