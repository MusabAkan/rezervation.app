import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Rating, TextField } from '@mui/material';
import { useAppContext } from '../../App';

export default function RatingModal({ isOpen, onClose, onSubmit, appointment }) {
    const { t } = useAppContext();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setComment('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit(appointment, rating, comment);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="h6" component="h2">{t.rateService}</Typography>
                <Typography sx={{ mt: 2 }}>{t.howWasYourExperienceWith} <strong>{appointment?.businessName}</strong>?</Typography>
                <Rating name="rating" value={rating} onChange={(event, newValue) => { setRating(newValue); }} sx={{ my: 2 }} />
                <TextField label={t.yourComment} multiline rows={4} value={comment} onChange={(e) => setComment(e.target.value)} fullWidth />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button onClick={onClose}>{t.cancel}</Button>
                    <Button variant="contained" onClick={handleSubmit}>{t.submitReview}</Button>
                </Box>
            </Box>
        </Modal>
    );
}
