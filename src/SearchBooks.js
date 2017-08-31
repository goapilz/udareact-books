import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends React.Component {

    state = {
        query: '',
        maxSearchResults: 0,
        searchResult: []
    }

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            maxSearchResults: 200,
            searchResult: []
        }
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

    render() {
        const {query, searchResult, maxSearchResults} = this.state;
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <div className='close-search'><Link className='close-search' to='/'>Close</Link></div>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
                               onKeyPress={(event) => event.key === 'Enter' ? this.performSearch() : ''}
                        />
                    </div>
                    <span>Now showing {searchResult.length} of {maxSearchResults}
                        total (searching for: {JSON.stringify(query)})</span>
                    <div className='close-search'>
                        <button onClick={this.clearQuery}>clear</button>
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'></ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks