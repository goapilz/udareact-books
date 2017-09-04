import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'
import {log} from "./util/Logger";

class ListBooks extends React.Component {

    static propTypes = {
        bookStates: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        log('ListBooks.render()')
        const {bookStates, books, onBookUpdate} = this.props
        return (
            <div className="list-books-content">
                {bookStates.map((bookState) => (
                    <BookGrid gridClassName='bookshelf' gridDisplayName={bookState.name} key={bookState.id}
                              bookStates={bookStates} books={books.filter(book => book.shelf === bookState.id)}
                              onBookUpdate={onBookUpdate}/>
                ))}
                <Link to='/search' className='open-search'/>
            </div>
        )
    }
}

export default ListBooks