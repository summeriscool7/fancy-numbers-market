
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, CheckCircle } from 'lucide-react';

interface OrderDetails {
  items: Array<{
    id: string;
    number: string;
    price: number;
    carrier?: string;
  }>;
  totalPrice: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    gstNumber?: string;
  };
  orderDate: string;
  orderNumber: string;
}

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  useEffect(() => {
    // Retrieve order details from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderDetails(JSON.parse(lastOrder));
    } else {
      // If no order details found, redirect to home
      navigate('/');
    }
  }, [navigate]);
  
  if (!orderDetails) {
    return null; // Don't render anything while checking for order data
  }
  
  const formattedDate = new Date(orderDetails.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. We've sent a message to our team via WhatsApp.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-8 text-left">
            <div className="flex flex-col sm:flex-row justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Order Number</h2>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{orderDetails.orderNumber}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Date Placed</h2>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{formattedDate}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Order Summary</h3>
              <ul className="space-y-2">
                {orderDetails.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.number}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-primary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderDetails.totalPrice)}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            We'll contact you shortly via WhatsApp to confirm your order and provide next steps.
          </p>
          
          <Button 
            onClick={() => navigate('/')} 
            className="min-w-[200px]"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
