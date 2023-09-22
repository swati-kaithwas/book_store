import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllbook = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3001/book/getallbook")
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleDelete = (bookId) => {
    axios
      .delete(`http://localhost:3001/book/deletebook/${bookId}`)
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
      })
      .catch((error) => {
        console.error("Error deleting book: ", error);
      });
  };

  useEffect(() => {
    // Filter the books based on the search query
    const filteredBooks = books.filter((book) => {
      const { title, author, publicationYear } = book;
      const normalizedQuery = searchQuery.toLowerCase();
      return (
        title.toLowerCase().includes(normalizedQuery) ||
        author.toLowerCase().includes(normalizedQuery) ||
        publicationYear.toString().includes(normalizedQuery)
      );
    });
    setSearchResults(filteredBooks);
  }, [searchQuery, books]);

  return (
    <div className="container mt-5">
      <h2>Book List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, author, or publication year"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="card-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {(searchQuery ? searchResults : books).length > 0 ? (
          (searchQuery ? searchResults : books).map((book) => (
            <div className="card" key={book._id} style={{ border: "2px solid black", width: "300px", marginBottom: "10px" }}>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">ISBN: {book.isbn}</p>
                <p className="card-text">Publication Year: {book.publicationYear}</p>
                <Link to={`/update/${book._id}`} className="btn btn-primary mr-2">
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(book._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books to display.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllbook;
