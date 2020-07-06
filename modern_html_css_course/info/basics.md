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
