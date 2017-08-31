import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './util/BooksAPI'
import BookGrid from './BookGrid'

// constant for amount of books that will be returned by the searchAPI
const maxSearchResults = 200

class SearchBooks extends React.Component {
    static propTypes = {
        bookStates: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            lastQuery: '',
            searchResult: []
        }
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({query: '', lastQuery: '', searchResult: []})
        this.focusSearchQuery()
    }

    onSearch = () => {
        const query = this.state.query
        const books = this.props.books
        console.log(`searching for ${query}`)

        // trigger new search
        BooksAPI.search(query, maxSearchResults).then(searchResult => {
            if (searchResult.length) {
                console.log(`found ${searchResult.length} books for ${query}`)
                /* for (let book of searchResult) {
                    console.log(` - id: ${book.id} title: ${book.title}`)
                }*/

                // 'merge' state of found books with books from the library
                for (let searchBook of searchResult) {
                    const exitingBook = books.find(book => book.id === searchBook.id)
                    if (exitingBook) {
                        searchBook.shelf = exitingBook.shelf
                    }
                }

                this.setState({lastQuery: query, searchResult: searchResult})
            } else {
                console.log(`no books found for ${query}`)
                this.setState({lastQuery: query, searchResult: []})
            }
            this.selectSearchQuery()
        })
    }

    componentDidMount() {
        this.focusSearchQuery()
    }

    focusSearchQuery()  {
        this.searchInput.focus()
    }

    selectSearchQuery() {
        this.searchInput.select()
    }

    render() {
        const {bookStates, onBookUpdate} = this.props
        const {query, lastQuery, searchResult} = this.state
        return (
            <div>
                <div className='search-books-bar'>
                    <div className='close-search'><Link className='close-search' to='/'>Close</Link></div>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'
                               ref={(input) => {
                                   this.searchInput = input
                               }}
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
                               onKeyPress={(event) => event.key === 'Enter' && this.onSearch()}
                        />
                    </div>
                    <div className='clear-search'><button className='clear-search' onClick={this.clearQuery}/></div>
                </div>
                <BookGrid gridClassName='search-books-results' gridDisplayName={`Searchresult for ${lastQuery}`} bookStates={bookStates} books={searchResult} onBookUpdate={onBookUpdate}/>
            </div>
        )
    }
}

export default SearchBooks