import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './util/BooksAPI'
import BookGrid from './BookGrid'
import {maxSearchResults} from './util/Constants'
import {log} from './util/Logger'

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

    clearQuery = () => {
        this.setState({query: '', lastQuery: '', searchResult: []})
        this.focusSearchQuery()
    }

    // searchTimestamp for searchApi calls so only the last executed query wins
    searchTimestamp = 0;

    onSearch = (query) => {
        const newTimestamp = Date.now();
        this.searchTimestamp = newTimestamp;

        const newQuery = query.trim();

        if (newQuery.length > 0) {
            // update query
            this.setState({query: newQuery})

            // trigger new search (async)
            BooksAPI.search(newQuery, maxSearchResults).then(searchResult => {
                if (searchResult.length) {
                    // 'merge' state of found books with books from the library
                    const books = this.props.books
                    for (let searchBook of searchResult) {
                        const exitingBook = books.find(book => book.id === searchBook.id)
                        if (exitingBook) {
                            searchBook.shelf = exitingBook.shelf
                        }
                    }

                    if (this.searchTimestamp === newTimestamp) {
                        this.setState({lastQuery: newQuery, searchResult: searchResult})
                        log(`found ${searchResult.length} books for ${newQuery}`)
                    }
                } else {
                    if (this.searchTimestamp === newTimestamp) {
                        this.setState({lastQuery: newQuery, searchResult: []})
                        log(`no books found for ${newQuery}`)
                    }
                }
            })
        } else {
            this.setState({query: newQuery, lastQuery: newQuery, searchResult: []})
            log(`empty query`)
        }
    }

    componentDidMount() {
        this.focusSearchQuery()
    }

    focusSearchQuery() {
        this.searchInput.focus()
    }

    render() {
        const {bookStates, onBookUpdate} = this.props
        const {query, lastQuery, searchResult} = this.state
        return (
            <div>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'
                               ref={(input) => {this.searchInput = input}}
                               value={query}
                               onChange={(event) => this.onSearch(event.target.value)}/>
                    </div>
                    <button className='clear-search' onClick={this.clearQuery}/>
                </div>
                <BookGrid gridClassName='search-books-results' gridDisplayName={`Searchresult for ${lastQuery}`}
                          bookStates={bookStates} books={searchResult} onBookUpdate={onBookUpdate}/>
            </div>
        )
    }
}

export default SearchBooks