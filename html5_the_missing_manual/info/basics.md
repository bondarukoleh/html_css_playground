W3C (World Wide Web Consortium).
#### Basic Markup
The basic idea behind HTML — you use `elements` to structure your content. \
`In 1998, the W3C stopped working on HTML` and attempted to improve it with an XML-powered successor called XHTML 1.0.
It's the strict version of html, where developers of XHTML tried to reduce errors that web-devs can make in a html.
But neither of browsers is supporting this standard, so you still could run dirty html and call it xhtml.
XHTML should fix this problem, but it was developed too slowly and brings breaking changes along, so it slowly leaked 
away. \
`Since 2004 html is back to life.` \
A group of individuals from Opera Software and the Mozilla Foundation tried to get XHTML to introduce more
developer-oriented features. When they failed, `Opera, Mozilla, and Apple formed the WHATWG` (Web Hypertext Application
Technology Working Group) to extend html with backward-compatible way.
The earliest version of its work had two addon specifications called Web Applications 1.0 and Web Forms 2.0.
Eventually, these standards evolved into HTML5.
By 2007, the WHATWG camp had a lot of developers. The W3C decided to disband the group that was working on XHTML 2 and
work on formalizing the HTML5 standard instead.
HTML5 is really a web of interrelated standards. This approach is both good and bad.
It’s good because the browsers can quickly implement mature features while others continue to evolve.
It’s bad because it forces web page writers to worry about browser supports each feature they want to use.
The W3C is in charge of determining what is and isn’t official HTML5.
The WHATWG continues its work dreaming up future HTML features. They call it HTML (not HTML5), explaining that HTML
will continue as a living language. Means, an HTML page will never become obsolete and stop working, or have a version
number, and web developers will never need to “upgrade” their markup from one version to another to get it to work
on new browsers. By the same token, new features may be added to HTML at any time.

##### Three Key Principles of HTML5
1. `Don’t Break the Web` - a standard shouldn’t introduce changes that make other people’s web pages stop working.
2. `Pave the Cowpaths` - same road you should follow to create things. It's not very handy but it works. XHTML tried to
    do the other road - and failed.
3. `Be Practical` - Changes should have a practical purpose.

The HTML5 standard doesn’t require e.g. closed </p> tag, since browsers know to close all open elements at the end of the
document. Or you can not provide a "title" or "html" tags. The use of the <html>, <head>, and <body> elements is simply a
matter of style. But better to do everything right.

```The HTML5 Doctype```
The first line of every HTML5 document is a special code called the `doctype`. The doctype clearly indicates the standard
that was used to write the document markup that follows.
```html
   <!DOCTYPE html>
```
Compare it, for example, to the ungainly doctype that web developers need when using XHTML 1.0 strict:
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```
Without the doctype most browsers (including Internet Explorer and Firefox) will lapse into quirks mode. In this mode,
they’ll attempt to render pages according to the slightly buggy rules that they used in older versions. The problem is 
that one browser’s quirks mode differs from the other.
The HTML5 doctype triggers standards mode on all browsers that have a standards mode. Even is they don’t know anything
about HTML5.
Although the doctype is neede to tell web browsers what to do, and doctype is checked by HTML5 validators, search
engines, design tools, and other developers that trying to figure out what king of markup version you’ve chosen for
your page.

```Character Encoding```
The character encoding is the standard that tells a computer how to convert your text into a sequence of bytes when
it’s stored in a file—and how to convert it back again when the file is opened. Today, virtually all English websites
use an encoding called `UTF-8`, which is compact, fast, and supports all the non-English characters.
Often, the web server that hosts your pages is configured to tell browsers that it’s serving out pages with a certain
kind of encoding. However, because you can’t be sure that your web server will do this, and because browsers can run
into an security issue when they attempt to guess a page’s encoding, you should always add encoding information to your
markup.
`ASCII` - American Standard Code for Information Interchange. First standard, table where 128 symbols were represented
with 7-bite codes, with max number of codes 0-127. means 1 symbol - 1 code - 7 bytes, where symbol A - has code 65 which
in binary number system - means 1000001.
When 8-bits computers came, it became possible to create 8-bits codes, with max number 0-255. Everybody created their own
symbol coding systems without any compatibility with each other. When somebody sends coded with one format message to 
another guy machine, and this guy tries to decode a message with another format - he'll get "&_*%$@$#%^" not readable 
text, since a machine doesn't know how to decode 10100101 in some symbol.
Some standard should step in. `Unicode` set the standard for all symbols. So any symbol has his decimal number code. 
And there was more that 100 000 decimal number codes for more than 100 000 symbols. And that a lot of bytes for storing
symbols, right? So we need something that will compactly store and exchange these bytes. 
`UTF-8` - Unicode Transformation Format, it's an 8-bit format that stores Unicode 100 000 code numbers variably in 1-4
bytes of information, saves place. And it compatible with 7-bit ASCII.
$ -> unicode code is 36 -> UTF-8 code this code to 00100100, in 1 byte.
€ -> unicode 8364 -> UTF-8 -> 11100010 10000010 10101100 3 bytes.
```html
<head>
<meta charset="utf-8">
</head>
```

```The Language```
It’s considered good style to indicate your web page’s natural language.
Search engines can use it to filter search results so they include only pages that match the searcher’s language.
```html
<html lang="en">
```

```Adding a Style Sheet```
No need to add the type="text/css" attribute.
```html
<head>
<link href="styles.css" rel="stylesheet">
</head>
```

```Adding JavaScript```
No need to include the language="JavaScript" attribute.
```html
<head>
<script src="scripts.js"></script>
</head>
```
In internet explorer sometime “mark of the Web” comment should be added before javascript
```html
<head>
<meta charset="utf-8">
<!-- saved from url=(0014)about:internet -->
<title>A Tiny HTML Document</title>
<script src="scripts.js"></script>
</head>
```  
This comment tells Internet Explorer to treat the page as though it has been downloaded from a remote website.
Otherwise, IE switches into a special locked-down mode, pops up a security warning “Allow blocked content?”

The Final Product
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>A Tiny HTML Document</title>
<link href="styles.css" rel="stylesheet">
<script src="scripts.js"></script>
</head>
<body>
<p>Let's rock the browser, HTML5 style.</p>
</body>
</html>
```
All the HTML5 syntax work in browsers both new and old. That’s because they rely on defaults and built-in
error-correcting practices that all browsers use.
