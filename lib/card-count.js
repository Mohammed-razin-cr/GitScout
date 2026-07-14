export const cardRatedEvent = 'gitcard:card-rated';

const pendingCardKey = 'gitcard.pendingCard';

function publishCardCount(count) {
    if (typeof window !== 'undefined')
        window.dispatchEvent(new CustomEvent(cardRatedEvent, { detail: count }));
}

export async function fetchCardCount() {
    const response = await fetch('/api/card-count', { cache: 'no-store' });
    if (!response.ok)
        throw new Error('Could not load the card count.');
    const { count } = await response.json();
    return Number.isFinite(count) ? count : 0;
}

export async function recordCardRating() {
    const response = await fetch('/api/card-count', { method: 'POST' });
    if (!response.ok)
        throw new Error('Could not save the card rating.');
    const { count } = await response.json();
    const nextCount = Number.isFinite(count) ? count : 0;
    publishCardCount(nextCount);
    return nextCount;
}

export function beginCardRequest(username) {
    if (typeof window === 'undefined')
        return;
    window.sessionStorage.setItem(pendingCardKey, username.trim().toLowerCase());
}

export function completeCardRequest(username) {
    if (typeof window === 'undefined')
        return false;
    const requestedUsername = window.sessionStorage.getItem(pendingCardKey);
    const completedUsername = username.trim().toLowerCase();
    if (!requestedUsername || requestedUsername !== completedUsername)
        return false;
    window.sessionStorage.removeItem(pendingCardKey);
    return true;
}
