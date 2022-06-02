import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  WebGLRendererParameters,
  AxesHelper,
  Color,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

type CoreOptions = {
  width?: number
  height?: number
  isControls?: boolean
  isHelper?: boolean
  isStats?: boolean
}

export class ThreeManagerCore {
  public scene: Scene
  public renderer: WebGLRenderer
  public camera: PerspectiveCamera
  public controls: OrbitControls | undefined
  public helper: AxesHelper | undefined
  private stats: Stats | undefined

  private width: number
  private height: number
  private isControls: boolean
  private isStats: boolean

  constructor({
    width = innerWidth,
    height = innerHeight,
    isControls = false,
    isHelper = false,
    isStats = false,
  }: CoreOptions) {
    this.width = width
    this.height = height
    this.isControls = isControls
    this.isStats = isStats

    this.scene = new Scene()
    this.renderer = this.genRenderer()
    this.camera = this.genCamera()
    this.controls = this.genControls()
    this.stats = this.genStats()

    if (isHelper) this.setAxesHelper()

    this.render = this.render.bind(this)
  }

  private genRenderer(): WebGLRenderer {
    const options: WebGLRendererParameters = {
      antialias: true,
      canvas: document.querySelector('#myCanvas')!,
    }
    const renderer = new WebGLRenderer(options)
    renderer.setSize(this.width, this.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(new Color(0xffffff))
    renderer.shadowMap.enabled = true
    return renderer
  }

  private genCamera(): PerspectiveCamera {
    const PERSPECTIVE_CAMERA_OPTIONS = {
      fav: 45,
      aspect: this.width / this.height,
    }
    const camera = new PerspectiveCamera(
      PERSPECTIVE_CAMERA_OPTIONS.fav,
      PERSPECTIVE_CAMERA_OPTIONS.aspect,
    )
    camera.position.set(1000, 500, 800)
    return camera
  }

  private genControls(): OrbitControls | undefined {
    if (!this.isControls) return
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.autoRotate = false
    controls.enableDamping = true
    controls.maxDistance = 35
    controls.minDistance = 5
    controls.zoomSpeed = 0.5
    return controls
  }

  private genStats(): Stats | undefined {
    if (!this.isStats) return
    const stats = Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return stats
  }

  private setAxesHelper(): void {
    const axesBarLength = 50.0
    const axesHelper = new AxesHelper(axesBarLength)
    this.scene.add(axesHelper)
  }

  public render(updateFn?: CallableFunction): void {
    const renderFn = () => {
      if (updateFn) updateFn()
      if (this.stats) this.stats.begin()
      if (this.controls) this.controls.update()
      if (this.stats) this.stats.end()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(renderFn)
    }
    renderFn()
  }
}
