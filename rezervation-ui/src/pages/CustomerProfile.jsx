import React from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Stars from '../components/common/Stars';
import { formatCurrency } from '../utils/helpers';

export default function CustomerProfile({ t, user, appointments, onRate }) {
    const upcoming = appointments.filter(a => a.customerId === user.id && ['confirmed', 'pending'].includes(a.status));
    const past = appointments.filter(a => a.customerId === user.id && ['completed', 'noshow'].includes(a.status));
    
    return (
        <div id="profile" className="max-w-4xl mx-auto px-4 py-8">
            <Card className="bg-white dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-20 w-20"><AvatarImage src={user.photo} /><AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <div><CardTitle className="text-2xl">{user.name}</CardTitle><div className="flex items-center gap-2 mt-1"><span className="text-sm text-slate-500 dark:text-slate-400">{t.customerRating}:</span><Stars value={user.rating} /></div></div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="upcoming">
                        <TabsList><TabsTrigger value="upcoming">{t.upcomingAppointments}</TabsTrigger><TabsTrigger value="past">{t.pastAppointments}</TabsTrigger></TabsList>
                        <TabsContent value="upcoming" className="mt-4 space-y-3">
                            {upcoming.length > 0 ? upcoming.map(a => (<div key={a.id} className="p-3 rounded-lg border flex items-center justify-between dark:border-slate-700"><div><div className="font-medium">{a.businessName} - {a.services[0].name}{a.services.length > 1 ? ` ve ${a.services.length-1} diğer...` : ''}</div><div className="text-sm text-slate-500 dark:text-slate-400">{a.date} @ {a.time} - Toplam: {formatCurrency(a.totalPrice)}</div></div><Button variant="outline">Detay / İptal</Button></div>)) : <p className="text-sm text-center text-slate-500 py-4">Yaklaşan randevunuz bulunmuyor.</p>}
                        </TabsContent>
                        <TabsContent value="past" className="mt-4 space-y-3">
                            {past.length > 0 ? past.map(a => (<div key={a.id} className="p-3 rounded-lg border flex items-center justify-between dark:border-slate-700"><div><div className="font-medium">{a.businessName} - {a.services[0].name}{a.services.length > 1 ? ` ve ${a.services.length-1} diğer...` : ''}</div><div className="text-sm text-slate-500 dark:text-slate-400">{a.date}</div></div>{ a.status === 'completed' && <Button onClick={() => onRate(a)} disabled={a.rated}>{a.rated ? t.alreadyRated : t.rateService}</Button>}</div>)) : <p className="text-sm text-center text-slate-500 py-4">Geçmiş randevunuz bulunmuyor.</p>}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}