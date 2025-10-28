import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { PlayCircle, EmojiEvents } from '@mui/icons-material';
import { useAppContext } from '../App';

export default function Rewards() {
    const { t } = useAppContext();
    const [points, setPoints] = useState(150);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>{t.rewards}</Typography>
                    <Typography variant="h2" fontWeight="bold" color="primary">{points}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>{t.yourPoints}</Typography>
                    <Button variant="contained" startIcon={<PlayCircle />} onClick={() => setPoints(p => p + 10)}>
                        {t.watchAdForPoints}
                    </Button>
                </CardContent>
            </Card>
            <Card sx={{ mt: 3, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <EmojiEvents sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{t.pilotBusiness}</Typography>
                    <Typography variant="h4" fontWeight="bold">Mavi Berber</Typography>
                    <Typography variant="h5">{t.extraDiscount}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
