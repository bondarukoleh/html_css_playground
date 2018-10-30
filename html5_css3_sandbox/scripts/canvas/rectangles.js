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
rec1Context.fillStyle = 'rgb(200,0,0)';
rec1Context.fillRect(10, 10, 150, 110);
rec1Context.fillStyle = 'rgb(0, 0, 200, 0.5)';
rec1Context.fillRect(50, 30, 150, 110);
rec1Context.clearRect(40, 40, 50, 50);
rec1Context.lineWidth = 3;
rec1Context.strokeRect(35, 35, 60, 60);

/*--------------- rombs ------------------------*/
const line1Context = getContext('#line1')
function drawRomb({ context, lineWidth }) {
  context.lineWidth = lineWidth;
  context.lineJoin = 'bevel';
  context.beginPath();
  context.moveTo(10, 10);
  context.lineTo(180, 10);
  context.lineTo(275, 140);
  context.lineTo(115, 140);
  context.closePath();
  context.stroke();
  context.restore();
}
drawRomb({ context: line1Context, lineWidth: 2 });
line1Context.save();
line1Context.translate(20, 5);
drawRomb({ context: line1Context, lineWidth: 4 });

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
circlesContext.arc(35, 35, 30, 0, Math.PI * 2)
circlesContext.moveTo(25, 25)
circlesContext.arc(25, 25, 5, 0, Math.PI * 2)
circlesContext.moveTo(45, 25)
circlesContext.arc(45, 25, 5, 0, Math.PI * 2)
circlesContext.moveTo(35, 35)
circlesContext.arc(35, 35, 25, 0, Math.PI)
circlesContext.closePath()
circlesContext.moveTo(150, 30);
circlesContext.arcTo(150, 160, 50, 0, 20);
circlesContext.lineTo(113, 43);
circlesContext.arcTo(113, 5, 140, 25, 19);
circlesContext.lineTo(143, 85);
circlesContext.stroke()

/*------------ img -------------------- */
const img1Context = getContext('#img1')
const img = new Image()
img.onload = function () {
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
    function (input) { input.addEventListener('change', draw) })
  function draw() {
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
  function draw() {
    const canv = $('#text1')
    const context = getContext('#text1')
    context.moveTo(0, 20)
    context.lineTo(canv.width, 20)
    context.stroke()

    context.font = 'bold 24px Segoe UI'
    /* 'top | hanging | middle | alphabetic | ideographic | bottom' */
    context.textBaseline = 'alphabetic';
    const text = 'Hello HTML5'
    const textWidth = context.measureText(text);
    context.fillText(text, 150, 20)

    context.font = "20px Georgia";
    context.textBaseline = 'middle';
    context.fillText("Hello World!", (canv.width - textWidth.width) - 120, 20);

    context.font = "bold 25px Georgia";
    context.fillStyle = 'blue'
    context.textBaseline = 'bottom';
    context.shadowColor = 'rgba(0, 0, 0, 0.2)';
    context.shadowOffsetX = 15;
    context.shadowOffsetY = 10;
    context.shadowBlur = 1;
    context.fillText("Hello World!", (canv.width - textWidth.width) / 2, 70);
  }
  window.addEventListener('load', draw, true)
}

