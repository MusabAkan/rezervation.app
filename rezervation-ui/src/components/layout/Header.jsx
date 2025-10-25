import React from 'react';
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Sparkles, Languages, LogIn, Menu } from "lucide-react";
import NotificationBell from './NotificationBell';
import UserNav from './UserNav';
import ThemeToggleButton from './ThemeToggleButton';

export default function Header({ t, lang, setLang, onAuthOpen, currentUser, onLogout, onSidebarOpen, notifications, onMarkAllRead }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30 dark:bg-slate-800 dark:border-slate-700">
        <Button variant="outline" size="icon" className="shrink-0" onClick={onSidebarOpen}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t.toggleNavigation}</span>
        </Button>
        <div className="w-full flex-1">
             <a href="#explore" className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-slate-800 dark:text-slate-200">{t.appName}</span>
            </a>
        </div>
        <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-[120px]"><Languages className="mr-2 h-4 w-4" /><SelectValue placeholder={t.language} /></SelectTrigger>
            <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem><SelectItem value="es">Español</SelectItem></SelectContent>
        </Select>
        <ThemeToggleButton t={t} />
        {currentUser ? (
            <>
                <NotificationBell t={t} notifications={notifications} onMarkAllRead={onMarkAllRead} />
                <UserNav t={t} user={currentUser} onLogout={onLogout} />
            </>
                ) : (
                   <Button onClick={onAuthOpen} className="bg-primary hover:bg-primary/90"><LogIn className="h-4 w-4 mr-2" /> {t.auth}</Button>
                )}    </header>
  );
}