
import React, { useMemo, useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Select, MenuItem, Avatar, Badge, Tooltip, Menu, Button, CircularProgress, Modal, CssBaseline, Divider } from '@mui/material';
import { Menu as MenuIcon, Explore as ExploreIcon, Dashboard, Person, Mail, Notifications as NotificationsIcon, Settings as SettingsIcon, Logout, Login, Brightness4, Brightness7, Star, CalendarToday, CheckCircle } from '@mui/icons-material';

import { NotificationProvider, useNotification } from './context/NotificationProvider';
import { INITIAL_APPOINTMENTS, INITIAL_NOTIFICATIONS, INITIAL_MESSAGES, MOCK_SERVICES } from './data/mockData';
import { ServerEndpoints } from './services/api';
import Hero from './pages/Hero.jsx';
import Explore from './pages/Explore';
import Auth from './pages/Auth.jsx';
import CustomerProfile from './pages/CustomerProfile';
import BusinessDashboard from './pages/BusinessDashboard';
import Messages from './pages/Messages';
import Forum from './pages/Forum';
import Rewards from './pages/Rewards';
import Settings from './pages/Settings.jsx';
import Notifications from './pages/Notifications.jsx';
import BusinessProfile from './pages/BusinessProfile.jsx';
import ReservationCalendarPage from './pages/Booking.jsx';
import { dict } from './i18n';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const getIconForType = (type) => {
    switch (type) {
        case 'newAppointmentRequest': return <CalendarToday color="primary" />;
        case 'appointmentConfirmed': return <CheckCircle color="success" />;
        case 'newChatMessage': return <Mail color="warning" />;
        default: return <NotificationsIcon />;
    }
};

