/**
 * Easing functions
 * There's more easing functions in extra/easing, which you can create a custom build with.
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
 
var easings = {
  linear: function (t, b, c, d) {
    return c * t / d + b;
  },

  easeInSine: function (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },

  easeOutSine: function (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },

  easeInOutSine: function (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },

  easeInBounce: function (t, b, c, d) {
    return c - this.easeOutBounce(d - t, 0, c, d) + b;
  },

  easeOutBounce: function (t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  },

  easeInOutBounce: function (t, b, c, d) {
    if (t < d / 2) return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
    return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  },

  easeInElastic: function (t, b, c, d, a, p) {
    a = a || 0;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },

  easeOutElastic: function (t, b, c, d, a, p) {
    a = a || 0;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, - 10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },

  easeInOutElastic: function (t, b, c, d, a, p) {
    a = a || 0;
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, - 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },

  easeInCubic: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },

  easeOutCubic: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },

  easeInOutCubic: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }
};