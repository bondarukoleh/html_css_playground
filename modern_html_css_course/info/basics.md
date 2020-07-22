#### Basic information

Cascading style sheet.
A static site - informative site, without too much logic, without ability to create account.

`X-UA-Compatible` - browser compatibility, describe in what ie browser you want to run.
`viewport` - important for responsive design, means it will scaled by device width. If you lurk with phone, and you 
don't see the hole content of the site on your screen - this page probably without this meta tag.
`title` - important for search engines. You can put main info about your page here, same as `description`. `keywords` - 
not so important for search engines but still worth to add.
`robots` - we can say engines to not show our page, hide it from google, or maybe to not follow any links on the page.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Web development company does some pretty heavy sh*** you'll like it">
  <meta name="keywords" content="Web development, web design">
  <!-- <meta name="robots" content="NOINDEX, NOFOLLOWS"> -->
  <title>MyCompany Name | Web development | High quality and price</title>
</head>
<body>
  <h1>This is my hello world</h1>
</body>

</html>
```
Tags like:
```html
<b>, <i>, etc. 
```
replaced with:
```html
<strong>, <em>, etc. 
```
Because HTML is no longer for styling, it replaced with semantic tags, means we don't tell how it looks like in html 
no more, we only tell that if should be different, strong means that is should stand out from other text, but how it 
should do it - it's about css. \

`There are block elements in html.`
```html
<address>
<article>
<aside>
<blockquote>
<canvas>
<dd>
<div>
<dl>
<dt>
<fieldset>
<figcaption>
<figure>
<footer>
<form>
<h1>-<h6>
<header>
<hr>
<li>
<main>
<nav>
<noscript>
<ol>
<p>
<pre>
<section>
<table>
<tfoot>
<ul>
<video>
```

`HTML Entities and symbols` \
Some characters are reserved in HTML.
```text
Result	Description	        Entity Name	   Entity Number
        non-breaking space	&nbsp;          &#160;
<	      less than     	    &lt;          	&#60;
>	      greater than	      &gt;          	&#62;
&	      ampersand	          &amp;         	&#38;
"	      double quotation  	&quot;          &#34;
'	      single quotation  	&apos;          &#39;
¢	      cent                &cent;          &#162;
£	      pound               &pound;         &#163;
¥	      yen                 &yen;         	&#165;
€	      euro                &euro;          &#8364;
©	      copyright           &copy;          &#169;
®	      registered trade    &reg;	          &#174;
```

And more interesting [symbols](https://www.w3schools.com/charsets/ref_html_symbols.asp).

We could use tags like
```html
<kbd>Ctr + R. Kbd - keyboard input</kbd>
<code>const a = _ => "something"</code>
```

`Dev tools`
Ctr + "+" - to make it bigger.

`Font`
When it's a few fonts that listed.
```css
font-family: "Times New Roman", Times, serif;
font-style: italic;
font-weight: bold;
```
Means it tries to find "Times New Roman", if it can't find it - it'll try Times, and so on. Sans serif - nice one. \
We can find some in [Google fonts](https://fonts.google.com/)

`CSS units`
```Absolute``` \
cm - centimeters
mm - millimeters
in - inches
px - pixels (1px = 1/96th of 1in)
pt - points (1pt = 1/72th of 1in)
pc - Picas picas (1pc = 12pt)

```Relative``` \
% - To parent element
em - To font-size of parent element (if parent font-size is 16px - 1em child will be 16px, 1.2em - 19.2px)
rem - To font-size of root element (same but for root. 16px - is default rem.)
The difference is next:
Default size for every element is 1em. Means it will search for set font-size property of his parent element, then his
parent, and so on, until he reaches the root html tag - and get his default font-size.
If we set font-size: 1.1rem - it means it won't lurk for parents - it will go directly to the root html tag ant get its
font-size as a base. \

There is a trouble with `ems`. If I set parent to 10px size and use 1.5em in child, I get the 15px in child. But when 
you'll set margin/padding of the element in ems - you get em from current element font size. In same situation I set
padding 1.5em to child, and I won't get the 15px padding based on parent, I get the 22.5px (1.4 from 15px) based on
child's font-size. Also, there another one, nested elements will always get the font-size from their parents and the 
last level, if you set size to 1.5em to element, and there are few nested elements in this one - only the deepest
element will be affected. \
Font-size in browser settings - doesn't affect the em size, but do affect the rem size (if you haven't set html font size manually) which is nice, adaptive and responsive. \

So rem really preferable because it doesn't have these weird and not-obvious behavior. \

vw - To 1% of viewport width \
vh - To 1% of viewport height \

Viewport hight and width are always 100. e.g. no matter how small or big browser there always 100 of vh values, and 100
of vw values.

`height`
```css
.some-div {
  height: 100px;
}

