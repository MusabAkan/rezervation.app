import React from 'react';
import {Button} from "../ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Badge} from "../ui/badge";
import {Search, Video, ShieldCheck, Earth} from "lucide-react";
import Stars from '../common/Stars';
import {INITIAL_BUSINESSES_DATA} from '../../data/mockData';
import {dict} from '../../i18n';

export default function Hero({t}) {
    return (
        <div className="bg-slate-50 border-b dark:bg-slate-800/50 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">{t.heroTitle}</h1>
                    <p className="mt-4 text-slate-600 md:text-lg dark:text-slate-400">{t.heroSub}</p>
                    <div className="mt-8 flex gap-3">
                        <a href="#explore"><Button size="lg" className="gap-2 bg-primary hover:bg-primary/90"><Search
                            className="h-4 w-4"/>{t.getStarted}</Button></a>
                        <Button size="lg" variant="outline" className="gap-2"><Video className="h-4 w-4"/> Demo</Button>
                    </div>
                    <div className="mt-8 flex items-center gap-4 text-slate-600 text-sm dark:text-slate-400">
                        <div className="flex items-center gap-2"><ShieldCheck className="text-primary"/> KVKK & GDPR
                            Uyumlu
                        </div>
                        <div className="flex items-center gap-2"><Earth className="text-green-500"/> Global Çok Dillilik
                        </div>
                    </div>
                </div>
                <Card className="shadow-sm hidden md:block bg-white/50 dark:bg-slate-800/50"><CardHeader><CardTitle
                    className="text-base font-semibold">Trendler</CardTitle></CardHeader><CardContent>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4">{INITIAL_BUSINESSES_DATA.slice(0, 2).map((b) => (
                        <div key={b.id}
                             className="p-4 rounded-lg border bg-white dark:bg-slate-700/50 dark:border-slate-600 hover:shadow-md transition">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-medium text-slate-800 dark:text-slate-200">{b.name}</div>
                                    <Stars value={b.rating}/></div>
                                <Badge variant="secondary">{b.distanceKm} {dict.tr.km}</Badge></div>
                            <div
                                className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{b.description}</div>
                        </div>))}</div>
                </CardContent></Card>
            </div>
        </div>
    );
}