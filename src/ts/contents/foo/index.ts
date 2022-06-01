import { ThreeManagerCore } from '@/lib/ThreeManager'
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  Scene,
} from 'three'
import { GUI } from 'lil-gui'

export class FooContent {
  private gui: GUI
  private scene: Scene
  private render: (updateFn?: CallableFunction | undefined) => void

  constructor() {
    const { scene, render } = new ThreeManagerCore({
      isHelper: true,
      isControls: true,
      isStats: true,
    })

    this.gui = new GUI()
    this.scene = scene
    this.render = render
    this.init()
  }

  private init(): void {
    const box = this.genBox()
    const ground = this.genGround()
    const light = this.genLight()
    this.scene.add(light, box, ground)
    this.render()
  }

  private genBox(): Mesh {
    const mat = new MeshLambertMaterial({ color: '#ff0000' })
    const geo = new BoxGeometry(1, 1, 1)
    const mesh = new Mesh(geo, mat)
    mesh.position.set(0, 1, 0)
    return mesh
  }

  private genGround(): Mesh {
    const mat = new MeshLambertMaterial({ color: '#ffff00' })
    const geo = new BoxGeometry(20, 1, 20)
    const mesh = new Mesh(geo, mat)
    return mesh
  }

  private genLight(): DirectionalLight {
    const lightFormat = {
      color: '#ffffff',
      posX: 18,
      posY: 20,
      posZ: 15,
      intensity: 1.5,
    }
    const directionalLight = new DirectionalLight(
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
