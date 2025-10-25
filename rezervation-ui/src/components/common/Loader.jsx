import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Sparkles className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Yükleniyor...</p>
            </div>
        </div>
    );
}