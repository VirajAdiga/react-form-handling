import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList'

function App() {
  const [books, setBooks] = useState([]);

  const handleCreate = (title) => {
    setBooks([...books, {id: Math.round(Math.random() * 9999), title: title}]);
  }

  return (
    <div className="app">
      <BookList books={books} />
      <BookCreate onCreate={handleCreate} />
    </div>
  );
}

export default App;
