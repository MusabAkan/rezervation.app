import React, {useState} from 'react';
import {Star} from 'lucide-react';

export default function Stars({value, setValue, interactive = false}) {
    const [hoverValue, setHoverValue] = useState(0);
    const full = Math.floor(value);
    const half = value - full >= 0.5;

    return (
        <div className={`flex items-center gap-0.5 ${interactive ? 'cursor-pointer' : ''}`}>
            {Array.from({length: 5}).map((_, i) => (
                <Star
                    key={i}
                    className={`h-5 w-5 transition-colors ${
                        interactive
                            ? (hoverValue > i ? 'text-amber-400' : (value > i ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'))
                            : (i < full ? 'fill-amber-400 text-amber-400' : (half && i === full ? 'fill-amber-300 text-amber-300' : 'text-slate-300 dark:text-slate-700'))
                    }`}
                    onMouseEnter={interactive ? () => setHoverValue(i + 1) : undefined}
                    onMouseLeave={interactive ? () => setHoverValue(0) : undefined}
                    onClick={interactive ? () => setValue(i + 1) : undefined}
                />
            ))}
            {!interactive &&
                <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">{value.toFixed(1)}</span>}
        </div>
    );
}