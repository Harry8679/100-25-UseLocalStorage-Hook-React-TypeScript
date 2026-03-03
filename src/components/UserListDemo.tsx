import { useUsers } from '../hooks';
import { cache } from '../utils/cache';

export const UserListDemo = () => {
  const { data, isLoading, isError, error, refetch } = useUsers({
    cache: true,
    cacheTime: 60000, // 1 minute
  });

  const clearCache = () => {
    cache.clear();
    refetch();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Users with Cache
        </h3>
        <div className="flex gap-2">
          <button
            onClick={refetch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            ⟳ Refetch
          </button>
          <button
            onClick={clearCache}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            🗑️ Clear Cache
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 Les données sont mises en cache pendant 1 minute. Rechargez la page pour voir le cache en action !
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-700 dark:text-red-400 font-semibold">
            ❌ Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {data && !isLoading && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.slice(0, 8).map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-800 dark:text-white">
                  {user.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {user.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};