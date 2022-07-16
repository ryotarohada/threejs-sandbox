import '../scss/style.scss'
import { FooContent } from './contents/foo'
import { SignWave } from './contents/sign-wave'

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

      default:
        break
    }
  }
}

new Main()
