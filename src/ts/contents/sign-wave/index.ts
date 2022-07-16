import { ThreeManagerCore } from '@/lib/ThreeManager'
import * as THREE from 'three'
import { GUI } from 'lil-gui'
import Noise from 'noisejs'

export class SignWave {
  private gui: GUI
  private scene: THREE.Scene
  private render: (updateFn?: CallableFunction | undefined) => void
  private updateFn: CallableFunction | undefined

  constructor() {
    const { scene, render } = new ThreeManagerCore({
      isHelper: true,
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
    this.addLine()
    this.scene.add(light)
    this.render(this.updateFn)
  }

  private addLine() {
    // @ts-ignore
    const noise = new Noise.Noise(Math.random()) // 多分型定義ファイルおかしい

    //ライン数
    let lineArr: any[] = []
    const lineNum = 100
    const lineLength = 100
    const segmentNum = 500
    const amplitude = 10

    for (let i = 0; i < lineNum; i++) {
      const points = []

      for (let j = 0; j <= segmentNum; j++) {
        const x = (lineLength / segmentNum) * j - lineLength / 2
        const y = 0
        const z = i * 0.3 - (lineNum * 0.3) / 2
        const p = new THREE.Vector3(x, y, z)
        points.push(p)
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial()

      const line = new THREE.Line(geometry, material)
      lineArr[i] = line
      this.scene.add(lineArr[i])
    }

    this.updateFn = () => {
      for (let i = 0; i < lineNum; i++) {
        const line = lineArr[i]
        const positions = line.geometry.attributes.position.array
        const time = Date.now() / 4000

        for (let j = 0; j <= segmentNum; j++) {
          const x = (lineLength / segmentNum) * j - lineLength / 2
          const px = j / (50 + i)
          const py = i / 50 + time
          const y = amplitude * noise.perlin2(px, py)
          const z = i * 0.3 - (lineNum * 0.3) / 2
          positions[j * 3] = x
          positions[j * 3 + 1] = y
          positions[j * 3 + 2] = z
        }

        line.geometry.attributes.position.needsUpdate = true
      }
    }
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
