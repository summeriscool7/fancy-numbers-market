
// Define pattern categories
export const PATTERN_CATEGORIES = {
  SEQUENTIAL: 'Sequential',
  REPEATING: 'Repeating',
  PALINDROME: 'Palindrome',
  MIRROR: 'Mirror',
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending',
  PREMIUM: 'Premium',
  ROYAL: 'Royal',
  LUCKY: 'Lucky'
};

// Function to identify patterns in a number
export const identifyPatterns = (phoneNumber: string): string[] => {
  // Clean the number (remove non-digit characters)
  const number = phoneNumber.replace(/\D/g, '');
  const patterns: string[] = [];
  
  // Check for sequential patterns (e.g., 1234, 5678)
  if (hasSequentialPattern(number)) {
    patterns.push(PATTERN_CATEGORIES.SEQUENTIAL);
  }
  
  // Check for repeating digits (e.g., 0000, 9999, etc.)
  if (hasRepeatingDigits(number, 4)) {
    patterns.push(PATTERN_CATEGORIES.REPEATING);
  }
  
  // Check for palindrome (e.g., 12321, 45654)
  if (isPalindrome(number)) {
    patterns.push(PATTERN_CATEGORIES.PALINDROME);
  }
  
  // Check for mirror patterns (e.g., 1221, 5665)
  if (isMirror(number)) {
    patterns.push(PATTERN_CATEGORIES.MIRROR);
  }
  
  // Check for ascending sequence (e.g., 1235, 2468)
  if (isAscending(number)) {
    patterns.push(PATTERN_CATEGORIES.ASCENDING);
  }
  
  // Check for descending sequence (e.g., 9876, 8642)
  if (isDescending(number)) {
    patterns.push(PATTERN_CATEGORIES.DESCENDING);
  }
  
  // Check for repeating patterns (e.g., 1212, 7878)
  if (hasRepeatingPattern(number)) {
    patterns.push(PATTERN_CATEGORIES.REPEATING);
  }
  
  // Identify premium patterns (combination of multiple patterns)
  if (patterns.length >= 2) {
    patterns.push(PATTERN_CATEGORIES.PREMIUM);
  }
  
  // Check for royal numbers (containing mostly 8s and 9s)
  if (isRoyalNumber(number)) {
    patterns.push(PATTERN_CATEGORIES.ROYAL);
  }
  
  // Check for lucky numbers (contains 7 or multiple 8s)
  if (isLuckyNumber(number)) {
    patterns.push(PATTERN_CATEGORIES.LUCKY);
  }
  
  return patterns;
};

// Check if number has sequential pattern
const hasSequentialPattern = (number: string): boolean => {
  for (let i = 0; i < number.length - 3; i++) {
    const a = parseInt(number[i]);
    const b = parseInt(number[i + 1]);
    const c = parseInt(number[i + 2]);
    const d = parseInt(number[i + 3]);
    
    if ((b === a + 1 && c === b + 1 && d === c + 1) || 
        (b === a - 1 && c === b - 1 && d === c - 1)) {
      return true;
    }
  }
  
  return false;
};

// Check if number has n or more repeating digits
const hasRepeatingDigits = (number: string, minRepeat: number): boolean => {
  for (let digit = 0; digit <= 9; digit++) {
    const regex = new RegExp(`${digit}{${minRepeat},}`);
    if (regex.test(number)) {
      return true;
    }
  }
  
  return false;
};

// Check if number is a palindrome
const isPalindrome = (number: string): boolean => {
  const len = number.length;
  for (let i = 0; i < len / 2; i++) {
    if (number[i] !== number[len - 1 - i]) {
      return false;
    }
  }
  
  return true;
};

// Check if number has mirror pattern (second half is mirror of first half)
const isMirror = (number: string): boolean => {
  if (number.length % 2 !== 0) return false;
  
  const mid = number.length / 2;
  const firstHalf = number.slice(0, mid);
  const secondHalf = number.slice(mid).split('').reverse().join('');
  
  return firstHalf === secondHalf;
};

// Check if digits are in ascending order
const isAscending = (number: string): boolean => {
  for (let i = 0; i < number.length - 3; i++) {
    if (parseInt(number[i]) < parseInt(number[i + 1]) && 
        parseInt(number[i + 1]) < parseInt(number[i + 2]) && 
        parseInt(number[i + 2]) < parseInt(number[i + 3])) {
      return true;
    }
  }
  
  return false;
};

// Check if digits are in descending order
const isDescending = (number: string): boolean => {
  for (let i = 0; i < number.length - 3; i++) {
    if (parseInt(number[i]) > parseInt(number[i + 1]) && 
        parseInt(number[i + 1]) > parseInt(number[i + 2]) && 
        parseInt(number[i + 2]) > parseInt(number[i + 3])) {
      return true;
    }
  }
  
  return false;
};

// Check if number has repeating pattern
const hasRepeatingPattern = (number: string): boolean => {
  for (let i = 0; i < number.length - 3; i++) {
    if (number[i] === number[i + 2] && number[i + 1] === number[i + 3]) {
      return true;
    }
  }
  
  return false;
};

// Check if it's a royal number (contains mostly 8s and 9s)
const isRoyalNumber = (number: string): boolean => {
  const count8and9 = number.split('').filter(digit => digit === '8' || digit === '9').length;
  return count8and9 >= number.length * 0.5;
};

// Check if it's a lucky number (contains 7 or multiple 8s)
const isLuckyNumber = (number: string): boolean => {
  const count7 = number.split('').filter(digit => digit === '7').length;
  const count8 = number.split('').filter(digit => digit === '8').length;
  
  return count7 >= 2 || count8 >= 3;
};

// Calculate numerological value of a phone number
export const calculateNumerologicalValue = (phoneNumber: string): number => {
  const number = phoneNumber.replace(/\D/g, '');
  let sum = 0;
  
  for (let i = 0; i < number.length; i++) {
    sum += parseInt(number[i]);
  }
  
  // Reduce to single digit
  while (sum > 9) {
    let tempSum = 0;
    while (sum > 0) {
      tempSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = tempSum;
  }
  
  return sum;
};

// Format number for display
export const formatPhoneNumber = (number: string): string => {
  const cleaned = number.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  
  return number;
};

// Generate a list of mock phone numbers
export const generateMockNumbers = (count = 50): any[] => {
  const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'];
  const numbers = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random phone number
    let number = '';
    for (let j = 0; j < 10; j++) {
      number += Math.floor(Math.random() * 10);
    }
    
    // Add some pattern to some numbers
    if (i % 10 === 0) { // Every 10th number is sequential
      number = '1234' + number.substring(4);
    } else if (i % 5 === 0) { // Every 5th number has repeating digits
      number = number.substring(0, 6) + '8888';
    } else if (i % 7 === 0) { // Every 7th number is a palindrome
      const firstHalf = number.substring(0, 5);
      number = firstHalf + firstHalf.split('').reverse().join('');
    }
    
    const digitSum = number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    let singleDigitSum = digitSum;
    while (singleDigitSum >= 10) {
      singleDigitSum = singleDigitSum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    
    // Determine price based on patterns (more patterns = higher price)
    const patterns = identifyPatterns(number);
    const price = 100 + (patterns.length * 250) + Math.floor(Math.random() * 500);
    
    numbers.push({
      id: `num-${i + 1}`,
      number: formatPhoneNumber(number),
      price,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      specialPattern: patterns,
      digitSum,
      singleDigitSum
    });
  }
  
  return numbers;
};
