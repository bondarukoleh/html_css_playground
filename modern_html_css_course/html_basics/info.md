#### Basic information

Cascading style sheet.
A static site - informative site, without too much logic, without ability to create account.

`X-UA-Compatible` - browser compatibility, describe in what ie browser you want to run.
`viewport` - important for responsive design, means it will scaled by device width. If you lurk with phone, and you 
don't see the hole content of the site on your screen - this page probably without this meta tag.
`title` - important for search engines. You can put main info about your page here, same as `description`. `keywords` - 
not so important for search engines but still worth to add.
`robots` - we can say engines to not show our page, hide it from google, or maybe to not follow any links on the page.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Web development company does some pretty heavy sh*** you'll like it">
  <meta name="keywords" content="Web development, web design">
  <!-- <meta name="robots" content="NOINDEX, NOFOLLOWS"> -->
  <title>MyCompany Name | Web development | High quality and price</title>
</head>
<body>
  <h1>This is my hello world</h1>
</body>

</html>
```