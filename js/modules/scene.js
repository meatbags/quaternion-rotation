/** Scene */

import * as THREE from 'three';
import Axis from './axis';

class Scene {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setSize(800, 600);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new THREE.Vector3());
    document.querySelector('#wrapper').appendChild(this.renderer.domElement);
  }

  bind(root) {
    // light
    let ambient = new THREE.AmbientLight(0xffffff, 0.25);
    let light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.position.set(0, 10, 0);
    this.scene.add(ambient, light);

    // scene
    let geo = new THREE.PlaneBufferGeometry(10, 10, 5, 5);
    let mat = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true});
    let floor = new THREE.Mesh(geo, mat);
    floor.rotation.x = Math.PI / 2;
    this.scene.add(floor);

    // create random axis
    this.axis = [];
    for (let i=0; i<8; i++) {
      this.axis.push(new Axis(this));
    }

    // dom
    window.addEventListener('resize', () => this._resize());
    this._resize();
  }

  _resize() {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const r = rect.width / rect.height;
    this.camera.aspect = r;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    this.axis.forEach(axis => axis.update(delta));
  }

  render(delta) {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;
