import React from 'react';

export default function Footer({t}) {
    return (
        <footer className="border-t bg-white dark:bg-slate-800 dark:border-slate-700">
            <div
                className="max-w-7xl mx-auto px-8 py-4 text-sm text-slate-600 dark:text-slate-400 grid md:grid-cols-3 gap-4">
                <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{t.appName}</div>
                    <div className="text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Tüm hakları
                        saklıdır.
                    </div>
                </div>
                <div className="space-y-1"><a href="#" className="hover:text-primary">KVKK / Gizlilik</a><br/><a
                    href="#" className="hover:text-primary">Kullanım Koşulları</a></div>
                <div className="space-y-1"><a href="#" className="hover:text-primary">İşletme Kaydı</a><br/><a href="#"
                                                                                                               className="hover:text-primary">API
                    & Entegrasyonlar</a></div>
            </div>
        </footer>
    );
}