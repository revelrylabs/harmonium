const {JSDOM} = require('jsdom')

import * as Harmonium from '../harmonium'

describe('Harmonium', () => {
  describe('selectTab', () => {
    it('opens the selected tab', () => {
      const HTML = `
      <div class="rev-Tabs">
      <ul class="rev-Tabs-titles">
        <li class="rev-TabsTitle rev-TabsTitle--selected">
          <a class="rev-TabsTitle-link" href="#">One</a>
        </li>
        <li class="rev-TabsTitle">
          <a class="rev-TabsTitle-link" href="#">Two</a>
        </li>
        <li class="rev-TabsTitle">
          <a class="rev-TabsTitle-link" href="#">Three</a>
        </li>
      </ul>
      <div class="rev-Tabs-content">
        <div class="rev-TabsItem-panel--selected rev-TabsItem-panel">
          <div class="rev-Row">
            <div class="rev-Col">
              <span>ipsum</span>
            </div>
          </div>
        </div>
        <div class="rev-TabsItem-panel">
          <div class="rev-Row">
            <div class="rev-Col">
              <span>Lorem</span>
            </div>
          </div>
        </div>
        <div class="rev-TabsItem-panel">
          <div class="rev-Row">
            <div class="rev-Col">
              <span>dolor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      `

      const jsdom = new JSDOM(HTML)

      const {window} = jsdom
      const {document} = window

      global.window = window
      global.document = document

      const tab = document.querySelector('.rev-Tabs')
      const tabTitles = document.querySelectorAll('.rev-TabsTitle')

      Harmonium.selectTab(tab, 2)

      expect(tabTitles[2].classList.contains('rev-TabsTitle--selected')).equal(
        true
      )
      expect(tabTitles[0].classList.contains('rev-TabsTitle--selected')).equal(
        false
      )
    })
  })
})
