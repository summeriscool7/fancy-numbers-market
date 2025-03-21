
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import NumberCard from '@/components/NumberCard';
import FilterSection from '@/components/FilterSection';
import EmptyState from '@/components/EmptyState';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { filterNumbers, FilterOptions, NumberData } from '@/utils/filterUtils';
import { Button } from '@/components/ui/button';
import { Filter as FilterIcon, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSearchParams } from 'react-router-dom';

const Browse = () => {
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [filteredNumbers, setFilteredNumbers] = useState<NumberData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  
  // Load mock numbers
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockNumbers = generateMockNumbers(60);
      setNumbers(mockNumbers);
      setFilteredNumbers(mockNumbers);
      setIsLoading(false);
      
      // Get search query from URL if present
      const query = searchParams.get('q');
      if (query) {
        const searchFilters: FilterOptions = { query };
        setFilters(searchFilters);
        const filtered = filterNumbers(mockNumbers, searchFilters);
        setFilteredNumbers(filtered);
      }
    }, 800);
  }, [searchParams]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    // First, handle exact pattern searching for digits
    let filtered = numbers;
    
    if (newFilters.digits) {
      // This improved search will match if the number contains the digits in sequence
      filtered = numbers.filter(number => 
        number.number.replace(/-/g, '').includes(newFilters.digits || '')
      );
    }
    
    // Then apply remaining filters
    setFilters(newFilters);
    filtered = filterNumbers(filtered, newFilters);
    setFilteredNumbers(filtered);
  };
  
  // Reset filters
  const handleFilterReset = () => {
    setFilters({});
    setFilteredNumbers(numbers);
  };
  
  // Toggle filter sidebar on mobile
  const toggleFilterSidebar = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
          >
            Browse Premium Numbers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Explore our collection of exclusive mobile numbers
          </motion.p>
        </div>
        
        {/* Mobile Filter Toggle */}
        {isMobile && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={toggleFilterSidebar}
              className="w-full dark:border-gray-700 dark:bg-gray-800"
            >
              <FilterIcon size={16} className="mr-2" />
              {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Section - Desktop (always visible) and Mobile (toggleable) */}
          <div className={`lg:col-span-1 ${isMobile ? (isFilterVisible ? 'block' : 'hidden') : 'block'}`}>
            <div className="sticky top-24">
              <FilterSection 
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
              />
            </div>
          </div>
          
          <div className={`${isMobile && isFilterVisible ? 'hidden' : 'block'} lg:col-span-3`}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : filteredNumbers.length === 0 ? (
              <EmptyState 
                type="filter"
                onAction={handleFilterReset}
              />
            ) : (
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 text-gray-500 dark:text-gray-400"
                >
                  Showing {filteredNumbers.length} numbers
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredNumbers.map((number, index) => (
                    <NumberCard key={number.id} number={number} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Browse;
