export interface Post {
  id?: string;
  content: string;
  prompt?: string;
  createdAt?: Date;
  publishedAt?: Date;
  isPublished?: boolean;
  userId?: string;
}