
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, ArrowLeft, ArrowRight, Send, Package } from 'lucide-react';
import ProgressIndicator from '@/components/ProgressIndicator.tsx';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  gstNumber: string;
}

const CheckoutForm: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    gstNumber: '',
  });

  const steps = ["Personal Info", "Contact", "Address", "Confirmation"];

  // Validation states
  const [errors, setErrors] = useState<Partial<UserDetails>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof UserDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateStep = () => {
    const newErrors: Partial<UserDetails> = {};
    
    if (currentStep === 0) {
      if (!userDetails.name.trim()) newErrors.name = "Name is required";
    } 
    else if (currentStep === 1) {
      if (!userDetails.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
        newErrors.email = "Please enter a valid email";
      }
      
      if (!userDetails.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[0-9]{10,15}$/.test(userDetails.phone.replace(/[- ]/g, ''))) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } 
    else if (currentStep === 2) {
      if (!userDetails.address.trim()) newErrors.address = "Address is required";
      if (!userDetails.city.trim()) newErrors.city = "City is required";
      if (!userDetails.state.trim()) newErrors.state = "State is required";
      if (!userDetails.zipCode.trim()) newErrors.zipCode = "ZIP/Postal code is required";
      // GST is optional
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const goToNextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };
  
//   const handleWhatsAppRedirect = () => {
//     if (validateStep()) {
//       setIsSubmitting(true);
      
//       // Format cart items for WhatsApp message
//       const itemsText = items.map(item => 
//         `- ${item.number} (${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)})`
//       ).join('\n');
      
//       const message = `
// Hello! I'd like to purchase the following numbers:
// ${itemsText}

// Total: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}

// My details:
// Name: ${userDetails.name}
// Email: ${userDetails.email}
// Phone: ${userDetails.phone}
// Address: ${userDetails.address}, ${userDetails.city}, ${userDetails.state} ${userDetails.zipCode}
// ${userDetails.gstNumber ? `GST Number: ${userDetails.gstNumber}` : ''}
//       `.trim();

//       // Encode the message for WhatsApp
//       const encodedMessage = encodeURIComponent(message);
//       const whatsappLink = `https://wa.me/+917070707271?text=${encodedMessage}`;
      
//       // Simulate a small delay for better UX
//       setTimeout(() => {
//         window.open(whatsappLink, '_blank');
//         clearCart();
//         toast.success('Your order details have been sent to WhatsApp!');
//         setIsSubmitting(false);
//         navigate('/');
//       }, 1000);
//     }
//   };

  const handlePlaceOrder = () => {
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Format cart items for WhatsApp message
      const itemsText = items.map(item => 
        `- ${item.number} (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)})`
      ).join('\n');
      
      const message = `
Hello! I'd like to purchase the following numbers:
${itemsText}

Total: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}

My details:
Name: ${userDetails.name}
Email: ${userDetails.email}
Phone: ${userDetails.phone}
Address: ${userDetails.address}, ${userDetails.city}, ${userDetails.state} ${userDetails.zipCode}
${userDetails.gstNumber ? `GST Number: ${userDetails.gstNumber}` : ''}
      `.trim();

      // Encode the message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/+917070707271?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappLink, '_blank');
      
      // Store order details in local storage for the confirmation page
      localStorage.setItem('lastOrder', JSON.stringify({
        items,
        totalPrice,
        userDetails,
        orderDate: new Date().toISOString(),
        orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000)
      }));
      
      // Simulate a small delay for better UX
      setTimeout(() => {
        clearCart();
        setIsSubmitting(false);
        navigate('/order-confirmation');
      }, 1000);
    }
  };

  const returnHome = () => {
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Simulate a small delay for better UX
      setTimeout(() => {
        clearCart();
        toast.success('Your order details have been placed to WhatsApp!');
        setIsSubmitting(false);
        navigate('/');
      }, 1000);
    }
  }


  // Variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalPrice);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressIndicator steps={steps} currentStep={currentStep} />
      
      <AnimatePresence custom={currentStep} mode="wait">
        <motion.div
          key={currentStep}
          custom={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="space-y-6"
        >
          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="text-2xl font-semibold tracking-tight">Personal Information</h2>
              <p className="text-muted-foreground">Please enter your full name as it appears on your ID</p>
              
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="First Last"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-300 focus-visible:ring-red-300" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
              <p className="text-muted-foreground">How can we reach you?</p>
              
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-300 focus-visible:ring-red-300" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-300 focus-visible:ring-red-300" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address Information */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="text-2xl font-semibold tracking-tight">Shipping Address</h2>
              <p className="text-muted-foreground">Where should we send your purchase confirmation?</p>
              
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="123 Main St, Apt 4B"
                    value={userDetails.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-300 focus-visible:ring-red-300" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={userDetails.city}
                      onChange={handleInputChange}
                      className={errors.city ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="NY"
                      value={userDetails.state}
                      onChange={handleInputChange}
                      className={errors.state ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.state && (
                      <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="10001"
                      value={userDetails.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      placeholder="GST12345678"
                      value={userDetails.gstNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-slide-in">
              <div className="flex items-center space-x-2 text-green-500 mb-2">
                <CheckCircle2 className="h-6 w-6" />
                <h2 className="text-2xl font-semibold tracking-tight">Order Summary</h2>
              </div>
              
              <p className="text-muted-foreground">Review your information before placing the order</p>
              
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Personal Information</h3>
                  <p>{userDetails.name}</p>
                  <p>{userDetails.email}</p>
                  <p>{userDetails.phone}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p>{userDetails.address}</p>
                  <p>{userDetails.city}, {userDetails.state} {userDetails.zipCode}</p>
                  {userDetails.gstNumber && <p>GST: {userDetails.gstNumber}</p>}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.number}</span>
                        <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formattedTotalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          className="px-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          {currentStep === 0 ? 'Back to Shop' : 'Previous'}
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={goToNextStep} className="px-6">
            Next
            <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          
          <Button 
            onClick={handlePlaceOrder} 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 px-6"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
            <Package size={16} className="ml-2" />
          </Button>

          
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
