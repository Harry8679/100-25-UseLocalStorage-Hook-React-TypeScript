import { BasicFetchDemo } from './BasicFetchDemo';
import { UserListDemo } from './UserListDemo';
import { PostDetailDemo } from './PostDetailDemo';
import { SearchDemo } from './SearchDemo';
import { PaginationDemo } from './PaginationDemo';
import { PollingDemo } from './PollingDemo';
import { ErrorHandlingDemo } from './ErrorHandlingDemo';

export const FetchDemo = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🌐 useFetch Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 25/100 • Generic Data Fetching
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Hook générique type-safe pour fetcher des données avec cache, retry et polling
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <BasicFetchDemo />
            <UserListDemo />
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <PostDetailDemo />
            <SearchDemo />
          </div>

          {/* Row 3 - Full width */}
          <PaginationDemo />

          {/* Row 4 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <PollingDemo />
            <ErrorHandlingDemo />
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type-Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Génériques TypeScript
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Caching</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mise en cache intelligente
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Retry Logic</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Retry automatique configurable
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">AbortController</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Annulation de requêtes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Polling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Refresh automatique
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Dependencies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Refetch sur changement
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Error Handling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion d'erreurs robuste
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Loading States</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    États détaillés
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Callbacks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    onSuccess, onError
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💻 Exemples d'utilisation
            </h2>

            <div className="space-y-6">
              {/* Basic usage */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Utilisation basique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useFetch } from './hooks';

const { data, isLoading, isError, error, refetch } = useFetch(
  async () => {
    const res = await fetch('/api/users');
    return res.json();
  }
);`}
                </pre>
              </div>

              {/* With options */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Avec options :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { data } = useFetch(fetchData, {
  retry: 3,
  retryDelay: 1000,
  cache: true,
  cacheTime: 60000,
  refetchInterval: 5000,
  onSuccess: (data) => console.log('Success!', data),
  onError: (error) => console.error('Error!', error),
});`}
                </pre>
              </div>

              {/* With dependencies */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Avec dépendances :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [userId, setUserId] = useState(1);

const { data } = useFetch(
  () => fetchUser(userId),
  { dependencies: [userId] }
);`}
                </pre>
              </div>

              {/* Type-safe */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Type-safe :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`interface User {
  id: number;
  name: string;
}

const { data } = useFetch<User>(
  () => fetchUser(1)
);
// data is typed as User | null`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};