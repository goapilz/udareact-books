import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            maxSearchResults: 200,
            searchResult: []
        }
    }

    componentDidMount() {
        this.searchInput.focus()
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({query: '', searchResult: []})
    }

    performSearch = () => {
        const {query, maxSearchResults} = this.state
        console.log(`searching for ${query}`)

        // trigger new search
        BooksAPI.search(query, maxSearchResults).then(searchResult => {
            if (searchResult.length) {
                console.log(`found ${searchResult.length} results for ${query}`)
                searchResult.sort(sortBy('title'))
                for (let book of searchResult) {
                    console.log(` - id: ${book.id} title: ${book.title}`)
                }
                this.setState({searchResult: searchResult})
            } else {
                console.log(`no resuts for ${query}.`)
                this.setState({searchResult: []})
            }
        })
    }

    changeBookState = (book, state) => {
        console.log(`change state of ${book.title} to ${state}`)
    }

    getBookState = (book) => {
        return 'none';
    }


    render() {
        const {query, searchResult, maxSearchResults} = this.state;
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <div className='close-search'><Link className='close-search' to='/'>Close</Link></div>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'
                               ref={(input) => {
                                   this.searchInput = input
                               }}
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
                               onKeyPress={(event) => event.key === 'Enter' && this.performSearch()}
                        />
                    </div>
                    <span>Now showing {searchResult.length} of {maxSearchResults}
                        total (searching for: {JSON.stringify(query)})</span>
                    <div className='close-search'>
                        <button onClick={this.clearQuery}>clear</button>
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {searchResult.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <a target='_blank' href={book.previewLink} rel="noopener noreferrer">
                                            <div className="book-cover" style={{
                                                width: 128,
                                                height: 174,
                                                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                            }}></div>
                                        </a>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => this.changeBookState(book, event.target.value)}
                                                    value={this.getBookState(book)}>
                                                <option value="none" disabled>Add to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                        {book.authors.map((author) => (
                                            <div className='book-authors' key={author}>{author}</div>
                                        ))}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks