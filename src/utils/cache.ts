import type { CacheEntry } from '../types';

class Cache {
  private cache = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string, maxAge: number): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) return null;
    
    const age = Date.now() - entry.timestamp;
    
    if (age > maxAge) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  size(): number {
    return this.cache.size;
  }
}

export const cache = new Cache();