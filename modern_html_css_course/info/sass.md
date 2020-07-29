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
* Interpolation

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

`Nesting` - structure od scss looks like the html structure. \
`&` - means "this"), means current "compiled" parent selector
```scss
header {
    background: $dark-color;
    color: $light-color;
    padding: 1rem;
    /* applies only for direct h1 child inside header */
    > h1 { /* can be also "& > h1" */
      text-align: center;
    }
    /* applies on any inside h1 */
    h1 {
      text-align: center;
    }
    /* USEFUL when you need to specify style depend on parent  */
    .dark-bg & { /* means ".dark-bg header", all headers that have parent with dark-bg class */
      color: white;
    }

    .light-bg & {
      color: black;
    }

    &.text-center { /* header.text-center, all headers with class text-center */
      font-style: italic;
    }
}
```
Another complicated example
```scss
.parent {
  .child {
    & div & & > a {}
  }
}
/* For each & it will be replaced with the compiled parent selector. Every time there is an & we’ll insert .parent .child. */
```
```css
.parent .child div .parent .child .parent .child > a {}
```
The & is always the fully compiled parent selector. You cannot get only some level parent with it. \
@at-roof can help to keep some specific rules in the structure but in the same time hold them as a separate rule.
```scss
.parent {
  .child {
    @at-roof .something-separate > a {}
  }
}
/* it will be .something-separate > a {}, without parents */
```
`Interpolation`
Same as ${} in js string.
```scss
$answer: 42;
@warn "The Answer to the Ultimate Question of Life, the Universe, and Everything is #{$answer}.";
/* Another example */
// _config.scss
$colors: (
  "primary": tomato,
  "secondary": hotpink
);
 
// _component.scss
.el {
  background-color: color(primary);
}

// _function.scss
@function color($key) {
  @if not map-has-key($colors, $key) {
    @warn "Key `#{$key}` not found in $colors map.";
  }
  @return map-get($colors, $key);
}
```

`Inheritance`
You can create some style sets and then inherit them. Css set starts from "%my-set" sign, and extends with "@extend %my-set"
```scss
%btn-shared {
  padding: .7rem 2rem;
  display: inline-block;
  text-decoration: none;
}

.btn {
    &-dark {
        @extend %btn-shared;
        background: #03549c;
    }

    &-light {
        @extend %btn-shared;
        background: #76d2f8;
    }

    &-dark:hover {
        background: #76f8f0;
    }
}
```

`functions`
They kind a like in js, have optional arguments, @each loops, Arbitrary func($args...) Arguments, Keyword Arguments for
explanation what are you passing. Function should return something. 
```scss
// in _functions.scss
@function set-contrast-color($color) {
  @if(lightness($color) > 50%) {
    @return #333;
  } @else {
    @return #fff;
  }
}

// in main.css
@import 'functions';
.someEl {
  background: #000;
  color: set-contrast-color(#000);
}
```

`mixins` they are just included, and doing some work.
```scss
// in _functions.scss
@mixin transform($property){
  transform: $property;
}

// in main.css
@import 'functions';
.someEl {
  @include transform(rotate(20deg));
}
```

It has a lot more interesting stuff.