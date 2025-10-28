import React, { useState } from 'react';
import { Box, Button, TextField, Tabs, Tab, Typography, Paper, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Person, Business, ArrowBack, Email, Lock, Google, Apple, Facebook } from '@mui/icons-material';
import { useAppContext } from '../App';
import { CATEGORIES, MOCK_USERS } from '../data/mockData';

export default function Auth() {
    const { t, handleLogin } = useAppContext();
    const [step, setStep] = useState('selectType');
    const [accountType, setAccountType] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const handleSelectType = (type) => {
        setAccountType(type);
        setStep('form');
    };

    const SocialLogins = () => (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>{t.orContinueWith}</Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Button variant="outlined" startIcon={<Google />}>Google</Button>
                <Button variant="outlined" startIcon={<Apple />}>Apple</Button>
                <Button variant="outlined" startIcon={<Facebook />}>Facebook</Button>
            </Box>
        </Box>
    );

    return (
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
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
                    <Box sx={{ p: 2, mt: 2 }}>
                        {tabValue === 0 && (
                            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(MOCK_USERS[accountType]); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField label={t.email} type="email" required fullWidth InputProps={{ startAdornment: <Email sx={{ mr: 1 }} /> }} />
                                <TextField label={t.password} type="password" required fullWidth InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }} />
                                <Button type="submit" variant="contained" size="large">{t.signIn}</Button>
                            </Box>
                        )}
                        {tabValue === 1 && (
                            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(MOCK_USERS[accountType]); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField label={t.fullName} required fullWidth />
                                <TextField label={t.email} type="email" required fullWidth InputProps={{ startAdornment: <Email sx={{ mr: 1 }} /> }} />
                                <TextField label={t.password} type="password" required fullWidth InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }} />
                                {accountType === 'customer' ? (
                                    <>
                                        <TextField label={t.city} fullWidth />
                                        <TextField label={t.district} fullWidth />
                                    </>
                                ) : (
                                    <>
                                        <TextField label={t.businessName} fullWidth />
                                        <Select value="" displayEmpty fullWidth>
                                            <MenuItem value="" disabled>{t.selectCategory}</MenuItem>
                                            {CATEGORIES.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                                        </Select>
                                        <TextField label={t.address} multiline rows={2} fullWidth />
                                        <Box sx={{ height: 100, bgcolor: 'action.disabledBackground', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                                            <Typography variant="body2" color="text.secondary">Harita Simülasyonu</Typography>
                                        </Box>
                                    </>
                                )}
                                <FormControlLabel control={<Checkbox required />} label={t.agreeToTerms} />
                                <Button type="submit" variant="contained" size="large">{t.register}</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Paper>
    );
}
