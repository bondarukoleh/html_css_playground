Rendering:
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
3. Build Render tree;
4. Build Layout;
5. Paint Layout;

