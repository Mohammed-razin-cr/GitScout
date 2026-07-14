'use client';

import { useEffect } from 'react';
import { completeCardRequest, recordCardRating } from '@/lib/card-count';

export function CardCountTracker({ username }) {
    useEffect(() => {
        if (completeCardRequest(username))
            recordCardRating().catch(() => undefined);
    }, [username]);

    return null;
}
