import { useFetch } from './useFetch';
import { api } from '../api/mockApi';
import type { UseFetchOptions } from '../types';

// Wrapper hooks for common API calls
export const useUsers = (options?: UseFetchOptions<Awaited<ReturnType<typeof api.getUsers>>>) => {
  return useFetch(() => api.getUsers(), options);
};

export const useUser = (
  id: number,
  options?: UseFetchOptions<Awaited<ReturnType<typeof api.getUserById>>>
) => {
  return useFetch(() => api.getUserById(id), {
    ...options,
    dependencies: [id],
  });
};

export const usePosts = (
  page: number = 1,
  perPage: number = 10,
  options?: UseFetchOptions<Awaited<ReturnType<typeof api.getPosts>>>
) => {
  return useFetch(() => api.getPosts(page, perPage), {
    ...options,
    dependencies: [page, perPage],
  });
};

export const usePost = (
  id: number,
  options?: UseFetchOptions<Awaited<ReturnType<typeof api.getPostById>>>
) => {
  return useFetch(() => api.getPostById(id), {
    ...options,
    dependencies: [id],
  });
};

export const useSearch = (
  query: string,
  options?: UseFetchOptions<Awaited<ReturnType<typeof api.search>>>
) => {
  return useFetch(() => api.search(query), {
    ...options,
    enabled: query.length > 0,
    dependencies: [query],
  });
};

export const useLiveData = (
  options?: UseFetchOptions<Awaited<ReturnType<typeof api.getLiveData>>>
) => {
  return useFetch(() => api.getLiveData(), options);
};