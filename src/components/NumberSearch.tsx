
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

interface NumberSearchProps {
  className?: string;
}

const NumberSearch: React.FC<NumberSearchProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // We'll navigate to the browse page with the search query as a parameter
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`gradient-border enhanced-search ${className}`}
    >
      <div className="gradient-border-content">
        <form onSubmit={handleSearch} className="flex items-center p-2 sm:p-3">
          <Input
            type="text"
            placeholder="Search for your perfect number... (e.g., 9999, 786)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 text-base bg-transparent text-gray-800 dark:text-white"
          />
          <Button type="submit" className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2">
            <Search size={18} />
            Search
          </Button>
        </form>
        <div className="px-4 pb-4 pt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
            <Sparkles size={12} className="inline-block mr-1 text-amber-500" />
            Popular searches:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['786', '999', '1008', '420', '143', '111'].map((suggestion) => (
              <Button 
                key={suggestion}
                variant="outline" 
                size="sm"
                className="text-xs rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  setSearchQuery(suggestion);
                  navigate(`/browse?q=${encodeURIComponent(suggestion)}`);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NumberSearch;
