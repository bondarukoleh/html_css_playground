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

/* Audio play pause*/
const audioElem = document.querySelector('#musicWithoutControls')
const playMusicButton = document.querySelector('#playMusic')
const minToPlayButton = document.querySelector('#minuteOfPlay')
playMusicButton.onclick = function () {
  if (audioElem.paused) {
    audioElem.play();
    playMusicButton.value = "Pause"
  } else {
    audioElem.pause();
    playMusicButton.value = "Play"
  }
}
minToPlayButton.addEventListener('click', e => {
  audioElem.currentTime = 60
})

/* Video player */
const videoElem = document.querySelector('#simpleVideoPlayerId')
const playVideoButton = document.querySelector('#playVideoPlayer')
const pauseVideoButton = document.querySelector('#pauseVideo')
const secondOfPlayButton = document.querySelector('#secondOfPlaying')
const volumeOfPlayButton = document.querySelector('#volume')
videoElem.addEventListener('play', moveVideoRange)

playVideoButton.onclick = () => {
  if (videoElem.paused || videoElem.ended) {
    videoElem.play()
  }
}
pauseVideoButton.onclick = function () {
  videoElem.pause()
}
secondOfPlayButton.onchange = function () {
  videoElem.currentTime = this.value
}
volumeOfPlayButton.onchange = function () {
  videoElem.volume = this.value
}
function moveVideoRange() {
  secondOfPlayButton.value = videoElem.currentTime
  setTimeout(moveVideoRange, 1000)
}

/* canvas preview logic */
const mediumPreviewContext = document.querySelector('#mediumPreview').getContext('2d')
const smallPreviewContext = document.querySelector('#smallPreview').getContext('2d')
videoElem.addEventListener('play', draw)
function draw() {
  if (videoElem.paused || videoElem.ended) {
    return;
  }
  mediumPreviewContext.drawImage(videoElem, 0, 0, 300, 150)
  smallPreviewContext.drawImage(videoElem, 0, 0, 300, 150)
  setTimeout(draw, 25)
}

