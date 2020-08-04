#### Rendering:
The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript
into pixels on the screen. The critical rendering path includes the Document Object Model (DOM), CSS Object Model
(CSSOM), render tree and layout. \

The document object model is created as the HTML is parsed. The HTML may request JavaScript, which may, in turn, 
alter the DOM. \
The HTML includes or makes requests for styles, which in turn builds the CSS object model. \
The browser engine combines the two to create the Render Tree. \
Layout determines the size and location of everything on the page. Once layout is determined, pixels are painted to
the screen. \

A request for a web page, server returns the HTML - response headers and data. The browser then begins parsing the HTML,
converting the received bytes to the DOM tree. The browser initiates requests every time it finds links to external
resources, be they stylesheets, scripts, or embedded image references. Some requests are blocking, which means the
parsing of the rest of the HTML is halted. Browser building the DOM, until it gets to the end, at which point it 
constructs the CSS object model. With the DOM and CSSOM complete, the browser builds the render tree, computing
the styles for all the visible content. After the render tree is complete, layout occurs, defining the location and
size of all the render tree elements. Once complete, the page is rendered, or 'painted' on the screen.
1. Build DOM;
2. Build CSSOM;
3. Build Render tree (DOM + CSSOM = Render tree);
4. Build Layout (Size, place of the elements);
5. Paint Layout;

DOM: \
DOM - startTag token, endTag token is a node, node in node hierarchy. Each link, img, script - has separate request to
server to get it. \

CSSOM: \
CSSOM contains all the styles of the page; information on how to style that DOM. While the DOM construction is
incremental, CSSOM is not. `CSS is render blocking`, because rules can be overwritten browser `blocks page rendering
until it receives and processes all of the CSS`, since he doesn't know if there will be some overrides in rules. He 
needs to get all of them to understand the end style of the element he need to render.
The CSS object model gets built as the CSS is parsed, but can't be used in build render tree, because next rule set
can hide some elements - and render tree will be extra changed. \

RENDER: \
To construct the `render tree`, the browser checks every node (misses the link, script, meta, tags), starting from root
of the DOM tree, and determine which CSS rules are attached. The `render tree only captures visible content`. The head
section (generally) doesn't contain any visible information, and is therefore not included in the render tree. Render 
tree consist of visible elements with their style, it's like visualized version of the DOM. In Gecko element of render 
tree called "frame", in webkit - renderer ot render object.

LAYOUT: \
Once the render tree is built, layout becomes possible. `Layout is dependent on the size of screen`. The layout step
determines where and how the elements are positioned on the page, determining the width and height of each element,
and where they are in relation to each other. Width depends on the set value or on the parent width, in the end it 
depends on body width, which depends on a viewport. 
The viewport meta tag defines the width of the layout viewport, impacting the layout. It is value in tag, or default
960px or with tag - it can be width of your device (which changes if you rotate the screen). \
For each element browser calculates the size and place on the page, Browsers use `flow` method to do that, means for most
cases there enough only one flow to layout all elements.
```html
<meta name="viewport" content="width=device-width">
```
Layout performance is impacted by the DOM -- the greater the number of nodes, the longer layout takes. To reduce the
frequency and duration of layout events, batch updates and avoid animating box model properties.

Once the render tree is created and layout occurs, the `pixels can be painted to the screen`. After that, only changed
parts of the layout will be repainted.

Optimizing for CRP:
1) minimizing the number of resources download, make them defer and async or grouped
2) optimizing the number of required requests, also file size of each request
3) optimizing the order in which required resources are loaded first to downloading critical assets, this will short
the critical path length.

##### Changes:
`Repaint` - if we change element style that not affects elements' size or position in page layout (background-color, 
border-color, visibility, etc.) - browser will only repaint such an element. \
`Reflow` - if changes affects content, document structure, element position - it is reflow. Element positioned absolute
or fixed- will affect only them and their children - so reflow will be ony for them, and static positioned will fire reflow
for all elements after it. 
- DOM changes (add, remove, change position of the element);
- Change content;
- Compute or change the css property;
- Add, remove CSS tables;
- Manipulation with "class" attribute;
- Manipulation with browser window (viewport will change, scroll);
- Pseudo-class activation (:hover, etc.);

