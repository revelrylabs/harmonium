export const loadJS = (src) =>
  new Promise((resolve, reject) => {
    const script = window.document.createElement('script')

    script.id = 'mapScript'
    const head = window.document.getElementsByTagName('head')[0]

    head.appendChild(script)
    const handleResult = (state) => (evt) => {
      if (state === 'loaded') {
        resolve(src)
      } else if (state === 'error') {
        reject(evt)
      }
    }

    script.addEventListener('load', handleResult('loaded'))
    script.addEventListener('error', handleResult('loaded'))
    script.src = src
  })

export const camelize = (str) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