{
  function draw() {
    let reset = $('#reset')
    let tempCanv = $('#paint')
    let tempContx = getContext('#paint')
    let started = false;
    tempCanv.addEventListener('mousemove', moveHandler, false)

    function moveHandler(e) {
      (!started) ? (function () {
        tempContx.beginPath()
        tempContx.moveTo(e.offsetX, e.offsetY)
        started = true
      })() :
        (function () {
          tempContx.lineTo(e.offsetX, e.offsetY)
          tempContx.stroke()
        })()
    }

    reset.onclick = function () {
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
  function draw() {
    const tempCanv = $('#paint2')
    const tempContx = getContext('#paint2')
    let started = false;
    tempCanv.addEventListener('mousedown', mousedownHandler, false)
    tempCanv.addEventListener('mousemove', mousemoveHandler, false)
    tempCanv.addEventListener('mouseup', mouseupHandler, false)

    function mousedownHandler(e) {
      tempContx.beginPath()
      tempContx.moveTo(e.offsetX, e.offsetY)
      started = true
    }

    function mousemoveHandler(e) {
      (started) && (function () {
        tempContx.lineTo(e.offsetX, e.offsetY)
        tempContx.stroke()
      })()
    }

    function mouseupHandler(e) {
      started = false
    }

    $('#reset2').onclick = function () {
      tempContx.clearRect(0, 0, tempCanv.width, tempCanv.height)
    }
  }
  window.addEventListener('load', draw, false)
}

{
  const animation = $('#animation1')
  const context = getContext('#animation1')
  let position = 0  
  const startRectOpts = {
    x: 0,
    y: 15,
    width: 30,
    height: 30
  }
  function drawRecr(rectOpts, canvasElem, context) {
    if (position < (canvasElem.width - rectOpts.width)) {
      context.clearRect(0, 0, canvasElem.width, canvasElem.height)
      context.beginPath()
      context.rect(position, 15, 30, 30)
      context.fillStyle = 'green'
      context.fill()
      context.stroke()
      position += 2
      window.requestAnimationFrame(function () { drawRecr(rectOpts, canvasElem, context) })
    }
  }

  drawRecr(startRectOpts, animation, context)

  $('#reset3').onclick = function () {
    position = 0
    drawRecr(startRectOpts, animation, context)
  }
}


{

  function P() {

      const dispatchMouseEventOver = function (options) {
        const mouseEvent = document.createEvent('MouseEvent')
        mouseEvent.initMouseEvent(
          'mouseover', true, false, window, 1, /* event, bubble, cancelable, view, detail */
          261, /* screenX */
          451, /* screenY */
          261, /* clientX */
          380, /* clientY */
          false, false,  false, false, /* altKey, ctrlKey, shiftKey, metaKey */
          0, /* button : 0 = click, 1 = middle button, 2 = right button */
          null /* relatedTarget */
        )
        document.querySelector('#treeview-1084-record-309 .x-grid-cell-wbscolumn-1086').dispatchEvent(mouseEvent);
        }
         
          const pointerdownev = new PointerEvent('pointerdown', { 
            $extHandled: true,
            altKey: false,
            bubbles: true,
            button: 0,
            buttons: 1,
            cancelBubble: false,
            cancelable: true,
            clientX: 264,
            clientY: 397,
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            fromElement: null,
            height: 1,
            isPrimary: true,
            isTrusted: true,
            layerX: 24,
            layerY: 15,
            metaKey: false,
            movementX: 0,
            movementY: 0,
            offsetX: 25,
            offsetY: 17,
            pageX: 260,
            pageY: 561,
            pointerId: 1,
            pointerType: "mouse",
            pressure: 0.5,
            relatedTarget: null,
            returnValue: true,
            screenX: 264,
            screenY: 468,
            shiftKey: false,
            sourceCapabilities: null,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            timeStamp: 745819.5999999298,
            toElement: null,
            twist: 0,
            type: "pointerdown",
            view: window,
            which: 1,
            width: 1,
            x: 264,
            y: 397
          });

          const pointerenterev = new PointerEvent('pointerenter', { 
            $extHandled: true,
            altKey: false,
            bubbles: true,
            button: -1,
            buttons: 1,
            cancelBubble: false,
            cancelable: true,
            clientX: 261.6000061035156,
            clientY: 380.3999938964844,
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            fromElement: null,
            height: 1,
            isPrimary: true,
            isTrusted: true,
            layerX: 261,
            layerY: 544,
            metaKey: false,
            movementX: 3,
            movementY: 0,
            offsetX: 262,
            offsetY: 544,
            pageX: 261.6000061035156,
            pageY: 544.3999938964844,
            pointerId: 1,
            pointerType: "mouse",
            pressure: 0.5,
            relatedTarget: null,
            returnValue: true,
            screenX: 261.6000061035156,
            screenY: 451.20001220703125,
            shiftKey: false,
            sourceCapabilities: null,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            toElement: null,
            twist: 0,
            type: "pointerenter",
            view: window,
            which: 0,
            width: 1,
            x: 261.6000061035156,
            y: 380.3999938964844,
    });

          const pointeroverev = new PointerEvent('pointerover', { 
            $extHandled: true,
            altKey: false,
            bubbles: true,
            button: -1,
            buttons: 1,
            cancelBubble: false,
            cancelable: true,
            clientX: 264,
            clientY: 328,
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            fromElement: null,
            height: 1,
            isPrimary: true,
            isTrusted: true,
            layerX: 24,
            layerY: 3,
            metaKey: false,
            movementX: 3,
            movementY: 0,
            offsetX: 25,
            offsetY: 4,
            pageX: 264,
            pageY: 493,
            pointerId: 1,
            pointerType: "mouse",
            pressure: 0.5,
            relatedTarget: null,
            returnValue: true,
            screenX: 264,
            screenY: 397,
            shiftKey: false,
            sourceCapabilities: null,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            toElement: null,
            twist: 0,
            type: "pointerover",
            view: window,
            which: 0,
            width: 1,
            x: 264,
            y: 328,
          });
          
          const pointermoveev = new PointerEvent('pointermove', { 
            $extHandled: true,
            altKey: false,
            bubbles: true,
            button: -1,
            buttons: 1,
            cancelBubble: false,
            cancelable: true,
            clientX: 263.20001220703125,
            clientY: 358.8000183105469,
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            fromElement: null,
            height: 1,
            isPrimary: true,
            isTrusted: true,
            layerX: 263,
            layerY: 522,
            metaKey: false,
            movementX: 3,
            movementY: 0,
            offsetX: 263,
            offsetY: 523,
            pageX: 263.20001220703125,
            pageY: 522.8000183105469,
            pointerId: 1,
            pointerType: "mouse",
            pressure: 0.5,
            relatedTarget: null,
            returnValue: true,
            screenX: 263.20001220703125,
            screenY: 429.6000061035156,
            shiftKey: false,
            sourceCapabilities: null,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            toElement: null,
            twist: 0,
            type: "pointermove",
            view: window,
            which: 0,
            width: 1,
            x: 263.20001220703125,
            y: 358.8000183105469,
    });
    
    const pointerupev = new PointerEvent('pointerup', { 
      $extHandled: true,
      altKey: false,
      bubbles: true,
      button: -1,
      buttons: 1,
      cancelBubble: false,
      cancelable: true,
      clientX: 263.20001220703125,
      clientY: 358.8000183105469,
      composed: true,
      ctrlKey: false,
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      fromElement: null,
      height: 1,
      isPrimary: true,
      isTrusted: true,
      layerX: 263,
      layerY: 522,
      metaKey: false,
      movementX: 0,
      movementY: 0,
      offsetX: 263,
      offsetY: 523,
      pageX: 263.20001220703125,
      pageY: 522.8000183105469,
      pointerId: 1,
      pointerType: "mouse",
      pressure: 0,
      relatedTarget: null,
      returnValue: true,
      screenX: 263.20001220703125,
      screenY: 429.6000061035156,
      shiftKey: false,
      sourceCapabilities: null,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      timeStamp: 753790.7999999588,
      toElement: null,
      twist: 0,
      type: "pointerup",
      view: window,
      which: 1,
      width: 1,
      x: 263.20001220703125,
      y: 358.8000183105469
    });
        
    const from = document.querySelector('#treeview-1084-record-308 .x-grid-cell-wbscolumn-1086')
    from.dispatchEvent(pointerdownev);
    const to = document.querySelector('#treeview-1084-record-309 .x-grid-cell-wbscolumn-1086')
    to.dispatchEvent(pointeroverev);
    to.dispatchEvent(pointerenterev);
    dispatchMouseEventOver()
    to.dispatchEvent(pointermoveev);
    to.dispatchEvent(pointerupev);
    
    }
    P()
}