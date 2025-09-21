import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SearchForm } from "./components/SearchForm";
import { PropertyGrid } from "./components/PropertyGrid";
import { MainContent } from "./components/MainContent";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { PaymentPage } from "./components/PaymentPage";
import { FlightBookingFlow } from "./components/FlightBookingFlow";
import { BookingManagement } from "./components/BookingManagement";
import { AdminPanel } from "./components/AdminPanel";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("stays");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Handle registration via your backend template
  const handleRegister = async (newUser) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // Automatically log in user
        setShowRegisterModal(false);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  // Handle login via your backend template
  const handleLogin = async (credentials) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setShowLoginModal(false);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    if (booking.type === "flight") {
      setCurrentPage("flight-booking");
    } else {
      setCurrentPage("payment");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "flight-booking":
        return (
          <FlightBookingFlow
            flight={selectedBooking}
            onBack={() => setCurrentPage("home")}
            onContinue={(bookingData) => {
              setSelectedBooking(bookingData);
              setCurrentPage("payment");
            }}
          />
        );
      case "payment":
        return (
          <PaymentPage
            booking={selectedBooking}
            user={user}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "bookings":
        return (
          <BookingManagement
            user={user}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "admin":
        return (
          <AdminPanel user={user} onBack={() => setCurrentPage("home")} />
        );
      default:
        return (
          <>
            <HeroSection activeTab={activeTab} />
            <SearchForm
              onSearch={setSearchResults}
              user={user}
              activeTab={activeTab}
            />
            <PropertyGrid
              results={searchResults}
              onBookingSelect={handleBookingSelect}
              activeTab={activeTab}
            />
            <MainContent activeTab={activeTab} searchResults={searchResults} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {renderPage()}

      {currentPage === "home" && <Footer />}

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLogin}
        onRegisterClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
        onLoginClick={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <Toaster />
    </div>
  );
}

export default AppContent;
