import React from 'react';
import {Home, MessageSquare, Bell, MessageCircleMore, Gift, LayoutDashboard, UserCircle, Settings} from 'lucide-react';

export default function SidebarNav({t, currentUser, currentPage}) {
    const items = [
        {label: t.home, href: "#explore", auth: 'any', icon: <Home className="h-5 w-5"/>},
        {label: t.messages, href: "#messages", auth: 'logged_in', icon: <MessageSquare className="h-5 w-5"/>},
        {label: t.notifications, href: "#notifications", auth: 'logged_in', icon: <Bell className="h-5 w-5"/>},
        {label: t.forum, href: "#forum", auth: 'any', icon: <MessageCircleMore className="h-5 w-5"/>},
        {label: t.rewards, href: "#rewards", auth: 'customer', icon: <Gift className="h-5 w-5"/>},
        {label: t.dashboard, href: "#dashboard", auth: 'business', icon: <LayoutDashboard className="h-5 w-5"/>},
        {label: t.profile, href: "#profile", auth: 'customer', icon: <UserCircle className="h-5 w-5"/>},
        {label: t.settings, href: "#settings", auth: 'logged_in', icon: <Settings className="h-5 w-5"/>}
    ];
    const visibleItems = items.filter(item => {
        if (item.auth === 'any') return true;
        if (currentUser && item.auth === 'logged_in') return true;
        if (currentUser && item.auth === currentUser.type) return true;
        return false;
    });

    const NavLink = ({href, children, isActive}) => (
        <a href={href}
           className={`flex items-center gap-4 rounded-md px-3 py-2 text-slate-300 transition-all hover:text-white relative ${isActive ? "bg-slate-700 text-white" : "hover:bg-slate-700/50"}`}>
            {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"></div>}
            {children}
        </a>
    );

    return (
        <nav className="flex flex-col gap-1 p-2 text-base font-medium lg:p-4">
            {visibleItems.map((i) => (
                <NavLink key={i.label} href={i.href} isActive={currentPage.startsWith(i.href)}>
                    {i.icon}
                    {i.label}
                </NavLink>
            ))}
        </nav>
    );
}