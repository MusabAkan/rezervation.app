import React from 'react';
import {Button} from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Bell, Calendar, CheckCircle, MessageSquare, XCircle, Star, Award} from "lucide-react";

export default function NotificationBell({t, notifications, onMarkAllRead}) {
    const unreadCount = notifications.filter(n => !n.read).length;

    const getIconForType = (type) => {
        switch (type) {
            case 'newAppointmentRequest':
                return <Calendar className="h-4 w-4 text-blue-500"/>;
            case 'appointmentConfirmed':
                return <CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'newChatMessage':
                return <MessageSquare className="h-4 w-4 text-yellow-500"/>;
            case 'appointmentCancelled':
                return <XCircle className="h-4 w-4 text-red-500"/>;
            case 'appointmentToday':
                return <Star className="h-4 w-4 text-orange-500"/>;
            case 'rateServiceRequest':
                return <Award className="h-4 w-4 text-purple-500"/>;
            default:
                return <Bell className="h-4 w-4"/>;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className={`h-5 w-5 ${unreadCount > 0 ? 'animate-bell-ring text-red-500 fill-current' : ''}`}/> {/* fill-current sınıfı eklendi */}
                    {unreadCount > 0 && (
                        <span
                            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                             {unreadCount}
                              </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                    <span>{t.notifications}</span>
                    {unreadCount > 0 &&
                        <Button variant="ghost" size="sm" onClick={onMarkAllRead}>{t.markAllAsRead}</Button>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(n => (
                            <DropdownMenuItem key={n.id} asChild>
                                <a href={n.link}
                                   className={`flex items-start gap-3 p-2 ${!n.read ? 'font-semibold' : ''}`}>
                                    <div className="mt-1">{getIconForType(n.type)}</div>
                                    <div>
                                        <p className="text-sm leading-snug">{n.text}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{n.timestamp}</p>
                                    </div>
                                </a>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-slate-500">{t.noNewNotifications}</div>
                    )}
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <a href="#notifications" className="w-full text-center block p-2">{t.viewAllNotifications}</a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}