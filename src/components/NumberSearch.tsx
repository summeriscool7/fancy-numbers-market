
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, XCircle } from 'lucide-react';

interface NumberSearchProps {
  className?: string;
}

const popularSearches = [
  { text: '786', color: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200' },
  { text: '999', color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200' },
  { text: '1008', color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' },
  { text: '0000', color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200' },
  { text: '55555', color: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200' }, 
  { text: '111213', color: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200' },
  { text: '143143', color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200' },
  { text: 'hexa', color: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200' },
  { text: 'penta', color: 'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200' },
  { text: '420', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200' },
  { text: '143', color: 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200' },
  { text: '111', color: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' },
];

const NumberSearch: React.FC<NumberSearchProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // We'll navigate to the browse page with the search query as a parameter
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };
  
  // Animation variants for the search box
  const searchBoxVariants = {
    initial: { scale: 1 },
    focus: { scale: 1.02, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" },
  };

  // Animation variants for the popular searches
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`${className}`}
    >
      <motion.div 
        variants={searchBoxVariants}
        initial="initial"
        animate={isFocused ? "focus" : "initial"}
        transition={{ duration: 0.3 }}
        className="gradient-border enhanced-search rounded-xl overflow-hidden shadow-2xl"
      >
        <div className="gradient-border-content">
          <form onSubmit={handleSearch} className="flex items-center p-3 sm:p-4">
            <Input
              type="text"
              placeholder="Search for your perfect number... (e.g., 9999, 786)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 border-0 focus-visible:ring-0 text-base bg-transparent text-gray-800 dark:text-white text-lg placeholder:text-gray-500"
            />
            {searchQuery && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={handleClear} 
                className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle size={18} />
              </Button>
            )}
            <Button 
              type="submit" 
              className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 gap-2 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search size={18} />
              Search
            </Button>
          </form>
          
          <AnimatePresence>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 pb-4 pt-1"
            >
              <motion.p 
                variants={itemVariants}
                className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center"
              >
                <Sparkles size={12} className="inline-block mr-1 text-amber-500" />
                Popular searches:
              </motion.p>
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-1.5"
              >
                {popularSearches.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.text}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`text-xs rounded-full border ${suggestion.color} transition-all duration-300 shadow-sm hover:shadow`}
                      onClick={() => {
                        setSearchQuery(suggestion.text);
                        navigate(`/browse?q=${encodeURIComponent(suggestion.text)}`);
                      }}
                    >
                      {suggestion.text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NumberSearch;
