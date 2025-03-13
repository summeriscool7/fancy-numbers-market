
// import { motion } from 'framer-motion';
// import { useCart, NumberItem } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';
// import { X } from 'lucide-react';

// interface CartItemProps {
//   item: NumberItem;
//   index: number;
// }

// const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
//   const { removeItem } = useCart();
  
//   // Format price
//   const formattedPrice = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(item.price);
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       transition={{ delay: index * 0.05 }}
//       className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:border-gray-700 dark:bg-gray-500/50 border border-gray-100"
//     >
//       <div className="flex-1 min-w-0">
//         <h4 className="font-medium text-gray-900 dark:text-blue-100 truncate">{item.number}</h4>
//         <div className="flex flex-col">
//           <span className="text-sm text-gray-500">
//             {item.carrier && `${item.carrier}`}
//           </span>
//           <span className="font-medium">{formattedPrice}</span>
//         </div>
//       </div>
      
//       <Button 
//         variant="ghost" 
//         size="icon" 
//         className="h-8 w-8 text-gray-500 hover:text-red-500" 
//         onClick={() => removeItem(item.id)}
//       >
//         <X size={16} />
//       </Button>
//     </motion.div>
//   );
// };

// export default CartItem;


import { motion } from 'framer-motion';
import { useCart, NumberItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, IndianRupee, Tag } from 'lucide-react';
import PatternChip from '@/components/PatternChip';

interface CartItemProps {
  item: NumberItem;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { removeItem } = useCart();
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(item.price);
  
  // Format number without hyphens
  const formattedNumber = item.number.replace(/-/g, '');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm"
    >
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {item.carrier && (
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {item.carrier}
              </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400" 
            onClick={() => removeItem(item.id)}
          >
            <X size={16} />
          </Button>
        </div>
        
        <h3 className="text-lg font-semibold text-center my-1 text-gray-900 dark:text-white">
          {formattedNumber}
        </h3>
        
        {item.specialPattern && item.specialPattern.length > 0 && (
          <div className="flex flex-wrap gap-1 my-2">
            {item.specialPattern.map((pattern, i) => (
              <PatternChip key={i} pattern={pattern} />
            ))}
          </div>
        )}
        
        {/* Digit Sum Info */}
        {item.digitSum && (
          <div className="flex justify-around text-xs py-2 border-t border-gray-100 dark:border-gray-700 mt-2">
            <div className="text-center">
              <span className="block text-gray-500 dark:text-gray-400">Total Sum</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{item.digitSum}</span>
            </div>
            <div className="text-center">
              <span className="block text-gray-500 dark:text-gray-400">Single Digit</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{item.singleDigitSum}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto border-t border-gray-100 dark:border-gray-700 p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
        <span className="font-semibold text-base text-gray-900 dark:text-blue-400 flex items-center">
          <IndianRupee size={16} className="mr-1 text-green-600 dark:text-green-500" /> 
          {item.price.toLocaleString('en-IN')}
        </span>
      </div>
    </motion.div>
  );
};

export default CartItem;
