import { Component, h } from '@stencil/core';

import { Scene, Color, PerspectiveCamera, MeshBasicMaterial, Mesh, BoxBufferGeometry, WebGLRenderer } from 'three';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true,
})
export class AppHome {
  container: HTMLDivElement;

  componentDidLoad() {
    const { container } = this;

    const scene = new Scene();
    scene.background = new Color('skyblue');

    // Create a camera
    const fov = 35; // AKA Field of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1; // the near clipping plane
    const far = 100; // the far clipping plane

    const camera = new PerspectiveCamera(fov, aspect, near, far);

    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10);

    // create a geometry
    const geometry = new BoxBufferGeometry(2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshBasicMaterial();

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    // add the mesh to the scene
    scene.add(cube);

    // create the renderer
    const renderer = new WebGLRenderer();

    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio so that our scene will look good on HiDPI displays
    renderer.setPixelRatio(window.devicePixelRatio);

    // add the automatically created <canvas> element to the page
    container.append(renderer.domElement);

    // render, or 'create a still image', of the scene
    renderer.render(scene, camera);
  }

  render() {
    return (
      <div class="app-home">
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
        <div ref={el => (this.container = el)} id="scene-container"></div>
      </div>
    );
  }
}
