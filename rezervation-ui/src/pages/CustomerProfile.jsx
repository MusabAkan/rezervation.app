import React from 'react';
import { Card, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemText, Button, Rating, Chip, Box } from '@mui/material';
import { useAppContext } from '../App';
import { formatCurrency } from '../utils/helpers';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function CustomerProfile() {
    const { t, currentUser, appointments, setRatingModalAppointment } = useAppContext();
    const [tabValue, setTabValue] = React.useState(0);

    if (!currentUser) return null;

    const upcoming = appointments.filter(a => a.customerId === currentUser.id && ['confirmed', 'pending'].includes(a.status));
    const past = appointments.filter(a => a.customerId === currentUser.id && ['completed', 'noshow'].includes(a.status));

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2 }} src={currentUser.photo}>{currentUser.name.split(' ').map(n => n[0]).join('')}</Avatar>
                <Box>
                    <Typography variant="h5">{currentUser.name}</Typography>
                    <Rating value={currentUser.rating} readOnly />
                </Box>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label={t.upcomingAppointments} />
                    <Tab label={t.pastAppointments} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <List>
                    {upcoming.map(a => (
                        <ListItem key={a.id} secondaryAction={<Button size="small">{t.cancel}</Button>}>
                            <ListItemText primary={`${a.businessName} - ${a.services[0].name}`} secondary={`${a.date} @ ${a.time} - ${formatCurrency(a.totalPrice)}`} />
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <List>
                    {past.map(a => (
                        <ListItem key={a.id} secondaryAction={a.status === 'completed' && <Button size="small" onClick={() => setRatingModalAppointment(a)} disabled={a.rated}>{a.rated ? t.alreadyRated : t.rateService}</Button>}>
                            <ListItemText primary={`${a.businessName} - ${a.services[0].name}`} secondary={a.date} />
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
        </Card>
    );
}
