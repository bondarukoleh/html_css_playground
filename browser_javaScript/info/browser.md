#### Browser
JavaScript can be executed in many platforms nowadays. A platform may be a browser, or a web-server or another host,
even a “smart” coffee machine. Each of them provides platform-specific functionality. The JavaScript specification 
calls that a `host environment`. A host environment provides own objects and functions additional to the language core.
Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here what we have in web browser:

|-|window|-|
|:---:|:---:|:---:|
|DOM|BOM|JavaScript|
|document|Object|Array|
|...| navigator | Function |
| | screen      | |
| | location    | |
| | frames      | |
| | history     | |
| | XMLHttpRequest    | |

`root` - window, has JS ```global``` object, and presents browser window, and has methods to control it. \
`DOM (Document Object Model)` - represents all page content as objects that can be modified. The `document` object is the
main “entry point” to the page. We can change or create anything on the page using it. [DOM spec.]()

[1]: https://dom.spec.whatwg.org/ "whatwg spec"
DOM also can be user in server-side page processing. \

`BOM (Browser Object Model)` - represents additional objects provided by the browser (host environment) for `working with
everything except the document`. e.g. navigator object provides information about the browser and the operating system.
```navigator.userAgent``` – about the current browser, and ```navigator.platform``` – about the platform.
The location object allows us to read the current URL and can redirect the browser to a new one.

---
##### DOM tree
Every tag element is an object. Tags are `element nodes` (or just elements) with their children.
The text inside elements forms - `text nodes`. A text node contains only a string. It may not have children and is
always a leaf of the tree.
Overall there are 12 types of nodes:
 * ELEMENT_NODE = 1;
 * ATTRIBUTE_NODE = 2;
 * TEXT_NODE = 3;
 * CDATA_SECTION_NODE = 4;
 * ENTITY_REFERENCE_NODE = 5; // historical
 * ENTITY_NODE = 6; // historical
 * PROCESSING_INSTRUCTION_NODE = 7;
 * COMMENT_NODE = 8;
 * DOCUMENT_NODE = 9;
 * DOCUMENT_TYPE_NODE = 10;
 * DOCUMENT_FRAGMENT_NODE = 11;
 * NOTATION_NODE = 12; // historical

Browser trying to correct your html, close the tag, add everything that after < body > to the body, etc.
DOM includes !Doctype, comments, everything.

DOM structure in developer tools is simplified. Text nodes are shown just as text and there are no “blank” (space only)
text nodes at all. In chrome dev tools, when you select some node in a html - it available in the console with $0, 
previous selected node - $1 and so on.

---
##### Walking the DOM
< html> = document.documentElement
< body> = document.body
< head> = document.head

Properties `firstChild` and `lastChild` give fast access to the first and last children.
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```
The `childNodes` (direct children) collection lists all child nodes, including text nodes. \
`Decedents` - not just child nodes, but all nodes that under some element. Children of children and so on. \
`Siblings` are nodes that are children of the same parent. \
The next sibling is in `nextSibling` property, and the previous one – in `previousSibling`. But be aware, that nextSibling
often will show you the "#text" node with "new line" sign. If you need element node - use nextElement sibling \
The parent is available as `parentNode`.

---
##### DOM Collections
DOM collection is not an array, it's an array like object.
```js
// you ca easily make an array from the elements
Array.prototype.slice.call(document.querySelectorAll('div')).map; // old style
// new style
Array.from(document.querySelectorAll('div')).map
let elems = [...document.querySelectorAll('div')].map
```

DOM `collections are read-only`. 
We can’t replace a child by something else by assigning childNodes[i] = .... \
DOM `collections are live`.
If we keep a reference to elem.childNodes, and add/remove nodes into DOM, then they appear in the collection automatically.

---
##### Element-only navigation
Navigation properties listed above refer to all nodes. For instance, in childNodes we can see both text nodes, element nodes, and even comment nodes if there exist.

The links are similar to those given above, just with Element word inside: \
`children` – only those children that are element nodes. \
`firstElementChild`, `lastElementChild` – first and last element children. \
`previousElementSibling`, `nextElementSibling` – neighbor elements. \
`parentElement` – parent element.

The parentElement property returns the “element” parent, while parentNode returns “any node” parent.

The < table> element supports (in addition to the given above) these properties: \
`table.rows` – the collection of < tr> elements of the table. \
`table.caption/tHead/tFoot` – references to elements < caption>, < thead>, < tfoot>. \
`table.tBodies` – the collection of < tbody> elements. 
 
< thead>, < tfoot>, < tbody> elements provide the rows property: \
tbody.rows – the collection of < tr> inside. \
< tr>: \
tr.cells – the collection of < td> and < th> cells inside the given < tr>. \
tr.sectionRowIndex – the position (index) of the given < tr> inside the enclosing < thead>/< tbody>/< tfoot>. \
tr.rowIndex – the number of the < tr> in the table as a whole (including all table rows). \
< td> and < th>: \
td.cellIndex – the number of the cell inside the enclosing < tr>.

Find Element \
Only document.getElementById, not anyElem.getElementById. \
`elem.matches(css)` - like some filtering for elements, if it matches css selector -> true.
`elem.closest(css)` - looks the nearest ancestor that matches the selector. Elem itself also is included in the search.
`elemA.contains(elemB)` returns true if elemB is inside elemA (a descendant of elemA) or when elemA==elemB.

Live vs Static collections \ 
Live collection - when the changes in the DOM are reflected in the collection. \
Static - when any change in the DOM does not affect the content of the collection. \
HTMLCollection only contains Elements Nodes. NodeList contains Element Nodes and Text Nodes.

|Method|	Searches by...|	Call on an element?|	Live?| Collection|
|:---:|:---:|:---:|:---:|:---:|
|querySelector|	CSS-selector|+|-|-|
|querySelectorAll|	CSS-selector|+|-|NodeList|
|getElementById|	id|	-|	-|-|
|getElementsByName|	name|	-|	+|NodeList|
|getElementsByTagName|	tag or '*'| +| +|HTMLCollection|		
|getElementsByClassName|	class|	+|	+|HTMLCollection|

#### Node properties: type, tag and contents
##### DOM node classes
Different DOM nodes may have different properties. For instance, an element node corresponding to tag < a> has 
link-related properties, and the one corresponding to < input> has input-related properties and so on.
Each DOM node belongs to the corresponding built-in class.
The root of the hierarchy is EventTarget, that is inherited by Node, and other DOM nodes inherit from it.

EventTarget \
&nbsp;&nbsp;Node \
&nbsp;&nbsp;&nbsp;&nbsp;Text (< div>`Text`< /div>) \
&nbsp;&nbsp;&nbsp;&nbsp;Comment (< !-- Comment -->) \
&nbsp;&nbsp;&nbsp;&nbsp;Element (< `div`>Text< `/div`>) \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SVGElement \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTMLElement \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTMLInputElement(< input type="…">) \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTMLBodyElement(< body>) \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTMLAnchorElement(< a href="…">) 

_**Object**_ - The most top class in the DOM.
_**EventTarget**_ – is the root “abstract” class. All DOM nodes support so-called “events" \
_**Node**_ – is also an “abstract” class. It provides the core tree functionality: parentNode, nextSibling, childNodes
and so on. \
_**Element**_ – is a base class for DOM elements. It provides element-level navigation like nextElementSibling,
children and searching methods like getElementsByTagName, querySelector. A browser supports not only HTML, but also 
XML and SVG. \
_**HTMLElement**_ – is finally the basic class for all HTML elements. It is inherited by concrete HTML elements: \
HTMLInputElement – the class for \<input\> elements, \
HTMLBodyElement – the class for \<body\> elements, \
HTMLAnchorElement – the class for \<a\> elements, \
…and so on, each tag has its own class that may provide specific properties and methods.

> console.dir(elem) versus console.log(elem) \
> console.log(elem) shows the element DOM tree. \
> console.dir(elem) shows the element as a DOM object, good to explore its properties.

IDL in the spec \
In the specification, DOM classes described by special Interface description language (IDL) \
The colon ":" means that HTMLInputElement inherits from HTMLElement \
"DOMString" means that the value of a property is a string

The “`nodeType`” property \
The nodeType property provides one more, “old-fashioned” way to get the “type” of a DOM node. \
It has a numeric value:
elem.nodeType == 1 for element nodes, \
elem.nodeType == 3 for text nodes, \
elem.nodeType == 9 for the document object.

difference between `tagName and nodeName`?
* The tagName property exists only for Element nodes. (undefined for text or comment) (always uppercase except XML mode)
* The nodeName is defined for any Node:
    * for elements it means the same as tagName.
    * for other node types (text, comment, etc.) it has a string with the node type ("DIV", "#text", #comment").

`innerHTML` the contents \
The innerHTML property allows to get the HTML inside the element as a string. It is only valid for element nodes.
We can also modify it. So it’s one of the most powerful ways to change the page. \
> Beware: “innerHTML+=” does a full overwrite

As the content is and rewritten from the scratch, all images and other resources will be reloaded. Mouse selected text
will be wiped from the rewritting, same as inputs filled by user, and so on.

`outerHTML` full HTML of the element \
The outerHTML property contains the full HTML of the element. That’s like innerHTML plus the element itself.
> Beware: unlike innerHTML, writing to outerHTML does not change the element. Instead, it replaces it in the DOM.

```html
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');
  // replace div.outerHTML with <p>...</p>
  div.outerHTML = '<p>A new element</p>'; // (*)
  // Wow! 'div' is still the same!
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

So what happened in div.outerHTML=... is: \
* div was removed from the document
* Another piece of HTML \<p\>A new element\</p\> was inserted in its place.
* div still has its old value. The new HTML wasn’t saved to any variable.

`nodeValue/data` - text node content \
You cannot get the innerHTML from  not-element nodes. From them you can get `nodeValue` and `data` properties. We can use
data in most cases.
For text nodes - we can change content, and comments - we can read, and sometimes there is instructions for JS logic in
comments, but I believe this is not a nice approach.

`textContent` - pure text \
The textContent provides access to the text inside the element: only text, minus all \<tags\>. So if you want to add text
- you can use textContent, if you need to add html as text - use innerHTML

`hidden` property \
We ca easily hide the element, like display: node. It will still be in the DOM, but place would filled.

`some more...` \
DOM elements also have additional properties, in particular those that depend on the class: \
value – the value for \<input>, \<select\> and \<textarea\> (HTMLInputElement, HTMLSelectElement…). \
href – the “href” for \<a href="..."\> (HTMLAnchorElement). \
id – the value of “id” attribute, for all elements (HTMLElement).

---
#### Attributes and properties
##### DOM properties
DOM nodes are regular JavaScript objects. We can add some properties or functions to them.
```js
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};
document.body.sayTagName = function() {
  alert(this.tagName); // "BODY"
};
// Modify prototype
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};
```

##### HTML attributes