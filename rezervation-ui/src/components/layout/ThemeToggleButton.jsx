import React from 'react';
import {Button} from "../ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from '../../App';

export default function ThemeToggleButton({t}) {
    const {theme, setTheme} = useTheme();
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5"/>}
            <span className="sr-only">{t.theme}</span>
        </Button>
    );
}