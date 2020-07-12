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

