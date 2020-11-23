import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const apiKey = "AIzaSyD2PLVKhhrnaeXUWWMVwVbifneSgNZlrTA";

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + book)
      .then((data) => {
        setResult(data.data.items);
      });
  }
  return (
    <div className="container">
      <h1>
        <b> Book app </b>{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            className="form-control mt-10"
            id="book"
            placeholder="Search for books..."
            autoComplete="off"
          />
        </div>
        <button type="submit" button className="btn btn-danger">
          Search
        </button>
      </form>
      {result.map((book) => (
        <a target="blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
      ))}
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
