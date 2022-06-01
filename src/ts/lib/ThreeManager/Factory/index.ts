import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  PlaneGeometry,
} from 'three'

export class ThreeManagerFactory {
  static genBox = (): Mesh => {
    const geometry = new BoxGeometry()
    const material = new MeshLambertMaterial({
      color: '#ff0000',
    })
    const mesh = new Mesh(geometry, material)
    return mesh
  }

  static genPlane(): Mesh {
    const geometry = new PlaneGeometry(20, 20, 1, 1)
    const material = new MeshLambertMaterial({
      color: '#ffffff',
      side: DoubleSide,
    })
    const plane = new Mesh(geometry, material)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    return plane
  }

  static genClones(
    mesh: Mesh,
    quantity: number,
  ): ReturnType<typeof mesh.clone>[] {
    return [...Array(quantity)].map(() => mesh.clone())
  }
}
