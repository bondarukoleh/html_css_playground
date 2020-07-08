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
vw - To 1% of viewport width
vh - To 1% of viewport height

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

`floats`
Before css grids and flex-boxes, float was used a lot. You shouldn't use it now. \
Sometimes clear:both divs is useful to clear previous float properties.