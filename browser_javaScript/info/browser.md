#### Browser

JavaScript can be executed in many platforms nowadays. A platform may be a browser, or a web-server or another host,
even a “smart” coffee machine. Each of them provides platform-specific functionality. The JavaScript specification 
calls that a `host environment`. A host environment provides own objects and functions additional to the language core.
Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here what we have in web browser:
||window||
|DOM|BOM|JavaScript|
|document|Object|Array|
|...|navigator|Function|
||screen|...|
||location||
||frames||
||history||
||XMLHttpRequest||

`root` - window, has JS ```global``` object, and presents browser window, and has methods to control it. \
`DOM (Document Object Model)` - represents all page content as objects that can be modified. The `document` object is the
main “entry point” to the page. We can change or create anything on the page using it. [DOM spec.](https://dom.spec.whatwg.org/)
DOM also can be user in server-side page processing. \

`BOM (Browser Object Model)` - represents additional objects provided by the browser (host environment) for `working with
everything except the document`. e.g. navigator object provides information about the browser and the operating system.
```navigator.userAgent``` – about the current browser, and ```navigator.platform``` – about the platform.
The location object allows us to read the current URL and can redirect the browser to a new one.

##### DOM tree
