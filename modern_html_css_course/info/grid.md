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

grid-template-columns / grid-template-rows:
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
