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

The HTML5 standard doesn’t require e.g. closed &lt;/p&gt; tag, since browsers know to close all open elements at the end
of the document. Or you can not provide a "title" or "html" tags. The use of the &lt;html&gt;, &lt;head&gt;, and
&lt;body&gt; elements is simply a matter of style. But better to do everything right.

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
markup. \
`ASCII` - American Standard Code for Information Interchange. First standard, table where 128 symbols were represented
with 7-bite codes, with max number of codes 0-127. means 1 symbol - 1 code - 7 bytes, where symbol A - has code 65 which
in binary number system - means 1000001. \
When 8-bits computers came, it became possible to create 8-bits codes, with max number 0-255. Everybody created their own
symbol coding systems without any compatibility with each other. When somebody sends coded with one format message to 
another guy machine, and this guy tries to decode a message with another format - he'll get "&_*%$@$#%^" not readable 
text, since a machine doesn't know how to decode 10100101 in some symbol. \
Some standard should step in. `Unicode` set the standard for all symbols. So any symbol has his decimal number code. 
And there was more that 100 000 decimal number codes for more than 100 000 symbols. And that a lot of bytes for storing
symbols, right? So we need something that will compactly store and exchange these bytes. \ 
`UTF-8` - Unicode Transformation Format, it's an 8-bit format that stores Unicode 100 000 code numbers variably in 1-4
bytes of information, saves place. And it compatible with 7-bit ASCII. \
$ -> unicode code is 36 -> UTF-8 code this code to 00100100, in 1 byte. \
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

All together
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

#### HTML5 Syntax
All the HTML5 syntax work in browsers both new and old. That’s because they rely on defaults and built-in
error-correcting practices that all browsers use.
There are A LOT of obsolete practices that browsers support but that the HTML5 standard strictly not-recommend. For
help to catch these in your own web pages, you’ll need an HTML5 validator.

`The Loosened Rules`
1. Ignores capitalization, letting you write markup like the following:
```html
<P>Capital and lowercase letters <EM>don't matter</eM> in tag names.</p>.
```
2. Omit the closing slash from a `void` element — element with no nested content, like an
<img> (image), a <br> (line break), or an <hr> (horizontal line). Here are three equivalent ways to add a line break:
```html
I cannot<br />
move backward<br>
or forward.<br/>
```
3. Attribute values don’t need quotation marks, as long as the value doesn’t include a restricted character (typically >,
 =, or a space). 
