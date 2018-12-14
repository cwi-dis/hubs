AFRAME.registerComponent("directional-light", {
  schema: {
    color: { type: "color" },
    intensity: { default: 1.0 },
    castShadow: { default: true },
    shadowMapResolution: { default: [512, 512] }
  },

  init() {
    const el = this.el;
    this.light = new THREE.DirectionalLight();
    this.light.position.set(0, 0, 0);
    this.light.target.position.set(0, 0, 1);
    this.light.add(this.light.target);
    this.light.matrixNeedsUpdate = true;
    this.el.setObject3D("directional-light", this.light);
    this.el.sceneEl.systems.light.registerLight(el);
  },

  update(prevData) {
    const light = this.light;

    if (this.data.color !== prevData.color) {
      light.color.set(this.data.color);
    }

    if (this.data.intensity !== prevData.intensity) {
      light.intensity = this.data.intensity;
    }

    if (this.data.castShadow !== prevData.castShadow) {
      light.castShadow = this.data.castShadow;
    }

    const [width, height] = this.data.shadowMapResolution;
    const [prevWidth, prevHeight] = prevData.shadowMapResolution ? prevData.shadowMapResolution : [512, 512];

    if (width !== prevWidth || height !== prevHeight) {
      light.shadow.mapSize.set(width, height);

      if (light.shadow.map) {
        light.shadow.map.dispose();
        light.shadow.map = null;
      }
    }
  },

  remove: function() {
    this.el.removeObject3D("directional-light");
  }
});
