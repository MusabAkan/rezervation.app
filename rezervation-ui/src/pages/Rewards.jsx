import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Video, Award } from "lucide-react";

export default function Rewards({t}) {
    const [points, setPoints] = useState(150);

    return (
        <div id="rewards" className="max-w-4xl mx-auto px-4 py-8">
            <Card>
                <CardHeader><CardTitle>{t.rewards}</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t.yourPoints}</p>
                        <p className="text-4xl font-bold">{points}</p>
                        <Button className="mt-4 w-full sm:w-auto bg-primary hover:bg-primary/90" onClick={() => setPoints(p => p + 10)}><Video className="mr-2 h-4 w-4"/>{t.watchAdForPoints}</Button>
                    </div>
                     <Card className="bg-gradient-to-r from-primary to-indigo-600 text-white">
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> {t.pilotBusiness}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-2xl font-bold">Mavi Berber</p>
                            <p className="text-lg font-semibold">{t.extraDiscount}</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}