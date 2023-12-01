import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList'

function App() {
  const [books, setBooks] = useState([]);

  const handleCreate = (title) => {
    setBooks([...books, {id: Math.round(Math.random() * 9999), title: title}]);
  }

  const handleDeleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    })
    setBooks(updatedBooks);
  }

  const handleEditBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id){
        return {
          ...book,
          title: newTitle
        };
      }
      return book;
    })
    setBooks(updatedBooks);
  }

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={handleDeleteBookById} onEdit={handleEditBookById} />
      <BookCreate onCreate={handleCreate} />
    </div>
  );
}

export default App;
