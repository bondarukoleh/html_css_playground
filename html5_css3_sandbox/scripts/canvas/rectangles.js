function $(locator) {
  return document.querySelector(locator)
}
function getContext(locator, element) {
  return (locator) ? $(locator).getContext('2d') : element.getContext('2d')
}
function createElem(type) {
  return document.createElement(type)
}
/*--------------- rect ------------------------*/
const rec1Context = getContext('#rectangl1')
rec1Context.fillStyle='rgb(200,0,0)';
rec1Context.fillRect(10, 10, 150, 110);
rec1Context.fillStyle='rgb(0, 0, 200, 0.5)';
rec1Context.fillRect(50, 30, 150, 110);
rec1Context.clearRect(40, 40, 50, 50);
rec1Context.lineWidth=3;
rec1Context.strokeRect(35, 35, 60, 60);

/*--------------- rombs ------------------------*/
const line1Context = getContext('#line1')
function drawRomb ({context, lineWidth}) {
  context.lineWidth=lineWidth;
  context.lineJoin='bevel';
  context.beginPath();
  context.moveTo(10, 10);
  context.lineTo(180, 10);
  context.lineTo(275, 140);
  context.lineTo(115, 140);
  context.closePath();
  context.stroke();
  context.restore();
}
drawRomb({context: line1Context, lineWidth: 2});
line1Context.save();
line1Context.translate(20, 5);
drawRomb({context: line1Context, lineWidth: 4});

/*--------------quardicCurveTo bezierCurveTo------------*/
const line2Context = getContext('#line2')
line2Context.lineWidth = 3
line2Context.moveTo(5, 100) /* start point, where we start */
line2Context.quadraticCurveTo(50, 0 /* control point where we pull */, 100, 100 /* end point of start point */)
line2Context.stroke()

line2Context.moveTo(115, 100) /* start point, where we start */
line2Context.bezierCurveTo(160, 90,/*1st control point to pull */ 260, 0, /* 2nd control point */250, 100/* end point*/)
line2Context.stroke()

/*--------------- circle smile ------------------------*/
const circlesContext = getContext('#cirles')
circlesContext.beginPath()
circlesContext.arc(35, 35, 30, 0, Math.PI*2)
circlesContext.moveTo(25,  25)
circlesContext.arc(25, 25, 5, 0, Math.PI*2)
circlesContext.moveTo(45,  25)
circlesContext.arc(45, 25, 5, 0, Math.PI*2)
circlesContext.moveTo(35,  35)
circlesContext.arc(35, 35, 25, 0, Math.PI)
circlesContext.closePath()
circlesContext.moveTo(150, 30);
circlesContext.arcTo(150,160,50,0,20);
circlesContext.lineTo(113,43);
circlesContext.arcTo(113,5,140,25,19);
circlesContext.lineTo(143,85);
circlesContext.stroke()

/*------------ img -------------------- */
const img1Context = getContext('#img1')
const img = new Image()
img.onload = function(){
  img1Context.drawImage(img, 10, 10);
  const tempCanvas = document.createElement('canvas')
  const tempCanvasContext = tempCanvas.getContext("2d")
  tempCanvas.width = 20;
  tempCanvas.height = 20;
  tempCanvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, tempCanvas.width, tempCanvasContext.canvas.height)
  img1Context.fillStyle = img1Context.createPattern(tempCanvas, 'repeat')
  img1Context.fillRect(150, 10, 140, 135)
}
img.src = '../../imgs/html1.PNG'

/*------------ gradients -------------------- */
const gradient1Context = getContext('#gradient1')
const lineGrad = gradient1Context.createLinearGradient(20, 0, 0, 150)
lineGrad.addColorStop(0, 'Blue')
lineGrad.addColorStop(0.5, 'white')
lineGrad.addColorStop(1, 'lightgreen')
gradient1Context.fillStyle = lineGrad
gradient1Context.fillRect(5, 5, 140, 140)

const radGrad = gradient1Context.createRadialGradient(225, 78, 20, 225, 78, 70)
radGrad.addColorStop(0, 'orange')
radGrad.addColorStop(0.5, 'white')
radGrad.addColorStop(1, 'red')
gradient1Context.fillStyle = radGrad
gradient1Context.fillRect(150, 5, 145, 140)
gradient1Context.fillRect(150, 5, 145, 140)

/* --------------- tranformation ------------ */
{
  const canv = $('#transrormation')
  const transrormationContext = getContext('#transrormation')
  const img = new Image()
  Array.prototype.forEach.call(document.querySelectorAll('#transf_constols input'),
  function(input){ input.addEventListener('change', draw)})
  function draw(){
    transrormationContext.clearRect(0, 0, canv.width, canv.height)
    transrormationContext.save()
    transrormationContext.translate(5, 5)
    transrormationContext.transform(
      $('#horizontal_scaling').value,
      $('#horizontal_skewing').value,
      $('#vertical_scaling').value,
      $('#vertical_skewing').value,
      $('#horizontal_moving').value,
      $('#vertical_moving').value)
    transrormationContext.drawImage(img, 5, 5);
    transrormationContext.restore()
  }
  img.onload = draw
  img.src = '../../imgs/html1.PNG'
}

