import { useState } from 'react';
import { useFetch } from '../hooks';

export const ErrorHandlingDemo = () => {
  const [shouldFail, setShouldFail] = useState(false);
  const [retryCount, setRetryCount] = useState(3);

  const { data, isLoading, isError, error, refetch } = useFetch(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (shouldFail) {
        throw new Error('Erreur simulée : échec de la requête');
      }
      
      return { message: 'Success!', timestamp: new Date().toISOString() };
    },
    {
      retry: retryCount,
      retryDelay: 1000,
      dependencies: [shouldFail],
    }
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Error Handling & Retry
      </h3>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={shouldFail}
              onChange={(e) => setShouldFail(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Simuler une erreur
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nombre de tentatives: {retryCount}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={retryCount}
            onChange={(e) => setRetryCount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={refetch}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          🔄 Refetch
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div>
              <div className="font-semibold text-blue-700 dark:text-blue-400">
                Chargement...
              </div>
              {retryCount > 0 && shouldFail && (
                <div className="text-sm text-blue-600 dark:text-blue-500">
                  Tentatives: max {retryCount + 1}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="p-6 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-3xl">❌</div>
            <div className="flex-1">
              <div className="font-bold text-red-700 dark:text-red-400 mb-2">
                Erreur
              </div>
              <div className="text-red-600 dark:text-red-500 mb-3">
                {error instanceof Error ? error.message : 'Unknown error'}
              </div>
              <div className="text-sm text-red-700 dark:text-red-600">
                {retryCount > 0 
                  ? `❌ Échec après ${retryCount + 1} tentative(s)`
                  : '❌ Aucune tentative de retry'
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {data && !isLoading && !isError && (
        <div className="p-6 bg-green-100 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-3xl">✅</div>
            <div className="flex-1">
              <div className="font-bold text-green-700 dark:text-green-400 mb-2">
                Succès !
              </div>
              <div className="text-green-600 dark:text-green-500 mb-2">
                {data.message}
              </div>
              <div className="text-sm text-green-700 dark:text-green-600">
                {new Date(data.timestamp).toLocaleString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          💡 <strong>Astuce :</strong> Activez "Simuler une erreur" et modifiez le nombre de tentatives pour voir le système de retry en action !
        </p>
      </div>
    </div>
  );
};