function selectStylesheetName(moduleName) {
  console.log(moduleName)
  switch(moduleName) {
    case 'flexGrid':
      return 'site-flex.css'
  }
  return 'site-noflex.css'
}

export default function selectExamplesStylesheet(moduleName) {
  return `./${selectStylesheetName(moduleName)}`
}
