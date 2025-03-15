
// Custom pattern detection functions for CSV uploads

// Function to find digit sum and reduce to single digit
export const digSumToSingleDigit = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  return (n % 9 === 0) ? 9 : (n % 9);
};

// Function to check if a number is a palindrome
export const isPalindrome = (num: number): boolean => {
  const str = num.toString();
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
};

// Check if a number contains 5s and doesn't contain 2, 4, or 8
export const checkNumber = (str: string): boolean => {
  return str.includes('5') && !str.includes('2') && !str.includes('4') && !str.includes('8');
};

// Function to check if the sum of odd digits doesn't contain 2, 4, or 8
export const sumOddNot248 = (str: string): boolean => {
  let sum = 0;
  for (let i = 0; i < str.length; i += 2) {
    sum += parseInt(str[i]);
  }
  const sumStr = sum.toString();
  return !sumStr.includes('2') && !sumStr.includes('4') && !sumStr.includes('8');
};

// Helper function for finding the maximum frequency of digits
export const maximumFreq = (num: number): number => {
  const str = num.toString();
  const freq: Record<string, number> = {};
  
  for (let i = 0; i < str.length; i++) {
    freq[str[i]] = (freq[str[i]] || 0) + 1;
  }
  
  return Math.max(...Object.values(freq));
};

// Helper function for finding the number of unique digits
export const maximumDigits = (num: number): number => {
  const str = num.toString();
  const uniqueDigits = new Set(str.split(''));
  return uniqueDigits.size;
};

// Helper function for calculating digit sum
export const sumDigit = (num: number): number => {
  const str = num.toString();
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += parseInt(str[i]);
  }
  return sum;
};

// Super VIP number check
export const supV = (num: number): boolean => {
  const str = num.toString();
  return str.includes('786786') || str.includes('143143') || str.includes('000000');
};

// Main pattern detection function that identifies various patterns in a number
export const findPattern = (num: number): Record<string, boolean> | null => {
  const str = num.toString();

  if (str.length < 10) {
    return null;
  }

  const last6Digits = str.substring(str.length - 6);
  
  let obj: Record<string, boolean> = {
    xxxx: false,
    ab_xyxy_xzxz: false
  };

  // ABCD_X_ABCD_Y pattern
  if (str[0] === str[5] && str[1] === str[6] && str[2] === str[7] && str[3] === str[8]) {
    obj.abcd_x_abcd_y = true;
  } else {
    obj.abcd_x_abcd_y = false;
  }

  // XY_ABBA_ABBA pattern
  if (str[2] === str[6] && str[3] === str[7] && str[4] === str[8] && str[5] === str[9] && str[3] === str[4]) {
    obj.xy_abba_abba = true;
  } else {
    obj.xy_abba_abba = false;
  }

  // ABCC_X_ABCC_Y pattern
  if (str[0] === str[5] && str[1] === str[6] && str[2] === str[7] && str[3] === str[8] && str[2] === str[3]) {
    obj.abcc_x_abcc_y = true;
  } else {
    obj.abcc_x_abcc_y = false;
  }

  // ABC_XX_ABC_YY pattern
  if (str[0] === str[5] && str[1] === str[6] && str[2] === str[7] && str[3] === str[4] && str[8] === str[9]) {
    obj.abc_xx_abc__yy = true;
  } else {
    obj.abc_xx_abc__yy = false;
  }

  // XY_A0_B0_C0_D0 pattern
  if (str[3] === '0' && str[5] === '0' && str[7] === '0' && str[9] === '0') {
    obj.xy_a0_b0_c0_d0 = true;
  } else {
    obj.xy_a0_b0_c0_d0 = false;
  }

  // XY_ABAB_CDCD pattern
  if (str[2] === str[4] && str[3] === str[5] && str[6] === str[8] && str[7] === str[9]) {
    obj.xy_abab_cdcd = true;
  } else {
    obj.xy_abab_cdcd = false;
  }

  // ABC_ABC_WXYZ pattern
  if (str[0] === str[3] && str[1] === str[4] && str[2] === str[5]) {
    obj.abc_abc_wxyz = true;
  } else {
    obj.abc_abc_wxyz = false;
  }

  // XXX_Z_XXX pattern
  if ((str[9] === str[8] && str[8] === str[7] && str[7] === str[5] && str[5] === str[4] && str[4] === str[3]) ||
      (str[0] === str[1] && str[1] === str[2] && str[2] === str[4] && str[4] === str[5] && str[5] === str[6])) {
    obj.xxx_z_xxx = true;
  } else {
    obj.xxx_z_xxx = false;
  }

  // Check for xxxx pattern (4 consecutive same digits)
  for (let i = 0; i <= 6; i++) {
    if (str[i] === str[i + 1] && str[i + 1] === str[i + 2] && str[i + 2] === str[i + 3]) {
      obj.xxxx = true;
      break;
    }
  }

  // ABCD_ABCD pattern
  if (str[2] === str[6] && str[3] === str[7] && str[4] === str[8] && str[5] === str[9]) {
    obj.abcd_abcd = true;
  } else {
    obj.abcd_abcd = false;
  }

  // X00X_Y00Y pattern
  if (str[2] === str[5] && str[3] === '0' && str[4] === '0' && str[7] === '0' && str[8] === '0' && str[6] === str[9]) {
    obj.x00x_y00y = true;
  } else {
    obj.x00x_y00y = false;
  }

  // ABCD_XYZ_XYZ pattern
  if (str[4] === str[7] && str[5] === str[8] && str[6] === str[9]) {
    obj.abcd_xyz_xyz = true;
  } else {
    obj.abcd_xyz_xyz = false;
  }

  // ABABDABABE pattern
  if (str[0] == str[2] && str[1] == str[3] && str[5] == str[7] && str[6] == str[8] && str[0] == str[5] && str[1] == str[6]) {
    obj.ababdababe = true;
  } else {
    obj.ababdababe = false;
  }

  // Six Counting pattern
  if (str.includes('012345') || str.includes('123456') || str.includes('234567') || 
      str.includes('345678') || str.includes('456789') || str.includes('567890') || 
      str.includes('67890')) {
    obj.six_counting = true;
  }

  // Add more pattern checks as needed from the original function

  return obj;
};

