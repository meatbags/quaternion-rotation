/** Axis */

import * as THREE from 'three';
import RotateAroundAxis from '../util/rotate_around_axis';

class Axis {
  constructor(root) {
    let r = (scale=1) => (Math.random() * 2 - 1) * scale;
    this.axis = new THREE.Vector3().set(r(), r(), r()).normalize();
    this.origin = new THREE.Vector3().set(r(10), r(10), r(10));
    let geo = new THREE.SphereBufferGeometry(0.25, 32, 32);
    let mat = new THREE.MeshBasicMaterial({color: 0xff0000});
    let length = 10;
    this.object = new THREE.Mesh(geo, mat);
    this.object.position.copy(this.origin);
    this.object.position.add(this.axis.clone().multiplyScalar(length * 0.5));
    this.object.position.add(new THREE.Vector3(r(5), r(5), r(5)));
    this.helper1 = new THREE.ArrowHelper(this.axis, this.origin, length, 0xffffff);
    this.helper2 = new THREE.ArrowHelper(this.axis, this.origin, 1, 0xff0000);
    this.theta = 0;//Math.random() * Math.PI * 2;
    this.herz = 0.5;//Math.random();

    // add to scene
    root.scene.add(this.object, this.helper1, this.helper2);
  }

  update(delta) {
    let rot = Math.PI * 2 * this.herz * delta;
    this.theta += rot;
    let v = this.object.position.clone();
    v.sub(this.origin);
    RotateAroundAxis(v, this.axis, rot);
    v.add(this.origin);
    this.object.position.copy(v);
    let dist = this.object.position.distanceTo(this.origin);
    let dir = this.object.position.clone().sub(this.origin).normalize();
    this.helper2.setLength(dist);
    this.helper2.setDirection(dir);
  }
}

export default Axis;
