/**
 * Check for transition support
 * Will return an object with to properties, 
 * start and end with start and end values for transition.
 *
 * @return {Object}
 */
 
var transitionSupport = (function () {
  var elm = document.createElement('div')
    , endName = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd',
        'msTransition'     : 'MSTransitionEnd',
        'transition'       : 'transitionend'
    };
        
    for (var name in endName){
      if (elm.style[name] !== undefined) {
        return { start: name, end: endName[name] };
      }
    }
}());