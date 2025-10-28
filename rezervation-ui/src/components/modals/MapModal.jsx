import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAppContext } from '../../App';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 600 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MapModal({ isOpen, onClose, business }) {
    const { t } = useAppContext();

    if (!business) return null; // İşletme bilgisi yoksa modalı gösterme

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {t.location} - {business.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{business.address}</Typography>
                <Box sx={{ height: 300, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">[Harita Simülasyonu - {business.address}]</Typography>
                </Box>
                <Button onClick={onClose} sx={{ mt: 2 }}>{t.close}</Button>
            </Box>
        </Modal>
    );
}
