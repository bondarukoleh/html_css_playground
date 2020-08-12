### Browser
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
#### DOM tree
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
#### Walking the DOM
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
#### DOM Collections
DOM collection is not an array, it's an array like object.
```js
// you ca easily make an array from the elements
Array.prototype.slice.call(document.querySelectorAll('div')).map; // old style
// new style
Array.from(document.querySelectorAll('div')).map
let elems = [...document.querySelectorAll('div')].map
```

DOM `collections are read-only`. \
We can’t replace a child by something else by assigning childNodes[i] = .... Changing DOM needs other methods. \
DOM `collections are live with special methods`. \
By reference to elem.childNodes, and add/remove nodes into DOM, then they appear in the collection automatically.

---
#### Element-only navigation
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

### Node properties: type, tag and contents
#### DOM node classes
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
will be wiped from the rewriting, same as inputs filled by user, and so on.

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
### Attributes and properties
Attributes – is what’s written in HTML. \
Properties – is what’s in DOM objects.

#### DOM properties
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

---
#### HTML attributes
Tags have attributes. When the browser parses the HTML to create DOM objects from tags, _**standard** attributes become
DOM properties_. But that doesn’t happen if the attribute is non-standard. \
Standard attribute for one element can be unknown for another one. "type" is standard for \<input> (HTMLInputElement),
but not for \<body> (HTMLBodyElement).

How go get non-standard properties from DOM?
 ```js
elem.hasAttribute(name) // – checks for existence.
elem.getAttribute(name)  // – gets the value.
elem.setAttribute(name, value) // – sets the value.
elem.removeAttribute(name) // – removes the attribute.
```
```html
<body something="non-standard">
  <script>
    alert(document.body.getAttribute('something')); // non-standard
  </script>
</body>
```

`HTML attributes`:
 - [x] Case-insensitive;
 - [x] Always string, no matter what you've set there;
 - [x] Has "name" and "value";
 
```html
<body>
  <div id="elem" custom_prop="Some custom value"></div>
  <script>
    alert( elem.getAttribute('CuStOm_Prop') ); // (1) 'Elephant', reading
    elem.setAttribute('Test', 123); // (2), writing
    alert( elem.outerHTML ); // <div id="elem" custom_prop="Some custom valu" test="123"></div>
    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

`DOM properties`:
 - [x] case-sensitive;
 - [x] typed by JS types;

```html
<input id="input" type="checkbox" checked> checkbox
<script>
  alert(input.getAttribute('checked')); // the attribute value is: empty string
  alert(input.checked); // the property value is: true
</script>

<div id="div" style="color:red; font-size:120%">Hello</div>
<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%
  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>

<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello
  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

---
#### Property-attribute synchronization
In most cases standard attribute change - update the property of the element and vice versa.
```html
<input>
<script>
  let input = document.querySelector('input');
  // Change attribute affects property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)
  // Change property affects attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```
But, e.g. input.value synchronizes only from an attribute to property, but not back:
```html
<input>
<script>
  let input = document.querySelector('input');
  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
</script>
```
That “feature” may be useful when user changes value, and we want to recover the “original” value from HTML,
it’s in the attribute.

#### Non-standard attributes, dataset
So we can add non-standard attributes, and easily manage them from JS. But what if they will be added to HTML standard?
For this case there is a `dataset` property. All non-standard attributes that have `data-` in the beginning of their 
names available in `elem.dataset` property. Multiword attributes like ```data-order-state``` become camel-cased:
```dataset.orderState```.
```html
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

---
### Modifying the document
#### Creating an element
document.createElement(tag) \
document.createTextNode(text) \

#### Insertion methods
If you want to add *element node* to another element, or append any string as a *text node*:
 * node.append(...nodes or strings) – append nodes or strings at the end of node,
 * node.prepend(...nodes or strings) – insert nodes or strings at the beginning of node,
 * node.before(...nodes or strings) –- insert nodes or strings before a node,
 * node.after(...nodes or strings) –- insert nodes or strings after node,
 * node.replaceWith(...nodes or strings) –- replaces a node with the given nodes or strings.
 
```text
before
    prepend
    element
    append
