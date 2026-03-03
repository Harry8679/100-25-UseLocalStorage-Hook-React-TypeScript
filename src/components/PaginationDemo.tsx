import { usePosts, usePagination } from '../hooks';

export const PaginationDemo = () => {
  const { page, nextPage, previousPage, goToPage, canGoNext, canGoPrevious } = usePagination(1, 10);
  const { data, isLoading, isError } = usePosts(page, 10);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Pagination
      </h3>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-700 dark:text-red-400 font-semibold">
            ❌ Failed to load posts
          </p>
        </div>
      )}

      {data && !isLoading && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data.page}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-500">Page</div>
            </div>

            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data.totalPages}
              </div>
              <div className="text-sm text-green-700 dark:text-green-500">Total</div>
            </div>

            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.totalItems}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-500">Items</div>
            </div>

            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {data.data.length}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-500">Showing</div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-3">
            {data.data.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    #{post.id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {post.body}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span>👤 {post.author}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={previousPage}
              disabled={!canGoPrevious}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                      page === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={!canGoNext}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};