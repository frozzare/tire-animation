/**
 * Easing functions
 *
 * Every functions will take at least four arguments
 * - t: Current time
 * - b: Start value (Tire is passing in value 0)
 * - c: Change in value from start to end (Tire is passing value 1)
 * - d: Total duration of the animation
 *
 * Some easing functions also take some optional arguments (Nothing Tire is passing in, rely on default values):
 * - a: Amplitude
 * - p: Period
 * - s: Overshoot amount
 *
 * Each function will return the new value.
 *
 * The equations are created by Robert Penner.
 * (c) 2003 Robert Penner, all rights reserved.
 * The work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
 */

easings = tire.extend(easings, {
  easeInQuad: function (t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  
  easeOutQuad: function (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  
  easeInOutQuad: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  
  easeInQuart: function (t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  
  easeOutQuart: function (t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  
  easeInOutQuart: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  
  easeInQuint: function (t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  
  easeOutQuint: function (t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  
  easeInOutQuint: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  
  easeInExpo: function (t, b, c, d) {
    return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  
  easeOutExpo: function (t, b, c, d) {
    return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  
  easeInOutExpo: function (t, b, c, d) {
    if (t===0) return b;
    if (t===d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  
  easeInCirc: function (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  
  easeOutCirc: function (t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  
  easeInOutCirc: function (t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  
  easeInBack: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  
  easeOutBack: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  
  easeInOutBack: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  }
});