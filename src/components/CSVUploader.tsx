
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { extractNumbersFromCSV } from '@/utils/customPatternDetection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CSVUploaderProps {
  onNumbersExtracted: (numbers: number[]) => void;
  isProcessing: boolean;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onNumbersExtracted, isProcessing }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileStats, setFileStats] = useState<{total: number, extracted: number} | null>(null);
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
        const lines = content.split(/\r?\n/).length;
        const extractedNumbers = extractNumbersFromCSV(content);
        
        setFileStats({
          total: lines,
          extracted: extractedNumbers.length
        });
        
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
    setFileStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onNumbersExtracted([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex items-center space-x-2 w-full bg-white dark:bg-gray-800"
          >
            <Upload size={18} />
            <span>Choose CSV File</span>
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv"
          />
        </div>
        
        {fileName && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-blue-500" />
                <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full" 
                onClick={clearFile}
                disabled={isProcessing}
              >
                <X size={16} />
              </Button>
            </div>
            
            {fileStats && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Check size={14} className="text-green-500" />
                  <span>Extracted {fileStats.extracted} 10-digit numbers from {fileStats.total} lines</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {!fileName && (
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Tips for uploading</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm">
              Ensure your CSV contains phone numbers in any format. The system will automatically extract all 10-digit numbers.
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Upload a CSV file containing phone numbers. All 10-digit numbers will be extracted automatically and categorized by patterns.
        </p>
      </div>
    </div>
  );
};

export default CSVUploader;
