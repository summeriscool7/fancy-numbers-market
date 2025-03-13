
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart, NumberItem } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Info, Heart } from 'lucide-react';
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
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number.price);
  
  // Format number without hyphens
  const formattedNumber = number.number.replace(/-/g, '');
  
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
    } else {
      addToWishlist(number);
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2">
              {number.carrier && (
                <span className="text-xs font-medium text-gray-500">
                  {number.carrier}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
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
                    <Button variant="ghost" size="icon" className="h-7 w-7">
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
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center my-3 sm:my-4">
            {formattedNumber}
          </h3>
          
          <div className="flex flex-wrap gap-1 my-2 sm:my-3 min-h-10 sm:min-h-14">
            {number.specialPattern && number.specialPattern.map((pattern, i) => (
              <PatternChip key={i} pattern={pattern} />
            ))}
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-100 p-3 sm:p-4 flex items-center justify-between">
          <span className="font-semibold text-base sm:text-lg">{formattedPrice}</span>
          
          <Button
            variant={alreadyInCart ? "outline" : "default"}
            size={isMobile ? "sm" : "default"}
            className={`transition-all duration-300 text-xs sm:text-sm ${alreadyInCart ? 'text-primary border-primary' : ''}`}
            onClick={() => !alreadyInCart && addItem(number)}
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
