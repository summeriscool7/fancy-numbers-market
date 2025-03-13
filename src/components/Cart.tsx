import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import CartItem from '@/components/CartItem';
import { toast } from 'sonner';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Handle escape key to close cart
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);
  
  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success('Your order has been placed successfully!');
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 1500);
  };
  
  // Format total price
  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalPrice);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-4">
              <h2 className="text-lg font-semibold flex items-center text-gray-900 dark:text-gray-100">
                <ShoppingCart size={20} className="mr-2" />
                Your Cart ({items.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Add some premium numbers to get started</p>
                  <Button onClick={onClose}>Browse Numbers</Button>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <CartItem key={item.id} item={item} index={index} />
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-blue-400">{formattedTotalPrice}</span>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
