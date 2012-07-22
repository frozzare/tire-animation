var durations = {
      'slow': 600,
      'fast': 200,
      'normal': 400
    };
    
/**
 * Parse numerical value
 * "12px" => { value: 12, unit: 'px', ... }
 *
 * 
 * @param {Object} prop The property object
 * @return {Object}
 */

function parseNumericalValue (prop) {
  var num = (tire.isStr(prop.value)) ? parseFloat(prop.value) : prop.value
    , unit = (tire.isStr(prop.value)) ? prop.value.replace(num, '') : 'px'; 
  return { value: num, unit: unit, current: parseFloat(prop.current), transform: numericalTransform };
}

/**
 * Parse CSS property value
 *
 * @param {Object} prop The property object
 * @return {Object}
 */

function parsePropertyValue (prop) {
  if (isColor(prop.value)) {
    return parseColorValue(prop);
  } else {
    return !tire.isObj(prop.value) ? parseNumericalValue(prop) : { value: prop.value, unit: '', sta: 0, current: prop.current };
  }
}

/**
 * Transform element with easing, current position, duration and property object
 *
 * @param {String} easing
 * @param {Float|Integer} position
 * @param {Integer} duration
 * @param {Object} prop
 * @return {Float|Integer}
 */

function transform (easing, position, duration, prop) {
  var val = parsePropertyValue(prop)
    , eas = easings[easing](duration * position, 0, 1, duration);
  return val.transform(val.current, val.value, eas) + (val.unit || '');
}

/**
 * Transform numerical value
 *
 * @param {Float|Integer} current The current value
 * @param {Float|Integer} target The target value
 * @param {Float|Integer} eas Value from easing function
 */
 
function numericalTransform (current, target, eas) {         
  return (current+(target-current)*eas).toFixed(3);
}

tire.fn.extend({
  
  /**
   * Animation using CSS
   * 
   * @param {Object} prop CSS properties
   * @param {Float|Integer} duration Animation time
   * @param {String} easing The easing name
   * @param {Function} callback (Not supported yet)
   */
  
  animate: function (prop, duration, easing, callback) {
    if (tire.isFun(duration)) callback = duration;
    if (tire.isFun(easing)) callback = easing;
  
    easing = easing || 'linear';
    duration = tire.isNum(duration) ? duration : durations[duration] || durations.normal;
    
    var self = this
      , start = (+new Date())
      , end = start + duration
      , currentTime = start
      , position
      , interval
      , p;
    
    for (p in prop) {
      if (prop.hasOwnProperty(p)) {
        if (!tire.isObj(prop[p])) prop[p] = { value: prop[p], current: 0 };
        if (this.css(p) !== '' && !prop[p].current) prop[p].current = this.css(p);
      }
    }
            
    var loop = function (time) {
      position = time > end ? 1 : (time - start) / duration;
      for (p in prop) self.css(p, transform(easing, position, duration, prop[p]));
      if (time > end) cancelAnimationFrame(interval);
      else requestAnimationFrame(loop);
    }
      
    interval = requestAnimationFrame(loop);
  },
  
  /**
   * Fade in element
   *
   * @param {Float|Integer} duration Animation time
   * @param {String} easing The easing name
   * @param {Function} callback (Not supported yet)
   */
   
  fadeIn: function (duration, easing, callback) {
    return this.animate({ from: 0.0, to: 1.0 }, duration, easing, callback);
  },

  /**
   * Fade out element
   *
   * @param {Float|Integer} duration Animation time
   * @param {String} easing The easing name
   * @param {Function} callback (Not supported yet)
   */
     
  fadeOut: function (duration, easing, callback) {
    return this.animate({ from: 1.0, to: 0.0 }, duration, easing, callback);
  }
});