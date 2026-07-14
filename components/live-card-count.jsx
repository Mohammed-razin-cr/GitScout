'use client';

import { useEffect, useState } from 'react';
import { cardCountKey, cardRatedEvent, readCardCount } from '@/lib/card-count';

export function LiveCardCount() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(readCardCount());
        const update = () => setCount(readCardCount());
        const updateFromEvent = (event) => setCount(event.detail ?? readCardCount());
        const updateFromStorage = (event) => {
            if (event.key === cardCountKey)
                update();
        };
        window.addEventListener(cardRatedEvent, updateFromEvent);
        window.addEventListener('storage', updateFromStorage);
        return () => {
            window.removeEventListener(cardRatedEvent, updateFromEvent);
            window.removeEventListener('storage', updateFromStorage);
        };
    }, []);
    return <strong className="font-mono text-base text-foreground" aria-label={`${count.toLocaleString()} cards rated`}>{count.toLocaleString()}</strong>;
}
