import { MapPin, ShoppingCart, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface HeaderProps {
  location?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ 
  location = "Pune, India",
  onSearchChange 
}: HeaderProps) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 500);
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);
  return (
    <header className="bg-card sticky top-0 z-50 shadow-soft rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            <div>
              <p className="font-semibold text-sm">{location}</p>
              <p className="text-xs text-muted-foreground">Your location</p>
            </div>
          </div>
          
          <Button 
            variant="default"
            size="sm"
            onClick={() => navigate("/cart")}
            className="relative rounded-xl bg-primary hover:bg-primary/90 shadow-md"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search fresh fruits..."
            className="w-full bg-secondary/50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
