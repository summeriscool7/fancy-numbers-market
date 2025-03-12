
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-primary to-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100"
            >
              Premium Mobile Numbers
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            >
              Find Your <span className="text-primary">Perfect</span> Number
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-8"
            >
              Discover unique and prestigious mobile numbers based on birthdate, vehicle, 
              and numerology. Find patterns that resonate with your personal style.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button asChild size="lg" className="px-6 h-12">
                <Link to="/browse">
                  Browse All Numbers
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="px-6 h-12">
                <Link to="/birthdate">
                  Find by Birthdate
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-subtle border border-gray-100"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <span className="text-xl">🎂</span>,
    title: 'Birthdate Numbers',
    description: 'Find mobile numbers that match your date of birth in various formats for a personal connection.'
  },
  {
    icon: <span className="text-xl">🚗</span>,
    title: 'Vehicle Numbers',
    description: 'Get a mobile number that matches your vehicle registration for easy memorization.'
  },
  {
    icon: <span className="text-xl">✨</span>,
    title: 'Numerology',
    description: 'Discover numbers aligned with numerological principles for harmony and positive energy.'
  }
];

export default Hero;
