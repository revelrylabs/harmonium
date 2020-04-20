import Configuration from '../index'
import tempy from 'tempy'
import {promisify} from 'util'
import fs from 'fs'
import del from 'del'

describe('Configuration', () => {
  describe('createConfiguration', () => {
    it('creates a new Harmonium configuration object', async () => {
      const config = await Configuration.createConfiguration()

      expect(config.platforms.scss.buildPath).equal('./harmonium-settings/')
      expect(config.platforms.js.buildPath).equal('./js/')
      expect(config.hasOwnProperty('designTokens')).equal(true)
    })
  })

  describe('mergeConfiguration', () => {
    it('merges 2 configuration object', async () => {
      const config1 = await Configuration.createConfiguration()
      const config2 = await Configuration.createConfiguration()

      config2.platforms.scss.buildPath = './not-harmonium-settings/'
      const mergedConfig = Configuration.mergeConfiguration(config1, config2)

      expect(config1.platforms.scss.buildPath).equal('./harmonium-settings/')
      expect(config2.platforms.scss.buildPath).equal(
        './not-harmonium-settings/'
      )
      expect(mergedConfig.platforms.scss.buildPath).equal(
        './not-harmonium-settings/'
      )
    })
  })

  describe('createAssets', () => {
    it('generates assets', async () => {
      const config = await Configuration.createConfiguration()

      const scssBuildPath = `${tempy.directory()}/`
      const jsBuildPath = `${tempy.directory()}/`

      config.platforms.scss.buildPath = scssBuildPath
      config.platforms.js.buildPath = jsBuildPath

      await Configuration.createAssets(config)

      const readdirAsync = promisify(fs.readdir)
      const scssFiles = await readdirAsync(scssBuildPath)
      const jsFiles = await readdirAsync(jsBuildPath)

      // Cleanup temp directories
      await del([scssBuildPath, jsBuildPath], {force: true})

      expect(scssFiles).to.include('_harmonium-settings.scss')
      expect(scssFiles).to.include('_color-palette.scss')
      expect(jsFiles).to.include('harmonium-tokens.js')
    })
  })
})
