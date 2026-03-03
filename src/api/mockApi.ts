import type { User, Post, PaginatedResponse, SearchResult, ApiError } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const shouldFail = (failureRate: number = 0.1): boolean => Math.random() < failureRate;

// Mock data
const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  role: ['Admin', 'User', 'Moderator'][Math.floor(Math.random() * 3)],
  company: ['TechCorp', 'StartupXYZ', 'MegaSoft'][Math.floor(Math.random() * 3)],
}));

const mockPosts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  body: `This is the content of post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  author: `Author ${Math.floor(Math.random() * 10) + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
}));

export const api = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    await delay(1000);
    
    if (shouldFail(0.1)) {
      throw new Error('Failed to fetch users');
    }
    
    return mockUsers;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    await delay(800);
    
    if (shouldFail(0.1)) {
      throw new Error('Failed to fetch user');
    }
    
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      const error: ApiError = {
        message: 'User not found',
        code: 'NOT_FOUND',
        status: 404,
      };
      throw error;
    }
    
    return user;
  },

  // Get posts with pagination
  getPosts: async (page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Post>> => {
    await delay(1200);
    
    if (shouldFail(0.1)) {
      throw new Error('Failed to fetch posts');
    }
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = mockPosts.slice(start, end);
    const totalPages = Math.ceil(mockPosts.length / perPage);
    
    return {
      data,
      page,
      totalPages,
      totalItems: mockPosts.length,
      hasMore: page < totalPages,
    };
  },

  // Get post by ID
  getPostById: async (id: number): Promise<Post> => {
    await delay(600);
    
    if (shouldFail(0.1)) {
      throw new Error('Failed to fetch post');
    }
    
    const post = mockPosts.find(p => p.id === id);
    
    if (!post) {
      const error: ApiError = {
        message: 'Post not found',
        code: 'NOT_FOUND',
        status: 404,
      };
      throw error;
    }
    
    return post;
  },

  // Search
  search: async (query: string): Promise<SearchResult[]> => {
    await delay(500);
    
    if (shouldFail(0.05)) {
      throw new Error('Search failed');
    }
    
    const results: SearchResult[] = mockPosts
      .filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10)
      .map(post => ({
        id: post.id,
        title: post.title,
        description: post.body.substring(0, 100) + '...',
        category: 'Post',
        relevance: Math.random(),
      }));
    
    return results;
  },

  // Get live data (for polling)
  getLiveData: async (): Promise<{ timestamp: string; value: number; status: string }> => {
    await delay(300);
    
    return {
      timestamp: new Date().toISOString(),
      value: Math.floor(Math.random() * 100),
      status: ['online', 'warning', 'error'][Math.floor(Math.random() * 3)],
    };
  },
};