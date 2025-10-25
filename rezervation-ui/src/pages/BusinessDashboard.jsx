import React, { useMemo, useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Edit, Trash2, PlusCircle, Settings, MapPin } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Pagination from '../components/common/Pagination';
import AddServiceModal from '../components/modals/AddServiceModal';
import { formatCurrency } from '../utils/helpers';
import { CATEGORIES } from '../data/mockData';
import ServiceIcon from '../components/common/ServiceIcon';

function Stat({ label, value }){ 
  return (<div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700"><div className="text-xs text-slate-500 dark:text-slate-400">{label}</div><div className="text-xl font-semibold text-slate-800 dark:text-slate-200">{value}</div></div>);
}

function ServicesManagementTab({ t, services, onSaveService, business }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [filter, setFilter] = useState({ q: '', subCategory: 'all' });
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 5;
    
    const subCategories = useMemo(() => {
        if (!business) return [];
        const category = CATEGORIES.find(c => c.id === business.category);
        return category ? category.subs : [];
    }, [business]);

    const openModal = (service = null) => {
        setEditingService(service);
        setModalOpen(true);
    };

    const filteredServices = useMemo(() => {
        return services.filter(s => 
            s.name.toLowerCase().includes(filter.q.toLowerCase()) &&
            (filter.subCategory === 'all' || s.subCategory === filter.subCategory)
        );
    }, [services, filter]);

    const paginatedServices = useMemo(() => {
        const startIndex = (currentPage - 1) * servicesPerPage;
        return filteredServices.slice(startIndex, startIndex + servicesPerPage);
    }, [filteredServices, currentPage]);

    const totalPages = Math.ceil(filteredServices.length / servicesPerPage) || 1;
    
    const getStatusBadge = (status) => {
      switch(status) {
        case 'yeni': return <Badge variant="secondary">{t.status_new}</Badge>;
        case 'indirim': return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{t.status_discount}</Badge>;
        case 'zam': return <Badge variant="destructive">{t.status_increase}</Badge>;
        default: return null;
      }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                    <Input placeholder={t.searchService} value={filter.q} onChange={e => { setFilter({...filter, q: e.target.value }); setCurrentPage(1); }} className="w-auto sm:w-64" />
                     <Select value={filter.subCategory} onValueChange={v => { setFilter({...filter, subCategory: v }); setCurrentPage(1); }}>
                        <SelectTrigger className="w-auto sm:w-[220px]">
                            <SelectValue placeholder={t.filterBySubCategory} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t.allSubCategories}</SelectItem>
                            {subCategories.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => openModal()} className="bg-primary hover:bg-primary/90"><PlusCircle className="mr-2 h-4 w-4" /> {t.addNewService}</Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y dark:divide-slate-800">
                        {paginatedServices.map(service => (
                             <div key={service.id} className={`flex gap-4 items-center p-3 ${!service.active ? 'opacity-50' : ''}`}>
                                <img src={`https://placehold.co/80x80/e2e8f0/64748b?text=${service.name.slice(0,1)}`} alt={service.name} className="w-12 h-12 rounded-md object-cover hidden sm:block" />
                                <div className="flex items-center gap-2">
                                  <ServiceIcon name={service.icon} />
                                  <div className="flex-1">
                                    <p className="font-semibold">{service.name}</p>
                                    <div className="flex items-center gap-2">
                                      <p className={`font-bold text-base ${service.status === 'indirim' ? 'text-green-600' : service.status === 'zam' ? 'text-red-600' : ''}`}>{formatCurrency(service.price)}</p>
                                      {service.oldPrice && <p className="text-sm line-through text-slate-500">{formatCurrency(service.oldPrice)}</p>}
                                    </div>
                                  </div>
                                </div>
                                <div className="ml-auto flex items-center gap-2 text-sm">
                                  {service.subCategory && <Badge variant="outline">{service.subCategory}</Badge>}
                                  {getStatusBadge(service.status)}
                                  <Badge variant={service.active ? 'default' : 'outline'} className={service.active ? 'bg-primary/20 text-primary border-primary/30' : ''}>{service.active ? t.active : t.passive}</Badge>
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => openModal(service)}><Edit className="mr-2 h-4 w-4" />{t.editService}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onSaveService(business.id, {...service, active: !service.active})}>
                                            <Switch checked={!service.active} className="mr-2 h-4 w-4" readOnly/> 
                                            {service.active ? t.deactivateService : 'Aktive et'}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/> Sil</DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
            <AddServiceModal t={t} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={(s) => onSaveService(business.id, s)} service={editingService} business={business}/>
        </div>
    );
}

export default function BusinessDashboard({ t, currentUser, appointments, onUpdateStatus, services, onSaveService, onArrivalStatus, business }) {
    const pendingAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'pending');
    const today_str = '2025-10-22'; // Hardcoded for demo
    const todaysAppointments = appointments.filter(a => a.businessId === currentUser.id && a.status === 'confirmed' && a.date === today_str);


    const chartData = [
      { name: 'Ocak', ciro: 4000, gider: 2400 }, { name: 'Şubat', ciro: 3000, gider: 1398 },
      { name: 'Mart', ciro: 2000, gider: 9800 }, { name: 'Nisan', ciro: 2780, gider: 3908 },
      { name: 'Mayıs', ciro: 1890, gider: 4800 }, { name: 'Haziran', ciro: 2390, gider: 3800 },
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
                                <Stat label={t.revenue} value="₺12,450" />
                                <Stat label={t.expenses} value="₺4,820" />
                                <Stat label={t.profit} value="₺7,630" />
                            </div>
                           {todaysAppointments.length > 0 && (
                                <Card className="border-orange-500/50">
                                <CardHeader><CardTitle className="text-orange-600">{t.appointmentToday}</CardTitle></CardHeader>
                                <CardContent className="space-y-2">
                                     {todaysAppointments.map(a => (
                                        <div key={a.id} className="p-2 rounded-lg border dark:border-slate-700">
                                            <p className="text-sm font-medium">{a.customerName} - {a.time}</p>
                                            <p className="text-xs text-slate-500">{a.services.map(s => `${s.name} x${s.quantity}`).join(', ')}</p>
                                            {a.address && <p className="text-xs text-blue-500 mt-1"><MapPin className="inline h-3 w-3 mr-1" /> {a.address}</p>}
                                            {a.notes && <p className="text-xs italic text-slate-500 mt-1">Not: {a.notes}</p>}
                                            <p className="text-sm font-bold mt-1">{formatCurrency(a.totalPrice)}</p>
                                            <p className="text-xs text-slate-500 mt-2">{t.serviceStatus}</p>
                                            <div className="flex gap-2 mt-1">
                                                <Button size="sm" onClick={() => onArrivalStatus(a.id, true)} className="w-full bg-green-600 hover:bg-green-700">{t.serviceDone}</Button>
                                                <Button size="sm" variant="outline" onClick={() => onArrivalStatus(a.id, false)} className="w-full">{t.serviceNotDone}</Button>
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
                                            <p className="text-sm font-medium">{a.customerName} - {a.services[0].name}{a.services.length > 1 ? ` ve ${a.services.length-1} diğer...` : ''}</p>
                                            <p className="text-xs text-slate-500">{a.date} @ {a.time} - Toplam: {formatCurrency(a.totalPrice)}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Button size="sm" onClick={() => onUpdateStatus(a.id, 'confirmed')} className="w-full">{t.approve}</Button>
                                                <Button size="sm" variant="outline" onClick={() => onUpdateStatus(a.id, 'declined')} className="w-full">{t.decline}</Button>
                                            </div>
                                        </div>
                                    )) : <p className="text-sm text-slate-500 text-center py-4">{t.noPendingAppointments}</p>}
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                           <CardHeader><CardTitle>{t.aiInsights}</CardTitle></CardHeader>
                           <CardContent><p className="text-sm">Yapay zeka analizine göre, Salı günleri en yoğun gününüz. Bu güne özel kampanyalar düzenleyerek gelirinizi %15 artırabilirsiniz.</p></CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="services" className="mt-6">
                    <ServicesManagementTab t={t} services={services} onSaveService={onSaveService} business={business} />
                </TabsContent>
                <TabsContent value="personnel" className="mt-6">
                    <div className="text-center py-16 text-slate-500">Personel Yönetimi modülü yakında burada olacak.</div>
                </TabsContent>
                <TabsContent value="accounting" className="mt-6">
                     <Card>
                        <CardHeader><CardTitle>Son 6 Aylık Finansal Özet</CardTitle></CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="ciro" stroke="hsl(var(--primary-hsl))" />
                                    <Line type="monotone" dataKey="gider" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}