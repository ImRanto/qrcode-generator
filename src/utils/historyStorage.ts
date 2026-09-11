import type { HistoryItem } from '../types/history';

const STORAGE_KEY = 'qr_generator_history_v1';
const MAX_HISTORY_ITEMS = 20;

/**
 * Loads history items from localStorage.
 */
export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error('Failed to load history from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new QR code to local history (max 20 items, newest first).
 * Deduplicates if exact same ID exists or moves updated item to top.
 */
export function saveToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'> & { id?: string }): HistoryItem[] {
  try {
    const current = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: item.id || `qr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
    };

    // Filter out duplicate ID if present
    const filtered = current.filter((i) => i.id !== newItem.id);

    // Prepend new item and cap at 20
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save item to history:', err);
    return getHistory();
  }
}

/**
 * Deletes a single history item by ID.
 */
export function deleteFromHistory(id: string): HistoryItem[] {
  try {
    const current = getHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete item from history:', err);
    return getHistory();
  }
}

/**
 * Clears all local history.
 */
export function clearHistory(): HistoryItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
  return [];
}
