import { useState, useEffect } from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { SearchForm } from "./SearchForm";
import { PropertyGrid } from "./PropertyGrid";
import { MainContent } from "./MainContent";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { PaymentPage } from "./PaymentPage";
import { FlightBookingFlow } from "./FlightBookingFlow";
import { BookingManagement } from "./BookingManagement";
import { AdminPanel } from "./AdminPanel";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";
import {
  SupabaseProvider,
  useSupabase,
} from "./SupabaseContext";

function AppContent() {
  const { supabase } = useSupabase();
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("stays");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] =
    useState(false);
  const [showEmailVerification, setShowEmailVerification] =
    useState(false);
  const [user, setUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [verificationEmail, setVerificationEmail] =
    useState("");

  useEffect(() => {
    let mounted = true;

    // Check for existing session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (mounted && session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        setShowLoginModal(false);
        setShowRegisterModal(false);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleRegister = (email) => {
    setVerificationEmail(email);
    setShowRegisterModal(false);
    setShowEmailVerification(true);
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
          <AdminPanel
            user={user}
            onBack={() => setCurrentPage("home")}
          />
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
            <MainContent
              activeTab={activeTab}
              searchResults={searchResults}
            />
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

      <EmailVerificationModal
        open={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={verificationEmail}
      />

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  );
}