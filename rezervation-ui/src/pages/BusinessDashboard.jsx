import React, {useMemo, useState} from 'react';
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs";
import {Edit, Trash2, PlusCircle, Settings, MapPin} from "lucide-react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import {formatCurrency} from '../utils/helpers';
import ServicesManagementTab from '../components/modals/ServicesManagementTab'; // ServicesManagementTab yeni konumundan import edildi

function Stat({label, value}) {
    return (<div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
        <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
        <div className="text-xl font-semibold text-slate-800 dark:text-slate-200">{value}</div>
    </div>);
}

// ServicesManagementTab bileşeni buradan kaldırıldı ve kendi dosyasına taşındı.

export default function BusinessDashboard({
                                              t,
                                              currentUser,
                                              appointments,
                                              onUpdateStatus,
                                              services,
                                              onSaveService,
                                              onArrivalStatus,
                                              business
                                          }) {
    const pendingAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'pending');
    const today_str = '2025-10-22'; // Hardcoded for demo
    const todaysAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'confirmed' && a.date === today_str);


    const chartData = [
        {name: 'Ocak', ciro: 4000, gider: 2400}, {name: 'Şubat', ciro: 3000, gider: 1398},
        {name: 'Mart', ciro: 2000, gider: 9800}, {name: 'Nisan', ciro: 2780, gider: 3908},
        {name: 'Mayıs', ciro: 1890, gider: 4800}, {name: 'Haziran', ciro: 2390, gider: 3800},
    ];

    return (
        <div id="dashboard" className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{t.dashboard}</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{currentUser.name}</p>

            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                    <TabsTrigger value="services">{t.servicesManagement}</TabsTrigger>
                    <TabsTrigger value="personnel">{t.personnel}</TabsTrigger>
                    <TabsTrigger value="accounting">{t.accounting}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <Stat label={t.revenue} value="₺12,450"/>
                                <Stat label={t.expenses} value="₺4,820"/>
                                <Stat label={t.profit} value="₺7,630"/>
                            </div>
                            {todaysAppointments.length > 0 && (
                                <Card className="border-orange-500/50">
                                    <CardHeader><CardTitle className="text-orange-600">{t.appointmentToday}</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        {todaysAppointments.map(a => (
                                            <div key={a.id} className="p-2 rounded-lg border dark:border-slate-700">
                                                <p className="text-sm font-medium">{a.customerName} - {a.time}</p>
                                                <p className="text-xs text-slate-500">{a.services.map(s => `${s.name} x${s.quantity}`).join(', ')}</p>
                                                {a.address && <p className="text-xs text-blue-500 mt-1"><MapPin
                                                    className="inline h-3 w-3 mr-1"/> {a.address}</p>}
                                                {a.notes &&
                                                    <p className="text-xs italic text-slate-500 mt-1">Not: {a.notes}</p>}
                                                <p className="text-sm font-bold mt-1">{formatCurrency(a.totalPrice)}</p>
                                                <p className="text-xs text-slate-500 mt-2">{t.serviceStatus}</p>
                                                <div className="flex gap-2 mt-1">
                                                    <Button size="sm" onClick={() => onArrivalStatus(a.id, true)}
                                                            className="w-full bg-green-600 hover:bg-green-700">{t.serviceDone}</Button>
                                                    <Button size="sm" variant="outline"
                                                            onClick={() => onArrivalStatus(a.id, false)}
                                                            className="w-full">{t.serviceNotDone}</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                            <Card>
                                <CardHeader><CardTitle>{t.approveDeclineQueue}</CardTitle></CardHeader>
                                <CardContent className="space-y-2">
                                    {pendingAppointments.length > 0 ? pendingAppointments.map(a => (
                                            <div key={a.id} className="p-2 rounded-lg border dark:border-slate-700">
                                                <p className="text-sm font-medium">{a.customerName} - {a.services[0].name}{a.services.length > 1 ? ` ve ${a.services.length - 1} diğer...` : ''}</p>
                                                <p className="text-xs text-slate-500">{a.date} @ {a.time} -
                                                    Toplam: {formatCurrency(a.totalPrice)}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Button size="sm" onClick={() => onUpdateStatus(a.id, 'confirmed')}
                                                            className="w-full">{t.approve}</Button>
                                                    <Button size="sm" variant="outline"
                                                            onClick={() => onUpdateStatus(a.id, 'declined')}
                                                            className="w-full">{t.decline}</Button>
                                                </div>
                                            </div>
                                        )) :
                                        <p className="text-sm text-slate-500 text-center py-4">{t.noPendingAppointments}</p>}
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader><CardTitle>{t.aiInsights}</CardTitle></CardHeader>
                            <CardContent><p className="text-sm">Yapay zeka analizine göre, Salı günleri en yoğun
                                gününüz. Bu güne özel kampanyalar düzenleyerek gelirinizi %15 artırabilirsiniz.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="services" className="mt-6">
                    <ServicesManagementTab t={t} services={services} onSaveService={onSaveService} business={business}/>
                </TabsContent>
                <TabsContent value="personnel" className="mt-6">
                    <div className="text-center py-16 text-slate-500">Personel Yönetimi modülü yakında burada olacak.
                    </div>
                </TabsContent>
                <TabsContent value="accounting" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>Son 6 Aylık Finansal Özet</CardTitle></CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="ciro" stroke="hsl(var(--primary-hsl))"/>
                                    <Line type="monotone" dataKey="gider" stroke="#82ca9d"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}