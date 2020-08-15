/*=========================== Drag and drop ==========================================*/
const source1 = document.querySelector('#source1')
const source2 = document.querySelector('#source2')
const target = document.querySelector('#targetDiv')
const outerTarget = document.querySelector('#dagAndDropDiv')

source1.addEventListener('dragstart', function (e) {
  this.style.border = "3px dotted #fff";
  e.dataTransfer.setData('sourcedata', 'Source1 inner Data')
  e.dataTransfer.setData('sourceElemId', this.id)
  e.dataTransfer.setData('text', this.innerText)
});

source1.addEventListener('dragend', function (e) {
  this.style.border = ""
});

source2.addEventListener('dragstart', function (e) {
  this.style.border = "3px dotted #fff";
  e.dataTransfer.setData('sourcedata', 'Source2 inner data')
  e.dataTransfer.setData('sourceElemId', this.id)
  e.dataTransfer.setData('text', this.innerText)
});

source2.addEventListener('dragend', function (e) {
  this.style.border = ""
});

target.addEventListener('dragover', function (e) {
  e.preventDefault();
  this.classList.add('dragovered');
});

target.addEventListener('drop', function (e) {
  e.preventDefault();
  e.stopPropagation();
  const gotSourceData = e.dataTransfer.getData('sourcedata');
  const gottext = e.dataTransfer.getData('text');
  this.appendChild(document.getElementById(e.dataTransfer.getData('sourceElemId')));
  const innerDataP = document.createElement('p')
  innerDataP.setAttribute('id', 'innerDataP' + e.dataTransfer.getData('sourceElemId'))
  innerDataP.innerText = 'Inner data from elem: "' + gotSourceData + '" \n Elem text: "' + gottext + '".'
  this.appendChild(innerDataP)
});

target.addEventListener('dragend', function (e) {
  this.classList.remove('dragovered')
});

target.addEventListener('dragleave', function (e) {
  this.classList.remove('dragovered')
});

target.addEventListener('dragstart', function (e) {
  this.removeChild(document.getElementById('innerDataP' + e.dataTransfer.getData('sourceElemId')))
});

outerTarget.addEventListener('dragover', function (e) {
  e.preventDefault();
});

outerTarget.addEventListener('drop', function (e) {
  this.appendChild(document.getElementById(e.dataTransfer.getData('sourceElemId')));
})

/*=========================== Geolocation ==========================================*/
const geolocationUl = document.querySelector('#navGeoLocUL')
const geolocationDiv = document.querySelector('#geolocationDiv')
const getLocationResult = document.querySelector('#getLocationResult')

function handleErrorCode(err) {
  let text = null
  switch (err.code) {
    case 0:
      text = `Something went wrong during getting your location: ${err.message}`
      break;
    case 1:
      text = `User prohibits to know about his location: ${err.message}`
      break;
    case 2:
      text = `Cannot get your location: ${err.message}`
      break;
    case 3:
      text = `Timeout over ${err.message}`
      break;
    default:
      text = `Something very interisting happened. We don't know what is it ${err.message}`
      break;
  }
  return text;
}

navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude, accuracy } }) => {
  document.querySelector('#latitude').innerText = `Latitude: ${latitude}`
  document.querySelector('#longitude').innerText = `Longitude: ${longitude}`
  document.querySelector('#accuracy').innerText = `Accuracy: ${accuracy}`
}, err => {
  console.log('Something went wrong with getting location. Error:')
  console.log(err)
  geolocationDiv.removeChild(geolocationUl)
  const errorP = document.createElement('p')
  errorP.innerText = handleErrorCode(err)
  geolocationDiv.appendChild(errorP)
})

const getLockByButton = document.querySelector('#getLockByButton')
const loading = document.querySelector('#loading')
document.querySelector('#getLockByButton').onclick = function () {
  showLoadingSpin()
  const additionSetting = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000
  }
  setTimeout(() => navigator
    .geolocation.getCurrentPosition(handleLocation, handleError, additionSetting), 2000)

  function handleLocation({ coords: { latitude, longitude, accuracy } }) {
    const divEl = document.createElement('div')
    divEl.innerHTML = `<span>
    "Latitude - ${latitude}"; 
    "Longitude - ${longitude}"; 
    "Accuracy - ${accuracy}"; 
    </span> <hr>`
    getLocationResult.appendChild(divEl)
  }

  function handleError(err) {
    const errorP = document.createElement('p')
    errorP.innerText = handleErrorCode(err)
    getLocationResult.appendChild(errorP)
  }
}

function showLoadingSpin() {
  loading.style.visibility = 'visible'
  setTimeout(() => loading.style.visibility = 'hidden', 2000)
}

/*--------- google map ------------*/
// They want enable billing, I don't want to do that.
navigator
  .geolocation.getCurrentPosition(({ coords: { latitude, longitude, accuracy } }) => {
    document.getElementById('accuracyP').innerText = `Accuracy of your position is - ${accuracy}`
    const position = new google.maps.LatLng(latitude, longitude);
    const options = {
      zoom: 15,
      center: position,
      mapTypeId: google.maps.mapTypeId.ROADMAP
    }
    const map = new google.maps.Map(document.getElementById('map'), options)
    const marker = new google.maps.marker({
      position: position,
      map: map,
      title: 'You are here.'
    })

    const infoWindow = new google.maps.infoWindow({
      content: `Probably it's your position.`
    })

    google.maps.event.addEventListener(marker, 'click', () => infoWindow.open(map, marker))
  })