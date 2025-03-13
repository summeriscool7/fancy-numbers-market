
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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
      className={`number-search-container ${className}`}
    >
      <form onSubmit={handleSearch} className="flex items-center p-1.5">
        <Input
          type="text"
          placeholder="Search for your perfect number... (e.g., 9999, 786)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 text-base bg-transparent"
        />
        <Button type="submit" className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
          <Search size={18} className="mr-2" />
          Search
        </Button>
      </form>
      <div className="px-4 pb-3 pt-1">
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
    </motion.div>
  );
};

export default NumberSearch;
