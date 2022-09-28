import { Camera, Clock, Scene, WebGLRenderer } from 'three'

interface Updatable {
  tick: () => void
}

class Loop {
  private camera: Camera
  private scene: Scene
  private renderer: WebGLRenderer
  updatables: Updatable[] = []

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
  }

  start() {
    const { renderer, camera, scene } = this
    renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick()

      // render a frame
      renderer.render(scene, camera)
    })
  }

  tick() {
    // Code to update animations will go here
    for (const object of this.updatables) {
      object.tick()
    }
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }
}

export { Loop, Updatable }
