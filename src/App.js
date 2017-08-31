import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

// constant for all different bookshelf types
const bookStates = [
    {id: 'currentlyReading', name: 'Currently Reading'},
    {id: 'wantToRead', name: 'Want to Read'},
    {id: 'read', name: 'Read'}
]

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        console.log('app componentDidMount')
        // load all books
        const books = this.state.books
        if (books.length === 0) {
            console.log('app componentDidMount 0')
            BooksAPI.getAll().then(allBooks => {
                for (let book of allBooks) {
                    console.log(`loaded book: ${book.title} with state: ${book.state}`)
                    // TODO fix errors -> later delete entries from server
                    if (!book.state) {
                        book.state  = bookStates[0].id
                        console.log(`FIXING book: ${book.title} with state: ${book.state}`)
                        BooksAPI.update(book)
                    }
                }
                this.setState({books: allBooks})
            })
        }
    }

    onBookUpdate = (book) => {
        let books = this.state.books
        const exitingBook = books.find(currentBook => currentBook.id === book.id)
        if  (!book.state && exitingBook) {
            // delete
            console.log(`delete book: ${book.title} with state: ${book.state}`)
            books.remove(exitingBook)
        } else if (exitingBook) {
            // update
            console.log(`update book: ${book.title} with state: ${book.state}`)
            exitingBook.state = book.state
        } else {
            // add
            console.log(`add book: ${book.title} with state: ${book.state}`)
            books = books.concat([book])
        }
        console.log(`${books.length} books`)
        this.setState({books: books})
    }

    render() {
        const onBookUpdate = this.onBookUpdate
        const books = this.state.books
        return (
            <div className='app'>
                <div className='list-books-title'>
                    <h1>My Books</h1>
                </div>
                <Route exact path='/' render={() => (
                    <ListBooks
                        onBookUpdate={onBookUpdate}
                        bookStates={bookStates}
                        books={books}
                    />
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBooks
                        onBookUpdate={onBookUpdate}
                        bookStates={bookStates}
                    />
                )}/>
            </div>
        )
    }
}

export default App