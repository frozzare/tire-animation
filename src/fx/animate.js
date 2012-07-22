var opacityType = (typeof document.body.style.opacity !== 'undefined') ? 'opacity' : 'filter'
  , durations = {
      'slow': 600,
      'fast': 200,
      'normal': 400
    };

function parseNumericalValue (prop) {
  var num = (tire.isStr(prop.value)) ? parseFloat(prop.value) : prop.value
    , unit = (tire.isStr(prop.value)) ? prop.value.replace(num, '') : 'px'; 
  return { value: num, unit: unit, sta: num, current: parseFloat(prop.current), transform: numericalTransform };
}
 
function parsePropertyValue (prop) {
  if (isColor(prop.value)) {
    return parseColorValue(prop);
  } else {
    return !tire.isObj(prop.value) ? parseNumericalValue(prop) : { value: prop.value, unit: '', sta: 0, current: prop.current };
  }
}

function transform (easing, position, duration, prop) {
  var val = parsePropertyValue(prop)
    , eas = easings[easing](duration * position, 0, 1, duration);
  return val.transform(val.current, val.value, eas) + (val.unit || '');
}
 
function numericalTransform (current, target, eas) {         
  return (current+(target-current)*eas).toFixed(3);
}

tire.fn.extend({
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
  
  fadeIn: function (duration, easing, callback) {
    return this.animate({ from: 0.0, to: 1.0 }, duration, easing, callback);
  },
  
  fadeOut: function (duration, easing, callback) {
    return this.animate({ from: 1.0, to: 0.0 }, duration, easing, callback);
  }
});