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
    const box = this.genBox({
      scale: {
        x: 5,
        y: 6,
        z: 5,
      },
      position: {
        x: -7.5,
        y: 3,
        z: 6.5,
      },
    })
    const box2 = this.genBox({
      scale: {
        x: 5,
        y: 1,
        z: 11.5,
      },
      position: {
        x: -7.5,
        y: 1,
        z: -3,
      },
    })
    const ground = this.genGround()
    const light = this.genLight()
    this.scene.add(light, box, box2, ground)
    this.render()
  }

  private genBox({
    scale,
    position,
  }: {
    scale: { x: number; y: number; z: number }
    position: { x: number; y: number; z: number }
  }): Mesh {
    const mat = new MeshLambertMaterial({ color: '#333333' })
    const geo = new BoxGeometry(scale.x, scale.y, scale.z)
    const mesh = new Mesh(geo, mat)
    mesh.position.set(position.x, position.y, position.z)
    return mesh
  }

  private genGround(): Mesh {
    const mat = new MeshLambertMaterial({ color: '#c9c9c9' })
    const geo = new BoxGeometry(22, 1, 20)
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
