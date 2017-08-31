import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'
import sortBy from 'sort-by'


class SearchBooks extends React.Component {
    static propTypes = {
        bookStates: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({query: '', searchResult: []})
    }

    onSearch = () => {
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

    render() {
        const {bookStates, onBookUpdate} = this.props
        const {query, searchResult} = this.state
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
                               onKeyPress={(event) => event.key === 'Enter' && this.onSearch()}
                        />
                    </div>
                    <div className='clear-search'><a className='clear-search' onClick={this.clearQuery}/></div>
                </div>
                <BookGrid gridClassName='search-books-results' gridDisplayName='Searchresult' bookStates={bookStates} books={searchResult} onBookUpdate={onBookUpdate}/>
            </div>
        )
    }
}

export default SearchBooks