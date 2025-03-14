
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn("w-full my-6", className)}>
      <div className="relative flex items-center justify-between">
        {/* Progress line */}
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-100 dark:bg-gray-800" />
        
        {/* Active progress line */}
        <motion.div 
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        {/* Step indicators */}
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrentStep = index === currentStep;
          
          return (
            <div key={index} className="relative flex flex-col items-center z-10">
              {/* Circle */}
              <motion.div 
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300",
                  isActive 
                    ? "border-primary bg-primary text-primary-foreground" 
                    : "border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500"
                )}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isCurrentStep ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {index + 1}
              </motion.div>
              
              {/* Label */}
              <span className={cn(
                "absolute mt-10 text-xs font-medium transition-colors duration-300 whitespace-nowrap",
                isActive 
                  ? "text-primary dark:text-primary-foreground" 
                  : "text-gray-400 dark:text-gray-500"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
