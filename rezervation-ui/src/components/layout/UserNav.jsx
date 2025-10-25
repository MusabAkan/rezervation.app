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
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";

export default function UserNav({t, user, onLogout}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photo} alt={user.name}/>
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="font-normal flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild><a
                    href={user.type === 'customer' ? '#profile' : '#dashboard'}>{user.type === 'customer' ? t.profile : t.dashboard}</a></DropdownMenuItem>
                <DropdownMenuItem asChild><a href="#settings">{t.settings}</a></DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={onLogout}>{t.logout}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}