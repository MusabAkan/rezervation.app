
import React, { useState, useEffect, useMemo } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useAppContext } from '../App';
import { api } from '../services/api';

export default function Messages() {
    const { t, currentUser } = useAppContext();
    
    const [conversations, setConversations] = useState({});
    const [users, setUsers] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const loadMessageData = async () => {
            try {
                setIsLoading(true);
                const [convData, usersData] = await Promise.all([
                    api.getConversations(currentUser.id),
                    api.getUsers(),
                ]);
                setConversations(convData);
                setUsers(usersData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadMessageData();
    }, [currentUser]);

    const conversationPartners = useMemo(() => {
        if (!currentUser || !conversations) return {};
        const partners = {};
        Object.keys(conversations).forEach(convId => {
            const [p1, p2] = convId.split('-');
            if (p1 === currentUser.id || p2 === currentUser.id) {
                const partnerId = p1 === currentUser.id ? p2 : p1;
                const partner = users.find(u => u.id === partnerId);
                if (partner) partners[partnerId] = partner;
            }
        });
        return partners;
    }, [currentUser, conversations, users]);

    const handleSend = async () => {
        if (!newMessage.trim() || !activeConversationId) return;
        try {
            const sentMessage = await api.sendMessage(activeConversationId, currentUser.id, newMessage);
            setConversations(prev => ({
                ...prev,
                [activeConversationId]: [...(prev[activeConversationId] || []), sentMessage]
            }));
            setNewMessage('');
        } catch (e) {
            console.error("Mesaj gönderme hatası:", e);
            // Hata bildirimi gösterilebilir.
        }
    };

    const activeConversationMessages = conversations[activeConversationId] || [];

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography sx={{ p: 4, textAlign: 'center' }} color="error">{error}</Typography>;
    }

    if (!currentUser) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>Mesajları görüntülemek için giriş yapmalısınız.</Typography>;
    }

    return (
        <Paper sx={{ display: 'flex', height: '75vh' }}>
            <Box sx={{ width: '30%', borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
                <List>
                    {Object.values(conversationPartners).map(partner => {
                        const convId = [currentUser.id, partner.id].sort().join('-');
                        return (
                            <ListItem button key={partner.id} onClick={() => setActiveConversationId(convId)} selected={activeConversationId === convId}>
                                <ListItemAvatar><Avatar src={partner.photo}>{partner.name[0]}</Avatar></ListItemAvatar>
                                <ListItemText primary={partner.name} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                {activeConversationId ? (
                    <>
                        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                            {activeConversationMessages.map((msg, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: msg.senderId === currentUser.id ? 'flex-end' : 'flex-start', mb: 1 }}>
                                    <Paper sx={{ p: 1, bgcolor: msg.senderId === currentUser.id ? 'primary.main' : 'grey.200', color: msg.senderId === currentUser.id ? 'primary.contrastText' : 'text.primary' }}>
                                        {msg.text}
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField value={newMessage} onChange={e => setNewMessage(e.target.value)} fullWidth placeholder={t.yourMessage} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
                                <Button variant="contained" onClick={handleSend} endIcon={<Send />}>{t.sendMessage}</Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography color="text.secondary">{t.selectConversation}</Typography></Box>
                )}
            </Box>
        </Paper>
    );
}
