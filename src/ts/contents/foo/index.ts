import { ThreeManagerCore } from '@/lib/ThreeManager'
import {
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Scene,
} from 'three'
import { GUI } from 'lil-gui'

export class FooContent {
  private gui: GUI
  private scene: Scene
  private render: (updateFn?: CallableFunction | undefined) => void

  constructor() {
    const { scene, render } = new ThreeManagerCore({
      // isHelper: true,
      isControls: true,
      // isStats: true,
    })

    this.gui = new GUI()
    this.scene = scene
    this.render = render
    this.init()
  }

  private init(): void {
    this.genDataBase()
    this.genApiServer()
    this.genFrontend()
    this.genWorkers()
    const ground = this.genGround()
    const light = this.genLight()
    this.scene.add(light, ground)
    this.render()
  }

  private genDataBase(): void {
    const genTable = ({
      x,
      y,
      z,
    }: {
      x: number
      y: number
      z: number
    }): Mesh => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new CylinderGeometry(3, 3, 1, 50, 10)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }
    const genSpace = ({
      x,
      y,
      z,
    }: {
      x: number
      y: number
      z: number
    }): Mesh => {
      const mat = new MeshStandardMaterial({
        color: '#2dc8ff',
        metalness: 1,
        roughness: 0.5,
      })
      const geo = new CylinderGeometry(2.5, 2.5, 1, 50, 10)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }

    const tables = [
      genTable({ x: -7.5, y: 4, z: 6.5 }),
      genTable({ x: -7.5, y: 2.5, z: 6.5 }),
      genTable({ x: -7.5, y: 1, z: 6.5 }),
    ]
    const spaces = [
      genSpace({ x: -7.5, y: 3.5, z: 6.5 }),
      genSpace({ x: -7.5, y: 1.5, z: 6.5 }),
    ]
    const dbGroup = new Group()
    tables.forEach((mesh) => dbGroup.add(mesh))
    spaces.forEach((mesh) => dbGroup.add(mesh))
    this.scene.add(dbGroup)
  }

  private genApiServer(): void {
    const genDocker = () => {
      const mat = new MeshStandardMaterial({
        color: '#2dc8ff',
        metalness: 0.7,
        roughness: 0.7,
      })
      const geo = new BoxGeometry(5, 3, 11.5)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(-7.5, 1, -3)
      return mesh
    }

    const genServer = (x: number, y: number, z: number) => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new BoxGeometry(2, 5, 2)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }

    const apiGroup = new Group()
    apiGroup.add(
      genServer(-7.5, 5, -3),
      genServer(-7.5, 5, 0),
      genServer(-7.5, 5, -6),
      genDocker(),
    )
    this.scene.add(apiGroup)
  }

  private genFrontend(): void {
    const genServer = (x: number, y: number, z: number) => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new BoxGeometry(8, 3, 2)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }
    const genBlender = (x: number, y: number, z: number) => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new BoxGeometry(3, 2, 2)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }
    const genThreeJs = (x: number, y: number, z: number) => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new BoxGeometry(4.5, 2, 2)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }

    const frontendGroup = new Group()
    frontendGroup.add(
      genServer(1, 2, -7.5),
      genBlender(-1.5, 5, -7.5),
      genThreeJs(2.7, 5, -7.5),
    )
    this.scene.add(frontendGroup)
  }

  private genWorkers(): void {
    const genWorker = (x: number, y: number, z: number) => {
      const mat = new MeshLambertMaterial({ color: '#333333' })
      const geo = new BoxGeometry(0.5, 1, 0.5)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(x, y, z)
      return mesh
    }
    const workers = [
      genWorker(8, 1, 2),
      genWorker(1, 1, 5),
      genWorker(3, 1, 8),
      genWorker(7, 1, 7),
      genWorker(-3, 1, -2),
      genWorker(5, 1, -4),
      genWorker(4, 1, -3),
      genWorker(8, 1, -6),
    ]
    workers.forEach((worker) => this.scene.add(worker))
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
