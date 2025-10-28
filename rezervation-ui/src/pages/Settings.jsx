import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, Grid, TextField, Button, Switch, FormControlLabel, Avatar } from '@mui/material';
import { useAppContext } from '../App';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function Settings() {
    const { t, themeMode, setThemeMode, primaryColor, setPrimaryColor } = useAppContext();
    const [tabValue, setTabValue] = useState(0);

    const colorOptions = [
        { name: 'Mavi', value: '#1976d2' },
        { name: 'Yeşil', value: '#2e7d32' },
        { name: 'Mor', value: '#7b1fa2' },
        { name: 'Turuncu', value: '#ed6c02' },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>{t.settings}</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label={t.profileInfo} />
                    <Tab label={t.appearancePreferences} />
                    <Tab label={t.security} />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Card><CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Avatar sx={{ width: 80, height: 80 }} /><Button variant="outlined">{t.profilePicture}</Button></Grid>
                        <Grid item xs={12}><TextField label={t.fullName} fullWidth /></Grid>
                        <Grid item xs={12}><TextField label={t.email} fullWidth /></Grid>
                        <Grid item xs={12}><Button variant="contained">{t.saveChanges}</Button></Grid>
                    </Grid>
                </CardContent></Card>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Card><CardContent>
                    <Typography variant="h6">{t.themeMode}</Typography>
                    <FormControlLabel control={<Switch checked={themeMode === 'dark'} onChange={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')} />} label={themeMode === 'dark' ? t.dark : t.light} />
                    <Typography variant="h6" sx={{ mt: 2 }}>{t.primaryColor}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        {colorOptions.map(color => (
                            <Box key={color.value} onClick={() => setPrimaryColor(color.value)} sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: color.value, cursor: 'pointer', border: primaryColor === color.value ? '3px solid grey' : 'none' }} />
                        ))}
                    </Box>
                </CardContent></Card>
            </TabPanel>
        </Box>
    );
}
