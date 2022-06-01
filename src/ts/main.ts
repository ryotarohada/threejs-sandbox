import '../scss/style.scss'
import { exFn_1 } from '@/lib/exFn_1'
import { exFn_2 } from '@/lib/exFn_2'

class Main {
  constructor() {
    console.log('Initializing Application...')
    console.log(exFn_1(), exFn_2('Ryotaro Hada'))
  }
}

new Main()
