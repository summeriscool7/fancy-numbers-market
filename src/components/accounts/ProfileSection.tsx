
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().optional(),
  state: z.string().min(1, { message: 'Please select a state.' }),
  pincode: z.string().length(6, { message: 'Pincode must be 6 digits.' }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const ProfileSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const defaultValues: ProfileFormValues = {
    fullName: 'First Last',
    email: 'test@example.com',
    phone: '9876543210',
    address: '123 Main St, Koramangala',
    state: 'Maharashtra',
    pincode: '560034',
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      form.reset(defaultValues);
    }
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button 
            variant={isEditing ? "outline" : "default"} 
            onClick={handleEditToggle}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Profile Picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Button variant="outline" size="sm">Change Picture</Button>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            )}
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input placeholder="Enter your name" {...field} />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input placeholder="Enter your email" {...field} />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input placeholder="Enter your phone number" {...field} />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input placeholder="Enter your address" {...field} />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                              {indianStates.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input placeholder="Enter your pincode" {...field} />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/20">{field.value}</div>
                        )}
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
              
              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
