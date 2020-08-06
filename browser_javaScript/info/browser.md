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
main “entry point” to the page. We can change or create anything on the page using it. [DOM spec.](https://dom.spec.whatwg.org/)
DOM also can be user in server-side page processing. \

`BOM (Browser Object Model)` - represents additional objects provided by the browser (host environment) for `working with
everything except the document`. e.g. navigator object provides information about the browser and the operating system.
```navigator.userAgent``` – about the current browser, and ```navigator.platform``` – about the platform.
The location object allows us to read the current URL and can redirect the browser to a new one.

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
text nodes at all. In chrome dev tools, when you select some node in html - it available in the console with $0, 
previous selected node - $1 and so on.

##### Walking the DOM
< html> = document.documentElement
< body> = document.body
< head> = document.head

Properties `firstChild` and `lastChild` give fast access to the first and last children.
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```
The `childNodes` (direct children) collection lists all child nodes, including text nodes.
`Decedents` - not just child nodes, but all nodes that under some element. Children of children and so on.
`Siblings` are nodes that are children of the same parent.
The next sibling is in `nextSibling` property, and the previous one – in `previousSibling`.
The parent is available as `parentNode`.


##### DOM Collections
DOM collection is not an array, it's array like object.
```js
// you ca easily make an array from the elements
Array.prototype.slice.call(document.querySelectorAll('div')).map; // old style
// new style
Array.from(document.querySelectorAll('div')).map
[...document.querySelectorAll('div')].map
```

DOM `collections are read-only`
We can’t replace a child by something else by assigning childNodes[i] = .... \
DOM `collections are live`
If we keep a reference to elem.childNodes, and add/remove nodes into DOM, then they appear in the collection automatically.

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
