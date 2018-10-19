function $(locator) {
  return document.querySelector(locator)
}
function getContext(locator) {
  return $(locator).getContext('2d')
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
function drawP(){
  const canv = $('#transrormation')
  const transrormationContext = getContext('#transrormation')
  const img = new Image()
  function draw(){
    // transrormationContext.clearRect(0, 0, canv.width, canv.height)
  /* a (m11) Horizontal scaling.
     b (m12) Horizontal skewing.
     c (m21) Vertical skewing.
     d (m22) Vertical scaling.
     e (dx) Horizontal moving.
     f (dy) Vertical moving. */
    // transrormationContext.transform(0.3, -0.3, 0, 1, 0, 0)
    transrormationContext.drawImage(img, 5, 5);
    transrormationContext.save()
    // transrormationContext.transform(0.5, -0.3, 0, 1, 0, 0)
    // transrormationContext.drawImage(img, 5, 5);
    // transrormationContext.transform(0.7, -0.3, 0, 1, 0, 0)
    // transrormationContext.drawImage(img, 5, 5);
    transrormationContext.transform(1, 0, 0, 1, 0, 0)
    transrormationContext.drawImage(img, 15, 15);
    transrormationContext.restore()
    // transrormationContext.transform(0.3, -0.3, 0, 1, 0, 0)
    // transrormationContext.drawImage(img, 55, 25);
  }
  img.onload = draw
  img.src = '../../imgs/html1.PNG'
  
  
  // canv.addEventListener('click', function(e){
  //   transrormationContext.clearRect(0, 0, canv.width, canv.height)
  //   transrormationContext.save()
  //   transrormationContext.transform(0.8, -0.5, 0.8, 0.5, 0, 0)
  //   transrormationContext.drawImage(img, 85, 5);
  //   transrormationContext.restore()
  // })

  // canv.addEventListener('mousedown', function(e){ 
  //    e.which === 3 && drawImage()
  // })
}
drawP()