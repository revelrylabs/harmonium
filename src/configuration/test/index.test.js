import Configuration from '../index'
import tempy from 'tempy'
import {promisify} from 'util'
import fs from 'fs'

describe('Configuration', () => {
  describe('createConfiguration', () => {
    it('creates a new Harmonium configuration object', async () => {
      const config = await Configuration.createConfiguration()

      expect(config.buildPath).equal('./harmonium-settings/')
      expect(config.hasOwnProperty('designTokens')).equal(true)
    })
  })

  describe('mergeConfiguration', () => {
    it('merges 2 configuration object', async () => {
      const config1 = await Configuration.createConfiguration()
      const config2 = await Configuration.createConfiguration()

      config2.buildPath = './not-harmonium-settings/'
      const mergedConfig = Configuration.mergeConfiguration(config1, config2)

      expect(config1.buildPath).equal('./harmonium-settings/')
      expect(config2.buildPath).equal('./not-harmonium-settings/')
      expect(mergedConfig.buildPath).equal('./not-harmonium-settings/')
    })
  })

  describe('createAssets', () => {
    it('generates assets', async () => {
      const config = await Configuration.createConfiguration()

      const buildPath = `${tempy.directory()}/`

      config.buildPath = buildPath

      await Configuration.createAssets(config)

      const readdirAsync = promisify(fs.readdir)
      const files = await readdirAsync(buildPath)

      expect(files).to.include('_harmonium-settings.scss')
      expect(files).to.include('_color-palette.scss')
    })
  })
})
