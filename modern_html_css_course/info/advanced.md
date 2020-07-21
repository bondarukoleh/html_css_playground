`Responsive`
When your site properly shown on different screens. \
Practices:
 - Set viewport/scale;
 - Use fluid width, not fixed;
 - Media queries - Different screen sizes;
 - Rem units over px;
 - Mobile first method.

In chrome tools we can test mobile viewport. We can see the e.g. iPhone 6/7/8 - is 414 width and 736 height pixels.

`Media`
Specify how a document is to be presented on different media: on the screen, on paper, with a speech synthesizer, with a braille device, etc.
Depend on what device page is shown - needed media type rule works.

```css
/* Import some other css table to current*/
@import "mystyle.css";
@import url("mystyle.css");

/* The following rules illustrate how @import rules can be made media-dependent: */
@import url("fineprint.css") print, screen;
```

You can add some logic in css. With media types.
```css
@media(min-width: 501px) and (max-width: 768px) {
      body {
        background: rosybrown;
      }
}

/* or */
@media print {
  /* style sheet for print goes here */
}
```
Or it can be used in html document.
```html
<HTML>
   <HEAD>
      <TITLE>Link to a target medium</TITLE>
      <style>/*Some default style*/</style>
      <link rel="stylesheet" media="screen and (max-width: 500px)" href="../css/mobile_devices.css">
   </HEAD>
   <BODY>
      <P>The body...
   </BODY>
</HTML>
```
This cool feature gives us such thing as import different style sheets depend on what screen we are showing content.
We'll keep special styles for mobile, tablet, widescreen screen sizes and depend on what we are working with - we will
import needed style sheet. And of course there will be same style in shared sheets, that all media type dependent sheets\
will inherit from. REMEMBER to put those links last in the header, otherwise them will be re-written with some styles from header. \

@media can be used with screen print speech. Default is all, but sometimes you want to set something only for certain \
type. Print - documents in preview/print mode, screen - regular PC screen.
```css
@media only screen and (max-width: 100px){}
```

##### Flexbox
Introduced in CSS3, modern way to build layout. \
When we say display: flex - container becomes "flex", means it has main, cross size, axis, start, end. You can check 
the scheme. It makes all direct child elements - flex items.

```css
.someContainer {
   display: flex;
   justify-content: flex-start;
   align-items: baseline;
   flex-direction: column;
   flex-wrap: wrap;
   align-content: space-around;
}

.someContainer .element {
   order: -1;
   align-self: flex-end;
}

.otherContainer {
   flex-flow: column-reverse wrap;
}

```
`justify-content` - aligns items horizontally (main axis) and accepts the following values: \
flex-start: align to the left side of the container \
flex-end: align to the right side \
center: align at the center \
space-between: display with equal spacing between them. \
space-around: display with equal spacing around them. \
```css
.container {
     justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```

`align-items` - aligns items vertically (cross axis) and accepts the following values: \
flex-start: align to the top of the container. \
flex-end: align to the bottom of the container. \
center: align at the vertical center of the container. \
baseline: display at the baseline of the container. \
stretch: are stretched to fit the container. \
In order its to work container needs height.


`flex-direction` - defines the direction items are placed in the container, and accepts the following values: \
row: placed the same as the text direction. \
row-reverse: placed opposite to the text direction. \
column: placed top to bottom. \
column-reverse: placed bottom to top. \

!Notice that when you set the direction to a reversed row or column, flex-start and end are also reversed. \
!Notice that when the flex direction is a column, justify-content changes to the vertical and align-items to the
horizontal. \

`order`
Sometimes reversing the row or column order of a container is not enough. \
We can apply the order property to individual items. By default, items have a value of 0, but we can use this property 
to also set it to a positive or negative integer value (-2, -1, 0, 1, 2). \
Items are assigned an integer that represents their group. The items are then placed in the visual order according to
that integer, lowest values first. \

`align-self` - same as align-items but for one element. \ 

`flex-wrap` which accepts the following values: \
nowrap: Every item is fit to a single line in flex container, items can overflow. \
wrap: Items wrap around to additional lines. Lined in set order (flex-direction). \
wrap-reverse: Items wrap around to additional lines in reverse, lined in revers set order. \

`flex-flow` - flex-direction and flex-wrap together. accepts values from both properties. \

`align-content` to set how multiple lines (after flex-wrap) are spaced apart from each other. (cross axis extra spaces) \
This property takes the following values: \
flex-start: Lines are packed at the top of the container. \
flex-end: Lines are packed at the bottom of the container. \
center: Lines are packed at the vertical center of the container. \
space-between: Lines display with equal spacing between them. \
space-around: Lines display with equal spacing around them. \
stretch: Lines are stretched to fit the container. \
Align-content determines the spacing between lines, while align-items determines how the items as a whole are aligned
within the container. When there is only one line, align-content has no effect.

`flex-grow` - ability for a flex item to grow if necessary.
default is 0. Negative numbers are invalid.
`flex-shrink`- ability for a flex item to shrink if necessary.
default is 1. Negative numbers are invalid.
`flex-basis` - defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means “look at my width or height property”. The ```content``` keyword means “size it based on the item’s content”.
default is auto.

`flex` property is a sub-property of the Flexible Box Layout module.
This is the shorthand for `flex-grow, flex-shrink and flex-basis`. The second and third parameters (flex-shrink and flex-basis) are optional.
default is - 0 1 auto;