after
```

`insertAdjacentHTML/Text/Element` \
If you want to add any *string as HTML* to another element you need insertAdjacent***:
 * elem.insertAdjacentHTML(where, html), string will be parsed as html and added as an element;
 * elem.insertAdjacentText(where, text), string will be parsed as text, and added as a text node;
 * elem.insertAdjacentElement(where, elem), element will be added.
 
There are 4 places where you can add things:
 * "beforebegin" – insert html immediately before elem;
 * "afterbegin" – insert html into elem, at the beginning;
 * "beforeend" – insert html into elem, at the end;
 * "afterend" – insert html immediately after elem; 

#### Node removal
To remove a node, there’s a method elem.remove(). \
If you want to move element no need to remove it from old one, all insertion methods automatically remove the node
from the old place.

#### Cloning nodes: cloneNode
 * elem.cloneNode(true) creates a “deep” clone – with all attributes and subelements;
 * If we call elem.cloneNode(false), then the clone is made without child elements;

#### DocumentFragment
DocumentFragment is a special DOM node that serves as a wrapper to pass around lists of nodes. \
We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

#### Old-school insert/remove methods
`parentElem.appendChild(node)` Appends node as the last child of parentElem. \
`parentElem.insertBefore(node, nextSibling)` - Inserts node before nextSibling into parentElem. \
`parentElem.replaceChild(node, oldChild)` - Replaces oldChild with node among children of parentElem. \
`parentElem.removeChild(node)` - Removes node from parentElem (assuming node is its child). \
No need to use those methods since we have _append, prepend, before, after, remove, replaceWith_

`document.write` - writes the html into page “right here and now”. \
The call to document.write only works while the page is loading. If we call it afterwards, the existing document
content is erased, this is a disadvantage.
Advantage - when document.write is called while the browser is parsing incoming HTML, and it writes something, the
browser consumes it as if it were in the HTML text, so it's very fast, because there’s no _DOM modification_ involved.
```html
<p>After one second the contents of this page will be replaced...</p>
<script>
  // document.write after 1 second
  // that's after the page loaded, so it erases the existing content
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
```

---
### Styles and classes
#### className and classList
 * className - all class names in one string separated
 * classList - collection that has *["length", "value", "item", "contains", "add", "remove", "toggle", "replace",
 "supports", "toString", "entries", "forEach", "keys", "values"]*


#### Element style
The property `elem.style is an object` that corresponds to what’s written in the "style" attribute. For *background-color*
=> elem.style.backgroundColor. *-moz-border-radius* - elem.style.MozBorderRadius. \
To `reset` some CSS property to default - set style.my_css_prop to an empty string, browser applies CSS classes and its
built-in styles normally. No need to delete this property. \
To set whole style as a string (same as all classes with className) use `style.cssText`:
```html
<div id="div">Button</div>
<script>
  // we can set special style flags like "important" here
  div.style.cssText=`color: red !important; background-color: yellow;`;
</script>
```
Another way to set style as string is `div.setAttribute('style', ...)`:
```js
div.setAttribute('style', 'color: red...')
```

#### Mind the units
Don't forget values that you are setting to properties. If it's px - it won't work just with numbers but with string "1px"
```html
<body>
  <script>
    // doesn't work!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty string, the assignment is ignored)
    // now add the CSS unit (px) - and it works
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px
  </script>
</body>
```

#### Computed styles: getComputedStyle
The style property operates only on the value of the "style" attribute, without any CSS cascade. \
`window.getComputedStyle(element, [pseudo])` to get all current style properties as an object.
 * element - Element to read the value for.
 * pseudo - A pseudo-element if required, for instance ::before. An empty string or no argument means the element itself.

```js
  let computedStyle = getComputedStyle(document.body);
```

`Computed and resolved values` \
There are two concepts in CSS:
 * A **computed style**, relative the value after all CSS rules and CSS inheritance is applied, as the result of the CSS
 cascade. It can look like height:1em or font-size:125%.
 * A **resolved style**, concrete value that applied to the element. The browser takes the computed value and makes all
units fixed and absolute, so relative height:1em becomes height:16px. For geometry properties values may have a floating 
point, like width:50.5px.

 * getComputedStyle - returns resolved values.\
 * getComputedStyle requires the full property name, better to ask paddingLeft, instead just padding.
 * Styles applied to :visited links are hidden for security reasons.

### Element size and scrolling
> Beware the scrollbar. It takes width of content.
> Beware The padding-bottom area may be filled with text (if there is a lot of)
> Beware all offset/client/scroll properties is **read-only**, except scrollLeft/scrollTop

#### offsetParent
The `offsetParent` is the nearest ancestor that the browser uses for calculating coordinates during rendering. \ 
> Beware client/offset/scrolled properties value are number type, but mean pixels

That’s the nearest ancestor that is one of the following:
 * CSS-positioned (position is absolute, relative, fixed or sticky)
 * \<td>, \<th>, or \<table>
 * \<body>

 There are several occasions when offsetParent is null:
 * For not shown elements (display:none or not in the document).
 * For \<body> and \<html>.
 * For elements with position:fixed.

#### offsetLeft/offsetTop 
Provide x/y coordinates relative to offsetParent upper-left corner. **Margin from parent to up left border corner**.

```html
<main style="position: relative" id="main">
  <article>
    <div style="position: absolute; left: 180px; top: 180px"></div>
  </article>
