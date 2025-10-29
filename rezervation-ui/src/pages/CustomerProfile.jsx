
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemText, Button, Rating, Chip, Box, CircularProgress } from '@mui/material';
import { useAppContext } from '../App';
import { formatCurrency } from '../utils/helpers';
import { api } from '../services/api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function CustomerProfile() {
    const { t, currentUser } = useAppContext();
    const [tabValue, setTabValue] = useState(0);

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setIsLoading(false);
            return;
        }

        const fetchAppointments = async () => {
            try {
                setIsLoading(true);
                const data = await api.getAppointmentsByCustomerId(currentUser.id);
                setAppointments(data);
            } catch (e) {
                setError(e.message);
                console.error("Randevu verileri çekme hatası:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [currentUser]);

    if (!currentUser) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>Profili görüntülemek için giriş yapmalısınız.</Typography>;
    }

    const upcoming = appointments.filter(a => ['confirmed', 'pending'].includes(a.status));
    const past = appointments.filter(a => ['completed', 'noshow'].includes(a.status));

    const renderList = (list) => {
        if (isLoading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
        }
        if (error) {
            return <Typography color="error" sx={{ p: 3, textAlign: 'center' }}>{error}</Typography>;
        }
        if (list.length === 0) {
            return <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>İlgili randevu bulunamadı.</Typography>;
        }
        return (
            <List>
                {list.map(a => (
                    <ListItem key={a.id} secondaryAction={ a.status === 'completed' ? 
                        <Button size="small" disabled={a.rated}>{a.rated ? t.alreadyRated : t.rateService}</Button> 
                        : <Button size="small">{t.cancel}</Button>
                    }>
                        <ListItemText primary={`${a.businessName} - ${a.operationName}`} secondary={`${a.date} @ ${a.time} - ${formatCurrency(a.totalPrice)}`} />
                    </ListItem>
                ))}
            </List>
        );
    }

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                {/* Hata düzeltildi: currentUser ve currentUser.name kontrolü eklendi */}
                <Avatar sx={{ width: 80, height: 80, mr: 2 }} src={currentUser.photo}>
                    {currentUser && currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('') : ''}
                </Avatar>
                <Box>
                    <Typography variant="h5">{currentUser.name}</Typography>
                    <Rating value={currentUser.rating || 0} readOnly />
                </Box>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label={t.upcomingAppointments} />
                    <Tab label={t.pastAppointments} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                {renderList(upcoming)}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                {renderList(past)}
            </TabPanel>
        </Card>
    );
}
