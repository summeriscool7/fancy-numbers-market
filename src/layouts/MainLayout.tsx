
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Handle page transitions
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main className={`flex-1 pt-16 ${isMobile ? 'pt-16' : 'pt-20'} transition-all duration-300 ease-in-out`}>
        <motion.div 
          initial="initial"
          animate={isPageTransitioning ? "initial" : "animate"}
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
