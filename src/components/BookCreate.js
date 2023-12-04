import { useState } from "react";
import useBooksContext from "../hooks/useBooksContext";
import '../css/index.css';

function BookCreate(){
    const [title, setTitle] = useState('');
    const {handleCreate} = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreate(title);
        setTitle('');
    }

    return (
        <div className="book-create">
            <h3>Add a book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Create</button>
            </form>
        </div>
    );
}

export default BookCreate;