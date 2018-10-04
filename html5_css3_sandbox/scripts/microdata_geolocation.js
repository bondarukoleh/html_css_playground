/* Drag and drop */
const source1 = document.querySelector('#source1')
const source2 = document.querySelector('#source2')
const target = document.querySelector('#targetDiv')
const outerTarget = document.querySelector('#dagAndDropDiv')
const wtf = document.querySelector('#wtf')

source1.addEventListener('dragstart', function (e) {
  this.style.border = "3px dotted #fff";
  e.dataTransfer.setData('sourcedata', 'Some inner Data from source1 text')
  e.dataTransfer.setData('sourceElemId', this.id)
}, false);

source1.addEventListener('dragend', function (e) {
  this.style.border = ""
}, false);

source2.addEventListener('dragstart', function (e) {
  this.style.border = "3px dotted #fff";
  e.dataTransfer.setData('sourcedata', 'Some inner Data from source2 text')
  e.dataTransfer.setData('sourceElemId', this.id)
}, false);

source2.addEventListener('dragend', function (e) {
  this.style.border = ""
}, false);

target.addEventListener('dragover', function(e) {
  e.preventDefault();
  return false;
}, false);

target.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  const gotData = e.dataTransfer.getData('sourcedata');
  this.appendChild(document.getElementById(e.dataTransfer.getData('sourceElemId')));
  const innerDataP = document.createElement('p')
  innerDataP.setAttribute('id', 'innerDataP')
  const innerTextP = document.createElement('p')
  innerTextP.setAttribute('id', 'innerTextP')
  innerDataP.innerText = 'Inner data from elem: "' + gotData + '"'
  innerTextP.innerText = 'Elem text: "' + e.innerText + '".'
  this.appendChild(innerDataP)
  this.appendChild(innerTextP)
  return false;
}, false);

outerTarget.addEventListener('dragover', function(e) {
  e.preventDefault();
  return false;
}, false);

outerTarget.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('objectAAA');
  this.appendChild(document.getElementById(e.dataTransfer.getData('sourceElemId')));
  target.removeChild(document.getElementById('innerDataP'))
  target.removeChild(document.getElementById('innerTextP'))
}, false)