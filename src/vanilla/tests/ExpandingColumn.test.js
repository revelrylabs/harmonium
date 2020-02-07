const {JSDOM} = require('jsdom')

import * as Harmonium from '../harmonium'

describe('Harmonium', () => {
  describe('openExpandingColumn', () => {
    it('add the is-open class to the Drawer component', () => {
      const HTML = `
      <div class="rev-ExpandingCol-pane is-closed rev-Col rev-Col--shrink rev-Col--small6"></div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const expandingColumn = document.querySelector('.rev-ExpandingCol-pane')

      Harmonium.openExpandingColumn(expandingColumn)

      expect(expandingColumn.classList.contains('is-open')).equal(true)
      expect(expandingColumn.classList.contains('is-closed')).equal(false)
    })
  })

  describe('closeExpandingColumn', () => {
    it('removes the is-open class from the Drawer component', () => {
      const HTML = `
      <div class="rev-ExpandingCol-pane is-open rev-Col rev-Col--shrink rev-Col--small6"></div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const expandingColumn = document.querySelector('.rev-ExpandingCol-pane')

      Harmonium.closeExpandingColumn(expandingColumn)

      expect(expandingColumn.classList.contains('is-open')).equal(false)
      expect(expandingColumn.classList.contains('is-closed')).equal(true)
    })
  })
})
