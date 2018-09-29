const modernizerResults = document.querySelector('#modernizerResults')
if (Modernizr.canvas) {
  modernizerResults.innerText += 'Yes, we can.'
} else {
  modernizerResults.innerText += 'No, we cann\'t.'
}

/* Rotation */
const picture = document.querySelector('#puh')
function rotateLeft() {
  const rotateValue = parseInt(picture.style.transform) + 90
  picture.style.transform = `rotate(${rotateValue}deg)`
}
function rotateRight() {
  picture.classList.toggle('rotateRight')
}

/* Handle placeholder */
if (!Modernizr.input.placeholder) {
  console.log('No placeholder');
  $('input[placeholder]').focus(function () {
    if($(this).val() === $(this).attr('placeholder')) {
      $(this).val('')
    }
  });
  $('input[placeholder]').blur(function () {
    if (!$(this).val()) {
      $(this).val($(this).attr('placeholder'))
    } 
  });
}

