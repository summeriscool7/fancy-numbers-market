
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import NumberCard from '@/components/NumberCard';
import FilterSection from '@/components/FilterSection';
import EmptyState from '@/components/EmptyState';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { filterNumbers, FilterOptions, NumberData } from '@/utils/filterUtils';

const Browse = () => {
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [filteredNumbers, setFilteredNumbers] = useState<NumberData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Load mock numbers
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockNumbers = generateMockNumbers(60);
      setNumbers(mockNumbers);
      setFilteredNumbers(mockNumbers);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    const filtered = filterNumbers(numbers, newFilters);
    setFilteredNumbers(filtered);
  };
  
  // Reset filters
  const handleFilterReset = () => {
    setFilters({});
    setFilteredNumbers(numbers);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Browse Premium Numbers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            Explore our collection of exclusive mobile numbers
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterSection 
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
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
                  className="mb-4 text-gray-500"
                >
                  Showing {filteredNumbers.length} numbers
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
