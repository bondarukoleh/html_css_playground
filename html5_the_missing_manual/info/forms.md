#### Web Forms
HTML forms are simple HTML controls you use to collect information from website visitors.
##### Understanding Forms
A web form is a collection of text boxes, lists, buttons, and other clickable widgets that a web surfer uses to supply
some sort of information to a website.
`Revamping a Traditional HTML Form`
The < form > element bundles together all the form widgets (also known as controls or fields). It also tells the browser
where to post the page when it’s submitted, by providing a URL in the action attribute. If you plan to do all the work
in client-side JavaScript code, you can simply use a number sign (#) for the action attribute.
First "submit" button is "default" submit.
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
```html
<input id="email" placeholder="Your email" title="Here goues your email" autofocus><br>
```

`Validation`
```html
<input id="email" required><br>
<!-- to turn off validation -->
<form action="#" novalidate>
<!-- provide another button that e.g. like storing half-completed not-valid data for later use -->
<input type="submit" value="Save for Later" formnovalidate>
```
Nothing happens until the person filling out the form clicks the submit button. Then, the browser begins examining the
fields from top to bottom. When it finds the first invalid value, it stops checking any further It cancels the form 
submission and pops up an error message next to this value. \

`Validation Styling Hooks`
To use this technique, you simply need to add a few new pseudo-classes. Your options include the following:
•   ```required and optional```, which apply styles to fields based on whether they use the required attribute.
•   ```valid and invalid```, which apply styles to controls based on whether they contain mistakes.
•   ```in-range and out-of-range```, controls that use the min and max attributes to limit numbers to a range.
and mutch more
```html
input:required:invalid {
    background-color:red;
}
```
with regex. Field empty - because of required - it will show the "Please fill field", if filled wrong, and 
submit pressed - will show "Please follow the requested format" and out title message. Great.
```html
<input id="someData" required pattern="[A-Z]{3}-[0-9]{3}"><br>
```
