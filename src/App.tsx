
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import BirthdateNumbers from "./pages/BirthdateNumbers";
import VehicleNumbers from "./pages/VehicleNumbers";
import Numerology from "./pages/Numerology";
import Accounts from "./pages/Accounts";
import QuickPatterns from "./pages/QuickPatterns";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import AuthCheck from "./components/accounts/AuthCheck";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/birthdate-numbers" element={<BirthdateNumbers />} />
                  <Route path="/vehicle-numbers" element={<VehicleNumbers />} />
                  <Route path="/numerology" element={<Numerology />} />
                  <Route path="/quick-patterns" element={<QuickPatterns />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/accounts" element={<AuthCheck><Accounts /></AuthCheck>} />
                  <Route path="/checkout" element={<Checkout />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
