import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/user/Home';
import HotelDetails from './pages/user/HotelDetails';
import BottomNavbar from './components/ui/BottomNavbar';
import TopNavbar from './components/ui/TopNavbar';
import Lenis from 'lenis';

// Auth Pages
import UserLoginPage from './pages/auth/UserLoginPage';
import UserSignupPage from './pages/auth/UserSignupPage';
import HotelLoginPage from './pages/auth/HotelLoginPage';
import HotelSignupPage from './pages/auth/HotelSignupPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';

// User Pages
import SearchPage from './pages/user/SearchPage';
import BookingsPage from './pages/user/BookingsPage';
import ListingPage from './pages/user/ListingPage';
import BookingConfirmationPage from './pages/user/BookingConfirmationPage';
import WalletPage from './pages/user/WalletPage';
import PaymentPage from './pages/user/PaymentPage';
import SupportPage from './pages/user/SupportPage';
import ReferAndEarnPage from './pages/user/ReferAndEarnPage';

// Wrapper to conditionally render Navbars
const Layout = ({ children }) => {
  const location = useLocation();

  // Routes where navbars should be completely hidden
  const hideAllNavRoutes = ['/login', '/signup', '/register', '/admin'];
  const shouldHideAllNav = hideAllNavRoutes.some(route => location.pathname.includes(route));

  // Routes where only bottom nav should be hidden
  const hideBottomNavRoutes = ['/hotel/', '/booking-confirmation', '/payment', '/search', '/support', '/refer'];
  const shouldHideBottomNav = hideBottomNavRoutes.some(route => location.pathname.includes(route));

  // If auth page, render without any navbars
  if (shouldHideAllNav) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNavbar />
      <div className={`min-h-screen md:pt-16 ${!shouldHideBottomNav ? 'pb-20 md:pb-0' : ''}`}>
        {children}
      </div>
      {!shouldHideBottomNav && <BottomNavbar />}
    </>
  );
};

function App() {
  // Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* User Auth Routes */}
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />

          {/* Hotel/Vendor Auth Routes */}
          <Route path="/hotel/login" element={<HotelLoginPage />} />
          <Route path="/hotel/register" element={<HotelSignupPage />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* User Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/listings" element={<ListingPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/refer" element={<ReferAndEarnPage />} />

          {/* Placeholder Routes */}
          <Route path="/serviced" element={<div className="pt-20 text-center text-surface font-bold">Serviced Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

