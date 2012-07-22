// hsla and rgba isn't supported yet
var stringParsers = [{
    // #000000
    re: /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/,
    parse: function (bits) {
      return [
        parseInt(bits[1], 16),
        parseInt(bits[2], 16),
        parseInt(bits[3], 16)
      ];
    }
  },
  {
    // #000
    re: /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/,
    parse: function (bits) {
      return [
        parseInt(bits[1] + bits[1], 16),
        parseInt(bits[2] + bits[2], 16),
        parseInt(bits[3] + bits[3], 16)
      ];
    }
  },
  {
    // rgb(0,0,0)
    re: /^rgb\(([\d]+),([\d]+),([\d]+)\)/,
    parse: function (bits) {
      return [
        parseInt(bits[1], 10),
        parseInt(bits[2], 10),
        parseInt(bits[3], 10)
      ];
    }
  }
]; 

/**
 * Parse color value
 *
 * @param {String} value
 * @return {Array}
 */

function Color (value) {
  var val
    , i;
  
  value = value.replace(/\s\s*/g, '');
  
  for (i = 0; i < stringParsers.length; i++) {
    if ((val = stringParsers[i].re.exec(value)) !== null) {
      val = stringParsers[i].parse(val);
      break;
    }
  }
  
  val[0] = (val[0] < 0 || isNaN(val[0])) ? 0 : ((val[0] > 255) ? 255 : val[0]);
  val[1] = (val[1] < 0 || isNaN(val[1])) ? 0 : ((val[1] > 255) ? 255 : val[1]);
  val[2] = (val[2] < 0 || isNaN(val[2])) ? 0 : ((val[2] > 255) ? 255 : val[2]);

  return val;
}

/**
 * Check if the value is a color string
 *
 * @param {String} value
 * @return {Boolean}
 */

function isColor (value) {
  return /(#[a-f|A-F|0-9]|rgb)/.test(value);
}

/**
 * Transform color rgb value
 *
 * @param {Float|Integer} current The current value
 * @param {Float|Integer} target The target value
 * @param {Float|Integer} eas Value from easing function
 */

function colorTransform (source, target, eas) {
  var res = []
    , k  
    , tmp;
    
  for (k in target) {
    if (target.hasOwnProperty(k)) {
      tmp = ~~(source[k]+(target[k]-source[k])*eas);
      res.push(tmp < 0 ? 0 : tmp > 255 ? 255 : tmp);
    }
  }
  
  return 'rgb(' + res.join(',') + ')';
}

/**
 * Parse color value
 *
 * @param {Object} prop The property object
 * @return {Object}
 */

function parseColorValue (prop) {
  return { value: new Color(prop.value), current: new Color(prop.current), transform: colorTransform };
}