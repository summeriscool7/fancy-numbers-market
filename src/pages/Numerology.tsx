
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import NumberCard from '@/components/NumberCard';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CircleDashed } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateMockNumbers } from '@/utils/numberPatterns';
import { NumberData } from '@/utils/filterUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const Numerology = () => {
  const [digitSum, setDigitSum] = useState<string>('');
  const [singleDigitSum, setSingleDigitSum] = useState<string>('');
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = () => {
    if (!digitSum && !singleDigitSum) return;
    
    setIsLoading(true);
    setSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock numbers
      const allNumbers = generateMockNumbers(100);
      
      // Filter numbers based on numerology criteria
      const filteredNumbers = allNumbers.filter(numberData => {
        // Digital sum filter
        if (digitSum && numberData.digitSum !== parseInt(digitSum)) {
          return false;
        }
        
        // Single digit sum filter
        if (singleDigitSum && numberData.singleDigitSum !== parseInt(singleDigitSum)) {
          return false;
        }
        
        return true;
      });
      
      setNumbers(filteredNumbers);
      setIsLoading(false);
    }, 800);
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
            Numerology Numbers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            Find premium numbers that align with your numerological preferences
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Numerology Preferences</h3>
              <p className="text-gray-500 text-sm mb-4">
                Select your preferred numerology values to find matching numbers
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="digit-sum">Digit Sum</Label>
                  <Select 
                    value={digitSum} 
                    onValueChange={setDigitSum}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select digit sum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    The sum of all digits in the number
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="single-digit">Single Digit Sum</Label>
                  <Select 
                    value={singleDigitSum} 
                    onValueChange={setSingleDigitSum}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select single digit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    The final single digit after summing all digits
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch} 
                disabled={!digitSum && !singleDigitSum}
                className="w-full mt-6"
              >
                Find Numbers
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : numbers.length > 0 ? (
          <div>
            <p className="mb-4 text-gray-500">
              Showing {numbers.length} numbers matching your numerology preferences
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {numbers.map((number, index) => (
                <NumberCard key={number.id} number={number} index={index} />
              ))}
            </div>
          </div>
        ) : searched ? (
          <EmptyState 
            type="search"
            title="No matching numbers found"
            description="We couldn't find any numbers that match your numerology preferences. Try different values."
            icon={<CircleDashed size={48} className="text-gray-300" />}
          />
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>Select your numerology preferences to find matching numbers</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Numerology;
