##### Css Grid
CSS Grid Layout is the most powerful layout system available in CSS.
It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is a 1-dimensional
system.

###### Terminology
Grid Container - parent element;
Grid Item - The children (i.e. direct descendants) of the grid container;
Grid Line - The dividing lines that make the structure of the grid. Can be either vertical (“column grid lines”) or
horizontal (“row grid lines”);
Grid Cell - The space between two adjacent row and two adjacent column grid lines. It’s a single “unit” of the grid;
Grid Track - The space between two adjacent grid lines. You can think of them like the columns or rows of the grid; 
Grid Area - The total space surrounded by four grid lines. A grid area may be composed of any number of grid cells;

###### Properties for the Parent (Grid Container)
display: \
 - grid – generates a block-level grid \
 - inline-grid – generates an inline-level grid \

`grid-template-columns` `grid-template-rows`: \
You can set how many columns and how many rows you want to create.
```css
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
/* named by line */
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
/* With repeat */
.container {
  grid-template-columns: repeat(3, 20px [col-start]);
}
```
repeat(auto-fill, minmax(100px, 1fr)). \
auto-fill - add maximum available cells in grid-track depend on grid-container size. auto-fit - same as auto-fill but erase all non-occupied cells. 
`grid-template`: \
```css
.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```
`justify-items`: \
Horizontally alignment;
```css
.container {
  justify-items: start | end | center | stretch;
}
```
`align-items`: \
Vertical alignment;
```css
.container {
  justify-items: start | end | center | stretch;
}
```
`place-items`: \
```css
.container {
  place-items: align-items justify-items;
}
```

`justify-content`: \
Moving horizontally content (rows and columns, all th e sh*t) inside grid. If grid is bigger than content.
```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;    
}
```

`align-content`: \
Same as justify-content nut vertically.

`place-content`: \
Combination of align-content and justify-content.

`grid-auto-columns grid-auto-rows`: \
Specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get created when there
are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid.
When you have items in a grid more that you've set places for - you can auto generate places for those items.
Explicit grids (rows/columns) - those that you've set the place for explicitly, with your hands in .css files.
Implicit grids (rows/columns) - you haven't set place for them explicitly in the grid, but they appeared there. 
```css
.container {
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}
```
`grid-auto-flow`
If you have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to
automatically place the items.
```css
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
```

`grid`: \
Mega-uber-combination fo all grid sh*t.
```css
.container {
  grid: grid-template-rows | grid-template-columns | grid-template-areas | grid-auto-rows | rid-auto-columns | grid-auto-flow
}
```

###### Properties for the Children (Grid Items)
`grid-column-start grid-column-end grid-row-start grid-row-end`: \
Start and end of the item in the grid.

`grid-column grid-row`: \
Combination of previous.
```css
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}

.item {
    /* Element will occupy 1, 2, 3 cell. 4 - is before what it will stop  */
    grid-column: 1 / 4;
    /* Element will occupy NEXT 3 cells. It's about amount, not number in grid*/
    grid-column: 1 / span 3;
}
```


`justify-self`: \
Aligns a grid item inside a cell along the inline (row) axis (as opposed to align-self which aligns along the block (column) axis).
```css
.item {
  justify-self: start | end | center | stretch;
}
```
`align-self`: \
Aligns a grid item inside a cell along the block (column) axis.

`place-self`
Combination of previous two.
```css
.container {
  place-self: align-self justify-self;
}
```
