function selectStylesheetName(moduleName) {
  switch(moduleName) {
    case 'flexGrid':
      return 'site-flex'
  }
  return 'site'
}

export default function selectExamplesStylesheet(moduleName) {
  return `./${selectStylesheetName(moduleName)}`
}
