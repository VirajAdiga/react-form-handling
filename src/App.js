import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList'

const HOST = "http://localhost:3001/";

function App() {
  const [books, setBooks] = useState([]);

  async function fetchData(){
    const response = await axios.get(`${HOST}books`);
    setBooks(response.data);
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleCreate = async (title) => {
    const response = await axios.post(`${HOST}books`, {title: title});
    setBooks([...books, response.data]);
  }

  const handleDeleteBookById = async (id) => {
    const response = await axios.delete(`${HOST}books/${id}`)
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    })
    setBooks(updatedBooks);
  }

  const handleEditBookById = async (id, newTitle) => {
    const response = await axios.put(`${HOST}books/${id}`, {title: newTitle})
    const updatedBooks = books.map((book) => {
      if (book.id === id){
        return {
          ...book,
          ...response.data
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
