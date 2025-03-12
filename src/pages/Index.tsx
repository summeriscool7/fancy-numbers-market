
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import NumberCard from '@/components/NumberCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { generateMockNumbers } from '@/utils/numberPatterns';

const Index = () => {
  // Get a small selection of featured numbers
  const featuredNumbers = generateMockNumbers(8);
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <MainLayout>
      <Hero />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                  Featured Numbers
                </h2>
                <p className="text-gray-600">
                  Explore our selection of premium mobile numbers
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild variant="outline">
                  <Link to="/browse">
                    View All
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {featuredNumbers.slice(0, 8).map((number, index) => (
                <NumberCard key={number.id} number={number} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight text-gray-900 mb-4"
              >
                Find Your Perfect Number
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Explore different ways to find your ideal mobile number
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={category.link}>
                        Explore
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const categories = [
  {
    title: 'Birthdate Numbers',
    description: 'Find numbers that match your birthdate for a personal connection.',
    icon: <span className="text-xl">🎂</span>,
    link: '/birthdate'
  },
  {
    title: 'Vehicle Numbers',
    description: 'Match your vehicle registration for easier recall and connection.',
    icon: <span className="text-xl">🚗</span>,
    link: '/vehicle'
  },
  {
    title: 'Numerology',
    description: 'Choose numbers with positive numerological significance.',
    icon: <span className="text-xl">✨</span>,
    link: '/numerology'
  }
];

export default Index;
