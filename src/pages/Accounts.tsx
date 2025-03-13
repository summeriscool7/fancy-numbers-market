
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from '@/layouts/MainLayout';
import ProfileSection from '@/components/accounts/ProfileSection';
import OrdersSection from '@/components/accounts/OrdersSection';
import WishlistSection from '@/components/accounts/WishlistSection';
import { User, Package, Heart } from 'lucide-react';

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Account Navigation - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <button 
                    className={`flex items-center gap-2 p-4 text-left hover:bg-muted transition-colors ${activeTab === "profile" ? "bg-muted font-medium" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className={`flex items-center gap-2 p-4 text-left hover:bg-muted transition-colors ${activeTab === "orders" ? "bg-muted font-medium" : ""}`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package size={18} />
                    <span>Orders</span>
                  </button>
                  <button 
                    className={`flex items-center gap-2 p-4 text-left hover:bg-muted transition-colors ${activeTab === "wishlist" ? "bg-muted font-medium" : ""}`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Account Navigation - Mobile */}
          <div className="lg:hidden w-full">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package size={16} />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span className="hidden sm:inline">Wishlist</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Account Content */}
          <div className="lg:col-span-9">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "wishlist" && <WishlistSection />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Accounts;
