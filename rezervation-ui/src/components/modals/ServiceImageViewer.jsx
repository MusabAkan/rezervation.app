import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServiceImageViewer({ isOpen, onClose, service }) {
    if (!service) return null;

    // Simulate having multiple images for a service
    const mockImages = [
        `https://placehold.co/600x400/e2e8f0/64748b?text=${service.name.replace(/\s/g, '+')}+1`,
        `https://placehold.co/600x400/cbd5e1/475569?text=${service.name.replace(/\s/g, '+')}+2`,
        `https://placehold.co/600x400/94a3b8/1e293b?text=${service.name.replace(/\s/g, '+')}+3`,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextImage = () => setCurrentIndex(prev => (prev + 1) % mockImages.length);
    const prevImage = () => setCurrentIndex(prev => (prev - 1 + mockImages.length) % mockImages.length);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{service.name} Görselleri</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <img src={mockImages[currentIndex]} alt={service.name} className="rounded-md w-full aspect-[3/2] object-cover" />
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                        <Button variant="secondary" size="icon" onClick={prevImage}><ChevronLeft className="h-5 w-5"/></Button>
                        <Button variant="secondary" size="icon" onClick={nextImage}><ChevronRight className="h-5 w-5"/></Button>
                    </div>
                </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Kapat</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}