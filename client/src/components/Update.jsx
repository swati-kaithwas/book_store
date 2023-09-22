import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    publicationYear: "",
    title: "",
    author: "",
    isbn: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch book data for editing
    axios
      .post("https://book-store-new-kappa.vercel.app/book/getbookById", { id }) // Send ID in the request payload
      .then((response) => {
        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching book data: ", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      try {
        const response = await axios.put(
          `https://book-store-new-kappa.vercel.app/book/updatebook/${id}`,
          formData
        );
        if (response.data.status === true) {
          // Handle success
          Swal.fire({
            icon: "success",
            title: "Book Updated Successfully",
            text: "The book information has been updated.",
          });
          navigate("/book_store");
        } else {
          // Handle failure
          Swal.fire({
            icon: "error",
            title: "Error Updating Book",
            text: response.data.message || "An error occurred while updating the book.",
          });
        }
      } catch (error) {
        // Handle any errors, e.g., show an error message.
        Swal.fire({
          icon: "error",
          title: "Error Updating Book",
          text: "An error occurred while updating the book.",
        });
        console.error("Error updating book:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate title (required, minimum length)
    if (!formData.title) {
      errors.title = "Title is required";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }

    // Validate author (required)
    if (!formData.author) {
      errors.author = "Author is required";
    }

    // Validate ISBN (required, pattern)
    if (!formData.isbn) {
      errors.isbn = "ISBN is required";
    } else if (!/^\d{10}$|^\d{13}$/.test(formData.isbn)) {
      errors.isbn = "Invalid ISBN format";
    }

    // Validate description (required, minimum length)
    if (!formData.description) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }

    // Validate publicationYear (required, minimum value)
    if (!formData.publicationYear) {
      errors.publicationYear = "Publication Year is required";
    } else if (formData.publicationYear < 1800) {
      errors.publicationYear = "Invalid Publication Year";
    }

    setFormErrors(errors);

    // Return true if there are no errors, otherwise false
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mt-5">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control form-control-sm ${
              formErrors.title ? "is-invalid" : ""
            }`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength="3"
            pattern=".{3,}"
          />
          {formErrors.title && (
            <div className="invalid-feedback">{formErrors.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className={`form-control form-control-sm ${
              formErrors.author ? "is-invalid" : ""
            }`}
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          {formErrors.author && (
            <div className="invalid-feedback">{formErrors.author}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className={`form-control form-control-sm ${
              formErrors.isbn ? "is-invalid" : ""
            }`}
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            pattern="^\d{10}$|^\d{13}$"
          />
          {formErrors.isbn && (
            <div className="invalid-feedback">{formErrors.isbn}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className={`form-control form-control-sm ${
              formErrors.description ? "is-invalid" : ""
            }`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength="10"
            pattern=".{10,}"
          ></textarea>
          {formErrors.description && (
            <div className="invalid-feedback">{formErrors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="publicationYear" className="form-label">
            Publication Year
          </label>
          <input
            type="number"
            className={`form-control form-control-sm ${
              formErrors.publicationYear ? "is-invalid" : ""
            }`}
            id="publicationYear"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            required
            min="1800"
          />
          {formErrors.publicationYear && (
            <div className="invalid-feedback">{formErrors.publicationYear}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default Update;
