import { useState } from 'react';
import { useLiveData } from '../hooks';

export const PollingDemo = () => {
  const [interval, setInterval] = useState(3000);
  const [enabled, setEnabled] = useState(true);

  const { data, isLoading, refetch } = useLiveData({
    refetchInterval: enabled ? interval : 0,
    cache: false,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return '✅ Online';
      case 'warning':
        return '⚠️ Warning';
      case 'error':
        return '❌ Error';
      default:
        return '❓ Unknown';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Live Data Polling
      </h3>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Auto-refresh activé
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Intervalle de rafraîchissement: {interval / 1000}s
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="1000"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            disabled={!enabled}
            className="w-full"
          />
        </div>

        <button
          onClick={refetch}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          🔄 Rafraîchir maintenant
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && !data && (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Data display */}
      {data && (
        <div className="space-y-4">
          {/* Status */}
          <div className={`p-6 ${getStatusColor(data.status)} rounded-xl text-white`}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {getStatusLabel(data.status)}
              </div>
              <div className="text-sm opacity-90">
                Statut du système
              </div>
            </div>
          </div>

          {/* Value */}
          <div className="p-6 bg-linear-to-r from-purple-500 to-pink-600 rounded-xl text-white">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {data.value}
              </div>
              <div className="text-sm opacity-90">
                Valeur actuelle
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Dernière mise à jour:
              </span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {new Date(data.timestamp).toLocaleTimeString('fr-FR')}
              </span>
            </div>
          </div>

          {/* Loading indicator during refetch */}
          {isLoading && (
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-blue-700 dark:text-blue-400 font-semibold">
                  Mise à jour en cours...
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
        <p className="text-sm text-purple-700 dark:text-purple-400">
          💡 Les données sont automatiquement rafraîchies toutes les {interval / 1000} secondes.
        </p>
      </div>
    </div>
  );
};