import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Message, Notifications, CardGiftcard, Dashboard, Person, Settings } from '@mui/icons-material';
import { useAppContext } from '../../App';

export default function SidebarNav() {
    const { t, currentUser, currentPage } = useAppContext();

    const items = [
        { href: '#explore', icon: <Home />, label: t.home },
        { href: '#messages', icon: <Message />, label: t.messages, user: true },
        { href: '#notifications', icon: <Notifications />, label: t.notifications, user: true },
        { href: '#rewards', icon: <CardGiftcard />, label: t.rewards, user: 'customer' },
        { href: '#dashboard', icon: <Dashboard />, label: t.dashboard, user: 'business' },
        { href: '#profile', icon: <Person />, label: t.profile, user: 'customer' },
        { href: '#settings', icon: <Settings />, label: t.settings, user: true },
    ];

    return (
        <List>
            {items.map((item) => {
                if (item.user && (!currentUser || (item.user !== true && currentUser.type !== item.user))) {
                    return null;
                }
                return (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton component="a" href={item.href} selected={currentPage.startsWith(item.href)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
