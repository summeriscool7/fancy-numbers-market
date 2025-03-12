
import { motion } from 'framer-motion';
import { useCart, NumberItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CartItemProps {
  item: NumberItem;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { removeItem } = useCart();
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.number}</h4>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            {item.carrier && `${item.carrier}`}
          </span>
          <span className="font-medium">{formattedPrice}</span>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-gray-500 hover:text-red-500" 
        onClick={() => removeItem(item.id)}
      >
        <X size={16} />
      </Button>
    </motion.div>
  );
};

export default CartItem;
