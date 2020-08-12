## Browser events
An event is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

Mouse events: click, contextmenu, mouseover/mouseout, mousedown/mouseup, mousemove. \
Keyboard events: keydown, keyup. \
Form element events: submit, focus. \
Document events: DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built. \
CSS events: transitioned – when a CSS-animation finishes.

### Event handlers
To react on an event - we have handler, handler gives ability to run JS code on some user action.
To remove a handler – assign elem.onclick = null. \
To assign handler we can use: 
* **Via HTML-attribute**. Named on<event>.
```html
<script defer>function myClickHandler(e){}</script>
<input value="Click me" onclick="alert(event.type)" type="button">
<input value="Click me" onclick="myClickHandler()" type="button">
```
* Via **DOM property**. Property on<event>.
```html
<input id="elem" type="button" value="Click me">
<script>
  elem.onclick = function() {
    alert('Thank you');
  };
  // or as separate function
  function clickHandler (){}
  elem.onclick = clickHandler;
</script>
```
```js elem.onclick = clickHandler``` from JS, and ```html onclick="myClickHandler()"``` different because, when the
browser reads the attribute, it creates a handler function with body from the attribute content.
```html
<input onclick="myClickHandler(event)">
<!-- In Code it will be -->
<!-- 
  input.onclick = function(event) {
    myClickHandler(event); // <-- the attribute content goes here
    alert(event.type) // we can also use event object in html attribute
}; -->
```
* and **addEventListener** and removeEventListener function.

> Don’t use setAttribute for handlers. Attributes are always strings, function becomes a string \
> document.body.setAttribute('onclick', function() { }); won't work.

#### Accessing the element: this
The value of this inside a handler is the element. The one which has the handler on it.

#### addEventListener/removeEventListener
Problem - with elem.onclick = func1 and elem.onclick = func2 - you cannot add two handlers to element, it will be 
override. But there is a solution - `element.addEventListener(event, handler, {options});`
* event - Event name, e.g. "click".
* handler - The handler function.
* options:
  * *once* - if true then the listener is automatically removed after it triggers.
  * *capture* - the event phase where to fire the handler, elem.addEventListener(event, handler, true/false) - this 
  parameter is for {capture: false/true} historically;
  * *passive* -  if true, then the handler will not call preventDefault().

`element.removeEventListener(event, handler, [options]); ` \
> Removal requires the same function. \
> elem.addEventListener( "click" , () => alert('Thanks!'));
> elem.removeEventListener( "click", () => alert('Thanks!')); - won't remove nothing, you need separate declared function.

> For some events, handlers **only work with** addEventListener. e.g. DOMContentLoaded or transitionend. 

#### Event object
When an event happens, the browser creates an `Event` class object, puts details into it and passes it as an argument
to the handler.

Some of the properties:
* e.type - The name of the event e.g. "click".
* e.target - element which caused the event;
* e.currentTarget - element that has handler function registered, `this` (if handler not bounded, or () => {}) in handler;
* e.eventPhase - which phase of the event flow is being processed;
* e.timeStamp - when;
* e.bubbles - A boolean indicating whether or not the event bubbles up through the DOM.;
* e.cancelBubble - A historical alias to Event.stopPropagation(). Stops the propagation of events further in the DOM;
* e.cancelable - A boolean indicating whether the event is cancelable;

`event.target vs event.currentTarget` \
If you have onClick on div with paragraph inside. And User clicks on paragraph: \
**e.target** === paragraph, the **element which caused the event**, on what event was born, which user interacted with. \
**e.currentTarget** === div, the **element that has handler function registered**, which handler was attached to.

#### Object handlers: handleEvent
To *addEventListener* instead a function we can assign an object as an event handler. When an event occurs, `handleEvent`
will be called. So browser will call *obj.handleEvent(event)* from handle object.
```html
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };
  elem.addEventListener('click', obj);
</script>
```
```js
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }
  elem.addEventListener('mousedown', new Menu());
```
```js
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }
    onMousedown() { elem.innerHTML = "Mouse button pressed";}
    onMouseup() { elem.innerHTML += "...and released.";}
  }
  elem.addEventListener('mousedown', new Menu());
```

### Bubbling and capturing
