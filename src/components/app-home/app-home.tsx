import { Component, h } from '@stencil/core'

import { Scene, Color, PerspectiveCamera, MeshBasicMaterial, Mesh, BoxBufferGeometry, WebGLRenderer } from 'three'
import { Loop, Updatable } from '../../systems/Loop'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true,
})
export class AppHome {
  container: HTMLDivElement

  loop: Loop

  componentDidLoad() {
    const { container } = this

    const scene = new Scene()
    scene.background = new Color('skyblue')

    const camera = this.createCamera(container)

    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10)

    // create a geometry
    const cube = new Cube()

    // add the mesh to the scene
    scene.add(cube.getMesh())

    // create the renderer
    const renderer = new WebGLRenderer()

    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight)

    // finally, set the pixel ratio so that our scene will look good on HiDPI displays
    renderer.setPixelRatio(window.devicePixelRatio)

    // add the automatically created <canvas> element to the page
    container.append(renderer.domElement)

    this.loop = new Loop(camera, scene, renderer)
    this.loop.updatables.push(cube)

    this.start()
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }

  private createCamera(container: HTMLDivElement) {
    const fov = 35 // AKA Field of View
    const aspect = container.clientWidth / container.clientHeight
    const near = 0.1 // the near clipping plane
    const far = 100 // the far clipping plane

    const camera = new PerspectiveCamera(fov, aspect, near, far)
    return camera
  }

  render() {
    return (
      <div class="app-home">
        <div ref={el => (this.container = el)} id="scene-container"></div>
      </div>
    )
  }
}

class Cube implements Updatable {
  private cube: Mesh

  constructor() {
    const geometry = new BoxBufferGeometry(2, 2, 2)

    // create a default (white) Basic material
    const material = new MeshBasicMaterial()

    // create a Mesh containing the geometry and material
    this.cube = new Mesh(geometry, material)
  }

  tick() {
    const { cube } = this
    // increase the cube's rotation each frame
    cube.rotation.z += 0.01
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  getMesh() {
    return this.cube
  }
}
