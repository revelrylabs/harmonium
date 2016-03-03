import mixSpecIntoComponent from './mixSpecIntoComponent'

export default function applyMixins(...mixins) {
  return function(Component) {
    mixins.forEach((mixin) => mixSpecIntoComponent(Component, mixin))
    return Component
  }
}