```css
.container {
   display: flex;
}

.container .item {
  /* this */
  flex: 1 100px;

  /* is the same as */
  flex-grow: 1;
  flex-basis: 100px;

  /* and it leaves the flex-shrink property alone, which would be */
  flex-shrink: inherit; /* defaults to 1 */

  /* It could be
  flex: <'flex-grow'> <'flex-shrink'> <'flex-basis'> | none | inherit
  */
}
```

Map \
```html
<script src="https://maps.googleapis.com/maps/api/js?key=MY_KEY&callback=initMap&libraries=&v=weekly" defer></script>
<script src="../javascript/script.js"></script>
```
In ```script.js``` there is a function initMap. And exactly this function is set as callback in Google
API ```&callback=initMap```

`:root` \
The :root selector allows you to target the highest-level “parent” element in the DOM, or document tree. “structural
pseudo-class”, meaning it is used to style content based on its relationship with parent and sibling content.


`Css variables` \
```css
:root {
      --primary-color: steelblue;
      --secondary-color: steelblue;
      --light-color: lightblue;
      --dark-color: darkslateblue;
    }

.some-element {
   color: var(--primary-color);
}
```
Super convenient for colors, basic sizing of elements and rest general stuff. Variables have inheritance, They must be declared in parent children to see them.
```css
.box {
   --box-max-width: 100px;
}

.box .box-1 { /* in html box-1 has also box class, or box-1 parent has box class. He can use variable. */
   max-width: var(--box-max-width);
}

.table { /* table doesn't have box as a parent, so it doesn't know about var */
   max-width: var(--box-max-width); /* Doing nothing, since it doesn't know */
}
```

`animation`
Describe how you want to animate, what properties to animate described in @keyframes;
Mostly done for something that bigger that transition.
```css
@keyframes my-animation {
   0% {color: red, width: 5rem}
   100% {color: blue, width: 15rem}
}

.some:hover {
   animation-name: my-animation; /* name */
   animation-duration: 5s; /* how long */
   animation-timing-function: linear; /* dynamic */
   animation-delay: 1s;
   animation-iteration-count: infinity; /* how many times */
   animation-direction: alternative; /* will it be backwards? (reverse, alternative, alternative-reverse)*/
   animation-fill-mode: none; /* what state of the element should be by the animation before and after it is executing. (forwards, backwards, both)*/
   animation-play-state: running;/*Lets you pause and resume the animation sequence. Also can be "paused"*/

   /* Or together */
   animation: my-animation 5s linear 1s infinity alternative none running;


   /* Working variant */
   /* animation-name: animate-keyframe-1; */
      /* animation-duration: 4s; */
      /* animation-timing-function: ease-in-out;*/
      /* animation-delay: 1s;*/
      /* animation-iteration-count: infinite;*/
      /* animation-direction: alternate-reverse; */
      /* animation-fill-mode: backwards;*/
      /* animation: animate-keyframe-1 4s ease-in-out 1s infinite alternate-reverse backwards 1s; */
      animation: animate-keyframe-1 4s ease-in-out 1s infinite alternate-reverse backwards;
}
```

`@keyframes` \
The @keyframes rule specifies the animation code.
!important rule is ignored here.
```css
/* With percentage of animation progress */
@keyframes my-animation {
  0%   {top: 0px; left: 0px; background: red;}
  25%  {top: 0px; left: 100px; background: blue;}
  50%  {top: 100px; left: 100px; background: yellow;}
  75%  {top: 100px; left: 0px; background: green;}
  100% {top: 0px; left: 0px; background: red;}
}

/* with from to */
@keyframes my-other-animation {
  from {top: 0px; left: 0px; background: red;}
  /* optional you can add state */
  50%  {top: 100px; left: 100px; background: yellow;}
  to {top: 10px; left: 100px; background: blue;}
}

div {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: my-animation 5s infinite;
}
```

`transition`
More simple than animation, like hover events, some instant action.
```css
.someElement {
   transition-property: color; /* What will be changing */
   transition-duration: 2s; /* how fast it will change */
   transition-timing-function: linear; /* how dynamically it will change. ease, linear, ease-in, ease-out, easy-in-out */
   transition-delay: 0.5s; /* delay before start of animation */

   /* or all in one */
   transition: color 2s linear 0.5s;
   /* You can say all properties */
   transition: all 2s linear 0.5s;
   /* or several */
   transition: color 2s linear 0.5s, width 5s;
}

.someElement:hover {
   color: red;
   width: 100px;
}
```

```css
  #smoothWidth {
    width: 300px;
    height: 50px;
    border: 2px solid;
    transition: color 1s, width 4s, background-color 2s;
  }
  #smoothWidth:hover {
    width: 400px;
    color: chartreuse;
    background-color: cadetblue;
  }
```

`transform` \
Moving, rotating elements.
```css
   #elem1 {
      transition: 500ms linear;
   }
  #elem1:hover {
      transform: translate(50px, 10px); /*x, y*/
  }
  /* transform has translate(), rotate(), scale(), skew() matrix() */
```
matrix syntax - matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
There more features to animate the elements.
```css
.some:hover {
   transform: perspective(200px) translateZ(50px);
}
/* also there are: translateX, translateY, translateZ, rotateX, rotateY, rotateZ */
```
