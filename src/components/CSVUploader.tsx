
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { extractNumbersFromCSV } from '@/utils/customPatternDetection';

interface CSVUploaderProps {
  onNumbersExtracted: (numbers: number[]) => void;
  isProcessing: boolean;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onNumbersExtracted, isProcessing }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);

    // Read the file content
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const extractedNumbers = extractNumbersFromCSV(content);
        
        if (extractedNumbers.length === 0) {
          toast({
            title: "No valid numbers found",
            description: "The CSV file doesn't contain any 10-digit numbers",
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Numbers extracted",
          description: `Found ${extractedNumbers.length} 10-digit numbers in the CSV file`,
        });

        onNumbersExtracted(extractedNumbers);
      } catch (error) {
        toast({
          title: "Error processing CSV",
          description: "There was an error processing the CSV file",
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
  };

  const clearFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onNumbersExtracted([]);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Upload CSV</span>
          </Button>
          
          {fileName && (
            <div className="flex items-center space-x-2 py-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-md">
              <FileText size={16} className="text-blue-500" />
              <span className="text-sm truncate max-w-[200px]">{fileName}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={clearFile}
                disabled={isProcessing}
              >
                <X size={14} />
              </Button>
            </div>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv"
        />
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Upload a CSV file containing phone numbers. All 10-digit numbers will be extracted automatically.
        </p>
      </div>
    </div>
  );
};

export default CSVUploader;
