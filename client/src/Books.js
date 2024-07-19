import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import './css/Books.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        let response;
        if (query) {
          response = await axios.get('http://localhost:5000/search', { params: { q: query } });
        } else {
          response = await axios.get('http://localhost:5000/books');
        }
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchCategoriesAndAuthors = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:5000/categories');
        const authorsResponse = await axios.get('http://localhost:5000/authors');
        setCategories(categoriesResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error('Error fetching categories or authors:', error);
      }
    };

    fetchBooks();
    fetchCategoriesAndAuthors();
  }, [location.search]);

  const handleFilterChange = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books', {
        params: {
          category: selectedCategory,
          author: selectedAuthor,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching filtered books:', error);
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedAuthor]);

  return (
    <div className="books-page">
      <h1>Books</h1>
      <div className="filters">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <hr />
      {books.length === 0 ? (
        <div className="no-books-found">
          <h3>No books found, Try using different Keywords</h3>
        </div>
      ) : (
        <div className="books-container">
          {books.map((book) => (
            <Card
              key={book._id}
              link={`/book/${book._id}`}
              url1={`http://localhost:5000/${book.image}`}
              text1={book.title}
              author={book.author}
              genre={book.category}
              description={book.description}
              price={book.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
