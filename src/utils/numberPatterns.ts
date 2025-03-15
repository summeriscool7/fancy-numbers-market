// Function to generate mock numbers with patterns
export const generateMockNumbers = (count: number): NumberData[] => {
  const numbers: NumberData[] = [];
  const carriers = ["JIO", "AIRTEL", "VI"];
  const specialPatterns = [
    "Royal", "Premium", "Lucky", "Sequential", "Repeating", "Mirror", 
    "Palindrome", "Ascending", "Descending"
  ];
  
  // Helper for generating patterned numbers
  const generatePatternedNumber = (index: number): string => {
    // Create various patterns
    switch (index % 20) {
      case 0: return "98" + Math.random().toString().substring(2, 10); // Random
      case 1: return "987654321" + Math.floor(Math.random() * 10); // Descending
      case 2: return "912345678" + Math.floor(Math.random() * 10); // Ascending
      case 3: return "9" + "0".repeat(Math.floor(Math.random() * 3)) + Math.random().toString().substring(2, 9); // Leading zeros
      case 4: return "91" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "9999"; // Ending repeated
      case 5: return "9876543210"; // Full sequence
      case 6: return "9" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "8888" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10); // Middle repeated
      case 7: return "90" + Math.floor(Math.random() * 10) + "1234" + Math.floor(Math.random() * 10) + "7"; // Has 1234
      case 8: return "98" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "1111"; // Ending same
      case 9: return "9" + Math.floor(Math.random() * 10) + "7777" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10); // 7777 in middle
      case 10: return "9786" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10); // Starts with 9786
      case 11: return "9" + Math.floor(Math.random() * 10) + "143" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "143"; // Contains 143 twice
      case 12: return "9" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "4545" + Math.floor(Math.random() * 10); // Contains 4545
      case 13: return "9" + Math.floor(Math.random() * 10) + "1313" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10); // Contains 1313
      case 14: return "9696" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10); // Starts with 9696
      case 15: return "9" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "7890"; // Ends with 7890
      case 16: return "9" + Math.floor(Math.random() * 10) + "8" + Math.floor(Math.random() * 10) + "7" + Math.floor(Math.random() * 10) + "6" + Math.floor(Math.random() * 10) + "5"; // Alternating pattern
      case 17: return "9" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "420" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "0"; // Contains 420
      case 18: return "9" + Math.floor(Math.random() * 10) + "0" + Math.floor(Math.random() * 10) + "0" + Math.floor(Math.random() * 10) + "0" + Math.floor(Math.random() * 10); // Has zeros in alternating positions
      case 19: return "9" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + "786"; // Ends with 786
      default: return "98" + Math.random().toString().substring(2, 10);
    }
  };
  
  // Generate mock number data
  for (let i = 0; i < count; i++) {
    const number = generatePatternedNumber(i);
    const digitSum = number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    let singleDigitSum = digitSum;
    while (singleDigitSum >= 10) {
      singleDigitSum = singleDigitSum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    
    // Randomly assign patterns and calculate price
    const randomPatterns: string[] = [];
    const patternCount = Math.floor(Math.random() * 3);
    for (let j = 0; j <= patternCount; j++) {
      const pattern = specialPatterns[Math.floor(Math.random() * specialPatterns.length)];
      if (!randomPatterns.includes(pattern)) {
        randomPatterns.push(pattern);
      }
    }
    
    const basePrice = 1000 + Math.floor(Math.random() * 5000);
    const patternMultiplier = 1 + (randomPatterns.length * 0.3);
    const price = Math.floor(basePrice * patternMultiplier);
    
    numbers.push({
      id: `mock-${i}`,
      number,
      price,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      specialPattern: randomPatterns,
      digitSum,
      singleDigitSum
    });
  }
  
  return numbers;
};

// Create mock number patterns
export const PATTERN_CATEGORIES = {
  SEQUENTIAL: "Sequential",
  REPEATING: "Repeating",
  PALINDROME: "Palindrome",
  MIRROR: "Mirror",
  ASCENDING: "Ascending",
  DESCENDING: "Descending",
  PREMIUM: "Premium",
  ROYAL: "Royal",
  LUCKY: "Lucky"
};

// For debugging
export const APP_CONFIG = {
  DEBUG: true,
  VERSION: "1.0.0"
};
