
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useCart, NumberItem } from '@/context/CartContext';
import { toast } from 'sonner';

// Mock wishlist data
const mockWishlist: NumberItem[] = [
  {
    id: '101',
    number: '9876543210',
    price: 199.99,
    carrier: 'Verizon',
    specialPattern: ['Premium', 'Repeating'],
    digitSum: 45,
    singleDigitSum: 9
  },
  {
    id: '102',
    number: '8765432109',
    price: 299.99,
    carrier: 'AT&T',
    specialPattern: ['Ascending', 'Lucky'],
    digitSum: 40,
    singleDigitSum: 4
  },
  {
    id: '103',
    number: '7654321098',
    price: 249.99,
    carrier: 'T-Mobile',
    specialPattern: ['Descending', 'Mirrored'],
    digitSum: 38,
    singleDigitSum: 2
  }
];

const WishlistSection = () => {
  const [wishlist, setWishlist] = useState<NumberItem[]>(mockWishlist);
  const { addItem, isInCart } = useCart();
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  
  // Remove from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist(current => current.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };
  
  // Add to cart
  const handleAddToCart = (item: NumberItem) => {
    if (!isInCart(item.id)) {
      addItem(item);
    } else {
      toast.info('This number is already in your cart');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Wishlist</CardTitle>
          <span className="text-sm text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </CardHeader>
        <CardContent>
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-1">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-4">Save your favorite numbers to find them easily later.</p>
              <Button>Browse Numbers</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-semibold">{item.number.replace(/-/g, '')}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.specialPattern?.map((pattern, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <span className="font-semibold text-lg">{formatPrice(item.price)}</span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 flex-1 sm:flex-initial"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 size={16} />
                        <span className="sm:sr-only">Remove</span>
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1 flex-1 sm:flex-initial"
                        disabled={isInCart(item.id)}
                        onClick={() => handleAddToCart(item)}
                      >
                        {isInCart(item.id) ? (
                          <>
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span className="sm:sr-only">Add to Cart</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistSection;
