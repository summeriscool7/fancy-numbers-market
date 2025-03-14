
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, Sun, Moon, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  
  // Navigation items
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse', path: '/browse' },
    { label: 'Birthdate Numbers', path: '/birthdate-numbers' },
    { label: 'Vehicle Numbers', path: '/vehicle-numbers' },
    { label: 'Numerology', path: '/numerology' },
    { label: 'Quick Patterns', path: '/quick-patterns' },
  ];
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // WhatsApp link
  const whatsappLink = "https://api.whatsapp.com/send/?phone=7070707271&text=I+am+interested+in+VIP+mobile+number%2C+can+you+provide+me+some+details%3F&type=phone_number&app_absent=0";
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background shadow-md" : "bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-bold text-xl text-primary flex items-center"
          >
            NumberHub
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* WhatsApp Button with animation */}
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Contact on WhatsApp"
                className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 group-hover:scale-110"
              >
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Button>
              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20"></span>
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {isAuthenticated ? (
              <Link to="/accounts">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                  className="relative"
                >
                  <User size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Login"
                >
                  <LogIn size={20} />
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background border-t"
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <Link
                  to="/accounts"
                  className={cn(
                    "px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === "/accounts"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  My Account
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-base font-medium transition-colors text-foreground/80 hover:text-primary hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-2 rounded-md text-base font-medium transition-colors text-foreground/80 hover:text-primary hover:bg-muted"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center text-green-600 dark:text-green-500",
                  "hover:bg-green-50 dark:hover:bg-green-900/20"
                )}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact on WhatsApp
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
