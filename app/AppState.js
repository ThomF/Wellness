import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])
  /** @type {import('./Models/Zen').Zen | null} */
  zen = null
  /** @type {import('./Models/Zen').Zen[]} */
  zens = []
  /** @type {import('./Models/HomePage').HomePage | null} */
  background = null
  /** @type {import('./Models/HomePage').HomePage[]} */
  HomePage = []
  /** @type {import('./Models/HomePage').HomePage | null} */
  quote = null

  // NOTE weather specific
  /** @type {import('./Models/Weather').Weather[]} */
  weather = []
  /** @type {import('./Models/Weather').Weather | null}*/
  temp = null

  weatherToggle = 'fahrenheit'

}









export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
