import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/button.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog.jsx';
import { Input } from '../ui/input.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx';
import { Checkbox } from '../ui/checkbox.jsx';
import { Upload, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData.jsx';
import { serviceIcons } from '../common/ServiceIcon.jsx';

function AddServiceModal({ isOpen, onClose, onSave, service, t, business }) {
    const isEditing = !!service?.id;
    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);

    const subCategories = useMemo(() => {
        if (!business) return [];
        const category = CATEGORIES.find(c => c.id === business.category);
        return category ? category.subs : [];
    }, [business]);

    useEffect(() => {
        const defaultState = { name: '', price: '', currency: '₺', unit: 'Adet', description: '', icon: 'Package', isRemote: false, subCategory: '' };
        if (service) {
            setFormData({
                name: service.name || '',
                price: service.price || '',
                currency: service.currency || '₺',
                unit: service.unit || 'Adet',
                description: service.description || '',
                icon: service.icon || 'Package',
                isRemote: service.isRemote || false,
                subCategory: service.subCategory || '',
            });
            setImages(service.id ? ['gorsel1.jpg', 'gorsel2.jpg'] : []);
        } else {
             setFormData(defaultState);
             setImages([]);
        }
    }, [service]);

    const handleSave = () => {
        onSave({ id: service?.id, ...formData, price: parseFloat(formData.price) });
        onClose();
    };

    const handleImageUpload = () => {
        if (images.length < 5) {
            setImages(prev => [...prev, `gorsel${prev.length + 1}.jpg`]);
        }
    };
    
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? t.editService : t.addNewService}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm font-medium">{t.serviceName}</label>
                        <Input id="name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subCategory" className="text-right text-sm font-medium">{t.subCategory}</label>
                        <Select value={formData.subCategory} onValueChange={v => setFormData({...formData, subCategory: v})}>
                            <SelectTrigger className="col-span-3"><SelectValue placeholder={t.selectSubCategory} /></SelectTrigger>
                            <SelectContent>
                                {subCategories.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="price" className="text-right text-sm font-medium">{t.price}</label>
                        <Input id="price" type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="col-span-2" />
                         <Select value={formData.currency} onValueChange={v => setFormData({...formData, currency: v})}>
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="₺">₺</SelectItem><SelectItem value="$">$</SelectItem><SelectItem value="€">€</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                         <label htmlFor="unit" className="text-right text-sm font-medium">{t.unit}</label>
                         <Select value={formData.unit} onValueChange={v => setFormData({...formData, unit: v})}>
                            <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="Adet">{t.unit_piece}</SelectItem><SelectItem value="Saat">{t.unit_hour}</SelectItem><SelectItem value="Litre">{t.unit_litre}</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right text-sm font-medium">{t.description}</label>
                        <Textarea id="description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="icon" className="text-right text-sm font-medium">{t.serviceIcon}</label>
                        <Select value={formData.icon} onValueChange={v => setFormData({...formData, icon: v})}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="İkon seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(serviceIcons).map(iconName => (
                                    <SelectItem key={iconName} value={iconName}>
                                        <div className="flex items-center gap-2">
                                            <ServiceIcon name={iconName} />
                                            <span>{iconName}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-sm font-medium"></span>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Checkbox id="isRemote" checked={formData.isRemote} onCheckedChange={c => setFormData({...formData, isRemote: c})} />
                            <label htmlFor="isRemote" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t.serviceAtCustomerLocation}</label>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                         <label className="text-right text-sm font-medium pt-2">{t.serviceImages}</label>
                         <div className="col-span-3">
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                {images.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img src={`https://placehold.co/100x100/e2e8f0/64748b?text=${img}`} alt={img} className="rounded-md" />
                                        <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeImage(i)}><Trash2 className="h-3 w-3"/></Button>
                                    </div>
                                ))}
                            </div>
                            {images.length < 5 && <Button variant="outline" onClick={handleImageUpload} className="w-full"><Upload className="h-4 w-4 mr-2"/> {t.uploadImages}</Button>}
                         </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">İptal</Button></DialogClose>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">{t.saveChanges}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddServiceModal;
