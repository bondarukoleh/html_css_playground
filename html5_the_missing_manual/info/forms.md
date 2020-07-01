#### Web Forms
HTML forms are simple HTML controls you use to collect information from website visitors.
##### Understanding Forms
A web form is a collection of text boxes, lists, buttons, and other clickable widgets that a web surfer uses to supply
some sort of information to a website.
`Revamping a Traditional HTML Form`
The < form > element bundles together all the form widgets (also known as controls or fields). It also tells the browser
where to post the page when it’s submitted, by providing a URL in the action attribute. If you plan to do all the work
in client-side JavaScript code, you can simply use a number sign (#) for the action attribute.
```html
<form action="#"></form>
```
A well-designed form, like the zookeeper application, divides itself into logical chunks using the < fieldset > element.
Each chunk gets a title, courtesy of the < legend > element. Here’s the < fieldset > for the Contact Details section.
```html
<fieldset>
<legend>Contact Details</legend>
<label for="name">Name <em>*</em></label>
<input id="name"><br>
<label for="email">Email <em>*</em></label>
<input id="email"><br>
</fieldset>
```

`Forms components before HTML5`
```html
Single-line textbox:
<input type="text">
<input type="password">
Multiline textbox: <textarea>...</textarea>
Checkbox: <input type="checkbox">
Radio button: <input type="radio">
Button: 
<input type="submit">
<input type="image">
<input type="reset">
<input type="button">
List: <select>...</select>
```
`Adding HTML5`
`Adding Hints with Placeholders`