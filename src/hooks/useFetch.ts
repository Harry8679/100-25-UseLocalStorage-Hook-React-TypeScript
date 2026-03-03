import { useState, useEffect, useCallback, useRef } from 'react';
import { cache } from '../utils/cache';
import type { UseFetchOptions, UseFetchResult } from '../types';

const DEFAULT_OPTIONS: Partial<UseFetchOptions<unknown>> = {
  enabled: true,
  retry: 0,
  retryDelay: 1000,
  cache: true,
  cacheTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: false,
  refetchInterval: 0,
};

export const useFetch = <TData, TError = Error>(
  fetcher: () => Promise<TData>,
  options: UseFetchOptions<TData, TError> = {}
): UseFetchResult<TData, TError> => {
  const {
    enabled = DEFAULT_OPTIONS.enabled,
    retry = DEFAULT_OPTIONS.retry,
    retryDelay = DEFAULT_OPTIONS.retryDelay,
    cache: useCache = DEFAULT_OPTIONS.cache,
    cacheTime = DEFAULT_OPTIONS.cacheTime,
    refetchOnWindowFocus = DEFAULT_OPTIONS.refetchOnWindowFocus,
    refetchInterval = DEFAULT_OPTIONS.refetchInterval,
    onSuccess,
    onError,
    dependencies = [],
  } = options;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const fetcherRef = useRef(fetcher);

  // Update fetcher ref when it changes
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  // Generate cache key
  const cacheKey = useCallback(() => {
    return `fetch-${JSON.stringify(dependencies)}`;
  }, [dependencies]);

  // Main fetch function
  const executeFetch = useCallback(async (isRetry = false): Promise<void> => {
    if (!enabled) return;

    // Check cache
    if (useCache && !isRetry) {
      const cachedData = cache.get<TData>(cacheKey(), cacheTime!);
      if (cachedData) {
        setData(cachedData);
        setError(null);
        setIsLoading(false);
        return;
      }
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current();
      
      setData(result);
      setError(null);
      retryCountRef.current = 0;

      // Cache result
      if (useCache) {
        cache.set(cacheKey(), result);
      }

      onSuccess?.(result);
    } catch (err) {
      const typedError = err as TError;
      
      // Retry logic
      if (!isRetry && retryCountRef.current < retry!) {
        retryCountRef.current++;
        setTimeout(() => {
          executeFetch(true);
        }, retryDelay);
        return;
      }

      setError(typedError);
      setData(null);
      onError?.(typedError);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, useCache, cacheKey, cacheTime, retry, retryDelay, onSuccess, onError]);

  // Refetch function
  const refetch = useCallback(async (): Promise<void> => {
    retryCountRef.current = 0;
    await executeFetch();
  }, [executeFetch]);

  // Abort function
  const abort = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  // Initial fetch and dependency-based refetch
  useEffect(() => {
    executeFetch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeFetch, ...dependencies]);

  // Polling
  useEffect(() => {
    if (refetchInterval! > 0) {
      intervalRef.current = window.setInterval(() => {
        refetch();
      }, refetchInterval);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, refetch]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, refetch]);

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    isSuccess: data !== null && error === null,
    refetch,
    abort,
  };
};