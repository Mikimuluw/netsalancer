/**
 * Ge'ez Numerals Utility
 * Converts Latin/Arabic numerals to Ethiopian Ge'ez script numerals
 * 
 * IMPORTANT: Arabic numerals (1, 2, 3...) are ALWAYS the default display.
 * Ge'ez numerals are OPTIONAL for users who prefer their native script.
 * 
 * Ge'ez is the liturgical language of the Ethiopian Orthodox Church
 * and uses its own numeral system: ፩ ፪ ፫ ፬ ፭ ፮ ፯ ፰ ፱ ፲ (1-10)
 */

const GEEZ_DIGITS: { [key: string]: string } = {
  '0': '०', // Zero - used in context
  '1': '፩',
  '2': '፪',
  '3': '፫',
  '4': '፬',
  '5': '፭',
  '6': '፮',
  '7': '፯',
  '8': '፰',
  '9': '፱',
};

const GEEZ_TENS: { [key: number]: string } = {
  10: '፲',
  20: '፳',
  30: '፴',
  40: '፵',
  50: '፶',
  60: '፷',
  70: '፸',
  80: '፹',
  90: '፺',
};

const GEEZ_HUNDREDS: { [key: number]: string } = {
  100: '፻',
  200: '፻፪',
  300: '፻፫',
  400: '፻፬',
  500: '፻፭',
  600: '፻፮',
  700: '፻፯',
  800: '፻፰',
  900: '፻፱',
};

/**
 * Convert a single digit to Ge'ez
 */
export function toGeezDigit(digit: string): string {
  return GEEZ_DIGITS[digit] || digit;
}

/**
 * Convert a number string to Ge'ez numerals
 * Handles numbers up to 999,999
 * 
 * @example
 * toGeezNumerals('2024') returns '፪०፲፬'
 */
export function toGeezNumerals(numberStr: string): string {
  // Remove non-digit characters
  const digits = numberStr.replace(/\D/g, '');
  
  if (!digits) return '';
  
  // For simple single/double digit numbers
  if (digits.length === 1) {
    return GEEZ_DIGITS[digits];
  }
  
  if (digits.length === 2) {
    const tens = parseInt(digits.substring(0, 1)) * 10;
    const ones = parseInt(digits.substring(1));
    
    if (tens === 0) {
      return GEEZ_DIGITS[digits[1]];
    }
    
    let result = GEEZ_TENS[tens] || '';
    if (ones > 0) {
      result += GEEZ_DIGITS[digits[1]];
    }
    return result;
  }
  
  // For three digit numbers (hundreds)
  let result = '';
  
  // Process from left to right
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const position = digits.length - i - 1; // 0 = ones, 1 = tens, 2 = hundreds
    const value = parseInt(digit);
    
    if (value === 0) {
      if (position === 1 && i < digits.length - 1) {
        // Keep track that we're in tens place
        continue;
      }
      continue;
    }
    
    if (position === 2) {
      // Hundreds place
      result += GEEZ_HUNDREDS[value * 100] || '';
    } else if (position === 1) {
      // Tens place
      result += GEEZ_TENS[value * 10] || '';
    } else if (position === 0) {
      // Ones place
      result += GEEZ_DIGITS[digit];
    }
  }
  
  return result;
}

/**
 * Format a currency amount in Ge'ez numerals
 * 
 * @example
 * formatGeezCurrency('1,234.56 ETB') returns '፩೨፴፬.፭፮ ብር'
 */
export function formatGeezCurrency(amount: string, currency: string = 'ETB'): string {
  const currencyAbbrev = currency === 'ETB' ? 'ብር' : 'USD';
  
  // Extract just the numbers and decimal
  const match = amount.match(/[\d.]/g);
  if (!match) return amount;
  
  const numStr = match.join('');
  const geezNum = toGeezNumerals(numStr);
  
  return `${geezNum} ${currencyAbbrev}`;
}

/**
 * Get Ge'ez equivalent of common English words for UI
 */
export const GEEZ_LABELS: { [key: string]: string } = {
  'earnings': 'ገቢ',
  'savings': 'ቁጠባ',
  'freedom': 'ነፃነት',
  'calculate': 'ሰላ',
  'visa': 'ቪዛ',
  'enterprise': 'ድርጅት',
  'cost': 'ወጪ',
  'comparison': 'ሲሪት',
  'total': 'ድምር',
  'monthly': 'ወርሃዊ',
  'annual': 'ዓመታዊ',
  'currency': 'ገንዘብ',
  'exchange': 'ልዋጭ',
  'ready': 'ዝግጁ',
};

/**
 * Amharic translations for key sections
 */
export const AMHARIC_TRANSLATIONS: { [key: string]: string } = {
  'realCost': 'የእውነተኛው ዋጋ',
  'yourEarnings': 'ገቢዎ',
  'freedomCalculator': 'የነፃነት ካልኩሌተር',
  'getOutOfShadow': 'ከጥላ ገበያ ነፃ ይውጡ',
  'harvestSurvey': 'እርሻዎን ይመርምሩ',
  'seeYourReal': 'ትክክለኛውን የተገኙትን ይረዱ',
  'stopLosing': 'ገንዘብ ማጣት ያቁሙ',
  'ethiopianFreelancer': 'የኢትዮጵያ ነጻ ሰራተኛ',
  'signUp': 'ይመዝገቡ',
  'joinWaitlist': 'የጦር ዝርዝር ይቀላቀሉ',
};

export default {
  toGeezDigit,
  toGeezNumerals,
  formatGeezCurrency,
  GEEZ_DIGITS,
  GEEZ_TENS,
  GEEZ_HUNDREDS,
  GEEZ_LABELS,
  AMHARIC_TRANSLATIONS,
};
