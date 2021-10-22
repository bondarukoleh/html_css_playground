To make the project developing easier, developers came up with some patterns.

## MVC
Model View Controller. \
Splitting large app to sections with purposes. \
User via browser requests something in your app. \
**Router** in your App realize by URL what Controller should be involved to process the User Request. \
**Controller** where the User interact logic are, handling input from user, processing requests (GET, POST, etc.),
getting data from Model, processing data to View. Controller reaches Model. \
**Model** responsible for all Data (CRUD) logic and provides data, interact with DB, (in some frameworks update the View)
when Controller has the Data from Model, Controller interacts with the View. \
**View** responsible for Presentation Logic of obtained from Model data, View returns presentation (html, template engines)
to Controller, Controller returns the presentation to User. \
All those are JS modules that work for their purpose. \
Model should never interacts with View. \

Browser -> Router -> Controller -> Model (vis DB) -> Controller -> View (Templates) -> Controller -> Browser.    