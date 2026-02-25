import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Star, Home } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const restaurants = [
    {
      id: 1,
      name: "The Golden Dragon",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
      rating: 4.5,
      cuisine: ["Chinese", "Asian"],
      priceLevel: "₹₹",
    },
    {
      id: 2,
      name: "Bella Italia",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
      rating: 4.8,
      cuisine: ["Italian", "Pizza"],
      priceLevel: "₹₹₹",
    },
    {
      id: 3,
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
      rating: 4.7,
      cuisine: ["Japanese", "Sushi"],
      priceLevel: "₹₹₹",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
      rating: 4.3,
      cuisine: ["Mexican", "Tacos"],
      priceLevel: "₹",
    },
    {
      id: 5,
      name: "Le Bistro",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
      rating: 4.6,
      cuisine: ["French", "European"],
      priceLevel: "₹₹₹₹",
    },
    {
      id: 6,
      name: "Spice Route",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
      rating: 4.4,
      cuisine: ["Indian", "Curry"],
      priceLevel: "₹₹",
    },
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                <Home className="w-6 h-6" />
                <span className="font-medium">Home</span>
              </Link>
              <h1 className="text-3xl font-bold text-orange-500">FoodieHUB</h1>
            </div>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-green-600 fill-current" />
                    <span className="ml-1 text-sm font-medium text-green-700">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.cuisine.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">{restaurant.priceLevel}</span>
                  <Link href={`/restaurant/${restaurant.id}`} passHref>
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors duration-300 font-medium">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}