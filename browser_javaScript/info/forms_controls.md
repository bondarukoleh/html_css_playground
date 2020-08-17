## Forms, controls
### Form properties and methods
#### Navigation: form and elements
Document forms are members of the special collection `document.forms`.
```js
document.forms.my; // -> the form with name="my"
document.forms[0]; // -> the first form in the document
```
When we have a form, then any element is available in the named collection `form.elements`. \
**_Not depend on the tag structure_**, all elements, no matter how deep they are in the form - in form.elements. \
Fieldsets as “subforms” - A form may have \<fieldset> elements. They also have elements property of controls inside them.
```html
<form name="my">
  <input name="one" value="1">
</form>

<script>
  let form = document.forms.my; // <form name="my"> element
  form.elements.one; // <input name="one"> element
  form.elements.one.value; // 1
</script>
```
If in form there more than two elements with same name - form.elements.sameName -> becomes a collection.

Shorter notation: `form.name`, we can get element as form\[index/name]. Instead `form.elements.login` same as `form.login`. \
But if you change name - you can still access by old one to the changed element.  

Backreference: element.form, `from any element the form is available`.

#### Form elements
```js
input.value = "New value";
textarea.value = "New text";
input.checked = true; // for a checkbox or radio button
```
>Use textarea.value, not textarea.innerHTML. Never use textarea.innerHTML to access it, stores only the HTML that
>was initially on the page, not the current value.

#### select and option
A \<select> element has 3 important properties:
* select.options – the collection of \<option> subelements
* select.value – the value of the currently selected \<option>;
* select.selectedIndex – the number of the currently selected \<option>;

Setting a value for a \<select>:
1. Find the corresponding <option> element and set option.selected to true;
2. Set select.value to the value;
3. Set select.selectedIndex to the number of the option;

```html
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

**\<select>** allows to select multiple options, if it has *multiple* attribute. In that case we need to use the first
way: add/remove the selected property from <option> subelements.

#### new Option
```js
// (if defaultSelected is true - "selected" HTML-attribute is created)
// Diff that we can elem.getAttribute('selected') on that.
option = new Option(text, value, defaultSelected, selected);
```

Option has properties:
* option.selected - Is the option selected;
* option.index - The number of the option among the others in its \<select>.
* option.text - Text content of the option (seen by the visitor).

---
### Focusing: focus/blur
Element receives a focus when user either clicks on it or uses the Tab key on the keyboard. There’s also an autofocus
html attribute. `focus` means - “prepare to accept the data here”. `blur` - means “the data has been entered”, so checks
can be ran, data can be saved, etc.

Methods focus/blur \
Methods 'elem.focus()' and 'elem.blur()' set/unset the focus on the element. FF has [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579), be careful.

#### Allow focusing on any element: tabindex
focus/blur support is for elements that a visitor can interact with: \<button>, \<input>, \<select>, \<a> and so on.
\<div>, \<span>, \<table> – are unfocusable by default, elem.focus() doesn’t work on them.

This can be changed using `HTML-attribute tabindex`. Any element becomes focusable if it has tabindex. Value - order of 
tabbing switch, from 1 further. Elements with matching tabindex are switched in the document source order
(the default order). \
There are two special values:
* tabindex="0" same as without tabindex, elements with tabindex=0 go after elements with tabindex ≥ 1 while switching. 
Usually it’s used to keep element focusable, but keep the default switching order, *property elem.tabIndex works too*.
* tabindex="-1" allows **only programmatic focusing** on an element. Tab ignores such elements, method elem.focus() works.

#### Delegation: focusin/focusout
We want to parent elem be focused while user interacts with the child, but `focus event - doesn't bubble`. So parent will
lose focus. There are two possible solutions here:
* There’s a historical feature: focus/blur do not bubble up, but propagate down on the capturing phase. So you can capture
focus event on form and react on it;
* There are `focusin` and `focusout` events – same as focus/blur, but they bubble, must be assigned with
elem.addEventListener, not on\<event>;
```js
// capturing
form.addEventListener("focus", () => form.classList.add('focused'), true);
form.addEventListener("blur", () => form.classList.remove('focused'), true);
// bubling
form.addEventListener("focusin", () => form.classList.add('focused'));
form.addEventListener("focusout", () => form.classList.remove('focused'));
```

---
### Events: change, input, cut, copy, paste

#### Event: change
The `change` event triggers when the `element has finished changing`. e.g. when you blur the input - `change` is fired.

#### Event: input
The `input` event triggers every time after a value is modified by the user. Triggers on any value change, even those
that does not involve `keyboard actions`: `pasting with a mouse` or using `speech recognition` to dictate the text.

> Can’t prevent anything in oninput. The input event occurs after the value is modified. event.preventDefault() won't work.

#### Events: cut, copy, paste
These events occur on cutting/copying/pasting a value. \
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide
access to the data that is copied/pasted. event.preventDefault() works. \
Clipboard is a “global” OS-level thing. Most browsers allow read/write access to the clipboard only in the scope of
certain user actions for the safety, e.g. in onclick event handlers. It's `forbidden to generate “custom”` clipboard
events with dispatchEvent in all browsers except Firefox.

### Forms: event and method submit
Submit event triggers when the form is submitted, usually used to validate the form before sending data to server or to
abort the submission. `form.submit()` allows to fire form sending from JS.

#### Event: submit
There are two main ways to submit a form:
* The first – to click \<input type="submit"> or \<input type="image">.
* The second – press Enter on an input field.

>If you hit Enter, than it will be "click" event that triggers "submit", yeah, weird.

```html
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" onclick="alert('click')"> <!-- Will work when yuo hit enter-->
</form>
```

#### Method: submit
To submit a form to the server manually, we can call form.submit() -> `submit event is not generated`. It is assumed
that if the programmer calls form.submit(), then the script already did all related processing.

```js
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';
form.innerHTML = '<input name="q" value="test">';
// the form must be in the document to submit it
document.body.append(form);
form.submit();
```

