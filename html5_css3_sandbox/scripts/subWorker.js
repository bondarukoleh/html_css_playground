addEventListener('message', (e) => {
    console.log(`Got message from main thread: ${e.data}`);
    let time = 1
    const timerId = setInterval(_ => {
      postMessage(`${time} hello!`)
      time++
    }, 1000)
  
    setTimeout(_ => {
      postMessage(`Work is done.`)
      clearInterval(timerId)
      close()
    }, 5000)
})