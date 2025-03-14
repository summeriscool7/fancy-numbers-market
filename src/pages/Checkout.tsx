
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CheckoutForm from '@/components/CheckoutForm.tsx';

const Checkout: React.FC = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items.length, navigate]);
  
  if (items.length === 0) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="p-0 h-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to shop
          </Button>
          
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">
              {items.length} {items.length === 1 ? 'item' : 'items'} (
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(totalPrice)})
            </span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/10 rounded-xl p-6 sm:p-10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Just a few more details and your premium numbers will be ready for activation.
            </p>
          </div>
          
          <CheckoutForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
