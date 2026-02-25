import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Trash2, Home } from 'lucide-react';

export default function OrderSummary() {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('currentOrder');
    if (storedOrder) {
      const items = JSON.parse(storedOrder);
      setOrderItems(items);
      const total = items.reduce((sum, item) => sum + item.total, 0);
      setGrandTotal(total);
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedItems = orderItems.filter(item => item.id !== itemId);
      setOrderItems(updatedItems);
      sessionStorage.setItem('currentOrder', JSON.stringify(updatedItems));
      
      const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
      setGrandTotal(total);
    } else {
      const updatedItems = orderItems.map(item => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            quantity: newQuantity,
            total: item.price * newQuantity
          };
          return updatedItem;
        }
        return item;
      });
      setOrderItems(updatedItems);
      sessionStorage.setItem('currentOrder', JSON.stringify(updatedItems));
      
      const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
      setGrandTotal(total);
    }
  };

  const handleProceedToPayment = () => {
    router.push('/payment');
  };

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors gap-2">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/restaurant/1" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to restaurant
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your order is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to your order</p>
          <Link href="/" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors gap-2">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/restaurant/1" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to restaurant
              </Link>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Order Summary</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              Your Items ({orderItems.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {orderItems.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">₹{item.price} each</p>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <span className="text-gray-600 font-medium">-</span>
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <span className="text-gray-600 font-medium">+</span>
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[100px]">
                      <div className="font-semibold text-gray-800">₹{item.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>

                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Grand Total</span>
              <span className="text-2xl font-bold text-orange-500">₹{grandTotal.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}