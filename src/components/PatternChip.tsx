
import { cn } from '@/lib/utils';
import { PATTERN_CATEGORIES } from '@/utils/numberPatterns';

interface PatternChipProps {
  pattern: string;
  className?: string;
}

const PatternChip: React.FC<PatternChipProps> = ({ pattern, className }) => {
  // Define colors based on pattern
  const getPatternStyles = () => {
    switch (pattern) {
      case PATTERN_CATEGORIES.SEQUENTIAL:
        return 'pattern-sequential';
      case PATTERN_CATEGORIES.REPEATING:
        return 'pattern-repeating';
      case PATTERN_CATEGORIES.PALINDROME:
        return 'pattern-palindrome';
      case PATTERN_CATEGORIES.MIRROR:
        return 'pattern-mirror';
      case PATTERN_CATEGORIES.ASCENDING:
        return 'pattern-ascending';
      case PATTERN_CATEGORIES.DESCENDING:
        return 'pattern-descending';
      case PATTERN_CATEGORIES.PREMIUM:
        return 'pattern-premium';
      case PATTERN_CATEGORIES.ROYAL:
        return 'pattern-royal';
      case PATTERN_CATEGORIES.LUCKY:
        return 'pattern-lucky';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-200',
        getPatternStyles(),
        className
      )}
    >
      {pattern}
    </span>
  );
};

export default PatternChip;
