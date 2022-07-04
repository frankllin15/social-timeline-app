export type Post = {
  id: string;
  content: string;
  author: User;
  likes: Like[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
export type Like = {
  id: string;
  post: Post;
  author: User;
};

export type Comment = {
  id: string;
  content: string;
  post: Post;
  author: User;
  createdAt: string;
  updatedAt: string;
};
