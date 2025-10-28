import React, { useMemo, useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, IconButton, TextField, Paper, ToggleButtonGroup, ToggleButton, Badge, Tooltip } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useAppContext } from '../App';
import { formatCurrency } from '../utils/helpers';
import { ServerEndpoints } from '../services/api';

export default function ReservationCalendarPage({ business }) {
    const { t, services: servicesData, handleCreateAppointment } = useAppContext();
    
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [order, setOrder] = useState({});
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [availability, setAvailability] = useState({});

    const services = useMemo(() => (servicesData && business && servicesData[business.id]) || [], [servicesData, business]);
    
    const total = useMemo(() => Object.keys(order).reduce((acc, serviceId) => {
        const service = services.find(s => s.id === serviceId);
        return acc + (service.price * (order[serviceId] || 0));
    }, 0), [order, services]);

    const isRemoteServiceSelected = useMemo(() => Object.keys(order).some(id => {
        const service = services.find(s => s.id === id);
        return service && order[id] > 0 && service.isRemote;
    }), [order, services]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!business) return;
            const monthAvailability = await ServerEndpoints.getCalendarAvailability(business.id, selectedDate.year(), selectedDate.month());
            setAvailability(monthAvailability);
        };
        fetchAvailability();
    }, [selectedDate, business]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (!selectedDate || !business) return;
            const times = await ServerEndpoints.getAvailableTimes(business.id, selectedDate.format('YYYY-MM-DD'));
            setAvailableTimes(times);
            setSelectedTime('');
        };
        fetchTimes();
    }, [selectedDate.format('YYYY-MM-DD'), business]);

    const handleOrderChange = (serviceId, amount) => {
        setOrder(prev => ({ ...prev, [serviceId]: Math.max(0, (prev[serviceId] || 0) + amount) }));
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const orderedServices = Object.keys(order).map(id => ({ ...services.find(s => s.id === id), quantity: order[id] })).filter(s => s.quantity > 0);
            handleCreateAppointment(business, selectedDate.toDate(), selectedTime, orderedServices, total, address, notes);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const steps = [t.selectDateAndTime, t.selectServices, t.bookingSummary];

    if (!business) return <Typography>{t.businessNotFound}</Typography>;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>{t.booking} - {business.name}</Typography>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, index) => <Step key={label}><StepLabel>{`${index + 1}. ${label}`}</StepLabel></Step>)}
            </Stepper>

            {activeStep === 0 && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                            <StaticDatePicker 
                                displayStaticWrapperAs="desktop" 
                                openTo="day" 
                                value={selectedDate} 
                                onChange={(newValue) => setSelectedDate(newValue)} 
                                shouldDisableDate={(day) => {
                                    const dayStatus = availability[day.date()];
                                    const isPast = day.isBefore(dayjs(), 'day');
                                    return isPast || dayStatus === 'full';
                                }}
                                slots={{ day: (props) => {
                                    const dayStatus = availability[props.day.date()];
                                    const isInSameMonth = props.day.isSame(selectedDate, 'month');
                                    const tooltipTitle = dayStatus === 'full' ? t.day_full : dayStatus === 'partial' ? t.day_partial : '';
                                    
                                    return (
                                        <Tooltip 
                                            title={tooltipTitle} 
                                            placement="top"
                                            arrow
                                            disableHoverListener={!tooltipTitle} // Sadece title varsa hover dinle
                                        >
                                            <Badge
                                                key={props.day.toString()}
                                                overlap="circular"
                                                color={dayStatus === 'full' ? 'error' : 'warning'}
                                                variant="dot"
                                                invisible={!isInSameMonth || !dayStatus || dayStatus === 'available'}
                                            >
                                                <PickersDay {...props} />
                                            </Badge>
                                        </Tooltip>
                                    );
                                }}}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" gutterBottom>{t.availableTimes}</Typography>
                        <ToggleButtonGroup value={selectedTime} exclusive onChange={(e, time) => setSelectedTime(time)} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {availableTimes.length > 0 ? 
                                availableTimes.map(time => <ToggleButton key={time} value={time}>{time}</ToggleButton>) : 
                                <Typography variant="body2" color="text.secondary">{t.noAvailableTimes}</Typography>}
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            )}

            {activeStep === 1 && (
                 <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Card><CardContent>
                            <Typography variant="h6" gutterBottom>{t.selectServices}</Typography>
                            <List>
                                {services.map(service => (
                                    <ListItem key={service.id} secondaryAction={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton onClick={() => handleOrderChange(service.id, -1)}><RemoveCircle /></IconButton>
                                            <Typography>{order[service.id] || 0}</Typography>
                                            <IconButton onClick={() => handleOrderChange(service.id, 1)}><AddCircle /></IconButton>
                                        </Box>
                                    }>
                                        <ListItemText primary={service.name} secondary={formatCurrency(service.price)} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent></Card>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Card><CardContent>
                            <Typography variant="h6" gutterBottom>{t.bookingSummary}</Typography>
                            <Typography>Toplam: {formatCurrency(total)}</Typography>
                        </CardContent></Card>
                    </Grid>
                </Grid>
            )}

            {activeStep === 2 && (
                <Card><CardContent>
                    <Typography variant="h6" gutterBottom>{t.bookingSummary}</Typography>
                    <Typography>Tarih: {selectedDate.format('DD.MM.YYYY')} @ {selectedTime}</Typography>
                    <List>
                        {Object.keys(order).filter(id => order[id] > 0).map(id => {
                            const s = services.find(s => s.id === id);
                            return <ListItem key={id}><ListItemText primary={`${s.name} x ${order[id]}`} secondary={formatCurrency(s.price * order[id])} /></ListItem>
                        })}
                    </List>
                    <Typography variant="h5" align="right">Toplam: {formatCurrency(total)}</Typography>
                    {isRemoteServiceSelected && (
                        <Box sx={{ mt: 2 }}>
                            <TextField label={t.serviceAddress} value={address} onChange={e => setAddress(e.target.value)} fullWidth required />
                            <TextField label={t.specialNotes} value={notes} onChange={e => setNotes(e.target.value)} fullWidth multiline rows={2} sx={{ mt: 2 }} />
                        </Box>
                    )}
                </CardContent></Card>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)} sx={{ mr: 1 }}>{t.back}</Button>
                <Button variant="contained" onClick={handleNext} disabled={(activeStep === 0 && !selectedTime) || (activeStep === 2 && total === 0)}>{activeStep === steps.length - 1 ? t.bookNow : t.next}</Button>
            </Box>
        </Paper>
    );
}
