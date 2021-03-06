$(function() {

  // Convert hex to rgb
  function hexToRgb(hex) {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

  // Palette reset
  function resetSwatches(i, color) {
    $("#" + i).css('background-color', color);
    $("#" + i).find("#color-" + i + "-hex").html(color);
    var rgb = hexToRgb(color);
    $("#" + i).find("#color-" + i + "-rgb" ).html(rgb);
    var match = ntc.name(color);
    var word = match[1];
    $("#" + i).find("#color-" + i + "-name" ).html(word);
  }

  // Gives a random palette on load
  for(var i=1; i<6; i++){
    var color = randomColor();
    resetSwatches(i, color)
  }

  // Provides the on click functionality for each swatch
  $('.swatch').on("click", function(){
  var color = randomColor();
  $(this).css('background-color', color);
  $(this).find(".color-name-hex").html(color);
  var rgb = hexToRgb(color);
  $(this).find(".color-name-rgb" ).html(rgb);
  var match = ntc.name(color);
  var word = match[1];
  $(this).find(".color-name-word" ).html(word);
  });

  // Prevent color name code from triggering event
  $('.color-name-hex').click(function( event ) {
  event.stopPropagation();
  });

  $('.color-name-rgb').click(function( event ) {
  event.stopPropagation();
  });

  // Reset all colours on spacebar push

  $(window).keypress(function (e) {
    if (e.keyCode === 32) {
      for(var i=1; i<6; i++){
          var color = randomColor();
          resetSwatches(i, color)
          }
        }
    });

  // Convert to rgb on r-key push, hex on h- key push

  window.onkeyup = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 82) { //r key
        $(".color-name-hex").css('visibility', 'hidden');
        $(".color-name-rgb").css('visibility', "visible");
        console.log("r pressed")
    }
    else if (code === 72) { //h key
        $(".color-name-hex").css('visibility', 'visible');
        $(".color-name-rgb").css('visibility', "hidden");
    }
    else if (code === 80) { //p key for pastel
      for(var i=1; i<6; i++){
          var color = randomColor({luminosity: 'light'});
          resetSwatches(i, color)
          }
        }
    else if (code === 77) { //m key for monochrome
      for(var i=1; i<6; i++){
          var color = randomColor({hue: 'monochrome'});
          resetSwatches(i, color)
          }
        }
    else if (code === 84) { //t key for themed colors
      var colorArray = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink',];
      var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
      for(var i=1; i<6; i++){
          var color = randomColor({hue: rand});
          resetSwatches(i, color)
          }
        }
    else if (code === 65) { //a key for anything
      for(var i=1; i<6; i++){
          var color = randomColor({hue: 'random',luminosity: 'random'});
          resetSwatches(i, color)
          }
        }
  };

//
});
