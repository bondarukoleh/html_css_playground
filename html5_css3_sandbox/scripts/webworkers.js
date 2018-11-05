function $(locator) {
  return document.querySelector(locator)
}
function createElem(type) {
  return document.createElement(type)
}
function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

{ /* check storages */
  let localP = $('#local')
  let sessionP = $('#session')
  const existingData = $('#existingData')
  const readButton = $('#readtFromStorages')
  const clearButton = $('#clear')
  if(window.sessionStorage){
    localP.innerText = `"sessionStorage" is supported.`
  } else {
    localP.innerText = 'sessionStorage is NOT supported'
  }

  if(window.localStorage){
    sessionP.innerText = `"localStorage" is supported.`
  } else {
    sessionP.innerText = 'localStorage is NOT supported'
  }

  $('#setToLocal').addEventListener('click', _ => {
    const simpleObj = {
      a: 'localObjectData'
    }
    window.localStorage.myKey1 = 'local data1'
    window.localStorage.setItem('myKey2', 'local data2')
    window.localStorage['myKey3'] = 'local data3'
    window.localStorage.localObj = JSON.stringify(simpleObj)
  })

  $('#setToSession').addEventListener('click', _ => {
    const simpleObj = {
      b: 'sessionObjectData'
    }
    window.sessionStorage.myKey1 = 'session data1'
    window.sessionStorage.setItem('myKey2', 'session data2')
    window.sessionStorage['myKey3'] = 'session data3'
    window.sessionStorage.sessionObj = JSON.stringify(simpleObj)
  })


  readButton.addEventListener('click', _ => {
    while(existingData.firstChild){
      existingData.removeChild(existingData.firstChild)
    }
    Object.entries(window.localStorage).forEach(([key, value]) => {
      const p = createElem('p')
      p.innerText = `Local key: "${key}"; value: "${value}"`
      existingData.appendChild(p)
    });

    Object.entries(window.sessionStorage).forEach(([key, value]) => {
      const p = createElem('p')
      p.innerText = `Session key: "${key}"; value: "${value}"`
      existingData.appendChild(p)
    });
  })

  clearButton.addEventListener('click', _ => {
    while(existingData.firstChild){
      existingData.removeChild(existingData.firstChild)
    }
    /* We could do it like this: 
    Object.keys(window.localStorage).forEach(key => {
      if(window.localStorage[key] && key.includes('myKey')){
        window.localStorage.removeItem(key)
      }
    });

    Object.keys(window.sessionStorage).forEach(key => {
      if(window.sessionStorage[key] && key.includes('myKey')){
        window.sessionStorage.removeItem(key)
      }
    }); But there is a easier way: */
    window.localStorage.clear()
    window.sessionStorage.clear()
  })
}

/* Webworkers */
{
    const workerDiv = $('#webWorker')
    const button = $('#workerButt')
    const worker = new Worker('/html5_css3_sandbox/scripts/subWorker.js')
    button.addEventListener('click', _ => worker.postMessage('Start'))
    worker.addEventListener('message', e => workerDiv.innerHTML += `Data came from webWorker: ${e.data} <br />`)
    worker.addEventListener('error', e => workerDiv.innerHTML += `Error in webWorker: ${e.message} <br />`)
}
