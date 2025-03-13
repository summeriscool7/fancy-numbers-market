
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { FilterOptions } from '@/utils/filterUtils';
import { PATTERN_CATEGORIES } from '@/utils/numberPatterns';
import { 
  Filter, 
  Search,
  SlidersHorizontal, 
  Hash, 
  Inbox, 
  RefreshCw,
  Calculator,
  Tag,
  Star,
  Sparkles
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
  onFilterReset: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  onFilterChange, 
  onFilterReset 
}) => {
  const isMobile = useIsMobile();
  
  const [filters, setFilters] = useState<FilterOptions>({
    digits: '',
    exactPlacement: [],
    sequentialPattern: false,
    repeatingPattern: false,
    repeatingDigit: '',
    digitSum: null,
    singleDigitSum: null,
    specialPatterns: [],
    query: '',
    luckyDigits: [],
    unluckyDigits: [],
    priceRange: null,
  });
  
  const patternOptions = [
    PATTERN_CATEGORIES.SEQUENTIAL,
    PATTERN_CATEGORIES.REPEATING,
    PATTERN_CATEGORIES.PALINDROME,
    PATTERN_CATEGORIES.MIRROR,
    PATTERN_CATEGORIES.ASCENDING,
    PATTERN_CATEGORIES.DESCENDING,
    PATTERN_CATEGORIES.PREMIUM,
    PATTERN_CATEGORIES.ROYAL,
    PATTERN_CATEGORIES.LUCKY,
  ];
  
  const handleFilterChange = (
    key: keyof FilterOptions, 
    value: any
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handlePatternToggle = (pattern: string) => {
    const currentPatterns = filters.specialPatterns || [];
    let newPatterns: string[];
    
    if (currentPatterns.includes(pattern)) {
      newPatterns = currentPatterns.filter(p => p !== pattern);
    } else {
      newPatterns = [...currentPatterns, pattern];
    }
    
    handleFilterChange('specialPatterns', newPatterns);
  };
  
  const handleDigitPreferenceToggle = (digit: string, type: 'lucky' | 'unlucky') => {
    const currentDigits = type === 'lucky' 
      ? filters.luckyDigits || [] 
      : filters.unluckyDigits || [];
    
    let newDigits: string[];
    
    if (currentDigits.includes(digit)) {
      newDigits = currentDigits.filter(d => d !== digit);
    } else {
      newDigits = [...currentDigits, digit];
    }
    
    handleFilterChange(type === 'lucky' ? 'luckyDigits' : 'unluckyDigits', newDigits);
  };
  
  const handleReset = () => {
    const resetFilters: FilterOptions = {
      digits: '',
      exactPlacement: [],
      sequentialPattern: false,
      repeatingPattern: false,
      repeatingDigit: '',
      digitSum: null,
      singleDigitSum: null,
      specialPatterns: [],
      query: '',
      luckyDigits: [],
      unluckyDigits: [],
      priceRange: null,
    };
    
    setFilters(resetFilters);
    onFilterReset();
  };
  
  // Special number sequences
  const specialSequences = [
    { label: 'Sequential (1234)', value: 'sequential', filter: 'sequentialPattern' },
    { label: 'Repeating (0000, 9999)', value: 'repeating', filter: 'repeatingPattern' },
  ];
  
  // All accordion sections expanded by default
  const defaultOpenSections = ['digits', 'patterns', 'sequences', 'numerology', 'preferences', 'price'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <h3 className="font-medium flex items-center">
          <Filter size={18} className="mr-2" />
          Filters
        </h3>
      </div>
      
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search numbers, patterns..."
            className="pl-10"
            value={filters.query || ''}
            onChange={(e) => handleFilterChange('query', e.target.value)}
          />
        </div>
      </div>
      
      <Accordion type="multiple" defaultValue={defaultOpenSections} className="px-2">
        {/* Specific Digits Filter */}
        <AccordionItem value="digits">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Hash size={16} className="mr-2" />
              Search by Digits
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-2">
              <div>
                <Label htmlFor="digits" className="text-xs text-gray-500 mb-1 block">
                  Enter digits you want in your number
                </Label>
                <Input
                  id="digits"
                  placeholder="e.g. 789"
                  value={filters.digits || ''}
                  onChange={(e) => handleFilterChange('digits', e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Special Patterns Filter */}
        <AccordionItem value="patterns">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Inbox size={16} className="mr-2" />
              Number Patterns
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {patternOptions.map((pattern) => (
                  <div key={pattern} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`pattern-${pattern}`} 
                      checked={(filters.specialPatterns || []).includes(pattern)}
                      onCheckedChange={() => handlePatternToggle(pattern)}
                    />
                    <Label 
                      htmlFor={`pattern-${pattern}`}
                      className="text-sm leading-none"
                    >
                      {pattern}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Special Sequences Filter */}
        <AccordionItem value="sequences">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <SlidersHorizontal size={16} className="mr-2" />
              Special Sequences
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-3">
              {specialSequences.map((sequence) => (
                <div key={sequence.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sequence-${sequence.value}`}
                    checked={Boolean(filters[sequence.filter as keyof FilterOptions])}
                    onCheckedChange={(checked) => 
                      handleFilterChange(sequence.filter as keyof FilterOptions, checked)
                    }
                  />
                  <Label 
                    htmlFor={`sequence-${sequence.value}`}
                    className="text-sm leading-none"
                  >
                    {sequence.label}
                  </Label>
                </div>
              ))}
              
              <div>
                <Label htmlFor="repeating-digit" className="text-xs text-gray-500 mb-1 block">
                  Repeating digit (e.g. enter 8 for 8888)
                </Label>
                <Input
                  id="repeating-digit"
                  placeholder="Enter a digit 0-9"
                  value={filters.repeatingDigit || ''}
                  onChange={(e) => handleFilterChange('repeatingDigit', e.target.value.charAt(0))}
                  maxLength={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Numerology Filters */}
        <AccordionItem value="numerology">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Calculator size={16} className="mr-2" />
              Numerology
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-3">
              <div>
                <Label htmlFor="digit-sum" className="text-xs text-gray-500 mb-1 block">
                  Digit Sum (sum of all digits)
                </Label>
                <Input
                  id="digit-sum"
                  type="number"
                  placeholder="e.g. 36"
                  value={filters.digitSum === null ? '' : filters.digitSum}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value);
                    handleFilterChange('digitSum', value);
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="single-digit-sum" className="text-xs text-gray-500 mb-1 block">
                  Single Digit Sum (1-9)
                </Label>
                <Input
                  id="single-digit-sum"
                  type="number"
                  placeholder="e.g. 9"
                  value={filters.singleDigitSum === null ? '' : filters.singleDigitSum}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value);
                    handleFilterChange('singleDigitSum', value);
                  }}
                  min={1}
                  max={9}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Digit Preferences */}
        <AccordionItem value="preferences">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Star size={16} className="mr-2" />
              Digit Preferences
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-2 block">
                  Lucky Digits (numbers you want)
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, i) => i.toString()).map((digit) => (
                    <Button
                      key={`lucky-${digit}`}
                      type="button"
                      variant={filters.luckyDigits?.includes(digit) ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDigitPreferenceToggle(digit, 'lucky')}
                    >
                      {digit}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-500 mb-2 block">
                  Unlucky Digits (numbers to avoid)
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, i) => i.toString()).map((digit) => (
                    <Button
                      key={`unlucky-${digit}`}
                      type="button"
                      variant={filters.unluckyDigits?.includes(digit) ? "destructive" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDigitPreferenceToggle(digit, 'unlucky')}
                    >
                      {digit}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Tag size={16} className="mr-2" />
              Price Range
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="min-price" className="text-xs text-gray-500 mb-1 block">
                    Min Price ($)
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.min || ''}
                    onChange={(e) => {
                      const min = e.target.value === '' ? 0 : parseInt(e.target.value);
                      const max = filters.priceRange?.max || 0;
                      handleFilterChange('priceRange', { min, max });
                    }}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="max-price" className="text-xs text-gray-500 mb-1 block">
                    Max Price ($)
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.max || ''}
                    onChange={(e) => {
                      const max = e.target.value === '' ? 0 : parseInt(e.target.value);
                      const min = filters.priceRange?.min || 0;
                      handleFilterChange('priceRange', { min, max });
                    }}
                    min={0}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Premium Filters */}
        <AccordionItem value="premium">
          <AccordionTrigger className="py-3 px-3">
            <span className="flex items-center text-sm">
              <Sparkles size={16} className="mr-2" />
              Premium Filters
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="premium-only"
                  checked={Boolean(filters.isPremium)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('isPremium', checked)
                  }
                />
                <Label 
                  htmlFor="premium-only"
                  className="text-sm leading-none"
                >
                  Premium Numbers Only
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="royal-only"
                  checked={Boolean(filters.isRoyal)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('isRoyal', checked)
                  }
                />
                <Label 
                  htmlFor="royal-only"
                  className="text-sm leading-none"
                >
                  Royal Numbers Only
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lucky-only"
                  checked={Boolean(filters.isLucky)}
                  onCheckedChange={(checked) => 
                    handleFilterChange('isLucky', checked)
                  }
                />
                <Label 
                  htmlFor="lucky-only"
                  className="text-sm leading-none"
                >
                  Lucky Numbers Only
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="p-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleReset}
        >
          <RefreshCw size={16} className="mr-2" />
          Reset Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterSection;
