import { createContext, useState, useCallback } from "react"
import axios from 'axios';

const BooksContext = createContext();
const HOST = "http://localhost:3001/";

function Provider({ children }){
    const [books, setBooks] = useState([]);

    const fetchData = useCallback(async () => {
        const response = await axios.get(`${HOST}books`);
        setBooks(response.data);
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

    const booksContext = {
        books: books,
        fetchData: fetchData,
        handleCreate: handleCreate,
        handleEditBookById: handleEditBookById,
        handleDeleteBookById: handleDeleteBookById
    }

    return (
        <BooksContext.Provider value={booksContext}>
            {children}
        </BooksContext.Provider>
    )
}

export {Provider};
export default BooksContext;