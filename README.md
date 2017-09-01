Description
===========

This is the 'Read Books' application for the udacity react course.
With this webapp you can search for books and add them to virtual bookshelf's named 'Currently Reading', 'Want to Read' and 'Read'.



Install notes
=============

1. update dependenies with 'npm install'
2. run the development server with 'npm start'



Structure of project
====================

-[root]
  -[public]          index.html and favicon to launch the react app
  -[css]             stylesheets of the project
  -[icons]           icons of the project
  -[util]
    -BooksAPI.js     the api of the project to communicate with the backend server
    -Constants.js    extracted constants like bookshelf names or maximum search amount
  -[src]
    -index.js        start code for the react app
    -App.js          main 'class' of the app where switching between List and Search and the persistence is implemented
    -SearchBooks.js  search component of the app (handling of searchquery and triggering the searchApi)
    -ListBooks.js    list component of the app. here the books are assigned to the virtual bookshelf's
    -Book.js         book component that visualizes a single book and allows to change the state (bookshelf assignment) of a book
    -BookGrid.js     bookgrid component that visualizes a collection of books

  -[snippets]        some 'private' code/docu
