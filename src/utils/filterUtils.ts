export interface FilterOptions {
  digits?: string;
  exactPlacement?: { digit: string; position: number }[];
  mostContains?: string;
  sequentialPattern?: boolean;
  repeatingPattern?: boolean;
  repeatingDigit?: string;
  digitSum?: number | null;
  singleDigitSum?: number | null;
  priceRange?: { min: number; max: number } | null;
  carriers?: string[];
  specialPatterns?: string[];
  query?: string;
}

export interface NumberData {
  id: string;
  number: string;
  price: number;
  carrier?: string;
  specialPattern?: string[];
  digitSum?: number;
  singleDigitSum?: number;
}

// Calculate the sum of all digits in a number
export const calculateDigitSum = (number: string): number => {
  const digitsOnly = number.replace(/\D/g, '');
  return digitsOnly.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

// Calculate single digit sum (keep summing until we get a single digit)
export const calculateSingleDigitSum = (number: string): number => {
  let sum = calculateDigitSum(number);
  
  while (sum >= 10) {
    sum = sum.toString().split('').reduce((s, digit) => s + parseInt(digit, 10), 0);
  }
  
  return sum;
};

// Check if number has sequential pattern like 1234, 5678
export const hasSequentialPattern = (number: string): boolean => {
  const digitsOnly = number.replace(/\D/g, '');
  
  for (let i = 0; i < digitsOnly.length - 3; i++) {
    const a = parseInt(digitsOnly[i], 10);
    const b = parseInt(digitsOnly[i + 1], 10);
    const c = parseInt(digitsOnly[i + 2], 10);
    const d = parseInt(digitsOnly[i + 3], 10);
    
    if (b === a + 1 && c === b + 1 && d === c + 1) {
      return true;
    }
  }
  
  return false;
};

// Check if number has repeating pattern like 1212, 4545
export const hasRepeatingPattern = (number: string): boolean => {
  const digitsOnly = number.replace(/\D/g, '');
  
  for (let i = 0; i < digitsOnly.length - 3; i++) {
    const a = digitsOnly[i];
    const b = digitsOnly[i + 1];
    
    if (a === digitsOnly[i + 2] && b === digitsOnly[i + 3]) {
      return true;
    }
  }
  
  return false;
};

// Check if number has at least X consecutive same digits
export const hasConsecutiveSameDigits = (number: string, digit: string, minConsecutive = 4): boolean => {
  const digitsOnly = number.replace(/\D/g, '');
  const regex = new RegExp(`${digit}{${minConsecutive},}`, 'g');
  return regex.test(digitsOnly);
};

// Filter numbers based on all criteria
export const filterNumbers = (numbers: NumberData[], filters: FilterOptions): NumberData[] => {
  return numbers.filter(item => {
    const number = item.number.replace(/\D/g, '');
    
    // Filter by specific digits
    if (filters.digits && filters.digits.length > 0) {
      const requiredDigits = filters.digits.split('');
      if (!requiredDigits.every(digit => number.includes(digit))) {
        return false;
      }
    }
    
    // Filter by exact digit placement
    if (filters.exactPlacement && filters.exactPlacement.length > 0) {
      if (!filters.exactPlacement.every(({ digit, position }) => number[position] === digit)) {
        return false;
      }
    }
    
    // Filter by most contained digit
    if (filters.mostContains && filters.mostContains.length > 0) {
      const digit = filters.mostContains;
      const countInOtherNumbers = numbers.map(num => {
        const count = (num.number.match(new RegExp(digit, 'g')) || []).length;
        return { id: num.id, count };
      });
      
      const maxCount = Math.max(...countInOtherNumbers.map(n => n.count));
      const currentCount = (number.match(new RegExp(digit, 'g')) || []).length;
      
      if (currentCount < maxCount) {
        return false;
      }
    }
    
    // Filter by sequential pattern (like 1234)
    if (filters.sequentialPattern && !hasSequentialPattern(number)) {
      return false;
    }
    
    // Filter by repeating pattern (like 1212)
    if (filters.repeatingPattern && !hasRepeatingPattern(number)) {
      return false;
    }
    
    // Filter by repeating digit (like 0000, 9999)
    if (filters.repeatingDigit) {
      if (!hasConsecutiveSameDigits(number, filters.repeatingDigit)) {
        return false;
      }
    }
    
    // Filter by digit sum
    if (filters.digitSum !== null && filters.digitSum !== undefined) {
      const sum = item.digitSum ?? calculateDigitSum(number);
      if (sum !== filters.digitSum) {
        return false;
      }
    }
    
    // Filter by single digit sum
    if (filters.singleDigitSum !== null && filters.singleDigitSum !== undefined) {
      const singleSum = item.singleDigitSum ?? calculateSingleDigitSum(number);
      if (singleSum !== filters.singleDigitSum) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (item.price < min || (max > 0 && item.price > max)) {
        return false;
      }
    }
    
    // Filter by carrier
    if (filters.carriers && filters.carriers.length > 0) {
      if (!item.carrier || !filters.carriers.includes(item.carrier)) {
        return false;
      }
    }
    
    // Filter by special patterns
    if (filters.specialPatterns && filters.specialPatterns.length > 0) {
      if (!item.specialPattern || !filters.specialPatterns.some(pattern => 
        item.specialPattern?.includes(pattern))) {
        return false;
      }
    }
    
    // Global search query
    if (filters.query && filters.query.length > 0) {
      const query = filters.query.toLowerCase();
      const numberStr = item.number.toLowerCase();
      const carrierStr = item.carrier?.toLowerCase() || '';
      const patterns = item.specialPattern?.join(' ').toLowerCase() || '';
      
      if (!numberStr.includes(query) && 
          !carrierStr.includes(query) && 
          !patterns.includes(query)) {
        return false;
      }
    }
    
    return true;
  });
};

// Generate birtdate numbers
export const getBirthdateNumbers = (dob: string): string[] => {
  if (!dob) return [];
  
  // Parse date string (format: YYYY-MM-DD)
  const [year, month, day] = dob.split('-').map(part => part.padStart(2, '0'));
  
  if (!year || !month || !day) return [];
  
  // Create different formats
  const formats = [
    `${day}${month}${year.slice(-2)}`, // DDMMYY
    `${day}${month}${year}`, // DDMMYYYY
    `${day}${month}`, // DDMM
    `${month}${day}`, // MMDD
    `${year}${month}${day}`, // YYYYMMDD
    `${year.slice(-2)}${month}${day}`, // YYMMDD
  ];
  
  return formats;
};

// Generate vehicle numbers
export const getVehicleNumberVariants = (vehicleNumber: string): string[] => {
  if (!vehicleNumber) return [];
  
  // Remove all non-alphanumeric characters and convert to uppercase
  const cleanNumber = vehicleNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  // If the input is too short, return empty array
  if (cleanNumber.length < 4) return [];
  
  const variants = [cleanNumber];
  
  // Add variants with only the numeric part
  const numericPart = cleanNumber.replace(/[^0-9]/g, '');
  if (numericPart.length >= 3) {
    variants.push(numericPart);
  }
  
  // Add variants with the last 4 digits if available
  if (cleanNumber.length >= 4) {
    variants.push(cleanNumber.slice(-4));
  }
  
  return variants;
};
