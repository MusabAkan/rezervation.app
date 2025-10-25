import React from 'react';
import {Button} from "../ui/button";
import {X} from "lucide-react";

export default function Toast({message, onDismiss}) {
    if (!message) return null;
    return (
        <div
            className="fixed bottom-5 right-5 bg-slate-900 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-4 animate-in slide-in-from-bottom dark:bg-slate-100 dark:text-slate-900">
            <span>{message}</span>
            <Button variant="ghost" size="icon" onClick={onDismiss}
                    className="h-6 w-6 text-white hover:bg-slate-700 hover:text-white dark:text-slate-900 dark:hover:bg-slate-200"><X
                className="h-4 w-4"/></Button>
        </div>
    );
}