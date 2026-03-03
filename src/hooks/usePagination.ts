import { useState, useCallback } from 'react';

export const usePagination = (initialPage: number = 1, totalPages: number = 1) => {
  const [page, setPage] = useState(initialPage);

  const nextPage = useCallback(() => {
    setPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((pageNumber: number) => {
    setPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }, [totalPages]);

  const reset = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return {
    page,
    setPage,
    nextPage,
    previousPage,
    goToPage,
    reset,
    canGoNext: page < totalPages,
    canGoPrevious: page > 1,
  };
};