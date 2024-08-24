import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoSignOut } from 'react-icons/go';
import { useRouter } from 'next/router';
import { useAuth } from '@/Firebase/auth';
import Loader from '@/Components/Loader';
import Image from 'next/image';
import Link from 'next/link';

const GiphySearch = () => {
  // State variables
  const [query, setQuery] = useState(''); // Search query
  const [gifs, setGifs] = useState([]); // Array to store fetched GIFs
  const [page, setPage] = useState(1); // Current page number
  const [totalCount, setTotalCount] = useState(0); // Total number of GIFs available
  const [favorites, setFavorites] = useState([]); // Array to store favorite GIFs

  const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Giphy API key
  const limit = 8; // Number of GIFs per page

  const { authUser, isLoading, signOut } = useAuth(); // Authentication hook
  const router = useRouter(); // Router for navigation

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Function to fetch GIFs based on query and page number
  const searchGifs = async () => {
    try {
      const offset = (page - 1) * limit; // Calculate offset for pagination
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: query,
          limit: limit,
          offset: offset,
        },
      });

      setGifs(response.data.data); // Update GIFs state with fetched data
      setTotalCount(response.data.pagination.total_count); // Update total count of GIFs
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  // Handle form submission for GIF search
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page
    searchGifs(); // Fetch GIFs based on the query
  };

  // Handle page number changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchGifs(); // Fetch GIFs for the new page
  };

  const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages

  // Toggle GIFs in favorites
  const toggleFavorite = (gif) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === gif.id)) {
      // Remove from favorites if it already exists
      updatedFavorites = favorites.filter((fav) => fav.id !== gif.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, gif];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save updated favorites to localStorage
  };

  // Display loader if authentication is still loading
  if (isLoading) {
    return <Loader />;
  }

  return !authUser ? (
    // Display loader if user is not authenticated
    <Loader />
  ) : (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Logout button */}
      <div
        className="bg-black text-white w-44 py-2 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
        onClick={signOut}
      >
        <GoSignOut size={18} />
        <span>Logout</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/favicon.ico"
          alt="Giphy Icon"
          width={50}
          height={50}
          className="mr-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">Giphy GIF Search</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-4xl">
        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex items-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GIFs"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 text-lg"
          />
          <button
            type="submit"
            className="ml-4 bg-black text-white px-4 py-2 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center gap-2 font-medium shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5">
              <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
            <span>Search</span>
          </button>
        </form>

        {/* Navigation and page information */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/favorites"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            View Favorites
          </Link>
          <span className="text-lg text-gray-700">Page {page} of {totalPages}</span>
        </div>

        {/* Display GIFs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
          {gifs.map((gif) => (
            <div key={gif.id} className="relative bg-white p-2 rounded-lg shadow-lg">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="w-full h-auto rounded-lg"
              />
              {/* Favorite toggle button */}
              <div
                onClick={() => toggleFavorite(gif)}
                className={`absolute top-2 right-2 cursor-pointer p-2 rounded-full ${favorites.some((fav) => fav.id === gif.id) ? 'bg-red-600' : 'bg-gray-600'}`}
              >
                {favorites.some((fav) => fav.id === gif.id) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center">
          {page > 1 && (
            <button onClick={() => handlePageChange(page - 1)} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Previous
            </button>
          )}
          {page < totalPages && (
            <button onClick={() => handlePageChange(page + 1)} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiphySearch;
