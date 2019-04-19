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
  rime: {
    'ma': '#CB1B45',  'bo': '#CB1B45',  'ge': '#F05E1C',  'jie': '#EFBB24',
    'zhi': '#554236', 'er': '#90B44B',  'qi': '#B4A582',  'wei': '#B5495B',
    'kai': '#8E354A', 'mu': '#985F2A',  'yu': '#E79460',  'hou': '#72636E',
    'hao': '#572A3F', 'han': '#0B346E', 'hen': '#4E4F97', 'tang': '#268785',
    'geng': '#33A6B8', 'dong': '#0089A7'
  },
  coda: {
    '0': '#BDC0BA', 'i': '#5DAC81', 'u': '#6A8372', 'n': '#A28C37', 'ng': '#6C6024', 'r': '#B28FCE'
  },
  tone: {
    '0': '#BDC0BA', '1': '#4F726C', '2': '#00AA90', '3': '#CB1B45', '4': '#E83015'
  }
};

(function() {
  (function generateToggleCSS() {
    const result = [];
    for(let category in colorDefinitions) {
      for(let element in colorDefinitions[category]) {
        const color = colorDefinitions[category][element];
        const rand1 = Math.random() * 2 - 1;
        const rand2 = Math.random() * 2 - 1;
        const percent1 = 50 + 10 * Math.sign(rand1) + 5 * rand1;
        const percent2 = 50 + 10 * Math.sign(rand2) + 5 * rand2;
        const cssRule = `#toggle-${category}-${element}.on { background: radial-gradient(circle at center, ${color}FF 35%, ${color}00 46%), radial-gradient(circle at ${percent1}% ${percent2}%, ${color}88 10%, ${color}00 30%); color: white; }`;
        result.push(cssRule);
      }
    }
    $('body').append('<style id="toggle-colors">' + result.reduce((a, b) => a + '\n' + b) + '</style>');
  })();

  /**
   * Get the current rime displays
   * @returns { { category: string, displays: [ string ] } }
   */
  function getDisplays() {
    const category = window.currentCategory || $('#color-controller .control-page.active')[0].id.split('-')[0];
    const displays = [];
    $(`#${category}-page .toggle-btn.on`).each((index, element) => displays.push(element.id.split('-').slice(-1)[0]));
    return { category, displays };
  }

  /**
   * Generate CSS of the hanzi-box styles
   * @returns {string} Generated css
   */
  function generateDynamicCSS() {
    const current = getDisplays();
    const categoryColors = colorDefinitions[current.category];
    let result = '';

    for(let phoneticElement in categoryColors) {
      const color = categoryColors[phoneticElement];
      const selector = `.hanzi-box.${current.category}-${phoneticElement}`;
      if(current.displays.indexOf(phoneticElement) !== -1) {
        result += `${selector} { background: ${color}; color: white; }\n`;
      } else {
        result += `${selector}:hover { background: ${color}; color: white; }\n`;
      }
    }

    return result;
  }

  function updateStyleCSS() {
    setTimeout(() => {
      const css = generateDynamicCSS();
      $('#rime-style').text(css);
    }, 100);
  }
  $('.toggle-btn').on('click', updateStyleCSS);
  $('.tab').on('click', updateStyleCSS);

  $(document).ajaxStop(function() {
    setTimeout(() => {
      const css = generateDynamicCSS();
      $('#rime-style').text(css);
    }, 500);
  });
})();
