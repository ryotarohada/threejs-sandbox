import { ThreeManagerCore } from '@/lib/ThreeManager'
import * as THREE from 'three'
import { GUI } from 'lil-gui'

export class _ {
  private gui: GUI
  private scene: THREE.Scene
  private render: (updateFn?: CallableFunction | undefined) => void
  private updateFn: CallableFunction | undefined

  constructor() {
    const { scene, render } = new ThreeManagerCore({
      // isHelper: true,
      isControls: true,
      // isStats: true,
    })

    this.updateFn = undefined
    this.gui = new GUI()
    this.scene = scene
    this.render = render
    this.init()
  }

  private init(): void {
    const light = this.genLight()
    this.scene.add(light)
    this.render(this.updateFn)
  }

  private genLight(): THREE.DirectionalLight {
    const lightFormat = {
      color: '#ffffff',
      posX: 18,
      posY: 20,
      posZ: 15,
      intensity: 1.5,
    }
    const directionalLight = new THREE.DirectionalLight(
      lightFormat.color,
      lightFormat.intensity,
    )
    directionalLight.position.set(
      lightFormat.posX,
      lightFormat.posY,
      lightFormat.posZ,
    )
    const folder = this.gui.addFolder('DirectionalLight')
    folder
      .addColor(lightFormat, 'color')
      .onChange((color: string) => directionalLight.color.set(color))
    folder
      .add(lightFormat, 'posX', -100, 100)
      .onChange((x: number) => (directionalLight.position.x = x))
    folder
      .add(lightFormat, 'posY', -100, 100)
      .onChange((y: number) => (directionalLight.position.y = y))
    folder
      .add(lightFormat, 'posZ', -100, 100)
      .onChange((z: number) => (directionalLight.position.z = z))
    folder
      .add(lightFormat, 'intensity', 0, 2)
      .onChange((v: number) => (directionalLight.intensity = v))
    return directionalLight
  }
}
