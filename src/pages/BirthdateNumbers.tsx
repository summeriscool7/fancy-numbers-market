
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import NumberCard from '@/components/NumberCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { getBirthdateNumbers } from '@/utils/filterUtils';
import EmptyState from '@/components/EmptyState';

const BirthdateNumbers = () => {
  const [birthdate, setBirthdate] = useState('');
  const [numbers, setNumbers] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = () => {
    if (!birthdate) return;
    
    // Get possible number formats based on the birthdate
    const birthdateFormats = getBirthdateNumbers(birthdate);
    
    // Generate mock numbers (in a real app, you'd filter from API)
    const allNumbers = generateMockNumbers(100);
    
    // Filter numbers that contain any of the birthdate formats
    const filteredNumbers = allNumbers.filter(number => {
      const cleanNumber = number.number.replace(/\D/g, '');
      return birthdateFormats.some(format => cleanNumber.includes(format));
    });
    
    setNumbers(filteredNumbers);
    setHasSearched(true);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-3">Birthday Number Finder</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find special mobile numbers that contain your date of birth for a truly personal connection.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-card p-6 mb-10 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              Find Numbers
            </Button>
          </div>
          
          {birthdate && (
            <div className="mt-4 text-sm text-gray-500">
              <p>We'll find numbers containing these variations of your birthdate:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {getBirthdateNumbers(birthdate).map((format, index) => (
                  <span key={index} className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-700">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        {hasSearched && (
          <div>
            {numbers.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Found {numbers.length} numbers with your birthdate
                  </h2>
                  <p className="text-gray-600">
                    These numbers contain your date of birth in various formats.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {numbers.map((number, index) => (
                    <NumberCard key={number.id} number={number} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState 
                type="search"
                title="No matching numbers found"
                description="We couldn't find any numbers containing your birthdate. Please try a different date."
                actionLabel="Try Again"
                onAction={() => setBirthdate('')}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BirthdateNumbers;
