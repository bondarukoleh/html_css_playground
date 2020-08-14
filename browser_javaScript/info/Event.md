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
* e.eventPhase - which phase of the event flow is being processed (capturing=1, target=2, bubbling=3);
* e.timeStamp - when;
* e.bubbles - A boolean indicating whether or not the event bubbles up through the DOM.;
* e.cancelBubble - A historical alias to Event.stopPropagation(). Stops the propagation of events further in the DOM;
* e.cancelable - A boolean indicating whether the event is cancelable;

`event.target vs event.currentTarget` \
If you have onClick on div with paragraph inside. And User clicks on paragraph: \
**e.target** === paragraph, the **element which caused the event**, on what event was born, which user interacted with.
e.target unlike e.currentTarget - does not change while an event is handling. You can find same target that cause an 
event everywhere you can get the event object.\
**e.currentTarget** === div, the **element that has handler function registered**, which handler was attached to. Same
as `this`, means it's a current element handler is attached to. 

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
If nothing like capturing or stopPropagation is called, event will go from the top html element to the element that was
clicked, and then will fire all handlers from bottom to top.

The standard *DOM Events* describes 3 phases of event propagation:
 * **Capturing phase** – the event goes down to the element;
 * **Target phase** – the event reached the target element;
 * **Bubbling phase** – the event bubbles up from the element;

#### Bubbling
When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other
ancestors.
```js
// If listeners won't capture the event - it will move from bottom (element that gets the event) to top (parents)
// like a buble
elem.addEventListener('click', function (e) {}, {capture: false}); 
```
> Almost all events bubble. \
> HTML frame/object: load, unload, scroll (except document scroll event bubble to window); \
> HTML form: focus, blur; \
> Mutation: DOMNodeRemovedFromDocument, DOMNodeInsertedIntoDocument; \
> Progress: loadstart, progress, error, abort, load, loadend

#### Stopping bubbling
Event goes from target straight up. Normally it goes till <html>, and document object, and some of them reach window. \
`event.stopPropagation()` - allows you to stop event move further to top, but if oon this level there are more handlers
 they will be fired, to prevent this - `event.stopImmediatePropagation()` After it no other handlers execute.
 > Don’t stop bubbling without a need! Maybe you'll need further all the clicks on menus, or forms, or statics. Stop
> bubbling can cause weird behavior in the future.

#### Capturing
Event can be captured during *capture* phase. Pass `{capture: true}` to addEventListener function. From this browser
decides on what phase register handler, capture or bubbling. `Handler will fire only once per event`. \
Handlers doesn't matter on what phase they registered will fire on *target* phase, capture registered and bubbling 
after them.
> To remove the handler, removeEventListener needs the same phase \
> Listeners on same element and same phase run in their registering order

### Event delegation
The idea is that if we have a lot of elements *handled in a similar way*, then instead of assigning a handler to each
of them – we put a single handler on their common ancestor, and use the `event.target` to make some changes.


```html
<div id="menu">
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // method will e called on element, this would == element unless we bind it
    }
    load() {alert('loading');}
    search() {alert('searching');}

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }
  new Menu(menu);
</script>
```
##### The “behavior” pattern
We can use event delegation to add “behavior” to elements declaratively, with special attributes and classes. \
The pattern has two parts:
1. We add a custom attribute to an element that describes its behavior.
2. A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.

Counter: \
This click handler increases all values of all elements that have attribute data-counter.
```html
<input type="button" value="1" data-counter>
<script>
  document.addEventListener('click', function(event) {
    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }
  });
</script>
```

Toggler: 
```html
<button data-toggle-id="subscribe-mail">Show the subscription form</button>
<form id="subscribe-mail" hidden>Your mail: <input type="email"></form>
<script>
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;
    let elem = document.getElementById(id);
    elem.hidden = !elem.hidden;
  });
</script>
```

Disadvantages of event delegation:
1. If somewhere is stopPropagation() - you cannot catch event (of course is you don't capture);
2. CPU load, since all events are handling via this top-level handler.


### Browser default actions
Many events have certain actions performed by the browser automatically. \
e.g. link click - navigation to its URL, form submit button – submission to the serve,  mouse button over a text 
selects the text;

#### Preventing browser actions
Two ways to prevent default browser action:
* There’s a method `event.preventDefault()`;
* If handler added using on\<event> (not by addEventListener), returning `false` - default action won't happened;
```html
<a href="/" onclick="return false">Click here</a>
<a href="/" onclick="event.preventDefault()">here</a>
```

> Returning `false` from a handler is an exception. In all other cases, return value from handler is ignored.

#### The “passive” handler option
The addEventListener's `passive: true` option signals the browser that the handler is not going to call preventDefault().
Why that may be needed?

There are some events like *touchmove* on mobile devices (when the user moves their finger across the screen),
that cause scrolling by default, but that scrolling can be prevented using preventDefault() in the handler.

So when the browser detects such event, it will fire all handlers that could prevent that scrolling, and only after that
it can proceed with scrolling, it coast time and effort. But we can tell browser that he can do his default stuff in parallels with our handlers - because we won't mess with the default.

#### event.defaultPrevented
It can help us to figure out if default behavior was canceled or not. e.g. we have onclick for some menu, and for whole
document, in document onclick handler we can check if default behavior was canceled already - we can do nothing.


