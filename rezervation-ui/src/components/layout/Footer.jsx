import React from 'react';

export default function Footer({t}) {
    return (
        <footer className="p-4 text-center text-sm text-slate-500 dark:text-slate-400 border-t dark:border-slate-800">
            <p>© {new Date().getFullYear()} {t.appName}. Tüm hakları saklıdır.</p>
        </footer>
    );
}