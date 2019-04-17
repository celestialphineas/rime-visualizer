// Flat polyfill
if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, 'flat', {
    configurable: true,
    value: function flat() {
      var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);

      return depth ? Array.prototype.reduce.call(this, function (acc, cur) {
        if (Array.isArray(cur)) {
          acc.push.apply(acc, flat.call(cur, depth - 1));
        } else {
          acc.push(cur);
        }

        return acc;
      }, []) : Array.prototype.slice.call(this);
    },
    writable: true
  });
}

(function() {
  window.poemTitle = '念奴嬌·賦雨岩';
  window.poemText =`近來何處有吾愁　何處還知吾樂 
一點淒涼千古意　獨倚西風寥廓 
並竹尋泉　和雲種樹　喚作真閒客
此心閒處　不應長藉邱壑 

休說往事皆非　而今雲是　且把清尊酌 
醉裡不知誰是我　非月非雲非鶴
露冷風高　松梢桂子　醉了還醒卻 
北窗高臥　莫教啼鳥驚著`;

  /**
   * @param {string} input String to split
   */
  function lineBreak(input) {
    return input.split('\n')
      // .map(function(str) { return str.split(/(?<=[。！？；：])/g); }).flat()
      .map(function(str) {
        return str.split('').reverse().join('')
          .split(/(?=[。！？；：])/g).map(function(s) { return s.split('').reverse().join(''); })
          .reverse();
      }).flat()
      .map(function breakLong(str) {
        // Break up long line
        if(str.length >= 20) {
          // var clusters = str.split(/(?<=[，、　])/g);
          var clusters = str.split('').reverse().join('')
            .split(/(?=[，、　])/g).map(function(s) { return s.split('').reverse().join(''); })
            .reverse();
          if(clusters.length === 1) return str;
          var mid = Math.ceil(clusters.length/2);
          return [
            clusters.slice(0, mid)
              .concat("").reduce(function(a, b) { return a + b; }),
            clusters.slice(mid, clusters.length)
              .concat("").reduce(function(a, b) { return a + b; })
          ].flat().map(breakLong).flat();
        }
        return str;
      }).flat();
  }
  
  /**
   * @param {string} input String to convert
   */
  function hanzi2HTML(input) {
    var regex = /([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\u{20000}-\u{2CEAF}])/gu;

    return input.replace(regex, function(g1) {
      var classList = ['hanzi-box'];
      var rimeInfo = rimesData[g1] || [ ];
      if(rimeInfo[1]) classList.push(`consonant-${rimeInfo[1]}`);
      if(rimeInfo[2]) classList.push(`hu-${rimeInfo[2]}`);
      if(rimeInfo[3]) classList.push(`vowel-${rimeInfo[3]}`);
      if(rimeInfo[4]) classList.push(`coda-${rimeInfo[4]}`);
      if(rimeInfo[5]) classList.push(`rime-${rimeInfo[5]}`);
      var classString = classList.reduce(function(a, b) { return a + ' ' + b; })
      return `<span class="${classString}">${g1}</span>`;
    });
  }

  window.addEventListener('load', function() {
    $('#poem-title').text(poemTitle);
    $('#title-input').val(poemTitle);
    $('#text-input').val(poemText).characterCounter();
    M.textareaAutoResize($('#text-input'));
  });

  function updatePoemTitle() {
    $('#poem-title').text(poemTitle);
  }
  function updatePoemText() {
    if(isSimplified(poemText)) {
      $('.song').attr('lang', 'zh-CN');
    } else {
      $('.song').attr('lang', 'kr');
    }
    $('#poem-container').html(
      lineBreak(poemText).map(hanzi2HTML).reduce(function(a, b) { return a + '</br>' + b; })
    );
  }
  window.updatePoem = function() {
    window.poemTitle = $('#title-input').val();
    window.poemText = $('#text-input').val();
    updatePoemTitle();
    updatePoemText();
  }

  function initPoem() {
    updatePoemText();
  }

  $.getJSON('data/rimes.json', function(rimesData) {
    // Expose rimesData
    window.rimesData = rimesData;
  })
  .done(initPoem)
  .fail(function() { console.log('Rimes not found!'); });
})();
