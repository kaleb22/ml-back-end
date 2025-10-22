# MlBackEnd

This project is a simple API built with express. I'm also using nodemon to watch for the changes in the files and hot reload the app.

The API is composed by two routes:

- /api/items?q=query - This route is responsible for receiving a query param which is the term that the user is searching for.
- /api/items/:id - This route is responsible for receiving an ID and returning the information about a specific item

Both routes consumes an 'items.json' file which contains the mock of the objects that can be returned to the front-end. The objects have a property called "tags" which is an array of possible terms related to the object. I'm using this approach to simulate items being searched in a DB.

The second route also consumes a 'descriptions.json' file which contains the specific descriptions of the objects. Every object has an ID and I'm using this information here to get to match the item with its description.

I'm chose this approach to simulate two queries to different endpoints as the instructions required.