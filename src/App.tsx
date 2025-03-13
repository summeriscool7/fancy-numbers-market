
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import BirthdateNumbers from "./pages/BirthdateNumbers";
import VehicleNumbers from "./pages/VehicleNumbers";
import Numerology from "./pages/Numerology";
import Accounts from "./pages/Accounts";
import QuickPatterns from "./pages/QuickPatterns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
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
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/quick-patterns" element={<QuickPatterns />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
