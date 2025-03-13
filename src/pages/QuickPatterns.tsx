
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { generateMockNumbers } from '@/utils/numberPatterns';
import NumberCard from '@/components/NumberCard';
import { Separator } from '@/components/ui/separator';
import { NumberData } from '@/utils/filterUtils';

const patterns = [
  "000 Number", "00AB 00CD", "1008", "108 108 Numbers", "143 143 Love Number",
  "420 420 Number", "786 Numbers", "78692 Numbers", "850000 xyxy", "916 916 Gold",
  "AAB AAB XY XY", "AAB AAB XYXY", "AB XXX CD YYY", "AB00 CD00", "ABA ABA XYXY",
  "ABAB CDCD XY", "ABAB X CDCD X", "ABAB XY ACAC", "ABAB XY CDCD", "ABB ABB Ending",
  "ABB ABB XYXY", "ABC ABC XYXY", "ABC ABD XY XY", "Abcd Abcd", "ABCD ABCD XY",
  "ABCD XY ABCD", "ABXXX CDYYY", "AXXX BYYY", "AxxxB CxxxD", "Counting 11 12 13 TYPE",
  "Counting Numbers", "Double 786 786", "Double Jodi", "Doubling Number", "ENDING XXX",
  "Ending XXYYZZ", "Fancy Number", "Hexa Ending", "Middle Hexa", "Middle Penta",
  "Middle xxx yyy", "Middle xxxx", "Middle Xy Xy Xy", "Mirror Numbers", "Penta Ending",
  "Semi Mirror Number", "Special Digit Numbers", "Starting xxxx", "Tetra Number", "Vvip Number",
  "Without 2 4 8", "X ABCD ABCD X", "X00 X00", "X00X X00X", "XXX YYY Ending",
  "XXX YYY Starting", "XXXX Ending", "XXYYZZ Starting", "XY ABAB CDCD", "XY ABC ABC XY",
  "XY ABCD ABCD", "XY XY", "Xy Xy Xy Ending", "XY XY XY Starting", "XYZ XYZ Ending",
  "Years Numbers", "0000 Number", "AB00 CD01", "787 Numbers"
];

// Mock pattern-specific numbers cache
const patternNumbersCache: Record<string, NumberData[]> = {};

const QuickPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate and cache pattern-specific numbers
  useEffect(() => {
    setIsLoading(true);
    
    // Check if we have cached numbers for this pattern
    if (patternNumbersCache[selectedPattern]) {
      setNumbers(patternNumbersCache[selectedPattern]);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call with delay
    const timeoutId = setTimeout(() => {
      // Generate mock numbers with the pattern tag included
      const mockNumbers = generateMockNumbers(12).map(number => ({
        ...number,
        specialPattern: [...(number.specialPattern || []), selectedPattern]
      }));
      
      // Cache the generated numbers
      patternNumbersCache[selectedPattern] = mockNumbers;
      
      setNumbers(mockNumbers);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timeoutId);
  }, [selectedPattern]);
  
  return (
    <MainLayout>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Quick Pattern Numbers</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse our collection of special pattern mobile numbers. Choose the pattern type that suits your preference.
              </p>
              <Separator className="my-6" />
            </div>
            
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Pattern Types</h2>
              <div className="flex flex-wrap gap-2">
                {patterns.map((pattern) => (
                  <Button
                    key={pattern}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPattern(pattern)}
                    className={`mb-2 transition-colors ${
                      selectedPattern === pattern 
                        ? 'pattern-button-active dark:bg-primary dark:text-white' 
                        : 'dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pattern}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-4 mt-8">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">
                {selectedPattern} <span className="text-gray-500 dark:text-gray-400 text-lg">({numbers.length})</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse our collection of {selectedPattern} mobile numbers. These numbers have special patterns that make them easy to remember.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {numbers.map((number, index) => (
                  <NumberCard key={`${selectedPattern}-${number.id}-${index}`} number={number} index={index} />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuickPatterns;
