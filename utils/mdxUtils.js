import fs from 'fs/promises';
import path from 'path';

// realtive to process.cwd()
export const POSTS_PATH_REALTIVE = 'posts';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getPostFilePaths = async () => {
  const files = await fs.readdir(POSTS_PATH);
  // Only include md(x) files
  return files.filter((path) => /\.mdx?$/.test(path));
};