/*------------------ text------------- */
{
  function draw(){
    const canv = $('#text1')
    const context = getContext('#text1')
    context.moveTo(0, 20)
    context.lineTo(canv.width, 20)
    context.stroke()
  
    context.font = 'bold 24px Segoe UI'
    /* 'top | hanging | middle | alphabetic | ideographic | bottom' */
    context.textBaseline='alphabetic';
    const text = 'Hello HTML5'
    const textWidth = context.measureText(text);
    context.fillText(text, 150, 20)

    context.font="20px Georgia";
    context.textBaseline='middle';
    context.fillText("Hello World!", (canv.width - textWidth.width ) - 120, 20);

    context.font="bold 25px Georgia";
    context.fillStyle = 'blue'
    context.textBaseline='bottom';
    context.shadowColor='rgba(0, 0, 0, 0.2)';
    context.shadowOffsetX = 15; 
    context.shadowOffsetY = 10;
    context.shadowBlur = 1;
    context.fillText("Hello World!", (canv.width - textWidth.width ) /2, 70);
  }
  window.addEventListener('load', draw, true)
}

{
  function draw(){
    let reset = $('#reset')
    let tempCanv = $('#paint')
    let tempContx =  getContext('#paint')
    let started = false;
    tempCanv.addEventListener('mousemove', moveHandler, false)

    function moveHandler(e){
      (!started) ? (function(){
        tempContx.beginPath()
        tempContx.moveTo(e.offsetX, e.offsetY)
        started = true
      })() : 
      (function(){
        tempContx.lineTo(e.offsetX, e.offsetY)
        tempContx.stroke()
      })()
    }

    reset.onclick = function(){
      const paindDiv = $('#paindDiv')
      paindDiv.removeChild(tempCanv)
      tempCanv = createElem('canvas')
      tempCanv.width = 300
      tempCanv.height = 150
      tempCanv.style.backgroundColor = 'rgb(220, 255, 253)'
      tempContx = getContext(null, tempCanv)
      paindDiv.appendChild(tempCanv)
      tempCanv.addEventListener('mousemove', moveHandler, false)
    }
  }
  window.addEventListener('load', draw, false)
}

{
  function draw(){
    const reset = $('#reset2')
    const tempCanv = $('#paint2')
    const tempContx =  getContext('#paint2')
    let started = false;
    tempCanv.addEventListener('mousedown', mousedownHandler, false)
    tempCanv.addEventListener('mousemove', mousemoveHandler, false)
    tempCanv.addEventListener('mouseup', mouseupHandler, false)

    function mousedownHandler(e){
        tempContx.beginPath()
        tempContx.moveTo(e.offsetX, e.offsetY)
        started = true
    }

    function mousemoveHandler(e){
      (started) && (function(){
        tempContx.lineTo(e.offsetX, e.offsetY)
        tempContx.stroke()
      })()
    }

    function mouseupHandler(e){
        started = false
    }

    reset.onclick = function(){
      tempContx.clearRect(0, 0, tempCanv.width, tempCanv.height)
    }
  }
  window.addEventListener('load', draw, false)
}

{
  const animation = $('#animation1')
  const context = getContext('#animation1')
  const start = new Date().getTime() / 1000
  let val = 0;
  console.log('start');
  console.log(start);
  function drawRecr(){
    val+=10
    if(val < 100){
      context.beginPath()
      context.rect(val, 15, 30, 30)
      context.fillStyle = 'green'
      context.fill()
      context.stroke()
      window.requestAnimationFrame(drawRecr)
    }
  }

  window.requestAnimationFrame(drawRecr)
  // drawRecr({ x: , y: 10, width: 30, height: 30 }, context)
  // const startRectOpts = {
  //   x: 0,
  //   y: 15,
  //   width: 30,
  //   height: 30
  // }


  // function animate(rectOpts, canvasElem, context, startTime){
  //   const time = (new Date().getTime()) - startTime
  //   const lineSpeed = 50
  //   const newX = lineSpeed * time / 1000
  //   if(newX < (canvasElem.width - rectOpts.width)){
  //     rectOpts.x = newX
  //   }
  //   context.clearRect(0, 0, canvasElem.width, canvasElem.height)
  //   drawRecr(rectOpts, context)
  //   window.requestAnimationFrame(function(){
  //     animate(rectOpts, canvasElem, context, startTime)
  //   })
  // }

  // animate(startRectOpts, animation, context, new Date().getTime())
}