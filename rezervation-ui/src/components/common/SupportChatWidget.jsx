import React, { useState } from 'react';
import { Fab, Popover, Box, Typography, TextField, Button } from '@mui/material';
import { Message, Send } from '@mui/icons-material';
import { useAppContext } from '../../App';

export default function SupportChatWidget() {
    const { t } = useAppContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleClick}>
                <Message />
            </Fab>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 2, width: 300 }}>
                    <Typography variant="h6" gutterBottom>{t.liveSupport}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{t.supportWelcome}</Typography>
                    <TextField label={t.yourMessage} multiline rows={4} fullWidth sx={{ mb: 1 }} />
                    <Button variant="contained" fullWidth startIcon={<Send />}>{t.sendMessage}</Button>
                </Box>
            </Popover>
        </>
    );
}
