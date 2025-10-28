import React, { useState, useEffect, useMemo } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField, Button, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useAppContext } from '../App';
import { MOCK_USERS, INITIAL_BUSINESSES_DATA } from '../data/mockData';

export default function Messages() {
    const { t, currentUser, messages, onSendMessage } = useAppContext();
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const conversationPartners = useMemo(() => {
        if (!currentUser) return {};
        const partners = {};
        Object.keys(messages).forEach(convId => {
            const [p1, p2] = convId.split('-');
            if (p1 === currentUser.id || p2 === currentUser.id) {
                const partnerId = p1 === currentUser.id ? p2 : p1;
                const partner = MOCK_USERS[partnerId.startsWith('c') ? 'customer' : 'business'] || INITIAL_BUSINESSES_DATA.find(b => b.id === partnerId);
                if (partner) partners[partnerId] = partner;
            }
        });
        return partners;
    }, [currentUser, messages]);

    const handleSend = () => {
        if (!newMessage.trim() || !activeConversationId) return;
        onSendMessage(activeConversationId, newMessage);
        setNewMessage('');
    };

    const activeConversation = messages[activeConversationId] || [];

    if (!currentUser) return <Typography sx={{ p: 4, textAlign: 'center' }}>{t.mustBeLoggedInToViewMessages}</Typography>;

    return (
        <Paper sx={{ display: 'flex', height: '75vh' }}>
            <Box sx={{ width: '30%', borderRight: 1, borderColor: 'divider' }}>
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
                            {activeConversation.map((msg, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: msg.from === currentUser.id ? 'flex-end' : 'flex-start', mb: 1 }}>
                                    <Paper sx={{ p: 1, bgcolor: msg.from === currentUser.id ? 'primary.main' : 'grey.200', color: msg.from === currentUser.id ? 'primary.contrastText' : 'text.primary' }}>
                                        {msg.text}
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField value={newMessage} onChange={e => setNewMessage(e.target.value)} fullWidth placeholder={t.yourMessage} />
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
