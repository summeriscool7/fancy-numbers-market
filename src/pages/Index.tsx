
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import NumberCard from '@/components/NumberCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
      {/* Banner */}
      <div className="bg-primary text-white py-4 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2">INDIA'S MOST TRUSTED & 100% GENUINE VIP MOBILE NUMBER ONLINE SELLER</h2>
          <p className="text-sm md:text-base">
            Buy Airtel VIP Numbers, Vi VIP Numbers, Jio VIP Numbers, BSNL VIP Numbers, and any type of Choice Mobile Numbers with Prepaid and Postpaid at Best Price Cost. Order Now and Get Free Delivery.
          </p>
        </div>
      </div>
      
      <Hero />
      
      {/* Benefits Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-subtle"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
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
      
      {/* How It Works Section */}
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
                How It Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Get your premium number in 4 simple steps
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 relative">
                      <span className="text-xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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

const benefits = [
  {
    title: "100% Secure Payment",
    description: "Moving your card details to a much more secured place"
  },
  {
    title: "2000+ Satisfied Clients",
    description: "Moving your card details to a much more secured place"
  },
  {
    title: "Money Back Guarantee",
    description: "Moving your card details to a much more secured place"
  },
  {
    title: "24/7 Calling Helpline",
    description: "Moving your card details to a much more secured place"
  }
];

const steps = [
  {
    title: "Find Your Desired Number",
    description: "Select your favourable mobile number. The one you like and which suits your personality."
  },
  {
    title: "Make The Payment",
    description: "Once your chosen mobile number is finalised, proceed to checkout and make the payment."
  },
  {
    title: "Get The UPC",
    description: "You will receive a UPC along with invoice within an hour on your mobile number."
  },
  {
    title: "Get Your Sim Card",
    description: "Visit any mobile shop and port the number. You can get your number ported to any network, on you name."
  }
];

const categories = [
  {
    title: 'Birthdate Numbers',
    description: 'Find numbers that match your birthdate for a personal connection.',
    icon: <span className="text-xl">🎂</span>,
    link: '/birthdate-numbers'
  },
  {
    title: 'Vehicle Numbers',
    description: 'Match your vehicle registration for easier recall and connection.',
    icon: <span className="text-xl">🚗</span>,
    link: '/vehicle-numbers'
  },
  {
    title: 'Numerology',
    description: 'Choose numbers with positive numerological significance.',
    icon: <span className="text-xl">✨</span>,
    link: '/numerology'
  }
];

export default Index;
