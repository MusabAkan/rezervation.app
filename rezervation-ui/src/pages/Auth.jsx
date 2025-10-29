
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Tabs, Tab, Typography, Paper, Select, MenuItem, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { Person, Business, ArrowBack, Email, Lock } from '@mui/icons-material';
import { useAppContext } from '../App';
import { api } from '../services/api';
import { useNotification } from '../context/NotificationProvider';

export default function Auth() {
    const { t, handleLogin } = useAppContext();
    const { showNotification } = useNotification();

    const [step, setStep] = useState('selectType');
    const [accountType, setAccountType] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Form state'leri
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');

    const handleSelectType = (type) => {
        setAccountType(type);
        setStep('form');
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let user;
            if (tabValue === 0) { // Giriş yap
                user = await api.login({ email, password });
            } else { // Kayıt ol
                const userData = {
                    email, 
                    password, 
                    fullName: accountType === 'customer' ? fullName : businessName, 
                    userType: accountType
                };
                // İşletme kaydı için ek veriler eklenebilir
                user = await api.register(userData);
            }
            handleLogin(user); // AppContext'teki global kullanıcı state'ini güncelle
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', position: 'relative' }}>
            {isLoading && <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}><CircularProgress /></Box>}
            {step === 'selectType' ? (
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>{t.selectAccountType}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button variant="outlined" onClick={() => handleSelectType('customer')} sx={{ flex: 1, flexDirection: 'column', p: 3 }}><Person sx={{ fontSize: 40 }} /><Typography>{t.customer}</Typography></Button>
                        <Button variant="outlined" onClick={() => handleSelectType('business')} sx={{ flex: 1, flexDirection: 'column', p: 3 }}><Business sx={{ fontSize: 40 }} /><Typography>{t.business}</Typography></Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Button startIcon={<ArrowBack />} onClick={() => setStep('selectType')} sx={{ mb: 2 }}>{t.back}</Button>
                    <Typography variant="h5">{accountType === 'customer' ? t.customer : t.business}</Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}><Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} centered><Tab label={t.signIn} /><Tab label={t.register} /></Tabs></Box>
                    <Box component="form" onSubmit={handleAuthSubmit} sx={{ p: 2, mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {tabValue === 1 && (
                             <TextField label={t.fullName} required fullWidth value={fullName} onChange={e => setFullName(e.target.value)} />
                        )}
                        <TextField label={t.email} type="email" required fullWidth value={email} onChange={e => setEmail(e.target.value)} InputProps={{ startAdornment: <Email sx={{ mr: 1 }} /> }} />
                        <TextField label={t.password} type="password" required fullWidth value={password} onChange={e => setPassword(e.target.value)} InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }} />
                        {tabValue === 1 && accountType === 'business' && (
                            <>
                                <TextField label={t.businessName} fullWidth value={businessName} onChange={e => setBusinessName(e.target.value)} />
                                <Select value={category} onChange={e => setCategory(e.target.value)} displayEmpty fullWidth>
                                    <MenuItem value="" disabled>{t.selectCategory}</MenuItem>
                                    {/* Kategoriler backend'den çekilecek, şimdilik statik */}
                                    <MenuItem value="Güzellik & Bakım">Güzellik & Bakım</MenuItem>
                                    <MenuItem value="Yeme & İçme">Yeme & İçme</MenuItem>
                                    <MenuItem value="Spor & Sağlık">Spor & Sağlık</MenuItem>
                                </Select>
                                <TextField label={t.address} multiline rows={2} fullWidth value={address} onChange={e => setAddress(e.target.value)} />
                            </>
                        )}
                        {tabValue === 1 && (
                            <FormControlLabel control={<Checkbox required />} label={t.agreeToTerms} />
                        )}
                        <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                            {tabValue === 0 ? t.signIn : t.register}
                        </Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
}
