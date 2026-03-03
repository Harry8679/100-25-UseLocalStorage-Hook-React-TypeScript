// Types pour useFetch - AUCUN ANY

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions<TBody = unknown> {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: TBody;
  params?: Record<string, string | number | boolean>;
}

export interface UseFetchOptions<TData, TError = Error> {
  enabled?: boolean;
  retry?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  dependencies?: unknown[];
}

export interface UseFetchResult<TData, TError = Error> {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
  abort: () => void;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// API Types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
  relevance: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}