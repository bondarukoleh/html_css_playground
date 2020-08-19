### Mutation observer
`MutationObserver` is a built-in object that `observes a DOM element` and `fires a callback in case of changes`.
It gives you ability to observe the DOM, and make some actions when some element is appeared.

#### Syntax
```js
let observer = new MutationObserver(callback);
observer.observe(node, config);
```
`config` is an object `with boolean options` “what kind of changes to react on”:
* *childList* – changes in the direct children of node;
* *subtree* – in all descendants of node;
* *attributes* – attributes of node;
* *attributeFilter* – an array of attribute names, to observe only selected ones;
* *characterData* – whether to observe node.data (text content);
* *attributeOldValue* – if true, pass both the *old* and the *new* attribute value to callback, otherwise only the
 new one (needs attributes option);
* *characterDataOldValue* – if true, pass both the *old* and the *new* value of node.data to callback, otherwise only
 the new one (needs characterData option).
 
 After changes, the *callback* is executed: changes passed in first argument as a list of **MutationRecord** objects,
 and the **observer** itself as the second argument.
 
 MutationRecord objects have properties:
* type – mutation type, one of
    * "attributes": attribute modified
    * "characterData": data modified, used for text nodes,
    * "childList": child elements added/removed,
* target – node where the change occurred: an *element* for "attributes", or *text node* for "characterData",
 or an *element* for a "childList" mutation,
* addedNodes/removedNodes – nodes that were added/removed,
* previousSibling/nextSibling – the previous and next sibling to added/removed nodes,
* attributeName/attributeNamespace – the name/namespace (for XML) of the changed attribute,
* oldValue – the previous value, *only for attribute or text changes*, if the corresponding option is set
 attributeOldValue/characterDataOldValue.
 
#### Usage
**Integration** \
e.g. you are using the third-party script that adds div with ads? add a mutation observer to this element, and when it's
appeared - just delete it.

**Architecture** \
Dynamically understands that some node where added and modify them.
```js
let observer = new MutationObserver(mutations => {
  for(let mutation of mutations) {
    // examine new nodes, is there anything to highlight?
    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;
      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        highlightElement(node);
      }
      // or maybe there's a code snippet somewhere in its subtree?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        highlightElement(elem);
      }
    }
  }
});
let demoElem = document.getElementById('highlight-demo');
observer.observe(demoElem, {childList: true, subtree: true});
```

#### Additional methods
* observer.disconnect() – stops the observation, after stop - it might be possible that some changes were not processed
by the observer yet.
* observer.takeRecords() – gets a list of unprocessed by callback mutation records.

> Garbage collection doesn't care about an observer, if node where deleted - GC - will clean the memory, no matter that
> observer watching it.

---
### Selection and Range
 