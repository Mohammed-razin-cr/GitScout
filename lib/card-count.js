export const cardCountKey = 'gitcard.cardsRated.v2';
export const cardRatedEvent = 'gitcard:card-rated';
const pendingCardKey = 'gitcard.pendingCard';

export function readCardCount() {
    if (typeof window === 'undefined')
        return 0;
    const raw = window.localStorage.getItem(cardCountKey);
    const value = Number.parseInt(raw || '0', 10);
    return Number.isFinite(value) ? value : 0;
}

export function incrementCardCount() {
    if (typeof window === 'undefined')
        return 0;
    const next = readCardCount() + 1;
    window.localStorage.setItem(cardCountKey, String(next));
    window.dispatchEvent(new CustomEvent(cardRatedEvent, { detail: next }));
    return next;
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
    incrementCardCount();
    return true;
}
