import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, PlusCircle, Settings, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/components/@/components/utils/formatters';
import AddServiceModal from '../modals/AddServiceModal.jsx';
import { CATEGORIES } from '../../data/mockData';
import { ServiceIcon } from '../common/ServiceIcon';
import Pagination from '../common/Pagination';

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

export default ServicesManagementTab;
