import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet, Truck, Loader2, Home } from 'lucide-react';

export default function Payment() {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'upi'
  });

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('currentOrder');
    if (storedOrder) {
      const items = JSON.parse(storedOrder);
      setOrderItems(items);
      const total = items.reduce((sum, item) => sum + item.total, 0);
      setGrandTotal(total);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderDetails = {
      ...formData,
      items: orderItems,
      total: grandTotal,
      orderNumber: 'ORD' + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem('orderConfirmation', JSON.stringify(orderDetails));
    
    setLoading(false);
    router.push('/order-confirmation');
  };

  const getButtonText = () => {
    if (formData.paymentMethod === 'cod') {
      return 'Place Order';
    }
    return `Pay ₹${grandTotal.toFixed(2)}`;
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
              <Link href="/order-summary" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to summary
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">No items to checkout</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors gap-2">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/order-summary" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to summary
              </Link>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Payment Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="p-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3 last:mb-0">
                  <div className="flex-1">
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-medium text-gray-800">₹{item.total.toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total Payable</span>
                  <span className="text-xl font-bold text-orange-500">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Rahul Sharma"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Flat no, Building name, Street, City - PIN code"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="ml-4 flex items-center">
                    <Wallet className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <span className="font-medium text-gray-800">UPI</span>
                      <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="ml-4 flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <span className="font-medium text-gray-800">Credit / Debit Card</span>
                      <p className="text-sm text-gray-500">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="ml-4 flex items-center">
                    <Truck className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <span className="font-medium text-gray-800">Cash on Delivery</span>
                      <p className="text-sm text-gray-500">Pay ₹{grandTotal.toFixed(2)} when you receive</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              getButtonText()
            )}
          </button>
        </form>
      </main>
    </div>
  );
}