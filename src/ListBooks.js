import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'

class ListBooks extends React.Component {

    static propTypes = {
        bookStates: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const {bookStates, books, onBookUpdate} = this.props
        return (
            <div className="list-books-content">
                {bookStates.map((bookState) => (
                    <BookGrid gridClassName='bookshelf' gridDisplayName={bookState.name} key={bookState.id} bookStates={bookStates} books={books.filter(book => book.state === bookState.id)} onBookUpdate={onBookUpdate}/>
                ))}
                <div className='open-search'>
                    <Link to='/search' className='open-search'/>
                </div>
            </div>
        )
    }
}

export default ListBooks