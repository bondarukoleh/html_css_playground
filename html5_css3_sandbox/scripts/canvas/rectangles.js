/*--------------- rect ------------------------*/
const rectangl1 = document.querySelector('#rectangl1')
const rec1Context = rectangl1.getContext('2d')
rec1Context.fillStyle='rgb(200,0,0)';
rec1Context.fillRect(10, 10, 150, 110);
rec1Context.fillStyle='rgb(0, 0, 200, 0.5)';
rec1Context.fillRect(50, 30, 150, 110);
rec1Context.clearRect(40, 40, 50, 50);
rec1Context.lineWidth=3;
rec1Context.strokeRect(35, 35, 60, 60);

/*--------------- rombs ------------------------*/
const line1 = document.querySelector('#line1')
const line1Context = line1.getContext('2d')
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
const line2 = document.querySelector('#line2')
const line2Context = line2.getContext('2d')
line2Context.lineWidth = 3
line2Context.moveTo(5, 100) /* start point, where we start */
line2Context.quadraticCurveTo(50, 0 /* control point where we pull */, 100, 100 /* end point of start point */)
line2Context.stroke()

line2Context.moveTo(115, 100) /* start point, where we start */
line2Context.bezierCurveTo(160, 90,/*1st control point to pull */ 260, 0, /* 2nd control point */250, 100/* end point*/)
line2Context.stroke()

/*--------------- circle smile ------------------------*/
const circles = document.querySelector('#cirles')
const circlesContext = circles.getContext('2d')
circlesContext.beginPath()
circlesContext.arc(35, 35, 30, 0, Math.PI*2)
circlesContext.moveTo(25,  25)
circlesContext.arc(25, 25, 5, 0, Math.PI*2)
circlesContext.moveTo(45,  25)
circlesContext.arc(45, 25, 5, 0, Math.PI*2)
circlesContext.moveTo(35,  35)
circlesContext.arc(35, 35, 25, 0, Math.PI)
circlesContext.closePath()
circlesContext.stroke()

/*------------ img -------------------- */
