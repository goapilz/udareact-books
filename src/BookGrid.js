import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'

class BookGrid extends React.Component {

    static propTypes = {
        gridClassName: PropTypes.string.isRequired,
        gridDisplayName: PropTypes.string.isRequired,
        bookStates: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render() {
        const {gridClassName, gridDisplayName, bookStates, books, onBookUpdate} = this.props
        const sortedBooks = books;
        sortedBooks.sort(sortBy('title'))
        return (
            <div className={gridClassName}>
                {sortedBooks.length > 0 && (<h3 className='bookshelf-title'>{gridDisplayName} ({sortedBooks.length} books)</h3>)}
                <ol className='books-grid'>
                    {sortedBooks.map((book) => (
                        <Book key={book.id} book={book} bookStates={bookStates} onBookUpdate={onBookUpdate}/>
                    ))}
                </ol>
            </div>
        )
    }
}

export default BookGrid