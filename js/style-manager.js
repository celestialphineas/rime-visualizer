var colorDefinitions = {
  consonant: {
    '0': '#BDC0BA',
    'b': '#4F726C',   'p': '#268785',   'm': '#0F4C3A',   'f': '#00AA90',
    'd': '#336774',   't': '#0089A7',   'n': '#0D5661',   'l': '#26453D',
    'g': '#B17844',   'k': '#FC9F4D',   'ng': '#855B32',  'h': '#E98B2A',
    'j': '#E83015',   'q': '#F05E1C',   'x': '#B47157',
    'z': '#9F353A',   'c': '#CB1B45',   's': '#DB4D6D',
    'zh': '#622954',  'ch': '#C1328E',  'sh': '#E03C8A',  'r': '#6D2E5B'
  },
  hu: {
    'kai': '#B54434', 'qi': '#F05E1C', 'he': '#4F726C', 'cuo': '#7BA23F'
  },
  coda: {
    '0': '#BDC0BA', 'i': '#5DAC81', 'u': '#6A8372', 'n': '#A28C37', 'ng': '#6C6024', 'r': '#B28FCE'
  },
  tone: {
    '0': '#BDC0BA', '1': '#005CAF', '2': '#00AA90', '3': '#CB1B45', '4': '#E83015'
  }
};

(function() {
  (function generateToggleCSS() {
    var result = [];
    for(var category in colorDefinitions) {
      for(var element in colorDefinitions[category]) {
        var color = colorDefinitions[category][element];
        var rand1 = Math.random() * 2 - 1;
        var rand2 = Math.random() * 2 - 1;
        var percent1 = 50 + 10 * Math.sign(rand1) + 5 * rand1;
        var percent2 = 50 + 10 * Math.sign(rand2) + 5 * rand2;
        var cssRule = `#toggle-${category}-${element}.on { background: radial-gradient(circle at center, ${color}FF 35%, ${color}00 46%), radial-gradient(circle at ${percent1}% ${percent2}%, ${color}88 10%, ${color}00 30%); color: white; }`;
        result.push(cssRule);
      }
    }
    $('body').append('<style id="toggle-colors">' + result.reduce(function (a, b) { return a + '\n' + b; }) + '</style>');
  })();

  /**
   * Generate CSS to insert by category and blurred option
   * @param {string} category
   * @param {boolean} blurred
   * @returns {string} Generated css
   */
  function generateDynamicCSS(category, blurred) {
    if(!colorDefinitions[category]) throw Error(`Category ${category} not found.`);
    return null;
  }
})();
