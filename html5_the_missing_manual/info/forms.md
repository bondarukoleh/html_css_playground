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
and much more.

```css
input:required:invalid {
    background-color:red;
}
```
With regex. Field empty - because of required - it will show the "Please fill field", if filled wrong, and 
submit pressed - will show "Please follow the requested format" and out title message. Great.
```html
<input id="someData" required pattern="[A-Z]{3}-[0-9]{3}"><br>
```
We can add custom validation via JS.
```html
<input id="someData" oninput="validate(this)"><br>
```
```js
const validate = (input) => input.value.length > 20 && input.setCustomValidity("Too short value");
```
Form also have onsubmit, function predicate that will return true or false depend on validation result.
Just like many more events. \
A Few more Input Attributes:
 - Set ```spellcheck``` to false to recommend the browser not spellcheck a field, or true to recommend that it does.
 - Set ```autocomplete``` to off to recommend that the browser not offer autocomplete suggestions.
 - ```autocorrect``` and ```autocapitalize```. Use these attributes to control automatic correction.
 - ```multiple``` add the to the <select> element to create multiple-selection input. e.g. a few files to upload at once.
 
##### New elements
If a browser runs into an < input > element with a type that it doesn’t recognize, it treats it like a regular text box.
With new types of inputs browser can be smarter
•   Offer different input suggestions for different fields. 
•   Restrict potential errors. Ignore letters when you type in a number text box.
•   Perform validation. Browsers can perform more sophisticated checks when you click a submit button.
```html
<input id="weight" type="number" min="50" max="1000" step="0.1" value="160"><br>
<!--will sagest you the value -->
<datalist id="datalistID">
        <option value="A">A</option>
        <option value="B">B</option>
</datalist>
<input type="text" id="valueFromList" list="datalistID">
```

The < progress > and < meter > \
`<progress>` element indicates how far a task has progressed. The `<meter>` element indicates a value within a known
range. It looks similar to the progress element, it doesn’t pulse.
```html
<!--without a value - is in process, and state always changing. Interesting feature-->
<progress></progress>
<progress value="0.25"></progress>
<meter value="150" max="200"></meter>
```
You can put some fallback content inside the < progress > element, like:
```html
<progress value="0.25">25%</progress>
```
Just remember that the fallback content won’t appear in browsers that do support the < progress > element.
contenteditable attribute - when you can edit value of the element.
