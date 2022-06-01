import '../scss/style.scss'
import { FooContent } from './contents/foo'

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

      default:
        break
    }
  }
}

new Main()
