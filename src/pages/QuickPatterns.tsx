import React, { useState, useEffect, useMemo } from 'react';
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

// Function to check if a number matches a specific pattern
// This is a placeholder - you would implement the actual pattern matching logic
const matchesPattern = (number: NumberData, pattern: string): boolean => {
  // Simple matching by number value format
  const digits = number.number.toString();
  
  switch(pattern) {
    // Basic number patterns
    case "000 Number":
      return /\d*000\d*/.test(digits);
    case "00AB 00CD":
      return /00(\d)(\d)00(\d)(\d)/.test(digits);
    case "0000 Number":
      return /\d*0000\d*/.test(digits);
    case "1008":
      return digits.includes('1008');
    case "108 108 Numbers":
      return /.*108.*108.*/.test(digits);
    case "143 143 Love Number":
      return /.*143.*143.*/.test(digits);
    case "420 420 Number":
      return /.*420.*420.*/.test(digits);
    case "786 Numbers":
      return digits.includes('786');
    case "787 Numbers":
      return digits.includes('787');
    case "78692 Numbers":
      return digits.includes('78692');
    case "850000 xyxy":
      return /85(?:(\d)\1){2,}/.test(digits);
    case "916 916 Gold":
      return /.*916.*916.*/.test(digits);
      
    // Repeating pattern structures
    case "XY XY":
      return /(\d{2})\1/.test(digits);
    case "AAB AAB XY XY":
      return /(\d)(\d)(\d)\1\2\3.*(\d)(\d)\4\5/.test(digits);
    case "AAB AAB XYXY":
      return /(\d)(\d)(\d)\1\2\3.*(\d)(\d)\4\5/.test(digits);
    case "ABA ABA XYXY":
      return /(\d)(\d)\1\1\2\1.*(\d)(\d)\3\4/.test(digits);
    case "AB XXX CD YYY":
      return /(\d)(\d)(\d)\3\3(\d)(\d)(\d)\6\6/.test(digits);
    case "AB00 CD00":
      return /(\d)(\d)00(\d)(\d)00/.test(digits);
    case "AB00 CD01":
      return /(\d)(\d)00(\d)(\d)01/.test(digits);
    case "ABAB CDCD XY":
      return /(\d)(\d)\1\2(\d)(\d)\3\4(\d)(\d)/.test(digits);
    case "ABAB X CDCD X":
      return /(\d)(\d)\1\2(\d)(\d)(\d)\3\4\5/.test(digits);
    case "ABAB XY ACAC":
      return /(\d)(\d)\1\2(\d)(\d)\1(\d)\1\3/.test(digits);
    case "ABAB XY CDCD":
      return /(\d)(\d)\1\2(\d)(\d)(\d)(\d)\3\4/.test(digits);
    case "ABB ABB Ending":
      return /.*(\d)(\d)\2\1\2\2$/.test(digits);
    case "ABB ABB XYXY":
      return /(\d)(\d)\2\1\2\2(\d)(\d)\3\4/.test(digits);
    case "ABC ABC XYXY":
      return /(\d)(\d)(\d)\1\2\3(\d)(\d)\4\5/.test(digits);
    case "ABC ABD XY XY":
      return /(\d)(\d)(\d)\1\2(\d)(\d)(\d)\6\7/.test(digits);
    case "Abcd Abcd":
      return /(\d{4})\1/.test(digits);
    case "ABCD ABCD XY":
      return /(\d)(\d)(\d)(\d)\1\2\3\4(\d)(\d)/.test(digits);
    case "ABCD XY ABCD":
      return /(\d)(\d)(\d)(\d)(\d)(\d)\1\2\3\4/.test(digits);
    case "ABXXX CDYYY":
      return /(\d)(\d)(\d)\3\3(\d)(\d)(\d)\6\6/.test(digits);
    case "AXXX BYYY":
      return /(\d)(\d)\2\2(\d)(\d)\5\5/.test(digits);
    case "AxxxB CxxxD":
      return /(\d)(\d)\2\2(\d)(\d)(\d)\5\5(\d)/.test(digits);
    
    // Special sequence patterns
    case "Counting 11 12 13 TYPE":
      return /(0?1\d){3,}/.test(digits) || /(1[0-2]){3,}/.test(digits);
    case "Counting Numbers":
      return /(?:0?1(?:2(?:3(?:4(?:5(?:6(?:7(?:89?)?)?)?)?)?)?)?)|(?:9(?:8(?:7(?:6(?:5(?:4(?:3(?:21?)?)?)?)?)?)?)?)|(?:(?:12(?:34?)?)|(?:(?:23(?:45?)?)|(?:(?:34(?:56?)?)|(?:(?:45(?:67?)?)|(?:(?:56(?:78?)?)|(?:(?:67(?:89?)?)|(?:78(?:90?)?)?)?)?)?)?)?)/.test(digits);
    case "Double 786 786":
      return /786.*786/.test(digits);
    case "Double Jodi":
      return /(\d{2}).*\1/.test(digits);
    case "Doubling Number":
      return /(\d)(\1|\2){5,}/.test(digits);
      
    // Position-based patterns  
    case "ENDING XXX":
      return /(\d)\1\1$/.test(digits);
    case "Ending XXYYZZ":
      return /(\d)\1(\d)\2(\d)\3$/.test(digits);
    case "Starting xxxx":
      return /^(\d)\1\1\1/.test(digits);
    case "XXXX Ending":
      return /(\d)\1\1\1$/.test(digits);
    case "XXYYZZ Starting":
      return /^(\d)\1(\d)\2(\d)\3/.test(digits);
    case "XXX YYY Ending":
      return /(\d)\1\1(\d)\2\2$/.test(digits);
    case "XXX YYY Starting":
      return /^(\d)\1\1(\d)\2\2/.test(digits);
    case "XY XY XY Starting":
      return /^(\d)(\d)\1\2(\d)(\d)/.test(digits);
    case "XYZ XYZ Ending":
      return /(\d)(\d)(\d)\1\2\3$/.test(digits);
    case "Xy Xy Xy Ending":
      return /(?:(\d)(\d)){3}$/.test(digits);
      
    // Middle-focused patterns
    case "Middle Hexa":
      return /\d{2}(\d)\1\1\1\1\1\d{2}/.test(digits);
    case "Middle Penta":
      return /\d{2,3}(\d)\1\1\1\1\d{2,3}/.test(digits);
    case "Middle xxx yyy":
      return /\d*(\d)\1\1(\d)\2\2\d*/.test(digits);
    case "Middle xxxx":
      return /\d*(\d)\1\1\1\d*/.test(digits);
    case "Middle Xy Xy Xy":
      return /\d*(?:(\d)(\d)){3}\d*/.test(digits);

    // Complex pattern types
    case "Fancy Number":
      // Numbers with repeated digits or easy-to-remember patterns
      return /(\d)\1{2,}/.test(digits) || /(\d{2})\1+/.test(digits) || /(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)/.test(digits);
    case "Hexa Ending":
      return /(\d)\1\1\1\1\1$/.test(digits);
    case "Mirror Numbers":
      return digits === [...digits].reverse().join('');
    case "Penta Ending":
      return /(\d)\1\1\1\1$/.test(digits);
    case "Semi Mirror Number":
      // At least half the number is a mirror
      const halfLength = Math.floor(digits.length / 2);
      const firstHalf = digits.substring(0, halfLength);
      const secondHalf = digits.substring(digits.length - halfLength).split('').reverse().join('');
      return firstHalf === secondHalf;
    case "Special Digit Numbers":
      // Numbers containing significant digits like 786, 108, 420, 143
      return /786|108|420|143|999|888|777|666|555|444|333|222|111|000/.test(digits);
    case "Tetra Number":
      return /(\d)\1\1\1/.test(digits);
    case "Vvip Number":
      // Premium looking numbers with many repeating patterns
      return /(\d)\1{3,}/.test(digits) || /(\d{2})\1{2,}/.test(digits) || /(\d{3})\1{1,}/.test(digits) || /0000|1111|2222|3333|4444|5555|6666|7777|8888|9999/.test(digits);
    case "Without 2 4 8":
      return !/[248]/.test(digits);
      
    // Layout-based patterns  
    case "X ABCD ABCD X":
      return /(\d)(\d)(\d)(\d)(\d)\2\3\4\5\1/.test(digits);
    case "X00 X00":
      return /(\d)00(\d)00/.test(digits);
    case "X00X X00X":
      return /(\d)00\1(\d)00\2/.test(digits);
    case "XY ABAB CDCD":
      return /(\d)(\d)(\d)(\d)\3\4(\d)(\d)\5\6/.test(digits);
    case "XY ABC ABC XY":
      return /(\d)(\d)(\d)(\d)(\d)\3\4\5\1\2/.test(digits);
    case "XY ABCD ABCD":
      return /(\d)(\d)(\d)(\d)(\d)(\d)\3\4\5\6/.test(digits);
      
    // Year-based patterns
    case "Years Numbers":
      // Check for years 1950-2030
      return /(19[5-9]\d|20[0-2]\d)/.test(digits);
      
    // Default fallback
    default:
      // If pattern not recognized, return a small percentage randomly
      return Math.random() < 0.1;
  }
};

const QuickPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [displayedNumbers, setDisplayedNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate all numbers once at component mount
  const [allNumbers] = useState<NumberData[]>(() => generateMockNumbers(200));
  
  // Cache for filtered numbers by pattern
  const [patternCache, setPatternCache] = useState<Record<string, NumberData[]>>({});
  
  // Filter and display numbers when pattern changes
  useEffect(() => {
    setIsLoading(true);
    
    // Use cached results if available
    if (patternCache[selectedPattern]) {
      setDisplayedNumbers(patternCache[selectedPattern]);
      setIsLoading(false);
      return;
    }
    
    // Simulate API delay for first-time filtering
    const timeoutId = setTimeout(() => {
      // Filter numbers that match the selected pattern
      const filteredNumbers = allNumbers.filter(number => 
        matchesPattern(number, selectedPattern)
      );
      
      // Update cache with filtered results
      setPatternCache(prevCache => ({
        ...prevCache,
        [selectedPattern]: filteredNumbers
      }));
      
      // Update displayed numbers
      setDisplayedNumbers(filteredNumbers);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timeoutId);
  }, [selectedPattern, allNumbers]);
  
  // Calculate pattern counts for display
  const patternCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // For patterns that are already cached, use the cached length
    Object.keys(patternCache).forEach(pattern => {
      counts[pattern] = patternCache[pattern].length;
    });
    
    return counts;
  }, [patternCache]);
  
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
                    {patternCounts[pattern] !== undefined && 
                      <span className="ml-2 text-xs opacity-70">({patternCounts[pattern]})</span>
                    }
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-4 mt-8">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">
                {selectedPattern} <span className="text-gray-500 dark:text-gray-400 text-lg">({displayedNumbers.length})</span>
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
                {displayedNumbers.map((number, index) => (
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
