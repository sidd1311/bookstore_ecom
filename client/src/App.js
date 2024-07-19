import React from 'react';
import './css/App.css';
import BooksPage from './Books';
import AddBook from './Admin/AddBook';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import ViewBook from './books/viewbook';
import CustomerDetailsForm from './books/customer-details';
import Payment from './cashfree/Payment';
import Signup from './user/signup';
import { AuthProvider } from './AuthContext';
import Login from './user/login';
import Profile_nav from './user/profile-base';
import Profile_home from './user/profile';
import UpdateProfile from './user/update';
import OrdersPage from './user/order';
import OrderDetailsPage from './user/orderdetails'; // Assuming this is the correct component for order details
import Footer from './Footer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AddBook />} />
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="book/:bookId" element={<ViewBook />} />
            <Route path="customer-details" element={<CustomerDetailsForm />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          <Route path="/profile" element={<Profile_nav />}>
            <Route index element={<Profile_home />} />
            <Route path="update" element={<UpdateProfile />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} /> {/* Corrected nested route path */}
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
