import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

    state = {
        query: '',
        searchResult: []
    }

    constructor(props) {
        super(props)
        this.state = {
            searchResult: [],
            query: ''
        }

        BooksAPI.search("java", 50).then(searchResult => {
            for (let book in searchResult) {
                console.log(book)
            }
            this.setState({searchResult: searchResult})
        })
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <div className='close-search'><Link className='close-search' to='/'>Close</Link></div>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'/>
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