</main>
<script>
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>
```

#### offsetWidth/offsetHeight
provide the “outer” width/height of the element. Or, in other words, its **full size including borders**.

>zero/null geometry properties values for elements are not displayed
If an element (or any of its ancestors) has *display:none* or is not in the document, then all geometry properties are
zero (or null for offsetParent).

For example, offsetParent is null, and offsetWidth, offsetHeight are 0 when we created an element, but haven’t inserted
it into the document yet, or it (or it’s an ancestor) has display:none.

```js
function isHidden(elem) {
  // if element in the DOM, and have 0 size - it is still visible.
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

#### clientTop/clientLeft
Borders size, top and left. Relative coordinates from **border to inner area**.
If *scrollbar* from the left - it's width *included* in the clientLeft.

#### clientWidth/clientHeight
provide the size of the area inside the element borders. *Scrollbar is not included* to clientWidth.
**it's padding + visible on the screen content width/height** \
If there are no paddings, then clientWidth/Height is exactly the content area, inside the borders and the scrollbar
(if any).

#### scrollWidth/scrollHeight
properties are **like clientWidth/clientHeight**, but they also **include the scrolled out** (area that is not showed
on the screen because of the monitor size) parts.

```js
// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
```

#### scrollLeft/scrollTop
**the width/height of the hidden, scrolled out** part of the element. `scrollTop` is “how much you've scrolled down
already”. In context of element, not page. If element content does not generate a vertical scrollbar, then it's
scrollTop value is 0.

`Don’t take width/height from CSS` \
We should use DOM offset/client width/height instead getComputedStyle(elem).width by reasons:
 * First, CSS width/height depend on another property: *box-sizing* that defines “what is” CSS width and height.
   A change in box-sizing for CSS purposes may break such JavaScript.
 * Second, CSS width/height may be *auto*, and for calculation we need px.
 * Scrollbar. clientWidth/clientHeight takes into account scrollbar, but width/height from style - behave differently.

### Window sizes and scrolling
#### Width/height of the window
We can get *window* height or width from `document.documentElement.clientHeight/clientWidth`
> Beware there also window.innerWidth/innerHeight - but unlike client... they include scrollbar. \
> DOCTYPE is important, top-level geometry properties may work a little bit differently when there’s no \<!DOCTYPE HTML>

#### Width/height of the document
Behavior of the different browsers are weird sometimes, so better to choose max value from below: 
```js
let documentHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
```

#### Get the current scroll
DOM elements have their current scroll state in elem.scrollLeft/scrollTop.
For there are read-only properties `window.pageXOffset/pageYOffset` - it is how many pixels have scrolled already.

#### Scrolling: scrollTo, scrollBy, scrollIntoView
>To scroll the page from JS, DOM must be built. Scroll the page from the script in \<head> - won’t work.

Regular elements can be scrolled by changing scrollTop/scrollLeft. \
Same we can do for the page *document.documentElement.scrollTop/Left* (is Safari, document.body.scrollTop/Left). \
But there is a uniform way: \
 * `window.scrollBy(x,y)` scrolls the page **relative** to its current position. scrollBy(0,10) scrolls the page 10px down.
 * `scrollTo(pageX,pageY)` scrolls the page to **absolute** coordinates, so that the top-left corner of the visible part
  has coordinates (pageX, pageY) relative to the document’s top-left corner. It’s like setting scrollLeft/scrollTop.
  To scroll to the very beginning - scrollTo(0,0);
 
#### scrollIntoView
`elem.scrollIntoView(top: boolean)` scrolls the page to make elem visible. \ 
 if top=true (default), page will be scrolled to make elem appear on the top of the window. \
 if top=false, then the page scrolls to make elem appear at the bottom.
 
##### Forbid the scrolling
Sometimes we need to make the document “unscrollable”. e.g when we cover page with the large message, we want the visitor
to interact with it. We can make such change for any element.
```js
document.body.style.overflow = "hidden";
```

### Coordinates
Most JavaScript methods deal with one of two coordinate systems:
 * **Relative to the window** – similar to position:fixed, calculated from the window top/left edge. we’ll call these
  coordinates as `clientX/clientY`.
 * **Relative to the document** – similar to position:absolute in the document root, calculated from the document
  top/left edge. we’ll denote them `pageX/pageY`.

#### Element coordinates: getBoundingClientRect
An object of built-in DOMRect class. Returns positive width/height. Main DOMRect properties:
* *x/y* – X/Y-coordinates of the rectangle origin relative to window,
* **width/height** – width/height of the rectangle (can be negative).
* **top (y)/bottom (y + height)** – Y-coordinate for the top/bottom rectangle edge (can be negative),
* **left (x)/right (x + width)** – X-coordinate for the left/right rectangle edge.

When you'll scroll down y and top and bottom will be less than before scroll down.

top/bottom/left/right needed when you want to play with direction of the element rectangle, when you want it to start
not from upper left corner, but e.g. from bottom right, then these values can be negative and won't be equal to x/y.

> Internet Explore: no support for x/y \
> Coordinates right/bottom are different from CSS position properties. In CSS right - distance from the right edge,
> bottom - distance from the bottom edge. In JS all window coordinates are counted from the top-left corner.

#### elementFromPoint(x, y)
returns the most nested element at window coordinates (x, y).
> element should be shown on the screen, means no out-of-the-client-window x/y coordinates, elementFromPoint returns 
> null for not shown elements

#### Using for “fixed” positioning
To show something near an element, we can use getBoundingClientRect to get its coordinates, and then CSS position 
together with left/top (or right/bottom).

#### Document coordinates
In CSS, window coordinates correspond to position:fixed, while document coordinates are similar to position:absolute 
on top.
```js
// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
```