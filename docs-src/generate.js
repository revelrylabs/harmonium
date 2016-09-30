import React, {Component} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import dir from 'node-dir'
import browserify from 'browserify'
import IndexPage from './index-page'
import ExamplePage from './example-page'

function genJS(items) {
  const lines = ['// GENERATED FILE. DON\'T EDIT IT, STUPID.']
  const addLine = (x) => lines.push(x)
  const addLines = (x) => Array.prototype.push.apply(lines, x)

  const imports = []
  const ids = []

  imports.push(`import {createElement} from 'react'`)
  imports.push(`import {render} from 'react-dom'`)

  items.forEach((item) => {
    const mod = require(item.examples)
    Object.keys(mod).forEach((key) => {
      const id = `${item.name}_examples_${key}`
      ids.push(id)
      imports.push(`import {${key} as ${id}} from '../src/${item.name}.example'`)
    })
  })

  addLines(imports)
  addLine('const $ = (x) => document.getElementById(x)')
  addLine('const mount = (component, id) => $(id) && render(createElement(component), $(id))')
  addLine("document.addEventListener('DOMContentLoaded', function() {")
  addLine("  console.log('mounting components...')")
  addLines(
    ids.map((id) => `  mount(${id}, '${id}')`)
  )
  addLine('})')

  const jsSourceFile = path.join(__dirname, '__generated__.js')
  fs.writeFile(jsSourceFile, lines.join('\n'))
  browserify(jsSourceFile)
    .transform('babelify')
    .bundle()
    .on('end', () => fs.unlinkSync(jsSourceFile))
    .pipe(fs.createWriteStream(path.join(__dirname, '..', 'docs', 'bundle.js')))
}

function html(instance) {
  return `<!doctype html>${renderToStaticMarkup(instance)}`
}

function genIndex(navKeys) {
  const destPath = path.join(__dirname, `../docs/index.html`)
  fs.writeFile(destPath, html(<IndexPage navKeys={navKeys} />))
}

function genPage(item, navKeys) {
  const props = {
    navKeys,
    name: item.name,
    componentSrc: fs.readFileSync(item.component).toString(),
    examplesSrc: fs.readFileSync(item.examples).toString(),
    exampleComponents: require(item.examples),
  }
  const destPath = path.join(__dirname, `../docs/${item.name}.html`)
  fs.writeFile(destPath, html(<ExamplePage {...props} />))
}

export default function genDocs() {
  dir.files(path.join(__dirname, '../src'), function(err, files) {
    const items = files
      .filter((filePath) => !!filePath.match(/^(?!.*example\.js$).*\.js$/))
      .map((filePath) => ({
        name: filePath.match(/([^\/]+)\.js/)[1],
        component: filePath,
        examples: filePath.replace(/([^\/]+)\.js/, '$1.example.js')
      }))
    const navKeys = items.map(x => x.name)
    genJS(items)
    genIndex(navKeys)
    items.forEach(x => genPage(x, navKeys))
  })
}
