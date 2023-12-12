var scene = new THREE.Scene();
//todo: review code
// Camera
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 5;
camera.lookAt(0, 1.5, 0);
camera.updateProjectionMatrix();

// Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Materials
var material = new THREE.MeshStandardMaterial();

// Base
var baseGeometry = new THREE.BoxGeometry(2, 1, 2);
var base = new THREE.Mesh(baseGeometry, material);
scene.add(base);

// Joint 1 (Shoulder)
var shoulder = new THREE.Object3D();
shoulder.translateY(0.5);
base.add(shoulder);

var shoulderGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
var shoulderMesh = new THREE.Mesh(shoulderGeometry, material);
shoulderMesh.translateY(1);
shoulder.add(shoulderMesh);

// Joint 2
var joint2 = new THREE.Object3D();
joint2.translateY(2);
shoulderMesh.add(joint2);

var joint2Geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
var joint2Mesh = new THREE.Mesh(joint2Geometry, material);
joint2Mesh.translateY(0.5);
joint2.add(joint2Mesh);

// Joint 3
var joint3 = new THREE.Object3D();
joint3.translateY(1);
joint2Mesh.add(joint3);

var joint3Geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
var joint3Mesh = new THREE.Mesh(joint3Geometry, material);
joint3Mesh.translateY(0.5);
joint3.add(joint3Mesh);

// Joint 4
var joint4 = new THREE.Object3D();
joint4.translateY(1);
joint3Mesh.add(joint4);

var joint4Geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
var joint4Mesh = new THREE.Mesh(joint4Geometry, material);
joint4Mesh.translateY(0.5);
joint4.add(joint4Mesh);

// Joint 5
var joint5 = new THREE.Object3D();
joint5.translateY(1);
joint4Mesh.add(joint5);

var joint5Geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
var joint5Mesh = new THREE.Mesh(joint5Geometry, material);
joint5Mesh.translateY(0.5);
joint5.add(joint5Mesh);

// Gripper (Joint 6)
var gripperGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
var gripper = new THREE.Mesh(gripperGeometry, material);
gripper.translateY(1);
joint5Mesh.add(gripper);

// Lights
var light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(10, 5, 10);
light.target = base;
scene.add(light);

light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

// Options (DAT.GUI)
var options = {
  base: 0,
  shoulder: 0,
  joint2: 0,
  joint3: 0,
  joint4: 0,
  joint5: 0,
  gripper: 0,
};

// DAT.GUI Related Stuff
var gui = new dat.GUI();
gui.add(options, 'base', -180, 180).listen();
gui.add(options, 'shoulder', -180, 180).listen();
gui.add(options, 'joint2', -180, 180).listen();
gui.add(options, 'joint3', -180, 180).listen();
gui.add(options, 'joint4', -180, 180).listen();
gui.add(options, 'joint5', -180, 180).listen();
gui.add(options, 'gripper', -180, 180).listen();

// Rendering
var zAxis = new THREE.Vector3(0, 0, 1);
var yAxis = new THREE.Vector3(0, 1, 0);

var render = function () {
  requestAnimationFrame(render);

  // Rotate joints
  base.setRotationFromAxisAngle(yAxis, options.base * Math.PI / 180);
  shoulder.setRotationFromAxisAngle(zAxis, options.shoulder * Math.PI / 180);
  joint2.setRotationFromAxisAngle(zAxis, options.joint2 * Math.PI / 180);
  joint3.setRotationFromAxisAngle(zAxis, options.joint3 * Math.PI / 180);
  joint4.setRotationFromAxisAngle(zAxis, options.joint4 * Math.PI / 180);
  joint5.setRotationFromAxisAngle(zAxis, options.joint5 * Math.PI / 180);
  gripper.setRotationFromAxisAngle(zAxis, options.gripper * Math.PI / 180);

  // Render
  renderer.render(scene, camera);
};

render();


