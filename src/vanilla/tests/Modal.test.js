const {JSDOM} = require('jsdom')

import * as Harmonium from '../harmonium'

describe('Harmonium', () => {
  describe('openModal', () => {
    it('add the rev-Modal--open class to the Modal component', () => {
      const HTML = `
      <div class="rev-Modal">
      <div role="button" class="rev-Modal-background" tabindex="0"></div>
      <div class="rev-Modal-content">
        <div class="rev-Row">
          <div class="rev-Col">
            <h1>Modal Example</h1>
            <p>
              Click the background or the close button to dismiss the modal.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close Callout"
          class="rev-CloseButton rev-CloseButton--absolute"
        >
          ×
        </button>
      </div>
    </div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const modal = document.querySelector('.rev-Modal')

      Harmonium.openModal(modal)

      expect(modal.classList.contains('rev-Modal--open')).equal(true)
    })
  })
})
