import { useState } from 'react';
import { useSearch } from '../hooks';

export const SearchDemo = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useSearch(query, {
    cache: true,
    cacheTime: 30000, // 30 seconds
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Search (Debounced Fetch)
      </h3>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des posts..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isLoading && query && (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-700 dark:text-red-400 font-semibold">
            ❌ Search failed. Please try again.
          </p>
        </div>
      )}

      {!query && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Tapez quelque chose pour rechercher...
        </div>
      )}

      {data && query && !isLoading && (
        <div className="space-y-3">
          {data.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            <>
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-700 dark:text-green-400 font-semibold">
                  ✅ {data.length} résultat{data.length > 1 ? 's' : ''} trouvé{data.length > 1 ? 's' : ''}
                </p>
              </div>

              {data.map((result) => (
                <div
                  key={result.id}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                          {result.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          ID: {result.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};