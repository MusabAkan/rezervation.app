
import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info',
        duration: 4000, // Varsayılan süre
        position: { vertical: 'top', horizontal: 'center' } // Varsayılan konum
    });

    /**
     * @param {string} message Bildirim mesajı
     * @param {object|string} options Opsiyonlar objesi veya severity string'i
     * @param {'error'|'warning'|'info'|'success'} [options.severity='success'] Bildirim türü
     * @param {number|null} [options.duration=4000] Gösterim süresi (ms). null ise sabit kalır.
     * @param {{vertical: 'top'|'bottom', horizontal: 'left'|'center'|'right'}} [options.position] Ekran konumu
     * @author Musab Akan
     */
    const showNotification = (message, options = {}) => {
        if (typeof options === 'string') {
            options = { severity: options };
        }

        setNotification({
            open: true,
            message,
            severity: options.severity || 'success',
            duration: options.duration === null ? null : options.duration || 4000,
            position: options.position || { vertical: 'top', horizontal: 'center' }
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const value = { showNotification };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={notification.duration}
                onClose={handleClose}
                anchorOrigin={notification.position}
            >
                <Alert onClose={handleClose} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
