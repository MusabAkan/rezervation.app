import React, {useMemo, useState} from 'react';
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader} from "../components/ui/card";
import {Avatar, AvatarFallback} from "../components/ui/avatar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs";
import {Input} from "../components/ui/input";
import {MapPin, Calendar, MessageSquare, ChevronLeft, ChevronRight, ThumbsUp, MessageCircleMore} from "lucide-react";
import Stars from '../components/common/Stars';
import AdBanner from '../components/common/AdBanner';
import {MOCK_SERVICES, INITIAL_FORUM_POSTS} from '../data/mockData';
import {formatCurrency} from '../utils/helpers';
import ServiceIcon from '../components/common/ServiceIcon';

function Review({name, rating, text}) {
    return (
        <div className="flex items-start gap-3">
            <Avatar><AvatarFallback>{name[0]}</AvatarFallback></Avatar>
            <div>
                <div className="flex items-center gap-2 text-sm font-medium">{name} <Stars value={rating}/></div>
                <p className="text-sm text-slate-600">{text}</p>
            </div>
        </div>
    );
}

export default function BusinessProfile({t, business, onBook}) {
    const services = MOCK_SERVICES[business.id] || [];
    const relatedPosts = INITIAL_FORUM_POSTS.filter(p => p.businessId === business.id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [serviceSearchQuery, setServiceSearchQuery] = useState('');

    const mockImages = useMemo(() => Array.from({length: 5}, (_, i) => `https://placehold.co/800x400/e2e8f0/64748b?text=${business.name.replace(/\s/g, '+')}+${i + 1}`), [business.name]);

    const nextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % mockImages.length);
    };
    const prevImage = () => {
        setCurrentImageIndex(prev => (prev - 1 + mockImages.length) % mockImages.length);
    };

    const filteredServices = useMemo(() => {
        return services.filter(s => s.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()));
    }, [services, serviceSearchQuery]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Card className="bg-white dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
                {/* Image Gallery */}
                <div className="relative w-full h-64 md:h-80 bg-slate-100 dark:bg-slate-800">
                    <img key={currentImageIndex} src={mockImages[currentImageIndex]}
                         alt={`${business.name} gallery image`}
                         className="w-full h-full object-cover animate-in fade-in-25"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <Button variant="secondary" size="icon"
                                className="rounded-full bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
                                onClick={prevImage}><ChevronLeft className="h-5 w-5"/></Button>
                        <Button variant="secondary" size="icon"
                                className="rounded-full bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
                                onClick={nextImage}><ChevronRight className="h-5 w-5"/></Button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <h1 className="text-3xl font-bold drop-shadow-lg">{business.name}</h1>
                        <p className="flex items-center gap-2 drop-shadow-md"><MapPin
                            className="h-4 w-4"/>{business.address}</p>
                    </div>
                </div>

                <CardHeader className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 -mt-16 z-10">
                            <AvatarFallback>{business.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 -mt-2">
                            <div className="flex items-center gap-2 mt-1"><Stars value={business.rating}/> <span
                                className="text-sm text-slate-500 dark:text-slate-400">({business.reviews} {t.reviews})</span>
                            </div>
                        </div>
                        <div className="flex sm:flex-row gap-2 w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90" asChild><a
                                href={`#book/${business.id}`}><Calendar className="mr-2 h-4 w-4"/> {t.bookNow}
                            </a></Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild><a
                                href={`#messages/${business.id}`}><MessageSquare
                                className="mr-2 h-4 w-4"/> {t.sendMessage}</a></Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <AdBanner t={t}/>
                    <Tabs defaultValue="about" className="mt-4">
                        <TabsList>
                            <TabsTrigger value="about">{t.about}</TabsTrigger>
                            <TabsTrigger value="services">{t.servicesMenu}</TabsTrigger>
                            <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
                            <TabsTrigger value="forum">{t.forumActivity}</TabsTrigger>
                            <TabsTrigger value="location">{t.location}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about" className="pt-4"><p>{business.description}</p></TabsContent>
                        <TabsContent value="services" className="pt-4">
                            <Input
                                placeholder={t.searchService}
                                value={serviceSearchQuery}
                                onChange={e => setServiceSearchQuery(e.target.value)}
                                className="mb-4"
                            />
                            <div className="space-y-4">
                                {filteredServices.length > 0 ? filteredServices.map(service => (
                                    <div key={service.id || service.name}
                                         className="flex gap-4 items-center p-3 rounded-lg border dark:border-slate-700">
                                        <img
                                            src={`https://placehold.co/80x80/e2e8f0/64748b?text=${service.name.slice(0, 1)}`}
                                            alt={service.name} className="w-16 h-16 rounded-md object-cover"/>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <ServiceIcon name={service.icon}/>
                                                <span className="font-semibold">{service.name}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-2">Bu hizmet için kısa
                                                açıklama alanı.</p>
                                        </div>
                                        <span className="font-semibold text-lg">{formatCurrency(service.price)}</span>
                                    </div>
                                )) : <p className="text-sm text-center text-slate-500 py-8">Arama kriterlerinize uygun
                                    hizmet bulunamadı.</p>}
                            </div>
                        </TabsContent>
                        <TabsContent value="reviews" className="pt-4">
                            {/* Mock Reviews for now */}
                            <div className="space-y-4">
                                <Review name="Mehmet K." rating={5}
                                        text="Harika işçilik, zamanında teslimat. Kesinlikle tavsiye ederim."/>
                                <Review name="Selin A." rating={4}
                                        text="Genel olarak memnun kaldım, iletişimleri iyiydi."/>
                            </div>
                        </TabsContent>
                        <TabsContent value="forum" className="pt-4">
                            <div className="space-y-4">
                                {relatedPosts.length > 0 ? relatedPosts.map(post => (
                                    <div key={post.id} className="p-3 rounded-lg border dark:border-slate-700">
                                        <p className="mb-2">"{post.text}"</p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="gap-2 flex items-center"><ThumbsUp
                                                className="h-4 w-4"/> {post.likes}</span>
                                            <span className="gap-2 flex items-center"><MessageCircleMore
                                                className="h-4 w-4"/> {post.replies} Yanıt</span>
                                        </div>
                                    </div>
                                )) : <p className="text-sm text-slate-500">{business.name} ile ilgili forum aktivitesi
                                    bulunmuyor.</p>}
                            </div>
                        </TabsContent>
                        <TabsContent value="location" className="pt-4">
                            <div
                                className="h-80 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-sm text-slate-500">
                                [Harita Simülasyonu - {business.address}]
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}