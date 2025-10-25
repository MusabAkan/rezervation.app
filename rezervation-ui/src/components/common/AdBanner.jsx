import React from 'react';

export default function AdBanner({ t }) {
    return (
        <div className="w-full h-24 bg-slate-200 dark:bg-slate-700/50 rounded-lg flex items-center justify-center my-4">
            <p className="text-slate-500 text-sm">[Reklam Alanı]</p>
        </div>
    );
}