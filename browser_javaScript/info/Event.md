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
* If handler added using on\<event> (not by addEventListener), returning `false` - default action won't happen;
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

So when the browser detects such an event, it will fire all handlers that could prevent that scrolling, and only after that
it can proceed with scrolling, it coasts time and effort. But we can tell the browser that he can do his default stuff in
parallels with our handlers - because we won't mess with the default.

#### event.defaultPrevented
It can help us to figure out if default behavior was canceled or not. e.g. we have onclick for some menu, and for a 
whole document, in a document onclick handler we can check if default behavior was canceled already - we can do nothing.

### Dispatching custom events
We can not only assign handlers, but also generate events from JavaScript, custom and build-in.

#### Event constructor
We can use build in [Event](https://dom.spec.whatwg.org/#event) class.
```js
let event = new Event(type, {options});
```
 * **type** – event type, string e.g. "click", or custom "myEvent";
 * **options** – the object with two optional properties:
    * bubbles: true/false *(default)* – if true, then the event bubbles.
    * cancelable: true/false *(default)* – if true, then the “default action” may be prevented.

#### dispatchEvent
After an event object is created, we should “run” it on an element using the call `elem.dispatchEvent(event)`. \
If the event was created with the bubbles flag, then it bubbles. \
```html
<button id="elem" onclick="alert('Click!');">Autoclick</button>
<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```
**event.isTrusted** - property is `true` for events that come from real user actions and `false` for script-generated events. \
We should use *addEventListener* to catch custom events, because there no *elem.onMyCustomEvent* property.

#### UI Events
UIEvent, FocusEvent, MouseEvent, WheelEvent, KeyboardEvent, etc. \
Full list of event classes [here](https://www.w3.org/TR/uievents/) \
We should use them instead `new Event()` to create events if we want them to fire, because it allows specifying some 
properties, like clientX/clientY for a click. \
```js
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});
```
Technically, we can work around by assigning to `new Event('click')` directly  - `event.clientX=100`, but it's a hack.

#### Custom events
For them - use `new CustomEvent()`. Same as Event, but as a second argument object beside expected properties - there
is `detail` where we can add anything we want.

```html
<h1 id="elem">Hello for John!</h1>

<script>
  elem.addEventListener("hello", function(event) {
    console.log(event.detail.name);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "John" }, // anything I want in detail
  }));
</script>
```

#### preventDefault() for custom events.
There no default behavior on a custom event, but if you call `customEvent.preventDefault()` - this handler returns false, 
which you can use to understand do you need to continue or not. 
> {cancelable: true} - DON"T forget this if you plan to prevent you custom event!

#### Events-in-events are synchronous
Usually events are processed in a `queue`. \
When **browser is processing** "onclick", and a "mousemove" occurs, corresponding "mousemove" handlers **will be called
after "onclick" processing is finished**.

**Exception**: when **one event is initiated from within another one**. When dispatchEvent, or some function that 
triggers another handler is called from some handler - it's postponed - new triggered dispatched event handler is on
a stack immediately. If you want to get rid of these situations, either put call that triggers another event to the end,
or wrap it to 0 setTimeout to make it async, and it will run after all sync code in JS is done.

### Mouse events
**Event order**: \
Simple click - mousedown > mouseup > click. Double click - mousedown >mouseup > click > dbclick;
 
Click events mostly has a **button property**: \
Left button (primary) - 0, Middle button (auxillary) - 1, Right button (secondary) - 2, X1 button (back) - 3, X2 button
(forward) - 4;

> The outdated event.which (1 - left, 2 -middle, 3 - right) is deprecated;

**Modifiers**: shift, alt, ctrl and meta: \
All mouse events include the information about pressed modifier keys, e.g. `event.metaKey: true`.
shiftKey: Shift, altKey: Alt (or Opt for Mac), ctrlKey: Ctrl, metaKey: Cmd for Mac.
> Don't forget about mobile devices - when you rely main functions on keyboards.

**Coordinates: clientX/Y, pageX/Y:** \
All mouse events provide coordinates in two flavours:
* Window-relative: clientX and clientY;
* Document-relative: pageX and pageY;
Document-relative coordinates `**pageX/Y**` are counted from the left-upper corner of the document, and
`**do not change**` when the page is scrolled, while `**clientX/Y**` are counted from the current window left-upper
corner. When the page is scrolled, `**they change**`.

To disable some default actions like selecting the text on double click, or coping - return false from handlers. 
```html
<div ondblclick="alert('Click!')" onmousedown="return false"> Double-click me </div> <!-- Won't select --> 
<div oncopy="return false"> Try to copy </div> <!-- Won't copy --> 
```

### Moving the mouse: mouseover/out, mouseenter/leave
#### Mouseover/out
Mouseover/out is a special event that has property *relatedTarget*. \
* Mouseover: target - where to, relatedTarget - where from;
* Mouseout: target - where from, relatedTarget - where to;

> relatedTarget can be `null`. Keep in mind when you want to do something like event.relatedTarget.tagName.

If mouse moves very fast - browser cannot track all the path, so sometimes, elements can be missed. But, if browser 
realized the mouseover event on some element - there will be mouseout for sure.

> Event's are bubbling. If you have mouseover on parent and child, moving mouse to child will fire parent, child,
> and bubbled parent mouseover again. To avoid such a situation - check relatedTarget, or mouseenter, mouseleave.

> By browser logic, the mouse **cursor may be only over a single element** at any time – the **most nested** one and **top by z-index**.

#### Mouseenter/leave
They trigger when the mouse pointer enters/leaves the element. Also, have targetElement with same behavior.
Also, some specialties:
* **Transitions** inside the element, to/from descendants, **are not counted**.
* Events mouseenter/mouseleave **do not bubble**.

### Drag'n'Drop with mouse events
[New spec](https://html.spec.whatwg.org/multipage/dnd.html#dnd) with `dragstart` and `dragend`.
These events allow us to support such things as dragging a file from OS and dropping it into the browser window. Then
JS can access the contents.

#### The basic Drag’n’Drop algorithm looks like this:
* `mousedown` – prepare the element for moving (e.g. create clone, add a class);
* `mousemove` move it by changing left/top with position:absolute;
* `mouseup` – perform all actions related to finishing the drag’n’drop.

#### New features of dnd
* dragstart - moving element picked;
* dragend - end of the draging, no matter success or canceled;
* dragenter - when moving element entered target;
* dragleave - when moving element left target;
* dragover - when moving element over target;
* drop - when moving element released over target;

To figure out what element under moving, use `document.elementFromPoint`:
```js
moving.hidden = true; // (*) hide the element that we drag
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
moving.hidden = false;
```

### Pointer events
Mouse events were from the start, but they are not so powerful as touch devices, such as touch in multiple places, so
Touch events were introduced, but even them were not enough so [Pointer events](https://www.w3.org/TR/pointerevents2/)
where introduced. \
Unless you code for IE 10, or Safari 12, there’s no point in using mouse or touch events any more, **us pointer**.


|Pointer Event |	Mouse event |
|:---:|:---:|
|pointerdown|	mousedown|
|pointerup|	mouseup|
|pointermove|	mousemove|
|pointerover|	mouseover|
|pointerout|	mouseout|
|pointerenter|	mouseenter|
|pointerleave|	mouseleave|
|pointercancel|	-|
|gotpointercapture|	-|
|lostpointercapture|	-|

Additional props in Pointer event:
* *pointerId* – the unique identifier of the pointer causing the event. Allows us to handle multiple pointers;
* *pointerType* – the pointing device type, string, one of: “mouse”, “pen” or “touch”.
* *isPrimary* – true for the primary pointer (the first finger in multi-touch).

For pointers that measure contact area and pressure, e.g. a finger, the additional properties:
* *width* – the width of the area where the pointer touches the device. For unsupported, e.g. a mouse, it’s always 1.
* *height* – the height of the area where the pointer touches the device. Where unsupported, it’s always 1.
* *pressure* – the pressure of the pointer tip, in range from 0 to 1. For unsupported either 0.5 (pressed) or 0.
* *tangentialPressure* – the normalized tangential pressure.
* *tiltX, tiltY, twist* – pen-specific properties that describe how the pen is positioned relative the surface.
These properties aren’t very well supported across devices.

#### Multi touch
* At the first touch:
 * `pointerdown` with `isPrimary=true` and some `pointerId`.
* For the second finger and further touches:
 * `pointerdown` with `isPrimary=false` and a `different pointerId` for every finger.

#### pointercancel event
fires when there’s a pointer interaction, but something causes it to be aborted, so no more pointer events are generated.
Could be: The pointer device hardware was disabled, the device orientation changed (tablet rotated), the browser decided
to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

Browser can easily decide to use its own dnd implementation, so after pointerdown, pointermove (with moving element) and
then generate pointercancel - so there will be no more pointermove. We can prefent default browser dnd with:
* elem.ondragstart = () => false, or {cancelable: true} and preventDefault().
* For touch devices, there are also touch-related browser actions. We can prevent them by setting 
'#elem' { touch-action: none } in CSS.

#### Pointer capturing
We can “bind” all events with some pointerId to a given element. Then all subsequent events with the same pointerId
will be retargeted to the same element. The browser sets that element as the target and trigger associated handlers,
no matter where it actually happened.

Related methods are:
* elem.setPointerCapture(pointerId) – binds the given pointerId to elem.
* elem.releasePointerCapture(pointerId) – unbinds the given pointerId from elem.

> Binding automatically removed after `pointerup` or `pointercancel` events, or when target removed from the document.

Pointer capturing is used to simplify drag’n’drop kind of interactions. e.g. If you click on slider, you can move mouse
way out of that element, and still move the slider, right? To understand where you are moving the mouse, we should listen
for mouse move on the whole document, but now you can bind this `pointerdown` to some elem, and that's it.
```js
elem.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to me
  elem.setPointerCapture(event.pointerId);
};

elem.onpointermove = function(event) {
  // move the slider: listen at elem, as all events are retargeted to it
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  elem.style.left = newLeft + 'px';
};
```
There are two associated pointer events:
* gotpointercapture - fires when an element uses setPointerCapture to enable capturing.
* lostpointercapture - fires when the capture is released: either explicit with releasePointerCapture, or implicit on
pointerup/pointercancel.

### Keyboard: keydown and keyup
Note there are other ways to “input something”, e.g. speech recognition or copy/paste with the mouse. \
If we want to track any input into an \<input> field, keyboard events - not enough. For that we have event named `input`
to track changes of an \<input> field. \
Keyboard events should be used to handle keyboard actions/combinations.

Keyboard event has: 
* `keydown` and `keyup`;
* `key` - exactly the symbol that was pressed, **z** if it's presses, **Z** if it's pressed with **shift**;	
* `code` - key code, no matter shift - it's KeyZ always. Letters do Key<letter>, digits - Digit<number>, and special - 
"Enter", "Tab", "Backspace", etc.

> Code case matters: "KeyZ", not "keyZ"

Different keyboard layout can cause issue, e.g if US has QWERTY German haz QWERTZ. Letter Y and Z swapped, means 
event.code KeyZ for US means z for German means y. Weird, right? So there are a couple of rules: 
* If we want to handle `layout-dependant keys`? Then **event.key** is the way to go.
* If we want a `hotkey to work` even after a language switch? Then **event.code** may be better.
 
When key is pressed for long time it starts to repeat, for an event that fired that way - `event.repeat` = true.

>Legacy - keypress event, keyCode, charCode, avoid using them. \
>No event for `Fn` key - it's for OS.

### Scrolling
Scroll event allows to react on a page or element scrolling, e.g. Show/hide additional controls depending on where in 
the document the user is, or load more data when the user scrolls down. 

To prevent - either preventDefault on 'scroll', or prevent default on key down up.

Please note two important features of the scroll:

A few things:
* The scroll is “elastic”. We can scroll a little above the document start or end in some browsers/devices.
* The scroll is imprecise. When you scroll to the end you  may be in fact 0-50px away from real document bottom. So,
 “scrolling to the end” should mean it is no more than 100px away the bottom.
