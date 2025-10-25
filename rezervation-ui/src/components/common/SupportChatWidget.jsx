import React, {useState} from 'react';
import {Button} from "../ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Input} from "../ui/input";
import {X, MessageSquare, Sparkles, User, Send} from "lucide-react";

export default function SupportChatWidget({t}) {
    const [isOpen, setIsOpen] = useState(false);
    const [chatState, setChatState] = useState('initial'); // 'initial', 'live', 'ai'

    const handleToggle = () => {
        if (isOpen) {
            // Pencere kapanirken durumu sıfırla
            setTimeout(() => setChatState('initial'), 300);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-5 right-5 z-40">
            {isOpen && (
                <Card
                    className="w-80 h-96 flex flex-col shadow-lg mb-2 bg-white dark:bg-slate-900 dark:border-slate-700">
                    <CardHeader
                        className="flex-row items-center justify-between p-3 bg-slate-800 text-white rounded-t-lg dark:bg-slate-700">
                        <CardTitle className="text-base font-semibold">{t.technicalSupport}</CardTitle>
                        <Button variant="ghost" size="icon"
                                className="h-7 w-7 text-white hover:bg-slate-700 hover:text-white dark:hover:bg-slate-600"
                                onClick={handleToggle}><X className="h-4 w-4"/></Button>
                    </CardHeader>

                    {chatState === 'initial' ? (
                        <CardContent className="flex flex-col items-center justify-center flex-grow p-4 gap-4">
                            <p className="text-center text-sm text-slate-600 dark:text-slate-300">{t.supportWelcome}</p>
                            <Button className="w-full bg-primary hover:bg-primary/90"
                                    onClick={() => setChatState('ai')}><Sparkles
                                className="mr-2 h-4 w-4"/> {t.aiAssistant}</Button>
                            <Button variant="outline" className="w-full" onClick={() => setChatState('live')}><User
                                className="mr-2 h-4 w-4"/> {t.liveSupport}</Button>
                        </CardContent>
                    ) : (
                        <>
                            <CardContent className="p-3 flex-grow overflow-y-auto space-y-3">
                                <div className="flex justify-start">
                                    <div
                                        className="bg-slate-100 p-2 rounded-lg max-w-xs dark:bg-slate-700">Merhaba, {chatState === 'ai' ? 'Yapay Zeka Asistanı' : 'Canlı Destek'} olarak
                                        nasıl yardımcı olabilirim?
                                    </div>
                                </div>
                                _BOS_ <div className="flex justify-end">
                                <div className="bg-primary text-primary-foreground p-2 rounded-lg max-w-xs">Randevu
                                    iptali hakkında bilgi almak istiyorum.
                                </div>
                            </div>
                            </CardContent>
                            <div className="p-3 border-t dark:border-slate-700">
                                <div className="flex items-center gap-2">
                                    _BOS_ <Input placeholder={t.yourMessage}/>
                                    <Button size="icon" className="bg-primary hover:bg-primary/90"><Send
                                        className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        </>
                    )}
                </Card>
            )}
            <Button className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90" onClick={handleToggle}>
                {isOpen ? <X className="h-7 w-7"/> : <MessageSquare className="h-7 w-7"/>}
            </Button>
        </div>
    );
}