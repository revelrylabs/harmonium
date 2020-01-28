const {JSDOM} = require('jsdom')

import * as Harmonium from '../harmonium'

describe('Harmonium', () => {
  describe('openDrawer', () => {
    it('add the rev-Drawer--open class to the Drawer component', () => {
      const HTML = `
      <div class="rev-Drawer">
      <a class="rev-Drawer-closer">+</a>
      <div class="rev-Drawer-contents">
        <a class="rev-Drawer-expander">+</a>
      </div>
      </div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const drawer = document.querySelector('.rev-Drawer')

      Harmonium.openDrawer(drawer)

      expect(drawer.classList.contains('rev-Drawer--open')).equal(true)
    })
  })

  describe('closeDrawer', () => {
    it('removes the rev-Drawer--open class from the Drawer component', () => {
      const HTML = `
      <div class="rev-Drawer rev-Drawer--open">
      <a class="rev-Drawer-closer">+</a>
      <div class="rev-Drawer-contents">
        <a class="rev-Drawer-expander">+</a>
      </div>
      </div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const drawer = document.querySelector('.rev-Drawer')

      Harmonium.closeDrawer(drawer)

      expect(drawer.classList.contains('rev-Drawer--open')).equal(false)
    })
  })
})
