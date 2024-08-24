import { useEffect, useState } from 'react';
import Image from 'next/image';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage or any other storage mechanism
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/favicon.ico"
          alt="Giphy Icon"
          width={50}
          height={50}
          className="mr-4"
        />
        <h1 className="text-3xl font-bold">Favorites</h1>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {favorites.map((gif) => (
            <div key={gif.id} className="flex-shrink-0 w-1/4 max-w-xs">
              <img src={gif.images.fixed_height.url} alt={gif.title} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
