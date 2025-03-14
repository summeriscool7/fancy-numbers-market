
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart, NumberItem } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Info, Heart, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import PatternChip from '@/components/PatternChip';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

interface NumberCardProps {
  number: NumberItem;
  index?: number;
}

const NumberCard: React.FC<NumberCardProps> = ({ number, index = 0 }) => {
  const { addItem, isInCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const alreadyInCart = isInCart(number.id);
  const isWishlisted = isInWishlist(number.id);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  // Format price with Rupee symbol
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(number.price);
  
  // Format number without hyphens
  const formattedNumber = number.number;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: index * 0.05
      }
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(number.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(number);
      toast.success("Added to wishlist");
    }
  };
  
  const handleAddToCart = () => {
    if (!alreadyInCart) {
      addItem(number);
      toast.success("Added to cart");
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative h-full glow-effect"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="enhanced-number-card h-full flex flex-col number-card dark:border-gray-700 dark:bg-gray-800/80">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2">
              {number.carrier && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {number.carrier}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 transition-colors ${isWishlisted ? 'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500' : 'text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200'}`}
                onClick={toggleWishlist}
              >
                <Heart 
                  size={16} 
                  className={isWishlisted ? 'fill-current' : ''}
                />
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
                      <Info size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p>Digit Sum: {number.digitSum}</p>
                      <p>Single Digit: {number.singleDigitSum}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center my-3 sm:my-4 text-gray-900 dark:text-white">
            {formattedNumber}
          </h3>
          
          <div className="flex flex-wrap gap-1 my-2 sm:my-3 min-h-10 sm:min-h-14">
            {number.specialPattern && number.specialPattern.map((pattern, i) => (
              <PatternChip key={i} pattern={pattern} />
            ))}
          </div>
          
          {/* Digit Sum Info */}
          <div className="flex justify-around text-xs py-2 border-t border-b border-gray-100 dark:border-gray-700 mt-2">
            <div className="text-center">
              <span className="block text-gray-500 dark:text-gray-400">Total Sum</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{number.digitSum}</span>
            </div>
            <div className="text-center">
              <span className="block text-gray-500 dark:text-gray-400">Single Digit</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{number.singleDigitSum}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex items-center justify-between">
          <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white flex items-center">
            <IndianRupee size={16} className="mr-1 text-green-600 dark:text-green-500" /> 
            {number.price.toLocaleString('en-IN')}
          </span>
          
          <Button
            variant={alreadyInCart ? "outline" : "default"}
            size={isMobile ? "sm" : "default"}
            className={`transition-all duration-300 text-xs sm:text-sm ${alreadyInCart ? 'text-primary border-primary dark:border-primary dark:text-primary' : ''}`}
            onClick={handleAddToCart}
            disabled={alreadyInCart}
          >
            {alreadyInCart ? (
              <>
                <Check size={isMobile ? 14 : 16} className="mr-1" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={isMobile ? 14 : 16} className="mr-1" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NumberCard;
