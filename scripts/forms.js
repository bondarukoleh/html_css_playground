function alertMessage(value) {
  const inputField = document.querySelector('#textInput')
  alert(inputField.value)
  inputField.value = ''
}

function throwError(parameter) {
  throw new Error(`${parameter} is mandatory`)
}

function makeInnerText({
  makeInnerTextToElem = throwError('makeInnerTextToElem'), changedElem = throwError('changedElem'),
  action = throwError('action'), text = 'Chosen value', preventDefault = false }) {
  const makeInnerTextTo = document.querySelector(makeInnerTextToElem)
  const changedElement = document.querySelector(changedElem)
  changedElement.addEventListener(action, (e) => {
    preventDefault && e.preventDefault()
    makeInnerTextTo.innerText = `${text}: ${changedElement.value}`
  }, false);
};

makeInnerText({
  makeInnerTextToElem: '#dateParagraph',
  changedElem: '#datePicker',
  action: 'change',
  text: 'Chosen date'
})

makeInnerText({
  makeInnerTextToElem: '#fileParagraph',
  changedElem: '#fileInput',
  action: 'change',
  text: 'Chosen filePath'
})

makeInnerText({
  makeInnerTextToElem: '#imageParagraph',
  changedElem: '#imageInp',
  action: 'click',
  text: 'Form submitted but preventDefault in listener',
  preventDefault: true
})

makeInnerText({
  makeInnerTextToElem: '#rangeParagraph',
  changedElem: '#rangeInput',
  action: 'change',
  text: 'Chosen range',
})

const actionForm = document.querySelector('#actionForm')
const colorParagraph = document.querySelector("#colorParagraph")
const colorPicker = document.querySelector("#colorPicker")
colorPicker.addEventListener("change", (e) => colorParagraph.style.backgroundColor = event.target.value, false);

const searchParagraph = document.querySelector("#searchParagraph")
const searchInput = document.querySelector("#searchInput")
const forSearchButton = document.querySelector("#forSearch")
forSearchButton.addEventListener("click", (e) => {
  searchParagraph.innerText = `Search for: ${searchInput.value}`
}, false);

const selectParagraph = document.querySelector("#selectParagraph")
const regularSelect = document.querySelector("#regularSelect")
regularSelect.addEventListener("change", (e) => {
  (regularSelect.value === '-1') ?
    selectParagraph.innerText = `Please selecet a valid option.` :
    selectParagraph.innerText = `Selected option is: ${regularSelect.value}`
}, false);