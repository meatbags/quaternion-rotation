import * as THREE from 'three';

const RotateAroundAxis = (p, axis, theta) => {
  const q1 = new THREE.Quaternion(p.x, p.y, p.z, 0);
  const st = Math.sin(theta/2);
  const q2 = new THREE.Quaternion(axis.x * st, axis.y * st, axis.z * st, Math.cos(theta/2));
  const q3 = q2.clone().multiply(q1).multiply(q2.conjugate());
  p.set(q3.x, q3.y, q3.z);
};

export default RotateAroundAxis;
