
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface NumberItem {
  id: string;
  number: string;
  price: number;
  carrier?: string;
  specialPattern?: string[];
  digitSum?: number;
  singleDigitSum?: number;
}

interface CartContextType {
  items: NumberItem[];
  addItem: (item: NumberItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<NumberItem[]>([]);
  
  // Calculate the total price
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;
  
  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('numberCart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('numberCart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: NumberItem) => {
    setItems((currentItems) => {
      // Check if the item is already in the cart
      if (currentItems.some((i) => i.id === item.id)) {
        toast.info('This number is already in your cart');
        return currentItems;
      }
      
      toast.success(`Added ${item.number} to your cart`);
      return [...currentItems, item];
    });
  };
  
  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.number} from your cart`);
      }
      return currentItems.filter((item) => item.id !== id);
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };
  
  const isInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
