import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../utils/helpers';
import { useAppContext } from '../App';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="h5" fontWeight="bold">{value}</Typography>
        </Paper>
    );
}

export default function BusinessDashboard() {
    const { t, currentUser, appointments, onUpdateStatus, services, onSaveService, onArrivalStatus, business } = useAppContext();
    const [tabValue, setTabValue] = useState(0);

    const pendingAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'pending');
    const todaysAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'confirmed' && a.date === '2025-10-22');

    const chartData = [
        { name: 'Ocak', ciro: 4000, gider: 2400 },
        { name: 'Şubat', ciro: 3000, gider: 1398 },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>{t.dashboard}</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>{currentUser.name}</Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label={t.overview} />
                    <Tab label={t.servicesManagement} />
                    <Tab label={t.personnel} />
                    <Tab label={t.accounting} />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={4}><Stat label={t.revenue} value="₺12,450" /></Grid>
                            <Grid item xs={4}><Stat label={t.expenses} value="₺4,820" /></Grid>
                            <Grid item xs={4}><Stat label={t.profit} value="₺7,630" /></Grid>
                        </Grid>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{t.approveDeclineQueue}</Typography>
                                <List>
                                    {pendingAppointments.length > 0 ? pendingAppointments.map(a => (
                                        <ListItem key={a.id} secondaryAction={<><Button size="small" onClick={() => onUpdateStatus(a.id, 'confirmed')}>{t.approve}</Button><Button size="small" color="error" sx={{ ml: 1 }} onClick={() => onUpdateStatus(a.id, 'declined')}>{t.decline}</Button></>}>
                                            <ListItemText primary={`${a.customerName} - ${a.date} @ ${a.time}`} secondary={formatCurrency(a.totalPrice)} />
                                        </ListItem>
                                    )) : <Typography sx={{ p: 2, textAlign: 'center' }}>{t.noPendingAppointments}</Typography>}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined"><CardContent><Typography variant="h6">{t.aiInsights}</Typography><Typography variant="body2">Yapay zeka analizine göre, Salı günleri en yoğun gününüz.</Typography></CardContent></Card>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Typography>Hizmet Yönetimi modülü buraya gelecek.</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <Card variant="outlined">
                    <CardContent sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}><CartesianGrid /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="ciro" stroke="#8884d8" /><Line type="monotone" dataKey="gider" stroke="#82ca9d" /></LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </TabPanel>
        </Box>
    );
}
