type MappingFunction = (key: any) => any;
type MappingArray = any[];
type MappingObject = Record<string, any>;
type Mapping = MappingFunction | MappingArray | MappingObject;
type KeyTransformer = (key: any) => string;

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
 * @param {Mapping} mapping - an object, array, or function.
 * @param {any} key - the key value to look up in the mapping
 * @param {KeyTransformer} keyTransformer - for lookups in objects or arrays, apply this
 * transform to the key first (typically used to flatten complex objects into
 * simple strings for object lookup)
 * @param {any} trueValue - value to return if the mapping lookup is true
 * @return {any} - value can be null, bool, or a classname
 */
export default function configMapping(
  mapping: Mapping, 
  key: any, 
  keyTransformer: KeyTransformer, 
  trueValue: any
): any {
  // Check if mapping is a function
  if (typeof mapping === 'function') {
    const mappedValue = (mapping as MappingFunction)(key)

    return mappedValue === true ? trueValue : mappedValue
  } 
  // Check if mapping is an array
  else if (Array.isArray(mapping)) {
    return (mapping as MappingArray).indexOf(keyTransformer(key)) > -1 ? trueValue : null
  } 
  // Default to object mapping
  else {
    return (mapping as MappingObject)[keyTransformer(key)]
  }
} 