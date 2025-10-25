import React, { useMemo, useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Camera, MinusCircle, PlusCircle } from "lucide-react";
import { ServerEndpoints } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
import ServiceImageModal from './ServiceImageModal.jsx';
import ServiceIcon from '../common/ServiceIcon';

export default function BookingModal({ t, lang, b, onClose, onBook, servicesData }){ 
  const [step, setStep] = useState(1); // 1: Calendar, 2: Services
  const [currentDate, setCurrentDate] = useState(new Date('2025-10-11'));
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [order, setOrder] = useState({}); // { serviceId: quantity }
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingService, setViewingService] = useState(null);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const services = useMemo(() => servicesData[b.id] || [], [servicesData, b.id]);

  const filteredServices = useMemo(() => {
    return services.filter(s => s.active && s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [services, searchQuery]);

  const total = useMemo(() => {
    return Object.keys(order).reduce((acc, serviceId) => {
        const service = services.find(s => s.id === serviceId);
        const quantity = order[serviceId];
        if (service && quantity > 0) {
            return acc + service.price * quantity;
        }
        return acc;
    }, 0);
  }, [order, services]);

  const isRemoteServiceSelected = useMemo(() => {
      return Object.keys(order).some(id => {
          const service = services.find(s => s.id === id);
          return service && order[id] > 0 && service.isRemote;
      });
  }, [order, services]);

  useEffect(() => {
    const fetchAvailability = async () => {
        if (!b) return;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthAvailability = await ServerEndpoints.getCalendarAvailability(b.id, year, month);
        setAvailability(monthAvailability);
    };
    fetchAvailability();
  }, [b, currentDate]);

  const handleDateSelect = async (day, status) => {
      if (status === 'full' || !status) return;
      const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newSelectedDate);
      setAvailableTimes([]);
      setSelectedTime('');
      const times = await ServerEndpoints.getAvailableTimes(b.id, newSelectedDate.toISOString().split('T')[0]);
      setAvailableTimes(times);
  };
  
  const handleBookClick = () => {
    const orderedServices = Object.keys(order).map(id => {
        const service = services.find(s => s.id === id);
        return { ...service, quantity: order[id] };
    }).filter(s => s.quantity > 0);

    onBook(b, selectedDate.toISOString().split('T')[0], selectedTime, orderedServices, total, address, notes);
    onClose();
  };

  const handleOrderChange = (serviceId, amount) => {
    setOrder(prev => {
        const newQuantity = (prev[serviceId] || 0) + amount;
        if(newQuantity < 0) return prev;
        return { ...prev, [serviceId]: newQuantity };
    });
  };

  const CalendarGrid = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const today = new Date();

    const dayStatusClasses = {
        full: 'bg-red-100 text-red-400 cursor-not-allowed dark:bg-red-900/30',
        partial: 'bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50',
        available: 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50',
    };

    let days = [];
    for (let i = 0; i < startOffset; i++) days.push(<div key={`empty-${i}`}></div>);
    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
        const status = availability[day] || (new Date(year, month, day) < today ? 'full' : 'available');
        const isPast = new Date(year, month, day) < new Date(today.toDateString());

        days.push(
            <div key={day} onClick={() => handleDateSelect(day, isPast ? 'full' : status)}
                 className={`relative flex items-center justify-center h-10 text-sm rounded-full transition-colors ${ isSelected ? 'bg-primary text-white' : isPast ? 'text-slate-400 cursor-not-allowed dark:text-slate-600' : dayStatusClasses[status] }`}>
                {day}
                {!isSelected && !isPast && status && <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${status === 'full' ? 'bg-red-500' : status === 'partial' ? 'bg-amber-500' : 'bg-green-500'}`}></span>}
            </div>
        );
    }
    return <div className="grid grid-cols-7 gap-1 text-center">{days}</div>;
  };
  
  if(!b) return null;

  return (
    <Dialog open={!!b} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
            <DialogTitle>{t.booking}: {b.name}</DialogTitle>
            <DialogDescription className="sr-only">{b.description}</DialogDescription>
        </DialogHeader>
        { step === 1 ? ( 
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div>
                <h3 className="font-semibold mb-2">{t.selectDate}</h3>
                <div className="p-3 rounded-lg border dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}><ChevronLeft className="h-4 w-4" /></Button>
                        <div className="font-semibold">{new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(currentDate)}</div>
                        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2 dark:text-slate-400">
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <CalendarGrid />
                    <div className="flex justify-around text-xs mt-2">
                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500"></span>{t.day_available}</div>
                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500"></span>{t.day_partial}</div>
                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"></span>{t.day_full}</div>
                    </div>
                </div>
            </div>
            <div>
                 <h3 className="font-semibold mb-2">{t.selectTime}</h3>
                {selectedDate && (
                    <div className="p-3 rounded-lg border h-full animate-in fade-in-50 dark:border-slate-700">
                        <p className="text-sm font-semibold mb-3">{new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(selectedDate)}</p>
                        <div className="grid grid-cols-3 gap-2">
                            {availableTimes.length > 0 ? availableTimes.map(time => (
                                <Button key={time} variant={selectedTime === time ? 'default' : 'outline'} className={selectedTime === time ? 'bg-primary text-primary-foreground' : ''} onClick={() => setSelectedTime(time)}>
                                    {time}
                                </Button>
                            )) : <p className="text-sm text-slate-500 col-span-3 dark:text-slate-400">Bu tarih için müsait saat bulunmuyor.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
        ) : (
            <div className="grid md:grid-cols-2 gap-6 py-4">
                <div>
                    <h3 className="font-semibold mb-2">{t.selectServices}</h3>
                    <div className="p-3 rounded-lg border h-96 dark:border-slate-700 flex flex-col">
                        <Input 
                            placeholder={t.searchService}
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)}
                            className="mb-2"
                        />
                         <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                            {filteredServices.map(service => (
                                <div key={service.id} className="flex items-center justify-between p-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
                                     <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => setViewingService(service)}>
                                            <Camera className="h-4 w-4 text-slate-500" />
                                        </Button>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate" title={service.name}>{service.name}</p>
                                            <p className="text-sm text-slate-500">{formatCurrency(service.price)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleOrderChange(service.id, -1)}><MinusCircle className="h-4 w-4"/></Button>
                                        <span className="w-6 text-center">{order[service.id] || 0}</span>
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleOrderChange(service.id, 1)}><PlusCircle className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">{t.bookingSummary}</h3>
                    <div className="p-3 rounded-lg border h-96 dark:border-slate-700 flex flex-col">
                         <div className="text-sm font-medium mb-2">{new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(selectedDate)} @ {selectedTime}</div>
                         <div className="flex-grow space-y-2 overflow-y-auto pr-2">
                            {Object.keys(order).map(id => {
                                const s = services.find(s => s.id === id);
                                if(!s || !order[id]) return null;
                                return (
                                    <div key={id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 truncate">
                                          <ServiceIcon name={s.icon} className="flex-shrink-0"/>
                                          <span className="truncate pr-2">{s.name} x {order[id]}</span>
                                        </div>
                                        <span className="flex-shrink-0">{formatCurrency(s.price * order[id])}</span>
                                    </div>
                                )
                            })}
                         </div>
                         {isRemoteServiceSelected && (
                             <div className="mt-2 pt-2 border-t dark:border-slate-700 space-y-2">
                                <Textarea placeholder={t.serviceAddress} value={address} onChange={e => setAddress(e.target.value)} />
                                <Button variant="outline" size="sm" className="w-full" onClick={() => setAddress('Simülasyon: Kartal, İstanbul, 34876')}>{t.shareLocationInfo}</Button>
                                <Textarea placeholder={t.specialNotes} value={notes} onChange={e => setNotes(e.target.value)} />
                             </div>
                         )}
                         <div className="border-t pt-2 mt-2 dark:border-slate-700">
                            <div className="flex justify-between font-bold text-lg">
                                <span>{t.grandTotal}</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        )}
        <DialogFooter>
            <Button variant="ghost" onClick={step === 1 ? onClose : () => setStep(1)}>{step === 1 ? 'İptal' : t.back}</Button>
            {step === 1 ? (
                <Button onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90" disabled={!selectedTime || !selectedDate}>
                    Hizmet Seç <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            ) : (
                <Button onClick={handleBookClick} className="bg-primary hover:bg-primary/90" disabled={total === 0 || (isRemoteServiceSelected && !address)}>
                    <Calendar className="h-4 w-4 mr-2" />{t.bookNow}
                </Button>
            )}
        </DialogFooter>
         {viewingService && <ServiceImageModal isOpen={!!viewingService} onClose={() => setViewingService(null)} service={viewingService} />}
      </DialogContent>
    </Dialog>
  );
}