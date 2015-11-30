import _ from 'underscore'
import mixSpecIntoComponent from './mixSpecIntoComponent'

/* This optional extension re-enables the React mixin system for plain JS
 * classes, e.g. ES6 classes, Backbone classes, ES3 module pattern classes
 * You require the extension like `//= require revelry/extensions/mixins` and
 * then you just use appComponent and revComponent like normal.
 * Internally, this works by wrapping the appComponent and revComponent methods
 * in a function closure which actually does the mixing in, since React punts.
 */
export default function(Rev) {

  function mixinListForObject(object) {
    var mixinList = object.mixins || [];
    mixinList.push(Rev.Mixins.Core);
    return _.uniq(mixinList);
  }

  function forEachMixin(object, fn) {
    var mixin, i, l;
    var mixinList = mixinListForObject(object);
    l = mixinList.length;
    for(i = 0; i < l; i++) {
      mixin = mixinList[i];
      fn(mixin);
    }
  }

  function decorateComponentMethod(componentMethod) {
    return function(name, object) {
      var componentClass = (componentMethod.bind(Rev))(name, object);
      if(typeof object === 'function') {
        // ES6 class
        forEachMixin(object, function(mixin){
          mixSpecIntoComponent(componentClass, mixin);
        });
      }
    }
  }

  Rev.appComponent = decorateComponentMethod(Rev.appComponent);
  Rev.registerComponent = decorateComponentMethod(Rev.registerComponent);

  Rev.appExample = decorateComponentMethod(Rev.appExample);
  Rev.registerExample = decorateComponentMethod(Rev.registerExample);

}
