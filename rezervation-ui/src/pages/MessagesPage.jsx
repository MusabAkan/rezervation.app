import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Send } from 'lucide-react';
import { MOCK_USERS, INITIAL_BUSINESSES_DATA } from '../data/mockData';

function MessagesPage({ t, currentUser, messages, onSendMessage }) {
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        const potentialId = hash.split('/')[1];
        if (potentialId && currentUser) {
            const partnerId = potentialId;
            const convId = [currentUser.id, partnerId].sort().join('-');
            setActiveConversationId(convId);
        }
    }, [currentUser]);

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
    
    if (!currentUser) {
        return <div className="text-center py-10">Mesajları görmek için giriş yapmalısınız.</div>;
    }

    return (
        <div id="messages" className="max-w-7xl mx-auto px-4 py-8">
            <Card className="h-[70vh] flex bg-white dark:bg-slate-800 dark:border-slate-700">
                <div className="w-1/3 border-r bg-slate-50/50 dark:bg-slate-800/50 dark:border-slate-700">
                    <CardHeader><CardTitle className="text-base font-semibold">{t.conversations}</CardTitle></CardHeader>
                    <div className="p-2 space-y-1">
                        {Object.keys(conversationPartners).map(partnerId => {
                            const partner = conversationPartners[partnerId];
                            const convId = [currentUser.id, partnerId].sort().join('-');
                            const lastMessage = messages[convId]?.[messages[convId].length - 1];
                            return (
                                <div key={partnerId} onClick={() => setActiveConversationId(convId)} className={`p-3 rounded-md cursor-pointer ${activeConversationId === convId ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    <div className="font-semibold text-slate-800 dark:text-slate-200">{partner.name}</div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{lastMessage?.text || 'Sohbeti başlat...'}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    {activeConversationId ? (
                        <>
                            <div className="p-4 border-b flex-shrink-0 dark:border-slate-700">
                                <div className="font-semibold text-slate-800 dark:text-slate-200">{conversationPartners[activeConversationId.replace(currentUser.id, '').replace('-', '')]?.name}</div>
                            </div>
                            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                                {activeConversation.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.from === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.from === currentUser.id ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none dark:bg-slate-700 dark:text-slate-200'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t flex-shrink-0 bg-white dark:bg-slate-800 dark:border-slate-700">
                                <div className="flex items-center gap-2">
                                    <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={t.yourMessage} />
                                    <Button onClick={handleSend} className="bg-primary hover:bg-primary/90"><Send className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">{t.selectConversation}</div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default MessagesPage;
