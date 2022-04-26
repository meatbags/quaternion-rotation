/** */

import Scene from './modules/scene';
import Loop from './modules/loop';

class App {
  constructor() {
    this.modules = {
      Scene: new Scene(),
      Loop: new Loop(),
    };

    for (const m in this.modules) {
      if (typeof this.modules[m].bind === 'function') {
        this.modules[m].bind(this);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
