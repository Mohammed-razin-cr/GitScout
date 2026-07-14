'use client';

import { useEffect, useState } from 'react';
import { cardRatedEvent, fetchCardCount } from '@/lib/card-count';

export function LiveCardCount() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let active = true;
        fetchCardCount().then((nextCount) => {
            if (active)
                setCount(nextCount);
        }).catch(() => undefined);
        const updateFromEvent = (event) => setCount(event.detail ?? 0);
        window.addEventListener(cardRatedEvent, updateFromEvent);
        return () => {
            active = false;
            window.removeEventListener(cardRatedEvent, updateFromEvent);
        };
    }, []);
    return <strong className="font-mono text-base text-foreground" aria-label={`${count.toLocaleString()} cards rated`}>{count.toLocaleString()}</strong>;
}
