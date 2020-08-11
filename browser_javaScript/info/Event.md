## Browser events
An event is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

Mouse events: click, contextmenu, mouseover/mouseout, mousedown/mouseup, mousemove. \
Keyboard events: keydown, keyup. \
Form element events: submit, focus. \
Document events: DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built. \
CSS events: transitionend – when a CSS-animation finishes.

### Event handlers
To react on an event - we have handler, handler gives ability to run JS code on some user action.
To remove a handler – assign elem.onclick = null. \
To assign handler we can use: 
* HTML-attribute. Named on<event>.
```html
<script defer>function myClickHandler(e){}</script>
<input value="Click me" onclick="alert('Click!')" type="button">
<input value="Click me" onclick="myClickHandler()" type="button">
```
* DOM property. Property on<event>.
```html
<input id="elem" type="button" value="Click me">
<script>
  elem.onclick = function() {
    alert('Thank you');
  };
</script>
```

#### Accessing the element: this
