/**
 * Function which accepts a variety of types of mappings and a key, and
 * determines what the mapped value of that key is. The common usage is taking a
 * prop which could be an object, array, or function, and is expected to return
 * a className string based on if it matches or not and what the key value is.
 *
 * This exists so we can abstract these types of things out of individual
 * components, and all they have to care about is using the mapped result.
 *
 * If mapping is a function: if true, return trueValue. Otherwise, return the
 * return value of mapping (usually false).
 *
 * If mapping is an object: return mapping[key].
 *
 * If mapping is an array: return trueValue if key is found in the array,
 * otherwise null.
 * @param {object|Array|Function} mapping - an object, array, or function.
 * @param {*} key - the key value to look up in the mapping
 * @param {*} keyTransformer - for lookups in objects or arrays, apply this
 * transform to the key first (typically used to flatten complex objects into
 * simple strings for object lookup)
 * @param {*} trueValue - value to return if the mapping lookup is true
 */
export default function configMapping(mapping, key, keyTransformer, trueValue) {
  if (mapping.call) {
    const mappedValue = mapping(key)

    return mappedValue === true ? trueValue : mappedValue
  } else if (mapping.length && typeof mapping.length === 'number') {
    return mapping.indexOf(keyTransformer(key)) > -1 ? trueValue : null
  } else {
    return mapping[keyTransformer(key)]
  }
}
