import React from 'react'
import {Route} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
// import {search} from './BooksAPI'
import './App.css'



class App extends React.Component {
  state = {
      books: []
  }

  constructor(props) {
    super(props)
    this.state = {
        searchResult: [],
        books: [],
        showSearchPage: true
    }
    //
    // let book = {
    //     id: 23,
    //     name: "My FirstBook",
    //     isbn: 1234567890,
    //     order: 0,
    //     status: "read"
    // }

    // BooksAPI.updategetAll()
      //

     // let searchedBooks = JSON.stringify(BooksAPI.search("java", 50).books)

      // BooksAPI.search("java", 50).then(searchResult => {
      //     for (let book in searchResult) {
      //         console.log(book)
      //     }
      //     this.setState({searchResult: searchResult})
      // })

      //ContactsAPI.getAll().then(contacts => {
       //   this.setState({contacts})
      //})


     // let tempBooks = BooksAPI.getAll()
     // console.log(tempBooks.length)
  }

  render() {
    return (
        <div className='app'>
            <Route exact path='/' render={() => (
                <ListBooks
                    onDeleteContact={this.removeContact}
                    contacts={this.state.contacts}
                />
            )}/>

            <Route path='/search' render={({history}) => (
                <SearchBooks
                    onCreateContact={this.createContact}
                    tempHistory={history}
                />
            )}/>
        </div>
    )
  }
}

export default App
