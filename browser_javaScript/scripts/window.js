function getWindowPosition(){
  return {
    window_screenX: window.screenX,
    window_screenY: window.screenY,
    window_innerHeight: window.innerHeight,
    window_innerWidth: window.innerWidth,
    screen_height: screen.height,
    screen_hidth: screen.width,
  }
}

/* regexp */
{
  const literalRegexp = /\d\d\d/
  const objectRegexp = new RegExp('\\d\\d\\d', 'g') // need to escape slash
  const string = 'la1la123lala654d'

  const firstIndexOf3Digits = string.search(literalRegexp) // 5
  const replaced3Digits = string.replace(objectRegexp, '3DIGITS') // la1la3DIGITSlala3DIGITSd
  const found3Digits = string.match(objectRegexp) // [ '123', '654' ]
  const splitedBy3Digits = string.split(objectRegexp) // [ 'la1la', 'lala', 'd' ]
  const almostSameAsmatch = objectRegexp.exec(string) //[ '123', index: 5, input: 'la1la123lala654d', groups: undefined ]
  const boolMatch = objectRegexp.test(string) //true

}