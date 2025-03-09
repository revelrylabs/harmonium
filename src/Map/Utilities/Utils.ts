/**
 * Dynamically loads a JavaScript file by creating a script tag and appending it to the head
 * @param src - The URL of the script to load
 * @returns A Promise that resolves when the script is loaded or rejects on error
 */
export const loadJS = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const script = window.document.createElement('script')

    script.id = 'mapScript'
    const head = window.document.getElementsByTagName('head')[0]

    head.appendChild(script)
    const handleResult = (state: 'loaded' | 'error') => (evt: Event) => {
      if (state === 'loaded') {
        resolve(src)
      } else if (state === 'error') {
        reject(evt)
      }
    }

    script.addEventListener('load', handleResult('loaded'))
    script.addEventListener('error', handleResult('error'))
    script.src = src
  })

/**
 * Converts a string to camelCase format
 * @param str - The string to convert to camelCase
 * @returns The camelCased string
 */
export const camelize = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') 