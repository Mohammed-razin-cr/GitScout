'use client';

import { useEffect } from 'react';
import { completeCardRequest } from '@/lib/card-count';

export function CardCountTracker({ username }) {
    useEffect(() => {
        completeCardRequest(username);
    }, [username]);

    return null;
}
