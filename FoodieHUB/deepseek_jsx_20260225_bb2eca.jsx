import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

export default function OrderConfirmation() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedConfirmation = sessionStorage.getItem('orderConfirmation');
    if (storedConfirmation) {
      setOrderDetails(JSON.parse(storedConfirmation));
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">No order found</h2>
          <Link href="/" className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-xl">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors gap-2">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
      </header>
      
      <div className="flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your order</p>
          
          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-lg font-bold text-orange-500">{orderDetails.orderNumber}</p>
            <p className="text-sm text-gray-600 mt-2">Total: ₹{orderDetails.total?.toFixed(2)}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors w-full"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}