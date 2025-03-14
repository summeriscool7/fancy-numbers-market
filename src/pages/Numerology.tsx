
import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import NumberCard from '@/components/NumberCard';
import MainLayout from '@/layouts/MainLayout';
import { NumberData } from '@/utils/filterUtils';

const Numerology = () => {
  const [allNumbers] = useState<NumberData[]>(() => generateMockNumbers(100));
  const [filteredNumbers, setFilteredNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const digitSumOptions = ['any', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  const form = useForm({
    defaultValues: {
      digitSum: 'any',
      singleDigitSum: 'any',
    },
  });
  
  const onSubmit = (data: { digitSum: string; singleDigitSum: string }) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Filter numbers based on numerology criteria
      const filteredNumbers = allNumbers.filter(numberData => {
        // Digital sum filter
        if (data.digitSum && data.digitSum !== "any" && numberData.digitSum !== parseInt(data.digitSum)) {
          return false;
        }
        
        // Single digit sum filter
        if (data.singleDigitSum && data.singleDigitSum !== "any" && numberData.singleDigitSum !== parseInt(data.singleDigitSum)) {
          return false;
        }
        
        return true;
      });
      
      setFilteredNumbers(filteredNumbers);
      setIsLoading(false);
    }, 600);
  };
  
  useEffect(() => {
    // Initial load of all numbers
    setFilteredNumbers(allNumbers);
    setIsLoading(false);
    
    // Set initial form values
    form.reset({
      digitSum: 'any',
      singleDigitSum: 'any',
    });
  }, [allNumbers, form]);
  
  const handleFilterChange = () => {
    const values = form.getValues();
    onSubmit(values);
  };
  
  return (
    <MainLayout>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Numerology Numbers</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Find mobile numbers based on numerology principles. Select criteria that match your lucky numbers.
              </p>
              <Separator className="my-6" />
            </div>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <Form {...form}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="digitSum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Digit Sum (Total)</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleFilterChange();
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Digit Sum" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {digitSumOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option === 'any' ? 'Any Sum' : option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="singleDigitSum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Single Digit Sum (Reduced)</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleFilterChange();
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Single Digit Sum" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {digitSumOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option === 'any' ? 'Any Sum' : option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Results <span className="text-gray-500 text-lg">({filteredNumbers.length})</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Numbers that match your numerology criteria.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {filteredNumbers.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  >
                    {filteredNumbers.map((number, index) => (
                      <NumberCard key={number.id} number={number} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No numbers found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try changing your filter criteria</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Numerology;
