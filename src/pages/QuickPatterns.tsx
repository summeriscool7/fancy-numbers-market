import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { categorizeNumbersByPatterns } from '@/utils/customPatternDetection';
import NumberCard from '@/components/NumberCard';
import { Separator } from '@/components/ui/separator';
import { NumberData } from '@/utils/filterUtils';
import CSVUploader from '@/components/CSVUploader';
import { Filter, FileText } from 'lucide-react';

function isConsecutiveDoubleDigitsFunction(digits) {
  // Extract the 5 two-digit numbers
  const num3 = parseInt(digits.substring(4, 6));
  const num4 = parseInt(digits.substring(6, 8));
  const num5 = parseInt(digits.substring(8, 10));
  
  // Check if they form a consecutive sequence
  return num4 === num3 + 1 && 
         num5 === num4 + 1;
}

const patterns = [
  "000 Number", "00AB 00CD", "1008", "108 108 Numbers", "143 143 Love Number",
  "420 420 Number", "786 Numbers", "78692 Numbers", "850000 xyxy", "916 916 Gold",
  "AAB AAB XY XY", "AB XXX CD YYY", "AB00 CD00", "ABA ABA XYXY",
  "ABAB CDCD XY", "ABAB X CDCD X", "ABAB XY ACAC", "ABAB XY CDCD", "ABB ABB Ending",
  "ABB ABB XYXY", "ABC ABC XYXY", "ABC ABD XY XY", "Abcd Abcd", "ABCD ABCD XY",
  "ABCD XY ABCD", "ABXXX CDYYY", "AXXX BYYY", "AxxxB CxxxD", "Counting 11 12 13 TYPE",
  "Counting Numbers", "Double 786 786", "Double Jodi", "ENDING XXX",
  "Ending XXYYZZ", "Fancy Number", "Hexa Ending", "Middle Hexa", "Middle Penta",
  "Middle xxx yyy", "Middle xxxx", "Middle Xy Xy Xy", "Mirror Numbers", "Penta Ending",
  "Semi Mirror Number", "Special Digit Numbers", "Starting xxxx", "Tetra Number", "Vvip Number",
  "Without 2 4 8", "X ABCD ABCD X", "X00 X00", "X00X X00X", "XXX YYY Ending",
  "XXX YYY Starting", "XXXX Ending", "XXYYZZ Starting", "XY ABAB CDCD", "XY ABC ABC XY",
  "XY ABCD ABCD", "XY XY", "Xy Xy Xy Ending", "XY XY XY Starting", "XYZ XYZ Ending",
  "Years Numbers", "0000 Number", "AB00 CD01", "787 Numbers"
];

const customPatterns = [
  "SuperVIP", "XXXX Pattern", "X00X Y00Y", "ABCD ABCD", "ABXBABAB", 
  "MX Three", "Others", "ABCD X ABCD Y", "XY ABBA ABBA", 
  "ABCC X ABCC Y", "ABC XX ABC YY", "XY A0 B0 C0 D0", 
  "XY ABAB CDCD", "ABC ABC WXYZ", "ABCD XYZ XYZ", 
  "New Category 1", "ABABDABABE"
];