.some-div .inner-div {
  height: 100%; /* Means take place for 100% of your parent container, not by the content but by the size of parent */
}
```

`Colors`
```css
/* Color - name */
color: red;
/* Color - rgb()/rgba() red, blue, green, alpha - opacity. Values all zeros - black, all 255 - white, 
alpha from 0.0 (fully transparent) and 1.0 (fully opaque) */
color: rgb(55, 25, 125);
/* Color-hexadecimal, base 16. 4 or 6 value. Numbers from 0-9, letters from A-F. #000000 - black, #ffffff - white
It's same RGB color, first two ff - is for Red, and so on.
*/
color: #FF00AA;
/*if you have same values for each color - you can cut it to 3 */
color: #F0A;
```
We can check colors [here](https://www.color-hex.com/)


`Images`
.png - can be transparent, .jpg - cannot. \
Same stuff you can do with background. Combine everything in one line.
```css
/* background-image: url("../media/stars.jpg");
  background-repeat: no-repeat;
  background-position: 20px 20px;
  background-size: cover; */
  background: url("../media/stars.jpg") no-repeat 20px 20px/cover;
```

`margin padding`
If you add width 100px and padding 10px, then real width will be 120 px. If you don't want that you'll need box-sizing: border-box. \



In Css overriding same as in JS, last read property overrides previous one. \

All the stuff in css:
```css
padding: 10px; /*All sides*/
padding: 10px 5px; /*top bottom - 10, right left - 5*/
padding: 10px 5px 15px; /*top - 10, right left - 5 bottom - 15*/
padding: 10px 5px 15px 20px; /*top - 10, right - 5 left - 15 bottom - 20*/
```

Margin: auto, means browser add same indent from both sides pushing element to middle. \
To be more responsive, instead of static width: 100px we can use max-width: 100px, means if screen will be less than \
100px - browser will try automatically show all content.

Margin can be used only for block elements (for inline - text-align), only horizontally, and only if whey have width.
Padding: auto - doesn't exist.

`Box-sizing, outline`
Outline responsible for behavior out of the element boarder. outline-offset also a interesting one. \
Box-sizing gives you ability to keep element width and height keep strict to size that you have set. Without adding
margin and padding or border-width. \

```box-sizing: content-box``` - default value. Here, the dimensions of the element are calculated as: width = width of the content, and height = height of the content. (Borders and padding are not included in the calculation.) \
```box-sizing: border-box``` - The width and height properties include the content, padding, and border, but do not include the margin.
Here the dimensions of the element are calculated as: width = border + padding + width of the content, and height = border + padding + height of the content. \

`floats`
Before css grids and flex-boxes, float was used a lot. You shouldn't use it now. \
```clear``` - thing that you want to use with floats. Floats:left - says the element to float, be on the top level (my
opinion) of the layout, and be on the left side of it. Other elements just moved under floated element, but text cannot
be under floated element. This is weird, I know. Clear - gives you ability to avoid floating objects, means no matter 
where this float element is - element with clear is ignoring it and all rules goes from start. \

Float lifts elements on the same level, tnd they act like inline element, not block.

`Display`
If you want to see block elements displayed as inline - you can use display:inline. \
```display:inline``` - You cannot set width, height, margin-top, margin-bottom, and float properties.
`display:inline-block` - you can set width, height, margin/padding, but no line break after the element added, it can still be in the line. \
`display:block` - you can set properties, and line break added. \

`Shortcuts`
To use html generating shortcuts go [here](https://docs.emmet.io/cheat-sheet/)
```html
<!-- from this:
div[class=box]#box-${Block $}*5
to this: -->
<div class="box" id="box-1">Block 1</div>
<div class="box" id="box-2">Block 2</div>
<div class="box" id="box-3">Block 3</div>
<div class="box" id="box-4">Block 4</div>
<div class="box" id="box-5">Block 5</div>
```

`Position`
```static```: default position. Normal page flow.
`left/right/top/bottom/z-index` - `no effect` on that element. \
```relative```: act like static. But now `left/right/top/bottom/z-index will work` When you use them - element will be removed from the page flow,
so it won't affect any other elements and can overlay on them.\
```absolute```: the element is removed from the document flow. And `other elements will behave as if it’s not even there`. When you want to stick 
some element somewhere but you don't want to anything else moved. When you use top/bottom/etc. - it will be positioned `to the nearest positioned ancestor or html in the end`. \
```fixed```: same as absolute, but element stays same when you scroll and `relative not to positioned parent but to viewport.` \
```sticky```: the element is treated like a relative value until the scroll location of the viewport
reaches a specified threshold, at which point the element takes a fixed position where it is told to stick. Relative to
scroll. Is positioned based on the user's scroll position. \
```inherit```: the position value doesn’t cascade, so this can be used to specifically force it to, and inherit the
positioning value from its parent. \

`z-index` - property specifies the stack order of an element. You can also use negative even numbers. z-index only works on positioned elements (position: absolute, position: relative, position: fixed, or position: sticky). \


`Viewport`
The viewport is the user's visible area of a web page.
The viewport varies with the device, and will be smaller on a mobile phone than on a computer screen.
Before tablets and mobile phones, web pages were designed only for computer screens, and it was common for web pages to have a static design and a fixed size.

`Visibility`
```css
/*removes from DOM*/
display: none;
/*Hide, but element still takes place*/
Visibility: hidden;
```

`CSS priority`
1. !important after CSS properties.
2. Specificity of CSS rule selectors.
```text 
CSS Selector	                  Description
Inherited styles	       Lowest specificity of all selectors - since an inherited style targets the element's parent,
                         and not the HTML element itself.
*                        Lowest specificity of all directly targeted selectors
element	                 Higher specificity than universal selector and inherited styles.
attribute	               Higher specificity than element selector
class	                   Higher specificity than attribute, element and universal selectors.
ID	                     Higher specificity than class selector.
Combined selectors	     Gets the specificity of the selectors combined.
CSS properties set
directly on element,
inside style attribute.	 Stronger specificity than ID selector.

```
3. Sequence of declaration.

```css
.some-class {
  /* Color going to be red */
  color: red !important;
}
```

`Shadow` \
```css
.someClass {
  /* offset-x, offset-y, color */
  box-shadow: 10px 15px #333;
  /* offset-x, offset-y, blur-radius, color */
  box-shadow: 10px -15px 10px #333;
  /* offset-x, offset-y, blur-radius, spread-radius, color */
  box-shadow: 10px -15px 10px 15px #333;
  /* inset, offset-x, offset-y, blur-radius, spread-radius, color */
  box-shadow: inset -15px 15px 5px 10px rgb(0, 0, 0, 0.9);
  /* Multiple */
  box-shadow: 10px 15px #333, -3px -15px #333;
}

.someText {
  /* h-shadow, v-shadow, color */
  text-shadow: 10px 15px #333;
}
```

