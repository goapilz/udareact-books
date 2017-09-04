import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './util/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {bookStates} from './util/Constants'
import {log} from './util/Logger'
import './css/app.css'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        log('app initialized')
        // load all books
        const books = this.state.books
        if (books.length === 0) {
            BooksAPI.getAll().then(allBooks => {
                for (let book of allBooks) {
                    log(`loaded book: ${book.title} with state: ${book.shelf}`)
                    // little hack to fix errors when no state is set or does not match
                    if (!book.shelf) {
                        book.shelf = bookStates[0].id
                        log(`FIXING book: ${book.title} with state: ${book.shelf}`)
                        BooksAPI.update(book)
                    }
                }
                this.setState({books: allBooks})
            })
        }
    }

    onBookUpdate = (updatedBook) => {
        let books = this.state.books
        const exitingBook = books.find(book => book.id === updatedBook.id)
        if (!updatedBook.shelf && exitingBook) {
            // delete
            log(`delete book: ${updatedBook.title} with state: ${updatedBook.shelf}`)
            books = books.filter(book => book.id !== exitingBook.id)
        } else if (exitingBook) {
            // update
            log(`update book: ${updatedBook.title} with state: ${updatedBook.shelf}`)
            exitingBook.shelf = updatedBook.shelf
        } else {
            // add
            log(`add book: ${updatedBook.title} with state: ${updatedBook.shelf}`)
            books = books.concat([updatedBook])
        }
        log(`${books.length} books`)
        this.setState({books: books})
        BooksAPI.update(updatedBook)
    }

    render() {
        log('App.render()')
        const onBookUpdate = this.onBookUpdate
        const books = this.state.books
        return (
            <div className='app'>
                <div className='list-books-title'>
                    <h1>My Books</h1>
                </div>
                <Route exact path='/' render={()=> (
                    <ListBooks
                        onBookUpdate={onBookUpdate}
                        bookStates={bookStates}
                        books={books}
                    />
                )}/>
                <Route path='/search' render={() => (
                    <SearchBooks
                        onBookUpdate={onBookUpdate}
                        bookStates={bookStates}
                        books={books}
                    />
                )}/>
            </div>
        )
    }
}

export default App