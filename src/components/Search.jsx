import { useState } from 'react';
import Fuse from 'fuse.js';

const options = {
  keys: ['data.title', 'data.description'],
  minMatchCharLength: 2,
  includeMatches: true,
};

export default function Search({ searchList }) {
  const [query, setQuery] = useState('');

  const fuse = new Fuse(searchList, options);

  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;

    setQuery(() => value);
  }

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search posts
      </label>
      <input
        className="block w-full p-4 border text-sm text-gray-900 rounded border-gray-300 mb-4"
        id="search"
        type="text"
        value={query}
        onChange={handleOnSearch}
        placeholder="Search posts"
      />

      {query.length > 1 && (
        <p>
          Encontrei {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'}
        </p>
      )}

      <ul>
        {posts &&
          posts.map((post) => (
            <li className="py-4">
              <a className="text-gray-900" href={`/blog/${post.slug}`}>
                {post.data.title}
              </a>
              <p className="text-sm text-gray-500">{post.data.description}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
