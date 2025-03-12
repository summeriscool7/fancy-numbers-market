
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  type?: 'search' | 'filter' | 'cart' | 'empty';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  type = 'empty'
}) => {
  // Default content based on type
  const getDefaultContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: icon || <Search size={48} className="text-gray-300" />,
          title: title || 'No results found',
          description: description || 'We couldn't find any numbers matching your search criteria.',
          actionLabel: actionLabel || 'Clear Search',
        };
      case 'filter':
        return {
          icon: icon || <Filter size={48} className="text-gray-300" />,
          title: title || 'No matching numbers',
          description: description || 'Try adjusting your filters to find numbers that match your preferences.',
          actionLabel: actionLabel || 'Reset Filters',
        };
      case 'cart':
        return {
          icon: icon || <Search size={48} className="text-gray-300" />,
          title: title || 'Your cart is empty',
          description: description || 'Add some premium numbers to get started.',
          actionLabel: actionLabel || 'Browse Numbers',
        };
      default:
        return {
          icon: icon || <Search size={48} className="text-gray-300" />,
          title: title || 'Nothing to show',
          description: description || 'There are no items to display at the moment.',
          actionLabel: actionLabel || 'Refresh',
        };
    }
  };

  const content = getDefaultContent();

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="mb-4">
        {content.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {content.title}
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {content.description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="flex items-center"
        >
          <RefreshCw size={16} className="mr-2" />
          {content.actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
