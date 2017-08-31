import React from 'react'
import PropTypes from 'prop-types'
import {nullBookState} from './util/Constants'

class Book extends React.Component {

    static propTypes = {
        bookStates: PropTypes.array.isRequired,
        book: PropTypes.object.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        const book = props.book
        this.state = {state: book.shelf ? book.shelf : nullBookState.id}
    }

    updateBookState = (updatedState) => {
        const {book, onBookUpdate} = this.props
        if (!updatedState || updatedState === nullBookState.id) {
            delete book.shelf
        } else {
            book.shelf = updatedState
        }
        console.log(`change state of ${book.title} to ${book.shelf}`)
        this.setState({state: book.shelf})
        onBookUpdate(book)
    }

    getBookState = () => {
        return this.state.state
    }

    isBookStateSet = () => {
        const state = this.state.state
        if (!state || state === nullBookState.id) {
            return false
        }
        return true
    }

    render() {
        const {bookStates, book} = this.props
        const authors = book.authors
        return (
            <li key={book.id}>
                <div className='book'>
                    <div className='book-top'>
                        <a target='_blank' href={book.previewLink} rel='noopener noreferrer'>
                            <div className='book-cover' style={{
                                width: 128,
                                height: 174,
                                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                            }}></div>
                        </a>
                        <div className={this.isBookStateSet() ? 'book-shelf-changer' : 'book-shelf-changer-unset'}>
                            <select onChange={(event) => this.updateBookState(event.target.value)}
                                    value={this.getBookState()}>
                                <option value='menuLabel' disabled>Move to...</option>
                                {bookStates.map((bookState) => (
                                    <option value={bookState.id} key={bookState.id}>{bookState.name}</option>
                                ))}
                                <option value={nullBookState.id} key={nullBookState.id}>{nullBookState.name}</option>
                            </select>
                        </div>
                    </div>
                    <div className='book-title'>{book.title}</div>
                    {authors && authors.map((author) => (
                        <div className='book-authors' key={author}>{author}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default Book