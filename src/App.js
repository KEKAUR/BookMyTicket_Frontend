import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// All Routes
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Booking from './components/booking/booking';
import Ticket from './components/ticket/ticket';
import Movie from './components/movie/movie';
import Offers from './components/offers/Offers';
import PaymentFormModal from './components/payments/Paymentinfo';
import Theatre from './components/theatre/theatre';
import Movie_shows from './components/movie/Movie_shows';
import AdminPage from './components/admin/adminHome';
import MovieListPage from './components/admin/movieList';
import TheatreListPage from './components/admin/theatreList';
import ShowListPage from './components/admin/showList';
import UserProfile from './components/profile/userprofile';
import PaymentPay from './components/payments/PaymentPay';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!userRole); // Set isLoggedIn based on whether userRole exists

    // Check if the user is an admin
    setIsAdmin(userRole === 'ADMIN');
  }, []);
  return (
    <div className="App">

      <BrowserRouter>
        <div style={{ marginBottom: 100, width: "100%" }}>
          {!isAdmin && <Header />}
        </div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          {!isAdmin &&
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
              <Route path="/movie/:movie_id" element={<Movie />} />
              <Route path="/booking/:movie_id" element={<Booking />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/payment" element={<PaymentFormModal />} />
              <Route path="/pay" element={<PaymentPay />} />
              <Route path="/theatres/:city" element={<Theatre />} />
              <Route path="/show/:theatreId" element={<Movie_shows />} />
              <Route path="/user" element={<UserProfile />} />
            </>
          }
          {isAdmin && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/show-movie" element={<MovieListPage />} />
              <Route path="/admin/show-theatre" element={<TheatreListPage />} />
              <Route path="/admin/all-shows" element={<ShowListPage />} />
            </>
          )}

        </Routes>
        <div style={{ bottom: 0 }}>
          {!isAdmin && <Footer />}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;






