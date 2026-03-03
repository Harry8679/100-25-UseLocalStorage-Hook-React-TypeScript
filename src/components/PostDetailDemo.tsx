import { useState } from 'react';
import { usePost } from '../hooks';

export const PostDetailDemo = () => {
  const [postId, setPostId] = useState(1);
  const { data, isLoading, isError, error } = usePost(postId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Post Detail (Auto-refetch on ID change)
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Post ID:
        </label>
        <div className="flex gap-4">
          <input
            type="number"
            min="1"
            max="100"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          <button
            onClick={() => setPostId(Math.floor(Math.random() * 100) + 1)}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
          >
            🎲 Random
          </button>
        </div>
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
        <div className="space-y-4">
          <div className="p-6 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl text-white">
            <h4 className="text-2xl font-bold mb-2">{data.title}</h4>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>👤 {data.author}</span>
              <span>📅 {new Date(data.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.body}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-center">
              <div className="text-3xl mb-1">❤️</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {data.likes}
              </div>
              <div className="text-sm text-red-700 dark:text-red-500">Likes</div>
            </div>

            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="text-3xl mb-1">💬</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data.comments}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-500">Comments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};