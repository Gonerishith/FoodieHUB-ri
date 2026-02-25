import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Plus, Minus, ShoppingBag, Home } from 'lucide-react';

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quantities, setQuantities] = useState({});
  const [showOrderButton, setShowOrderButton] = useState(false);

  const restaurant = {
    id: 1,
    name: "The Golden Dragon",
    bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    rating: 4.5,
    cuisine: ["Chinese", "Asian"],
    priceLevel: "₹₹",
    menu: [
      {
        id: 101,
        name: "Kung Pao Chicken",
        description: "Spicy stir-fried chicken with peanuts and vegetables",
        price: 449,
        image: "https://images.unsplash.com/photo-1525755662774-4a7cc2f6e86b?w=300",
      },
      {
        id: 102,
        name: "Dim Sum Platter",
        description: "Assorted steamed dumplings with dipping sauces",
        price: 399,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300",
      },
      {
        id: 103,
        name: "Beijing Duck",
        description: "Crispy duck with pancakes and hoisin sauce",
        price: 899,
        image: "https://images.unsplash.com/photo-1574482620811-6c4c4b841fd2?w=300",
      },
      {
        id: 104,
        name: "Hot and Sour Soup",
        description: "Traditional spicy and tangy soup with tofu",
        price: 249,
        image: "https://images.unsplash.com/photo-1607512023231-c2999f7b2b7b?w=300",
      },
      {
        id: 105,
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls with fresh vegetables",
        price: 199,
        image: "https://images.unsplash.com/photo-1626082896492-766afc3b4b8a?w=300",
      },
      {
        id: 106,
        name: "Fried Rice",
        description: "Classic fried rice with eggs and vegetables",
        price: 329,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300",
      },
    ],
  };

  useEffect(() => {
    const hasItems = Object.values(quantities).some(qty => qty > 0);
    setShowOrderButton(hasItems);
  }, [quantities]);

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getItemQuantity = (itemId) => {
    return quantities[itemId] || 0;
  };

  const handleViewOrder = () => {
    const orderItems = restaurant.menu
      .filter(item => quantities[item.id] > 0)
      .map(item => ({
        ...item,
        quantity: quantities[item.id],
        total: item.price * quantities[item.id]
      }));
    
    sessionStorage.setItem('currentOrder', JSON.stringify(orderItems));
    router.push('/order-summary');
  };

  if (!id) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors gap-2">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to restaurants
            </Link>
          </div>
        </div>
      </header>

      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={restaurant.bannerImage}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <div className="flex gap-2">
                {restaurant.cuisine.map((item, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {restaurant.priceLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  {getItemQuantity(item.id) > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 font-medium">{getItemQuantity(item.id)}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        Total: ₹{(item.price * getItemQuantity(item.id)).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showOrderButton && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleViewOrder}
              className="w-full md:w-auto md:float-right bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Order ({Object.values(quantities).reduce((a, b) => a + b, 0)} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}