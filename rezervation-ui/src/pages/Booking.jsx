
import React, { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField,
    Paper,
    ToggleButtonGroup,
    ToggleButton,
    Badge,
    Tooltip
} from '@mui/material';
import { AddCircle, RemoveCircle, LocationOn } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useAppContext } from '../App';
import { formatCurrency } from '../utils/helpers';
import { api } from '../services/api'; // ServerEndpoints yerine api import edildi
import MapModal from '../components/modals/MapModal';
import { useNotification } from "../context/NotificationProvider";

export default function ReservationCalendarPage() {
    const { t, currentUser, setAuthModalOpen } = useAppContext();
    const { showNotification } = useNotification();

    const [business, setBusiness] = useState(null);
    const [operations, setOperations] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [order, setOrder] = useState({});
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [availability, setAvailability] = useState({});
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    useEffect(() => {
        const businessId = window.location.hash.split('/')[1];
        if (businessId) {
            api.getBusinesses().then(businesses => {
                const currentBusiness = businesses.find(b => b.id === businessId);
                setBusiness(currentBusiness);
                if (currentBusiness) {
                    api.getOperationsByBusinessId(businessId).then(setOperations);
                }
            });
        }
    }, []);

    const total = useMemo(() => Object.keys(order).reduce((acc, opId) => {
        const operation = operations.find(op => op.id === opId);
        return acc + (operation.price * (order[opId] || 0));
    }, 0), [order, operations]);

    const isRemoteServiceSelected = useMemo(() => Object.keys(order).some(id => {
        const operation = operations.find(op => op.id === id);
        return operation && order[id] > 0 && operation.isRemote; // isRemote alanı Operation entity'sinde olmalı
    }), [order, operations]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!business || !selectedDate) return;
            const monthAvailability = await api.getCalendarAvailability(business.id, selectedDate.year(), selectedDate.month());
            setAvailability(monthAvailability);
        };
        fetchAvailability();
    }, [selectedDate?.month(), selectedDate?.year(), business]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (!selectedDate || !business) return;
            const times = await api.getAvailableTimes(business.id, selectedDate.format('YYYY-MM-DD'));
            setAvailableTimes(times);
            setSelectedTime('');
        };
        fetchTimes();
    }, [selectedDate?.format('YYYY-MM-DD'), business]);

    const handleOrderChange = (opId, amount) => {
        setOrder(prev => ({ ...prev, [opId]: Math.max(0, (prev[opId] || 0) + amount) }));
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            if (!currentUser) {
                // ... Giriş yapmamış kullanıcı mantığı ...
                showNotification(t.mustBeLoggedInToBook, 'error');
                return;
            }
            // handleCreateAppointment App.jsx'ten kaldırıldığı için bu mantık da güncellenmeli
            console.log("Randevu oluşturulacak:", { business, selectedDate, selectedTime, order });
            showNotification(t.appointmentSuccess, 'success');
            window.location.hash = '#profile';
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const steps = [t.selectDateAndTime, t.selectServices, t.bookingSummary];

    if (!business) return <Typography>{t.businessNotFound}</Typography>;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>{t.booking} - {business.name}</Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, cursor: 'pointer' }} onClick={() => setIsMapModalOpen(true)}>
                <LocationOn fontSize="small" /> {business.address}
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, index) => <Step key={label}><StepLabel>{`${index + 1}. ${label}`}</StepLabel></Step>)}
            </Stepper>

            {activeStep === 0 && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                            <StaticDatePicker displayStaticWrapperAs="desktop" openTo="day" value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} shouldDisableDate={(day) => day.isBefore(dayjs(), 'day')} slots={{ day: (props) => {
                                const dayStatus = availability[props.day.date()];
                                return <Tooltip title={dayStatus === 'full' ? t.day_full : dayStatus === 'partial' ? t.day_partial : ''}><Badge key={props.day.toString()} overlap="circular" color={dayStatus === 'full' ? 'error' : 'warning'} variant="dot" invisible={!dayStatus || dayStatus === 'available'}><PickersDay {...props} /></Badge></Tooltip>;
                            }}} />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" gutterBottom>{t.availableTimes}</Typography>
                        <ToggleButtonGroup value={selectedTime} exclusive onChange={(e, time) => setSelectedTime(time)} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {availableTimes.length > 0 ? availableTimes.map(time => <ToggleButton key={time} value={time}>{time}</ToggleButton>) : <Typography variant="body2" color="text.secondary">{t.noAvailableTimes}</Typography>}
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
                                {operations.map(op => (
                                    <ListItem key={op.id} secondaryAction={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IconButton onClick={() => handleOrderChange(op.id, -1)}><RemoveCircle /></IconButton><Typography>{order[op.id] || 0}</Typography><IconButton onClick={() => handleOrderChange(op.id, 1)}><AddCircle /></IconButton></Box>}>
                                        <ListItemText primary={op.name} secondary={formatCurrency(op.price)} />
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
                    <Typography>Tarih: {selectedDate ? selectedDate.format('DD.MM.YYYY') : ''} @ {selectedTime}</Typography>
                    <List>
                        {Object.keys(order).filter(id => order[id] > 0).map(id => {
                            const op = operations.find(o => o.id === id);
                            return <ListItem key={id}><ListItemText primary={`${op.name} x ${order[id]}`} secondary={formatCurrency(op.price * order[id])} /></ListItem>;
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
                <Button variant="contained" onClick={handleNext} disabled={(activeStep === 0 && (!selectedDate || !selectedTime)) || (activeStep === 2 && total === 0)}>{activeStep === steps.length - 1 ? t.bookNow : t.next}</Button>
            </Box>

            {business && <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} business={business} />}
        </Paper>
    );
}