const matchesPattern = (number: NumberData, pattern: string): boolean => {
  const digits = number.number.toString();

  switch(pattern) {
    case "ABB ABB XYXY":
      return /(\d)(\d)\2(\d)(\d)\4(\d)(\d)\6\5\6/.test(digits);
    case "ABC ABC XYXY":
      return /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)\7\8/.test(digits);
    case "ABC ABD XY XY":
      return /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)\7\8/.test(digits);
    case "Abcd Abcd":
      return digits[2] === digits[6] && digits[3] === digits[7] && digits[4] === digits[8] && digits[5] === digits[9]
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
    case "ABCD ABCD XY":
      return digits[0] === digits[4] && digits[1] === digits[5] && digits[2] === digits[6] && digits[3] === digits[7];
    case "ABCD XY ABCD":
      return /^(\d{2})(\d{2})\d{2}\1\2$/.test(digits);
    case "ABXXX CDYYY":
      return /^(\d{2})(\d)\2\2(\d{2})(\d)\4\4$/.test(digits);
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

    case "XY XY":
      return /(\d{2})\1/.test(digits);
    case "AAB AAB XY XY":
      return digits[0] === digits[1] && digits[3] === digits[4] && digits[2] === digits[5] && digits[6] === digits[8] && digits[7] === digits[9];
    case "ABA ABA XYXY":
      return digits[0] === digits[2] && digits[2] === digits[3] && digits[3] === digits[5] && digits[1] === digits[4] && digits[7] === digits[9] && digits[6] === digits[8];
    case "AB XXX CD YYY":
      return /(\d)(\d)(\d)\3\3(\d)(\d)(\d)\6\6/.test(digits);
    case "AB00 CD00":
      return /(\d)(\d)00(\d)(\d)00/.test(digits);
    case "AB00 CD01":
      return /(\d)(\d)00(\d)(\d)01/.test(digits);
    case "ABAB CDCD XY":
      return /(\d)(\d)\1\2(\d)(\d)\3\4(\d)(\d)/.test(digits);
    case "ABAB X CDCD X": 
      return /(\d)(\d)\1\2(\d)(\d)(\d)\4\5\6/.test(digits);
    case "ABAB XY ACAC":
      return /(\d)(\d)\1\2(\d)(\d)\1\3/.test(digits);
    case "ABAB XY CDCD":
      return /(\d)(\d)\1\2(\d)(\d)(\d)(\d)\7\8/.test(digits);
    case "ABB ABB Ending":
      return /.*(\d)(\d)\2\1\2\2$/.test(digits);
    case "AXXX BYYY":
      return (digits[3] === digits[4] && digits[4] === digits[5] && digits[7] === digits[8] && digits[8] === digits[9]) || /^\d{2}(\d)(\d)\2\2(\d)(\d)\4\4$/.test(digits);
    case "AxxxB CxxxD":
      return digits[1] === digits[2] && digits[2] === digits[3] && digits[6] === digits[7] && digits[7] === digits[8];

    case "Counting 11 12 13 TYPE":
      return isConsecutiveDoubleDigitsFunction(digits);
    case "Counting Numbers":
      return (/(?:0?1(?:2(?:3(?:4(?:5(?:6(?:7(?:89?)?)?)?)?)?)?)?)|(?:9(?:8(?:7(?:6(?:5(?:4(?:3(?:21?)?)?)?)?)?)?)?)|(?:(?:12(?:34?)?)|(?:(?:23(?:45?)?)|(?:(?:34(?:56?)?)|(?:(?:45(?:67?)?)|(?:(?:56(?:78?)?)|(?:(?:67(?:89?)?)|(?:78(?:90?)?)?)?)?)?)?)?)/.test(digits)) || isConsecutiveDoubleDigitsFunction(digits);
    case "Double 786 786":
      return /786.*786/.test(digits);
    case "Double Jodi":
      return /(\d{2}).*\1/.test(digits);

    case "ENDING XXX":
      return digits[7] === digits[8] && digits[8] === digits[9];
    case "Ending XXYYZZ":
      return digits[8] === digits[9] && digits[6] === digits[7] && digits[4] === digits[5];
    case "Starting xxxx":
      return digits[0] === digits[1] && digits[1] === digits[2] && digits[2] === digits[3];
    case "XXXX Ending":
      return digits[7] === digits[8] && digits[8] === digits[9] && digits[6] === digits[7];
    case "XXYYZZ Starting":
      return digits[0] === digits[1] && digits[2] === digits[3] && digits[4] === digits[5];
    case "XXX YYY Ending":
      return digits[4] === digits[5] && digits[5] === digits[6] && digits[7] === digits[8] && digits[8] === digits[9];
    case "XXX YYY Starting":
      return digits[0] === digits[1] && digits[1] === digits[2] && digits[7] === digits[8] && digits[8] === digits[9];
    case "XY XY XY Starting":
      return /^(\d)(\d)\1\2\1\2/.test(digits);
    case "XYZ XYZ Ending":
      return /.*(\d)(\d)(\d)\1\2\3$/.test(digits);
    case "Xy Xy Xy Ending":
      return /.*(\d\d)\1\1$/.test(digits);

    case "Middle Hexa":
      return /\d{2}(\d)\1\1\1\1\1\d{2}/.test(digits);
    case "Middle Penta":
      return /\d{2,3}(\d)\1\1\1\1\d{2,3}/.test(digits);
    case "Middle xxx yyy":
      return /\d*(\d)\1\1(\d)\2\2\d*/.test(digits);
    case "Middle xxxx":
      return /\d*(\d)\1\1\1\d*/.test(digits);
    case "Middle Xy Xy Xy":
      return /\d*(\d\d)\1\1\d*/.test(digits);

    case "Fancy Number":
      return /(\d)\1{2,}/.test(digits) || /(\d{2})\1+/.test(digits) || /(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)/.test(digits);
    case "Hexa Ending":
      return /(\d)\1\1\1\1\1$/.test(digits);
    case "Mirror Numbers":
      return digits === [...digits].reverse().join('');
    case "Penta Ending":
      return /(\d)\1\1\1\1$/.test(digits);
    case "Semi Mirror Number":
      const halfLength = Math.floor(digits.length / 2);
      const firstHalf = digits.substring(0, halfLength);
      const secondHalf = digits.substring(digits.length - halfLength).split('').reverse().join('');
      return firstHalf === secondHalf;
    case "Special Digit Numbers":
      return /786|108|420|143|999|888|777|666|555|444|333|222|111|000/.test(digits);
    case "Tetra Number":
      return /(\d)\1\1\1/.test(digits);
    case "Vvip Number":
      return /(\d)\1{3,}/.test(digits) || /(\d{2})\1{2,}/.test(digits) || /(\d{3})\1{1,}/.test(digits) || /0000|1111|2222|3333|4444|5555|6666|7777|8888|9999/.test(digits);
    case "Without 2 4 8":
      return !/[248]/.test(digits);

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

    case "Years Numbers":
      return /(19[5-9]\d|20[0-2]\d)/.test(digits);

    default:
      return Math.random() < 0.1;
  }
};

const QuickPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [displayedNumbers, setDisplayedNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useCustomUpload, setUseCustomUpload] = useState(false);
  const [uploadedNumbers, setUploadedNumbers] = useState<number[]>([]);
  const [categorizedNumbers, setCategorizedNumbers] = useState<Record<string, NumberData[]>>({});
  const [processingCSV, setProcessingCSV] = useState(false);

  const [allNumbers] = useState<NumberData[]>(() => generateMockNumbers(200));
  const [patternCache, setPatternCache] = useState<Record<string, NumberData[]>>({});

  useEffect(() => {
    if (uploadedNumbers.length === 0) return;

    setProcessingCSV(true);
    
    setTimeout(() => {
      try {
        const categorized = categorizeNumbersByPatterns(uploadedNumbers);
        
        const formattedCategories: Record<string, NumberData[]> = {};
        
        Object.entries(categorized).forEach(([category, numbers]) => {
          formattedCategories[category] = numbers.map((num, index) => ({
            id: `custom-${category}-${index}`,
            number: num.toString(),
            price: Math.floor(Math.random() * 5000) + 500,
            carrier: ['VI', 'AIRTEL', 'JIO'][Math.floor(Math.random() * 3)],
            specialPattern: [category],
            digitSum: num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0),
            singleDigitSum: 0
          }));
          
          formattedCategories[category].forEach(num => {
            let sum = num.digitSum;
            while (sum >= 10) {
              sum = sum.toString().split('').reduce((s, d) => s + parseInt(d), 0);
            }
            num.singleDigitSum = sum;
          });
        });
        
        setCategorizedNumbers(formattedCategories);
        
        if (useCustomUpload && customPatterns.length > 0) {
          setSelectedPattern(customPatterns[0]);
        }
      } catch (error) {
        console.error("Error processing uploaded numbers:", error);
      } finally {
        setProcessingCSV(false);
      }
    }, 100);
  }, [uploadedNumbers]);

  useEffect(() => {
    if (useCustomUpload) return;
    
    setIsLoading(true);

    if (patternCache[selectedPattern]) {
      setDisplayedNumbers(patternCache[selectedPattern]);
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filteredNumbers = allNumbers.filter(number => 
        matchesPattern(number, selectedPattern)
      );

      setPatternCache(prevCache => ({
        ...prevCache,
        [selectedPattern]: filteredNumbers
      }));

      setDisplayedNumbers(filteredNumbers);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [selectedPattern, allNumbers, useCustomUpload]);

  useEffect(() => {
    if (!useCustomUpload) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (selectedPattern === 'SuperVIP') {
        setDisplayedNumbers(categorizedNumbers.super_vip || []);
      } else if (selectedPattern === 'XXXX Pattern') {
        setDisplayedNumbers(categorizedNumbers.xxxx || []);
      } else if (selectedPattern === 'X00X Y00Y') {
        setDisplayedNumbers(categorizedNumbers.x00x_y00y || []);
      } else if (selectedPattern === 'ABCD ABCD') {
        setDisplayedNumbers(categorizedNumbers.abcd_abcd || []);
      } else if (selectedPattern === 'ABXBABAB') {
        setDisplayedNumbers(categorizedNumbers.abxbabab || []);
      } else if (selectedPattern === 'MX Three') {
        setDisplayedNumbers(categorizedNumbers.mxthree || []);
      } else if (selectedPattern === 'Others') {
        setDisplayedNumbers(categorizedNumbers.others || []);
      } else if (selectedPattern === 'ABCD X ABCD Y') {
        setDisplayedNumbers(categorizedNumbers.abcd_x_abcd_y || []);
      } else if (selectedPattern === 'XY ABBA ABBA') {
        setDisplayedNumbers(categorizedNumbers.xy_abba_abba || []);
      } else if (selectedPattern === 'ABCC X ABCC Y') {
        setDisplayedNumbers(categorizedNumbers.abcc_x_abcc_y || []);
      } else if (selectedPattern === 'ABC XX ABC YY') {
        setDisplayedNumbers(categorizedNumbers.abc_xx_abc_yy || []);
      } else if (selectedPattern === 'XY A0 B0 C0 D0') {
        setDisplayedNumbers(categorizedNumbers.xy_a0_b0_c0_d0 || []);
      } else if (selectedPattern === 'XY ABAB CDCD') {
        setDisplayedNumbers(categorizedNumbers.xy_abab_cdcd || []);
      } else if (selectedPattern === 'ABC ABC WXYZ') {
        setDisplayedNumbers(categorizedNumbers.abc_abc_wxyz || []);
      } else if (selectedPattern === 'ABCD XYZ XYZ') {
        setDisplayedNumbers(categorizedNumbers.abcd_xyz_xyz || []);
      } else if (selectedPattern === 'New Category 1') {
        setDisplayedNumbers(categorizedNumbers.new_categ1 || []);
      } else if (selectedPattern === 'ABABDABABE') {
        setDisplayedNumbers(categorizedNumbers.ababdababe || []);
      } else {
        setDisplayedNumbers([]);
      }
      
      setIsLoading(false);
    }, 300);
  }, [selectedPattern, categorizedNumbers, useCustomUpload]);

  const patternCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    if (!useCustomUpload) {
      Object.keys(patternCache).forEach(pattern => {
        counts[pattern] = patternCache[pattern].length;
      });
    } else {
      if (categorizedNumbers.super_vip) counts['SuperVIP'] = categorizedNumbers.super_vip.length;
      if (categorizedNumbers.xxxx) counts['XXXX Pattern'] = categorizedNumbers.xxxx.length;
      if (categorizedNumbers.x00x_y00y) counts['X00X Y00Y'] = categorizedNumbers.x00x_y00y.length;
      if (categorizedNumbers.abcd_abcd) counts['ABCD ABCD'] = categorizedNumbers.abcd_abcd.length;
      if (categorizedNumbers.abxbabab) counts['ABXBABAB'] = categorizedNumbers.abxbabab.length;
      if (categorizedNumbers.mxthree) counts['MX Three'] = categorizedNumbers.mxthree.length;
      if (categorizedNumbers.others) counts['Others'] = categorizedNumbers.others.length;
      if (categorizedNumbers.abcd_x_abcd_y) counts['ABCD X ABCD Y'] = categorizedNumbers.abcd_x_abcd_y.length;
      if (categorizedNumbers.xy_abba_abba) counts['XY ABBA ABBA'] = categorizedNumbers.xy_abba_abba.length;
      if (categorizedNumbers.abcc_x_abcc_y) counts['ABCC X ABCC Y'] = categorizedNumbers.abcc_x_abcc_y.length;
      if (categorizedNumbers.abc_xx_abc_yy) counts['ABC XX ABC YY'] = categorizedNumbers.abc_xx_abc_yy.length;
      if (categorizedNumbers.xy_a0_b0_c0_d0) counts['XY A0 B0 C0 D0'] = categorizedNumbers.xy_a0_b0_c0_d0.length;
      if (categorizedNumbers.xy_abab_cdcd) counts['XY ABAB CDCD'] = categorizedNumbers.xy_abab_cdcd.length;
      if (categorizedNumbers.abc_abc_wxyz) counts['ABC ABC WXYZ'] = categorizedNumbers.abc_abc_wxyz.length;
      if (categorizedNumbers.abcd_xyz_xyz) counts['ABCD XYZ XYZ'] = categorizedNumbers.abcd_xyz_xyz.length;
      if (categorizedNumbers.new_categ1) counts['New Category 1'] = categorizedNumbers.new_categ1.length;
      if (categorizedNumbers.ababdababe) counts['ABABDABABE'] = categorizedNumbers.ababdababe.length;
    }

    return counts;
  }, [patternCache, categorizedNumbers, useCustomUpload]);

  const handleToggleChange = () => {
    setUseCustomUpload(!useCustomUpload);
    
    if (!useCustomUpload) {
      setSelectedPattern(customPatterns[0]);
    } else {
      setSelectedPattern(patterns[0]);
    }
  };

  const handleNumbersExtracted = (numbers: number[]) => {
    setUploadedNumbers(numbers);
  };

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
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Search Mode</h2>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${!useCustomUpload ? 'font-medium' : ''}`}>
                  Catalog Numbers
                </span>
                <Toggle 
                  pressed={useCustomUpload}
                  onPressedChange={handleToggleChange}
                  aria-label="Toggle search mode"
                  className="data-[state=on]:bg-primary"
                >
                  {useCustomUpload ? <FileText className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                </Toggle>
                <span className={`text-sm ${useCustomUpload ? 'font-medium' : ''}`}>
                  Your Numbers
                </span>
              </div>
            </div>
            
            {useCustomUpload && (
              <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-medium mb-2">Upload Your CSV File</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Upload a CSV file containing phone numbers to analyze them using our pattern detection algorithms.
                </p>
                <CSVUploader 
                  onNumbersExtracted={handleNumbersExtracted} 
                  isProcessing={processingCSV}
                />
                {processingCSV && (
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Processing your numbers... This may take a moment.
                  </div>
                )}
              </div>
            )}

            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Pattern Types</h2>
              <div className="flex flex-wrap gap-2">
                {(useCustomUpload ? customPatterns : patterns).map((pattern) => (
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
                {useCustomUpload 
                  ? `These are your ${selectedPattern} pattern numbers extracted from the uploaded CSV file.`
                  : `Browse our collection of ${selectedPattern} mobile numbers. These numbers have special patterns that make them easy to remember.`
                }
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : displayedNumbers.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {useCustomUpload 
                    ? "No matching numbers found in your CSV. Try uploading a different file."
                    : "No numbers match this pattern in our catalog."}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuickPatterns;
