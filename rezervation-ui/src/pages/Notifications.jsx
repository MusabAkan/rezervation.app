import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Badge } from '@mui/material';
import { Notifications as NotificationsIcon, CalendarToday, CheckCircle, Mail, Cancel } from '@mui/icons-material';
import { useAppContext } from '../App';

export default function Notifications() {
    const { t, notifications, onMarkAllRead } = useAppContext();

    const getIconForType = (type) => {
        switch (type) {
            case 'newAppointmentRequest': return <CalendarToday color="primary" />;
            case 'appointmentConfirmed': return <CheckCircle color="success" />;
            case 'newChatMessage': return <Mail color="warning" />;
            case 'appointmentCancelled': return <Cancel color="error" />;
            default: return <NotificationsIcon />;
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">{t.allNotifications}</Typography>
                {notifications.some(n => !n.read) && <Button onClick={onMarkAllRead}>{t.markAllAsRead}</Button>}
            </Box>
            <List>
                {notifications.map(n => (
                    <ListItem key={n.id} secondaryAction={!n.read && <Badge color="primary" variant="dot" />}>
                        <ListItemIcon>{getIconForType(n.type)}</ListItemIcon>
                        <ListItemText primary={n.text} secondary={n.timestamp} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
