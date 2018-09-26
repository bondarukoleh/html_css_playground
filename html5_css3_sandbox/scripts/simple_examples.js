const modernizerResults = document.querySelector('#modernizerResults')
if(Modernizr.canvas){
  modernizerResults.innerText += 'Yes, you can.'
} else {
  modernizerResults.innerText += 'No, you cann\'t.'
}