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
* select.options – the collection of <option> subelements;
* select.value – the value of the currently selected <option>;
* select.selectedIndex – the number of the currently selected <option>;

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

**<select>** allows to select multiple options, if it has *multiple* attribute. In that case we need to use the first
way: add/remove the selected property from <option> subelements.

#### new Option
```js
// (if defaultSelected is true - "selected" HTML-attribute is created)
// Diff that we can elem.getAttribute('selected') on that.
option = new Option(text, value, defaultSelected, selected);
```

Option has properties:
* option.selected - Is the option selected;
* option.index - The number of the option among the others in its <select>.
* option.text - Text content of the option (seen by the visitor).