// Check if a number belongs to "New Category 1"
export const isNewCateg1 = (num: number): boolean => {
  let s = num.toString();

  if (s.substring(0, 3) === s.substring(7, 10) && s[3] === s[4] && s[5] === s[4] && s[5] === s[6]) {
    return true;
  }

  if (s.substring(0, 2) === s.substring(8, 10) && s.substring(2, 5) === s.substring(5, 8)) {
    return true;
  }

  if (s[2] === s[4] && s[3] === s[5] && s[4] === s[6] && s[5] === s[7]) {
    return true;
  }

  if (s.substring(0, 5) === s.substring(5, 10)) {
    return true;
  }

  let str = s.substring(4, 10);

  let endswith = [
    '001313', '000420', '000143', '000786', '123123', '143143', '302302', 
    '786786', '420420', '101101', '100100', '313313', '501501', '108108', 
    '214214', '306090', '102030', '010203', '307307', '111111', '222222', 
    '333333', '444444', '123456', '555555', '666666', '777777', '888888', 
    '999999', '420786', '143786'
  ];

  let random = ['420420', '143143', '0001313', '123123', '786786', '92119211'];

  if (s.search('0001010') !== -1) {
    return true;
  }

  for (const nnnn of endswith) {
    if (str === nnnn) {
      return true;
    }
  }

  for (const nnnnn of random) {
    if (s.search(nnnnn) !== -1) {
      return true;
    }
  }

  return false;
};

// Main function to categorize numbers by patterns
export const categorizeNumbersByPatterns = (numbers: number[]): Record<string, number[]> => {
  const categories: Record<string, number[]> = {
    super_vip: [],
    xxxx: [],
    x00x_y00y: [],
    abcd_abcd: [],
    abxbabab: [],
    mxthree: [],
    mxtwo: [],
    others: [],
    mxfreq7: [],
    abcd_x_abcd_y: [],
    xy_abba_abba: [],
    abcc_x_abcc_y: [],
    abc_xx_abc_yy: [],
    xy_a0_b0_c0_d0: [],
    xy_abab_cdcd: [],
    abc_abc_wxyz: [],
    abcd_xyz_xyz: [],
    new_categ1: [],
    ababdababe: []
  };

  for (const num of numbers) {
    // Skip non-10-digit numbers
    if (num.toString().length !== 10) continue;

    const ans1 = sumDigit(num);
    const ans2 = maximumDigits(num);
    const ans3 = maximumFreq(num);
    const pattern = findPattern(num);

    if (ans2 <= 2) {
      categories.super_vip.push(num);
    }
    
    if (ans2 === 3) {
      categories.mxthree.push(num);
    }

    if (ans3 >= 7) {
      categories.super_vip.push(num);
    }

    if (pattern) {
      if (pattern.abcd_x_abcd_y) {
        categories.abcd_x_abcd_y.push(num);
      }

      if (pattern.xy_abba_abba) {
        categories.xy_abba_abba.push(num);
      }

      if (pattern.abcc_x_abcc_y) {
        categories.abcc_x_abcc_y.push(num);
      }

      if (pattern.abc_xx_abc__yy) {
        categories.abc_xx_abc_yy.push(num);
      }

      if (pattern.abcdcdcxcd || pattern.abcdabcdxy || pattern.abcdcdxdcd || pattern.abcdxdcdcd) {
        categories.abxbabab.push(num);
      }

      if (pattern.xy_a0_b0_c0_d0) {
        categories.xy_a0_b0_c0_d0.push(num);
      }

      if (pattern.xy_abab_cdcd) {
        categories.xy_abab_cdcd.push(num);
      }

      if (pattern.abc_abc_wxyz) {
        categories.abc_abc_wxyz.push(num);
      }

      if (pattern.xxx_z_xxx) {
        categories.super_vip.push(num);
      }

      if (pattern.xxxx) {
        categories.xxxx.push(num);
      }

      if (pattern.abcd_abcd) {
        categories.abcd_abcd.push(num);
      }

      if (pattern.x00x_y00y) {
        categories.x00x_y00y.push(num);
      }

      if (pattern.abcd_xyz_xyz) {
        categories.abcd_xyz_xyz.push(num);
      }

      if (pattern.six_counting) {
        categories.super_vip.push(num);
      }

      if (isNewCateg1(num)) {
        categories.new_categ1.push(num);
      }

      if (pattern.ababdababe) {
        categories.ababdababe.push(num);
      }

      if (supV(num)) {
        categories.super_vip.push(num);
      }
    }
  }

  // Sort all categories in descending order
  for (const category in categories) {
    categories[category].sort((a, b) => b - a);
  }

  return categories;
};

// Function to extract 10-digit numbers from CSV content
export const extractNumbersFromCSV = (csvContent: string): number[] => {
  const numbers: number[] = [];
  
  // Split by new lines and then by commas
  const lines = csvContent.split(/\r?\n/);
  
  for (const line of lines) {
    const cells = line.split(',');
    
    for (const cell of cells) {
      // Clean the cell and extract numbers
      const cleaned = cell.trim().replace(/\D/g, '');
      
      // Check if it's a 10-digit number
      if (cleaned.length === 10) {
        numbers.push(parseInt(cleaned));
      }
    }
  }
  
  return numbers;
};