```html
<img alt="Horsehead Nebula" src=Horsehead01.jpg>
```
Attributes with no values are also allowed.
```html
<input type="checkbox" checked>
<!-- not the <input type="checkbox" checked="checked" /> -->
```
`HTML5 Validation`
Such things can be spotted:
•  Missing mandatory elements (for example, the <title> element)
•  A start tag without a matching end tag
•  Incorrectly nested tags
•  Tags with missing attributes (for example, an <img> element without the src attribute)
•  Elements or content in the wrong place (for example, text that’s placed directly in the <head> section)
There is [online validator](http://validator.w3.org/#validate_by_input)

`The Return of XHTML`
To enforce usage of XHTML in HTML5 you need to use XHTML5 - HTML5 with the XML-based restrictions slapped on top. 
[XHTML5 validator](http://validator.w3.org/nu/) Files ending .xhtml or .xht.
```html
<!DOCTYPE html>
<!--Here is XHTML5 close every element, make sure you use lowercase tags, and so on -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8"/>
        <title>A Tiny HTML Document</title>
        <link href="styles.css" rel="stylesheet"/>
        <script src="scripts.js"></script>
    </head>
    <body>
        <p>Let's rock the browser, XHTML5 style.</p>
    </body>
</html>
```
But browsers will still process this XHTML5 as a html document, no extra rules applied. If you want to go XHTML5 all
the way, you need to configure your web server to serve your page with the MIME type application/xhtml+xml or
application/xml, instead of the standard text/html. Be warned that this change will prevent your page from being
displayed by any version of Internet Explorer before IE 9. \
Browsers that do support XHTML5 deal with it differently from ordinary HTML5. They attempt to process the page as
an XML document, and if that process fails they give up on the rest of the document. So basically XHTML5 isn’t worth it.

##### HTML5’s Element Family
Some elements were added, extended, some of them are not welcome by any decent HTML5 validator.
```html
<big>, <center>, <font>, <tt>, <strike>, <iframe>, <acronym> (use <abbr> ), <applet> (<object> is preferred).
<b> same as <strong>, <i> italic same as <em> emphasis.
```
•  Use &lt;strong&gt; for text that has strong importance. This is text that needs to stand out from its surroundings.
•  Use &lt;b&gt; for text that should be presented in bold but doesn’t have greater importance. This could include keywords,
 product names, and anything else that would be bold in print.
•  Use &lt;em&gt; for text that has emphatic stress—in other words, text that would have a different inflection if read out loud.
•  Use &lt;i&gt; for text that should be presented in italics but doesn’t have extra emphasis. This could include foreign 
words, technical terms, and anything else that you’d set in italics in print.
```html
<strong>Breaking news!</strong> There's a sale on <i>leche quemada</i> candy at the <b>El Azul</b> restaurant.
 Don't delay, because when the last candy is gone, it's <em>gone</em>.
```
Some elements changed:
Before HTML5 allowed holding text and image, now it allows anything and everything, which means it’s perfectly 
acceptable to stuff entire paragraphs in there, along with lists, images, and so on.

Some elements standardized:
&lt;embed&gt;, &lt;wbr&gt; to browser know where you can break a word (opposite to &lt;nobr&gt; which is obsolete, better use
 nowrap in css).

##### Using HTML5 Today
HTML5 features won't work at IE browsers before IE10. Some things will help you: warn your user, make a polyfill or
silently fallback to some different implementation. 
To check either you can or not use some feature:
[Can I use](http://caniuse.com)
[Browser usage statistic](http://gs.statcounter.com)
[To warn your user.](http://modernizr.com)
[Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)

#### Structuring Pages with Semantic Elements
Web developers use the same set of elements to build today’s modern sites that they used to build 10 years ago.
Humble < div > (division) — is the cornerstone of nearly every modern web page. \
Using < div > elements, you can slice an HTML document into headers, side panels, navigation bars, etc. Add different CSS
formatting, turn these sections into bordered boxes or shaded columns, and place each one exactly where it belongs.
This < div >-and-style technique is straightforward, powerful, and flexible, but it’s not transparent.

##### Introducing the Semantic Elements
To improve the structure of your web pages, you need HTML5’s semantic elements. \
These elements give extra meaning to the content they hold. For example, the new < time > element flags for some date
or time in your web page, it doesn't have any build-in formatting, and browser doesn't even care about it, but with css
you can add all date elements some style, which is convenient.
```html
Registration begins on <time>2014-11-25</time>.
```
There are other semantic like < nav > element identifies a set of navigation link or < footer > element wraps the footer,
and so on. \
Why to use elements that don't do anything at all: \
•  `Easier editing and maintenance`. Better understanding of the overall layout, various sections without look at css.
Structural information in the markup. Easier when you need to edit the page months later, and someone else to revise it. \
•  `Accessibility`. Modern web design should be accessible, pages that people can navigate using screen readers and
other assistive tools. \
•  `Search-engine optimization` Search engines like Google use powerful search bots—automated programs that crawl the
Web and fetch every page they can to scan your content and index it in their search databases. The better Google 
understands your site, the better the chance that it can match a web searcher’s query to your content, and the better
the chance that your website will turn up in someone’s search results. Search bots check for some of HTML5’s semantic
elements to collect more information about the pages they’re indexing. \
•  `Future features.` New browsers and web editing tools are sure to take advantage of semantic elements. For quick 
navigation and so on.

##### Retrofitting a Traditional HTML Page
In a well-written, traditional HTML page, most of the work is farmed out to the style sheet using the < div > and 
< span > containers. The < span > lets you format snippets of text inside another element. The < div > allows you to
format entire sections of content, and it establishes the overall structure of the page. \
Page has structure: Header box, Firs-level heading, By line, Lead-in, Second-level heading, Footer.
 
`Page Structure with HTML5`
The < div > is a cornerstone, but it is faceless. It doesn’t provide any information about the page.
When you (or a browser, or a design tool, or a screen reader, or a search bot) come across a < div >, you don’t know
the purpose of that section. \
To improve this situation in HTML5, you can replace some of your < div > elements with more descriptive semantic
elements. The semantic elements behave exactly like < div > elements: They group a block of markup, they don’t do
anything on their own, and they give you a styling hook that lets you apply formatting. So you can easily change
< div class="Header" > to < header class="Header" >. Nothing will change, but it looks redundant. So better to change
css sheet and make it just < header >. < article > is other nice tag, for search engines it's like a non-existing 
"content" tag.

`Adding a Figure with <figure>`
The HTML5 specification suggests that you think of them much like figures in a book, meaning a picture that’s separate
from the text, yet referred to in the text. Not just regular image. Generally, you let figures float, means you put them
in the nearest convenient spot alongside your text, rather than lock them in place next to a specific word or element.
The difference with faceless < div > that your figure markup is now perfectly clear. < figcaption > isn’t limited to
text — you can use any HTML elements that make sense. Other possibilities include links and tiny icons. Also figcaption
can substitute the alt="" attribute for img. 

`Adding a Sidebar with <aside>`
The new < aside > element represents content that is some kind related to the text that surrounds it. \
e.g. you can use an < aside > to introduce a related topic or to expand on a point that’s raised in the main document.
for a block of ads, some related content links, or quote.

`Browser Compatibility for the Semantic Elements`
To support semantic tags, browser simply needs to treat them like an ordinary < div > element.
When a browser meets an element it doesn’t recognize, it treats it as an inline element.
But most of HTML5’s semantic elements (except <time> and couple more) are block elements, which means the browser is 
supposed to render them on a separate line, with a little of space between them and the preceding and following
elements. \
But if browser, which knows nothing about new HTML5 blocks element will smash them together as inline elements. Which is
why we need to explain to the browser that these are block elements:
```html
article, aside, figure, figcaption, footer, header, main, nav, section, summary {
    display: block;
}
``` 
This style sheet rule won’t take effect for browsers that already recognize HTML5, because the display property is
already set to block. And it won’t affect any style rules you already use to format these elements.

`Using the HTML5 Shiv`
Previous hack is for most browsers. This one for IE 8 and older.
Old versions of IE introduce a second challenge: They refuse to apply style sheet formatting to elements they don’t
recognize. You can trick IE into recognizing a foreign element by registering it with a JavaScript command.
For example, here’s a script block that gives IE the ability to recognize and style the < header > element:
```html
<script>
    document.createElement('header')
</script>
```
So you can find a patch for html5 elements somewhere online or do it by yourself. Modernizr - has this fix in it.

`Designing a Site with the Semantic Elements`
Header \
Pages can have more than one < header > element and often will, even though these headers play different roles on the
page. 
```html
<header class="SiteHeader">
    <img src="media/site_logo.png" alt="Apocalypse Today">
    <h1 style="display:none">Apocalypse Today</h1>
</header>
```
What’s the point of adding a heading that you can’t see?
 - First, all <header> elements require some level of heading inside, just to satisfy the rules of HTML5.
 - This design makes the page more accessible for people who are navigating it with screen readers. 
 - It establishes a heading structure that you can use in the rest of the page. That’s a fancy way of saying that if 
you start with an < h1 > for your website header, you may decide to use < h2 > elements to title the other sections of
the page (like “Articles” and “About Us” in the sidebar).

##### Navigation Links with <nav>
In a traditional HTML website, some side block with navigation or ads you’d wrap in a < div >. In HTML5, you almost 
always rely on < aside > and < nav >. \
The < aside > element can be used to mark up a piece of related content, quotes or, for create an entirely separate
section of the page—one that’s offset from the main flow.
The < nav > element wraps a block of links, that point to topics on the page, or to other pages. Most pages will have
multiple < nav > sections in them. Not all links need a < nav > section, it’s generally reserved for the largest section.

Also, good one is < section > element, more specific than a < div > — it’s suitable for any block of content that starts
with a heading.

##### Deeper into Sections
If you have a titled block of content, and the other semantic elements aren’t appropriate, then the < section > element
is generally a better choice than < div >.
So what goes in a typical section:
•  Small content blocks, displayed alongside the main page, like the “About Us” paragraph in the apocalyptic website.
•  Self-contained content, can’t really be described as an article, like a customer billing record or a product listing.
•  Groups of content — for example, a collection of articles on a news site.
•  A portion of a longer document. e.g. Sometimes you’ll use sections in this way to ensure a correct outline for your
document.

##### Collapsible Boxes with <details> and <summary>
The idea is that you wrap your collapsible section in a < details > element and wrap the heading inside in a < summary >
element.
```html
<details>
    <summary>Section #1</summary>
    <p>If you can see this content, the section is expanded</p>
</details>
```