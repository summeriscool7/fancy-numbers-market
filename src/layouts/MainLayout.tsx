
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();

  // Handle page transitions
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-1 pt-20 transition-all duration-300 ease-in-out">
        <div 
          className={`transition-opacity duration-300 ${
            isPageTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {children}
        </div>
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
