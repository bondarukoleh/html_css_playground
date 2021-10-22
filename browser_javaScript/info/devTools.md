#### network
In network tab you can filter only media, fetch, or images, where you can filter by size ang download the heaviest one.
>TIP: To repeat XHR request, you don't need to refresh the page, you can run Replay XHR from context menu on request 
> from Network

>TIP: To get requests information you can export or import HAR file with all requests information

>TIP: Capture screenshots checkbox, to get all states and requests while page is loading, useful for debugging how
> page is loading

>TIP: In Img filter of request, you can select some image, and in context menu of this image you can select "copy image 
> as data URI". This will help you to add images in you HTML as row data.

#### javascript
If there is values on the page you cannot copy, that maybe fixed with disabling JS, you can o it via panel.
>TIP: To get variable value in buffer you can use chrome function `copy(var_name)`. Helps when you pull your values
> from HTML to your code.

>TIP: If you have array with complicated objects - you can print them with chrome `table` function. 

#### Elements 
>TIP: You can save HTML element as global variable, via context menu.

>TIP: You can debug the animation a bit with More tools -> animation.
 
>TIP: In elements area you can also use Ctrl+F, and search by selector, and partial match, etc.

>TIP: You can use pipette from Styles tab

#### Panel
Screenshot Capture full size screenshot of the page
Screenshot Capture node screenshot - separate element screenshot, after selection from devTools

###### Shortcuts
 - Ctrl+Shift+I / F12 open devTools
 - Ctrl+Shift+P - opens a commands panel, like terminal but for chrome

###### tricks
- If you would like to know the pass - delete type="password" from the html
- `$_` — special variable, it stores result of last operation in devtools
- `$0, $1, $0` — special variable, it stores result of last operation in devtools
- You can 
