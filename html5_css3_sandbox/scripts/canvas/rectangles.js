function getContext(locator) {
  return document.querySelector(locator).getContext('2d')
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
const img = new Image(50, 50)
img1Context.drawImage(img, 10, 10);
img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png'
