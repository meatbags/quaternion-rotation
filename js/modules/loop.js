/** Loop */

class Loop {
  bind(root) {
    let m = Object.keys(root.modules).map(key => root.modules[key]);
    this.ref = {};
    this.ref.toUpdate = m.filter(mod => typeof mod.update === 'function');
    this.ref.toRender = m.filter(mod => typeof mod.render === 'function');
    this.time = {now: performance.now(), deltaMax: 0.1};
    this._loop();
  }

  _loop() {
    requestAnimationFrame(() => { this._loop(); });
    let now = performance.now();
    let delta = Math.min(this.time.deltaMax, (now - this.time.now) / 1000);
    this.time.now = now;
    this.ref.toUpdate.forEach(m => m.update(delta));
    this.ref.toRender.forEach(m => m.render(delta));
  }
}

export default Loop;
