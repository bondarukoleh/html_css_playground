const modernizerResults = document.querySelector('#modernizerResults')
if (Modernizr.canvas) {
  modernizerResults.innerText += 'Yes, we can.'
} else {
  modernizerResults.innerText += 'No, we cann\'t.'
}

/* Rotation */
const picture = document.querySelector('#puh')
const getNumber = /-?\d+/g
function rotateLeft() {
  (picture.style.transform) ?
    picture.style.transform = 'rotate(' + (parseInt(picture.style.transform.match(getNumber)[0]) - 90) + 'deg)' :
    picture.style.transform = 'rotate(-90deg)'
}
function rotateRight() {
  (picture.style.transform) ?
    picture.style.transform = 'rotate(' + (parseInt(picture.style.transform.match(getNumber)[0]) + 90) + 'deg)' :
    picture.style.transform = 'rotate(90deg)'
}
