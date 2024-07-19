import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../css/addbook.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import LoginOverlay from '../books/LoginOverlay';

const AddBook = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('tag', tag);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/admin/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Book added successfully');
      setTitle('');
      setAuthor('');
      setPrice('');
      setCategory('');
      setTag('');
      setDescription('');
      setImage(null);
    } catch (error) {
      alert('Error adding book');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container my-5">
        <LoginOverlay onClose={() => setShowLoginOverlay(false)} />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card" style={{ width: '100%' }}>
            <h3 className="card-header">Add Books</h3>
            <div className="card-body" style={{ fontSize: '1.5rem' }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder="Enter Title" required />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="author" className="form-label">Author</label>
                      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" placeholder="Author Name" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" placeholder="Enter Price in Rs" required />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="form-control" id="tag" placeholder="Enter Short Tag" required />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Category</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" id="category" placeholder="Enter Category" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" placeholder="Enter Description" required />
                </div>
                <div className="mb-3">
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" aria-label="file example" required />
                </div>
                <button className="btn btn-outline-dark" type="submit">Add Book</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
