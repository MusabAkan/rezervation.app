import React, {useState, useEffect} from 'react';
import {Button} from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "../ui/dialog";
import {Textarea} from "../ui/textarea";
import Stars from '../common/Stars';

export default function RatingModal({t, isOpen, onClose, onSubmit, appointment}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setComment('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit(appointment, rating, comment);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t.rateService}: {appointment?.businessName}</DialogTitle>
                    <DialogDescription className="sr-only">{t.yourComment}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <label className="text-sm font-medium">{t.yourRating}</label>
                        <div className="mt-2 flex justify-center"><Stars value={rating} setValue={setRating}
                                                                         interactive={true}/></div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">{t.yourComment}</label>
                        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">İptal</Button></DialogClose>
                    <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90"
                            disabled={rating === 0}>{t.submitReview}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}