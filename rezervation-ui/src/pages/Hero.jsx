import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Search, VideoCall } from '@mui/icons-material';
import { useAppContext } from '../App';

export default function Hero() {
    const { t } = useAppContext();

    return (
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    {t.heroTitle}
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" paragraph>
                    {t.heroSub}
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button href="#explore" variant="contained" size="large" startIcon={<Search />}>
                        {t.getStarted}
                    </Button>
                    <Button variant="outlined" size="large" startIcon={<VideoCall />}>
                        Demo
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
