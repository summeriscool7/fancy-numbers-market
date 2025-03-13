
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NumberItem } from '@/context/CartContext';
import { toast } from 'sonner';

interface WishlistContextType {
  items: NumberItem[];
  addItem: (item: NumberItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<NumberItem[]>([]);
  const itemCount = items.length;
  
  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('numberWishlist');
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);
  
  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('numberWishlist', JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: NumberItem) => {
    setItems((currentItems) => {
      // Check if the item is already in the wishlist
      if (currentItems.some((i) => i.id === item.id)) {
        toast.info('This number is already in your wishlist');
        return currentItems;
      }
      
      toast.success(`Added ${item.number} to your wishlist`);
      return [...currentItems, item];
    });
  };
  
  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.number} from your wishlist`);
      }
      return currentItems.filter((item) => item.id !== id);
    });
  };
  
  const clearWishlist = () => {
    setItems([]);
    toast.info('Wishlist cleared');
  };
  
  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