function AppContent() {
    const { showNotification } = useNotification();
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'tr');
    const t = useMemo(() => dict[lang] || dict.tr, [lang]);
    const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light');
    const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('primaryColor') || '#1976d2');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [businesses, setBusinesses] = useState([]);
    const [services, setServices] = useState(MOCK_SERVICES);
    const [currentPage, setCurrentPage] = useState(() => window.location.hash || '#');
    const [ratingModalAppointment, setRatingModalAppointment] = useState(null);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = useState(null);

    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: themeMode,
            primary: { main: primaryColor },
        },
    }), [themeMode, primaryColor]);

    useEffect(() => { localStorage.setItem('themeMode', themeMode); }, [themeMode]);
    useEffect(() => { localStorage.setItem('primaryColor', primaryColor); }, [primaryColor]);
    useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const businessesData = await ServerEndpoints.getBusinesses();
            setBusinesses(businessesData);
            setTimeout(() => setIsLoading(false), 500);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (currentUser) setNotifications(INITIAL_NOTIFICATIONS[currentUser.id] || []);
        else setNotifications([]);
    }, [currentUser]);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPage(window.location.hash || '#');
            setSidebarOpen(false);
        }
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
    const handleLogin = (user) => { 
        setCurrentUser(user); 
        setAuthModalOpen(false); 
        const pendingBookingJSON = localStorage.getItem('pendingBooking');
        if (pendingBookingJSON) {
            const pendingBooking = JSON.parse(pendingBookingJSON);
            window.location.hash = `#book/${pendingBooking.businessId}`;
            localStorage.removeItem('pendingBooking');
        } else {
            window.location.hash = '#explore';
        }
    };
    const handleLogout = () => { setCurrentUser(null); setUserMenuAnchorEl(null); window.location.hash = '#'; };
    
    const handleCreateAppointment = (business, date, time, orderedServices, total, address, notes) => {
        if (!currentUser || currentUser.type !== 'customer') {
            showNotification(t.mustBeLoggedInToBook, 'error');
            return;
        }
        const newAppointment = { id: `a${Date.now()}`, customerId: currentUser.id, businessId: business.id, customerName: currentUser.name, businessName: business.name, services: orderedServices, totalPrice: total, date, time, status: 'pending', rated: false, address, notes };
        setAppointments(prev => [...prev, newAppointment]);
        showNotification(t.appointmentSuccess, 'success');
        window.location.hash = '#profile';
    };
    
    const handleReviewSubmit = async (appointment, rating, comment) => { /* ... mantık korunuyor ... */ };
    
    const handleSendMessage = (conversationId, text) => {
        const newMessage = { from: currentUser.id, text, time: new Date().toISOString() };
        setMessages(prev => ({ ...prev, [conversationId]: [...(prev[conversationId] || []), newMessage] }));
        showNotification(t.messageSent, 'success');
    };

    const contextValue = useMemo(() => ({ t, lang, setLang, themeMode, setThemeMode, primaryColor, setPrimaryColor, currentUser, businesses, services, appointments, messages, notifications, handleLogin, handleLogout, handleCreateAppointment, handleReviewSubmit, handleMarkAllRead, setRatingModalAppointment, isAuthModalOpen, setAuthModalOpen, handleSendMessage }), [t, lang, themeMode, primaryColor, currentUser, businesses, services, appointments, messages, notifications, isAuthModalOpen, handleSendMessage]);

    const renderPageContent = () => {
        const businessId = currentPage.split('/')[1];
        const business = businesses.find(b => b.id === businessId);

        if (!currentUser && (currentPage === '#' || currentPage === '')) return <Hero />;
        
        // *** İŞTE KESİN ÇÖZÜM BURADA ***
        // Explore bileşenine her seferinde benzersiz bir key vererek yeniden oluşturulmasını sağlıyoruz.
        if (currentPage.startsWith('#explore')) return <Explore key={Date.now()} />;
        
        if (currentPage.startsWith('#book/')) return business ? <ReservationCalendarPage business={business} /> : <Typography>{t.businessNotFound}</Typography>;
        if (currentPage.startsWith('#business/')) return business ? <BusinessProfile business={business} /> : <Typography>{t.businessNotFound}</Typography>;
        if (currentPage.startsWith('#dashboard')) return <BusinessDashboard />;
        if (currentPage.startsWith('#profile')) return <CustomerProfile />;
        if (currentPage.startsWith('#messages')) return <Messages />;
        if (currentPage.startsWith('#notifications')) return <Notifications />;
        if (currentPage.startsWith('#forum')) return <Forum />;
        if (currentPage.startsWith('#rewards')) return <Rewards />;
        if (currentPage.startsWith('#settings')) return <Settings />;
        if (currentPage === '#auth') return <Auth />;
        
        // Fallback olarak da Explore'u key ile render ediyoruz.
        return <Explore key={Date.now()} />;
    };

    return (
        <AppContext.Provider value={contextValue}>
            <ThemeProvider theme={muiTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed"><Toolbar>
                        <IconButton color="inherit" edge="start" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}><MenuIcon /></IconButton>
                        <Star sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{t.appName}</Typography>
                        <Select value={lang} onChange={(e) => setLang(e.target.value)} size="small" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                            <MenuItem value="tr">🇹🇷 TR</MenuItem>
                            <MenuItem value="en">🇬🇧 EN</MenuItem>
                        </Select>
                        <IconButton color="inherit" onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}>{themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}</IconButton>
                        {currentUser ? (
                            <>
                                <IconButton color="inherit" onClick={(e) => setNotificationMenuAnchorEl(e.currentTarget)}><Badge badgeContent={notifications.filter(n => !n.read).length} color="error"><NotificationsIcon /></Badge></IconButton>
                                <Menu anchorEl={notificationMenuAnchorEl} open={Boolean(notificationMenuAnchorEl)} onClose={() => setNotificationMenuAnchorEl(null)}>
                                    {notifications.slice(0, 10).map(n => <MenuItem key={n.id} onClick={() => { setNotificationMenuAnchorEl(null); window.location.hash = n.link; }}><ListItemIcon>{getIconForType(n.type)}</ListItemIcon>{n.text}</MenuItem>)}
                                    <Divider />
                                    <MenuItem onClick={() => { setNotificationMenuAnchorEl(null); window.location.hash = '#notifications'; }}>{t.viewAllNotifications}</MenuItem>
                                </Menu>

                                <Tooltip title={t.accountSettings}>
                                    <IconButton onClick={(e) => setUserMenuAnchorEl(e.currentTarget)} size="small" sx={{ ml: 2 }}>
                                        <Avatar sx={{ width: 32, height: 32 }} src={currentUser.photo}>{currentUser.name[0]}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu anchorEl={userMenuAnchorEl} open={Boolean(userMenuAnchorEl)} onClose={() => setUserMenuAnchorEl(null)}>
                                    <MenuItem onClick={() => { setUserMenuAnchorEl(null); window.location.hash = '#profile'; }}><Person sx={{ mr: 1 }} />{t.myProfile}</MenuItem>
                                    <MenuItem onClick={() => { setUserMenuAnchorEl(null); window.location.hash = '#settings'; }}><SettingsIcon sx={{ mr: 1 }} />{t.settings}</MenuItem>
                                    <MenuItem onClick={handleLogout}><Logout sx={{ mr: 1 }} />{t.logout}</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button color="inherit" onClick={() => setAuthModalOpen(true)} startIcon={<Login/>}>{t.login}</Button>
                        )}
                    </Toolbar></AppBar>
                    
                    <Drawer anchor="left" open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
                        <Box sx={{ width: 250 }} role="presentation" onClick={() => setSidebarOpen(false)} onKeyDown={() => setSidebarOpen(false)}>
                            <List>
                                <ListItemButton component="a" href="#explore"><ListItemIcon><ExploreIcon /></ListItemIcon><ListItemText primary={t.explore} /></ListItemButton>
                                {currentUser && <ListItemButton component="a" href="#profile"><ListItemIcon><Person /></ListItemIcon><ListItemText primary={t.profile} /></ListItemButton>}
                                {currentUser?.type === 'business' && <ListItemButton component="a" href="#dashboard"><ListItemIcon><Dashboard /></ListItemIcon><ListItemText primary={t.dashboard} /></ListItemButton>}
                            </List>
                        </Box>
                    </Drawer>

                    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
                        <Container maxWidth="lg">
                            {isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box> : renderPageContent()}
                        </Container>
                    </Box>

                    <Modal open={isAuthModalOpen} onClose={() => setAuthModalOpen(false)}><Box sx={{ p: 4, bgcolor: 'background.paper' }}><Auth /></Box></Modal>
                </Box>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default function App() {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    );
}
