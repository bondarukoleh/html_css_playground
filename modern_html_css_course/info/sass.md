#### Sass
SASS stands for ```Syntactically Awesome Stylesheets```. It first appeared in 2006 and was mainly connected to Ruby on
Rails (RoR) projects. CSS preprocessor/precompiler. There also Less, or Stylus (reading like stilus) \
Saas is written two files extensions .scss or .sass. Browser doesn't read SASS files, you must compile it to .css with
some additional compiler (cli/gui). \

Saas has:
* Variables (shorter that in CSS3)
* Nesting (inside style - possibility to add elements)
* Conditionals (if/else)
* Inheritance (class inheritance)
* Operators & Calculations
* Partials / Imports (you can import (and merge) other .css files, but in CSS3 - there is a server request for each imported style)
* Functions & Mixins (reusable)
* Color Functions

In SASS, you can write code in a CSS-like version called `SCSS`. This version of code looks pretty similar to CSS
syntax:
```scss
a {
  color: #000;
  &:hover {
    color: #f00;
  }
}
```
The second version of code is SASS. It uses indentations and is the same as the preceding code, but written in `SASS`:
```sass
a 
  color: #000
  &:hover
    color: #f00
```
SASS syntax is based on an indent (similar for example to Python language).
You can see bigger differences in mixins. To invoke a mixin in SCSS, write the following:
```scss
@include nameOfMixin()
```
To invoke a mixin in SASS, write the following:
```sass
+nameOfMixin()
```
As you can see, SASS is a shorter version than SCSS. Because of the shortcuts and the automatization processes it is
highly recommend to use SASS over SCSS—write Less—get more. \

`Compass` is an extension for SASS. Usage of Compass is recommended because:
* It has a collection of modern mixins
* It creates sprites

To compile sass, you can use npm packages, like `node-sass` or VScode extension or even desktop app. like "koala" \

`Partials` - .scss files with your extra stuff. Named `_variables.scss` - means that compiler won't touch them, output
files won't change. To import it you don't need to write underscore or extension.
```scss
@import 'variables';

.someElement {
  color: $variable_from_variables;
}
```
