
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import NumberCard from '@/components/NumberCard';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';
import { generateMockNumbers } from '@/utils/numberPatterns';
import { getVehicleNumberVariants } from '@/utils/filterUtils';
import { NumberData } from '@/utils/filterUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const VehicleNumbers = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = () => {
    if (!vehicleNumber.trim()) return;
    
    setIsLoading(true);
    setSearched(true);
    
    // Get vehicle number variants
    const vehicleVariants = getVehicleNumberVariants(vehicleNumber);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock numbers
      const allNumbers = generateMockNumbers(100);
      
      // Filter numbers that contain vehicle number variants
      const filteredNumbers = allNumbers.filter(numberData => {
        const number = numberData.number.replace(/\D/g, '');
        return vehicleVariants.some(variant => number.includes(variant));
      });
      
      setNumbers(filteredNumbers);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Vehicle Numbers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            Find premium numbers that match your vehicle registration
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Enter Your Vehicle Number</h3>
              <p className="text-gray-500 text-sm mb-4">
                We'll find numbers that include your vehicle registration in various formats
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="vehicle-number">Vehicle Registration</Label>
                  <div className="flex mt-1">
                    <Input
                      id="vehicle-number"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      placeholder="e.g. MH02EB1234"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch} 
                    disabled={!vehicleNumber.trim()}
                    className="w-full md:w-auto mt-1"
                  >
                    Find Numbers
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : numbers.length > 0 ? (
          <div>
            <p className="mb-4 text-gray-500">
              Showing {numbers.length} numbers matching your vehicle registration
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {numbers.map((number, index) => (
                <NumberCard key={number.id} number={number} index={index} />
              ))}
            </div>
          </div>
        ) : searched ? (
          <EmptyState 
            type="search"
            title="No matching numbers found"
            description="We couldn't find any numbers that match your vehicle registration. Try another format."
            icon={<Car size={48} className="text-gray-300" />}
          />
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>Enter your vehicle registration to find matching numbers</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VehicleNumbers;
