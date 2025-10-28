import React from 'react';
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, IconButton, Badge } from '@mui/material';
import { Menu as MenuIcon, Star, Language, Login, Logout, Notifications } from '@mui/icons-material';
import { useAppContext } from '../../App';

export default function Header() {
    const { t, lang, setLang, currentUser, onAuthOpen, onLogout, onSidebarOpen, notifications, onMarkAllRead } = useAppContext();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={onSidebarOpen} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Star sx={{ mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t.appName}
                </Typography>
                <Select value={lang} onChange={(e) => setLang(e.target.value)} size="small" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                    <MenuItem value="tr">🇹🇷 TR</MenuItem>
                    <MenuItem value="en">🇬🇧 EN</MenuItem>
                </Select>
                {currentUser ? (
                    <>
                        <IconButton color="inherit" onClick={onMarkAllRead}>
                            <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <Button color="inherit" onClick={onLogout} startIcon={<Logout />}>
                            {t.logout}
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={onAuthOpen} startIcon={<Login />}>
                        {t.login}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
