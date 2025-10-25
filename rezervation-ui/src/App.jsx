import React, { useMemo, useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./components/ui/sheet";
import { DialogDescription } from "./components/ui/dialog";
import { Sparkles } from "lucide-react";
import { INITIAL_APPOINTMENTS, INITIAL_FORUM_POSTS, INITIAL_NOTIFICATIONS, INITIAL_MESSAGES, MOCK_SERVICES } from './data/mockData';
import { ServerEndpoints } from './services/api';
import Header from './components/layout/Header';
import SidebarNav from './components/layout/SidebarNav';
import Hero from './components/home/Hero';
import Explore from './pages/Explore';
import AuthView from './pages/AuthView';
import CustomerProfile from './pages/CustomerProfile';
import BusinessDashboard from './pages/BusinessDashboard';
import Messages from './pages/Messages';
import Forum from './pages/Forum';
import Rewards from './pages/Rewards';
import SettingsView from './pages/SettingsView';
import NotificationsView from './pages/NotificationsView';
import BusinessProfileView from './pages/BusinessProfileView';
import BookingModal from './components/modals/BookingModal';
import RatingModal from './components/modals/RatingModal';
import Toast from './components/common/Toast';
import SupportChatWidget from './components/common/SupportChatWidget';
import Footer from './components/layout/Footer.jsx';
import { dict } from './i18n';

const ThemeContext = React.createContext();
export const useTheme = () => React.useContext(ThemeContext);

export default function App() {
  const [lang, setLang] = useState('tr');
  const t = useMemo(() => dict[lang] || dict.tr, [lang]);
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
  const [themeColor, setThemeColor] = useState('blue');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [businesses, setBusinesses] = useState([]);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#explore');
  const [ratingModalAppointment, setRatingModalAppointment] = useState(null);
  const [bookingModalBusiness, setBookingModalBusiness] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const colors = {
      blue: '221 83% 53%',
      green: '142 71% 45%',
      purple: '262 83% 58%',
      orange: '25 95% 53%',
    };
    root.style.setProperty('--primary-hsl', colors[themeColor]);
  }, [themeColor]);

  useEffect(() => {
    const fetchData = async () => {
      const businessesData = await ServerEndpoints.getBusinesses();
      setBusinesses(businessesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setNotifications(INITIAL_NOTIFICATIONS[currentUser.id] || []);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPage(hash.split('?')[0] || '#explore');
      setSidebarOpen(false);

      if (hash.includes('?book=true')) {
        const businessId = hash.split('/')[1]?.split('?')[0];
        if (businessId) {
            setTimeout(() => {
                const businessToBook = businesses.find(b => b.id === businessId);
                if (businessToBook) {
                    setBookingModalBusiness(businessToBook);
                }
            }, 100);
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [businesses]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const showToast = (messageKey) => {
    setToast(t[messageKey]);
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    window.location.hash = '#explore';
  };
  const handleLogout = () => setCurrentUser(null);

  const handleCreateAppointment = (business, date, time, orderedServices, total, address, notes) => {
    if (!currentUser || currentUser.type !== 'customer') {
      showToast('mustBeCustomer');
      window.location.hash = '#auth';
      return;
    }
    const newAppointment = { id: `a${Date.now()}`, customerId: currentUser.id, businessId: business.id, customerName: currentUser.name, businessName: business.name, services: orderedServices, totalPrice: total, date, time, status: 'pending', rated: false, address, notes };
    setAppointments(prev => [...prev, newAppointment]);
    showToast('appointmentSuccess');
  };

  const handleAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === appointmentId) {
        if (newStatus === 'confirmed') {
          showToast('appointmentApproved');
        } else {
          showToast('appointmentDeclined');
        }
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const handleArrivalStatus = (appointmentId, arrived) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === appointmentId) {
        if (arrived) {
          showToast('rateYourService');
          return { ...app, status: 'completed', rated: false };
        } else {
          return { ...app, status: 'noshow' };
        }
      }
      return app;
    }));
  };

  const handleSendMessage = (conversationId, text) => {
    const newMessage = { from: currentUser.id, text, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({ ...prev, [conversationId]: [...(prev[conversationId] || []), newMessage] }));
    showToast('messageSent');
  };

  const handleReviewSubmit = async (appointment, rating, comment) => {
    const result = await ServerEndpoints.submitReview(appointment.businessId, rating, comment);
    if (result.success) {
      setBusinesses(prev => prev.map(b => b.id === appointment.businessId ? { ...b, rating: result.newRating, reviews: result.newReviewCount } : b));
      setAppointments(prev => prev.map(a => a.id === appointment.id ? { ...a, rated: true } : a));
      showToast('reviewSubmitted');
    }
  };

  const handleSaveService = (businessId, serviceToSave) => {
    setServices(prevServices => {
      const newBusinessServices = [...(prevServices[businessId] || [])];
      if (serviceToSave.id) {
        const index = newBusinessServices.findIndex(s => s.id === serviceToSave.id);
        if (index !== -1) {
          const oldService = newBusinessServices[index];
          let newStatus = serviceToSave.active ? oldService.status : 'normal';
          if (serviceToSave.active) {
            if (serviceToSave.price > oldService.price) newStatus = 'zam';
            if (serviceToSave.price < oldService.price) newStatus = 'indirim';
          }

          newBusinessServices[index] = {
            ...oldService,
            ...serviceToSave,
            status: newStatus,
            oldPrice: (oldService.price !== serviceToSave.price && serviceToSave.active) ? oldService.price : oldService.oldPrice
          };
        }
      } else {
        newBusinessServices.push({
          ...serviceToSave,
          id: `s${Date.now()}`,
          status: 'yeni',
          active: true,
        });
      }
      return {
        ...prevServices,
        [businessId]: newBusinessServices,
      };
    });
    showToast('serviceSavedSuccessfully');
  };

  const MainContent = () => {
    const businessId = currentPage.split('/')[1];
    const business = businesses.find(b => b.id === businessId);
    const businessDetails = businesses.find(b => b.id === currentUser?.id);

    if (currentPage.startsWith('#business/')) {
      return business ? <BusinessProfileView t={t} business={business} onBook={() => setBookingModalBusiness(business)} /> : <div>İşletme bulunamadı.</div>;
    }
    if (currentPage.startsWith('#auth')) {
      return <AuthView t={t} onLogin={handleLogin} />;
    }
    if (currentPage.startsWith('#dashboard') && currentUser?.type === 'business') return <BusinessDashboard t={t} currentUser={currentUser} appointments={appointments} onUpdateStatus={handleAppointmentStatus} services={services[currentUser.id] || []} onSaveService={handleSaveService} onArrivalStatus={handleArrivalStatus} business={businessDetails} />;
    if (currentPage.startsWith('#profile') && currentUser?.type === 'customer') return <CustomerProfile t={t} user={currentUser} appointments={appointments} onRate={setRatingModalAppointment} />;
    if (currentPage.startsWith('#messages') && currentUser) return <Messages t={t} currentUser={currentUser} messages={messages} onSendMessage={handleSendMessage} />;
    if (currentPage.startsWith('#notifications') && currentUser) return <NotificationsView t={t} notifications={notifications} onMarkAllRead={handleMarkAllRead} />;
    if (currentPage.startsWith('#forum')) return <Forum t={t} />;
    if (currentPage.startsWith('#rewards') && currentUser?.type === 'customer') return <Rewards t={t} />;
    if (currentPage.startsWith('#settings') && currentUser) return <SettingsView t={t} themeColor={themeColor} setThemeColor={setThemeColor} />;
    if (currentUser?.type === 'business') return <BusinessDashboard t={t} currentUser={currentUser} appointments={appointments} onUpdateStatus={handleAppointmentStatus} services={services[currentUser.id] || []} onSaveService={handleSaveService} onArrivalStatus={handleArrivalStatus} business={businessDetails} />;
    return <Explore t={t} lang={lang} businesses={businesses} />;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <style>{`
        :root {
          --primary-hsl: ${themeColor === 'blue' ? '221 83% 53%' : themeColor === 'green' ? '142 71% 45%' : themeColor === 'purple' ? '262 83% 58%' : '25 95% 53%'};
          --primary: hsl(var(--primary-hsl));
          --primary-foreground: hsl(210 40% 98%);
        }
      `}</style>
      <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <Header t={t} lang={lang} setLang={setLang} onAuthOpen={() => { window.location.hash = '#auth'; }} currentUser={currentUser} onLogout={handleLogout} onSidebarOpen={() => setSidebarOpen(true)} notifications={notifications} onMarkAllRead={handleMarkAllRead} />
        <main className="flex-grow">
          {!currentUser && (currentPage.startsWith('#explore') || currentPage === '#') && <Hero t={t} />}
          <MainContent />
        </main>
        <Footer t={t} />

        <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="flex flex-col bg-background text-foreground border-r p-0 w-72 sm:w-80">
            <SheetHeader className="sr-only">
              <SheetTitle>{t.appName}</SheetTitle>
              <DialogDescription>{t.toggleNavigation}</DialogDescription>
            </SheetHeader>
            <div className="flex h-14 items-center border-b border-slate-700 px-4 lg:h-[60px] lg:px-6">
              <a href="#explore" className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-6 w-6 text-primary" />
                <span>{t.appName}</span>
              </a>
            </div>
            <SidebarNav t={t} currentUser={currentUser} currentPage={currentPage} />
          </SheetContent>
        </Sheet>

        {bookingModalBusiness && <BookingModal t={t} lang={lang} b={bookingModalBusiness} onClose={() => setBookingModalBusiness(null)} onBook={handleCreateAppointment} servicesData={services} />}
        <Toast message={toast} onDismiss={() => setToast(null)} />
        {currentUser && <SupportChatWidget t={t} />}
        <RatingModal t={t} isOpen={!!ratingModalAppointment} onClose={() => setRatingModalAppointment(null)} onSubmit={handleReviewSubmit} appointment={ratingModalAppointment} />
      </div>
    </ThemeContext.Provider>
  );
}
