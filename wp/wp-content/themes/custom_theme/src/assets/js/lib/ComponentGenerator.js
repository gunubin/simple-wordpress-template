/* @flow */

import Component from './Component'

export default class ComponentGenerator {

  _components: Component[] = []

  constructor(map: Object) {
    if (map) {
      this.generate(map)
    }
  }

  generate(map: Object) {
    Object.keys(map).map(key => {
      const val = map[key]
      const c = new val(key)
      this._components.push(c)
    })
  }

}
