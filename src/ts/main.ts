import '../scss/style.scss'
import { FooContent } from './contents/foo'
import { SignWave } from './contents/sign-wave'
import { GLSL1Content } from './contents/glsl-1'

class Main {
  private targetContent: string | null
  constructor() {
    this.targetContent = document.body.getAttribute('data-page')
    this.start()
  }

  private start(): void {
    if (!this.targetContent) return
    switch (this.targetContent) {
      case 'foo':
        new FooContent()
        break

      case 'signwave':
        new SignWave()
        break

      case 'glsl-1':
        new GLSL1Content()
        break

      default:
        break
    }
  }
}

new Main()
