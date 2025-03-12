
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
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case PATTERN_CATEGORIES.REPEATING:
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case PATTERN_CATEGORIES.PALINDROME:
        return 'bg-green-50 text-green-600 border-green-200';
      case PATTERN_CATEGORIES.MIRROR:
        return 'bg-pink-50 text-pink-600 border-pink-200';
      case PATTERN_CATEGORIES.ASCENDING:
        return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case PATTERN_CATEGORIES.DESCENDING:
        return 'bg-sky-50 text-sky-600 border-sky-200';
      case PATTERN_CATEGORIES.PREMIUM:
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case PATTERN_CATEGORIES.ROYAL:
        return 'bg-red-50 text-red-600 border-red-200';
      case PATTERN_CATEGORIES.LUCKY:
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
        getPatternStyles(),
        className
      )}
    >
      {pattern}
    </span>
  );
};

export default PatternChip;
