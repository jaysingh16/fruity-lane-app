import { Home, Grid, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "categories", label: "Categories", icon: Grid, path: "/categories" },
    { id: "orders", label: "Orders", icon: Package, path: "/orders" },
    { id: "profile", label: "Profile", icon: User, path: "/" },
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    if (currentPath === "/") return "home";
    if (currentPath.startsWith("/categories")) return "categories";
    if (currentPath.startsWith("/orders")) return "orders";
    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-around gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-full transition-all",
                  isActive 
                    ? "bg-card text-primary font-bold shadow-soft" 
                    : "text-muted-foreground"
                )}
              >
                {isActive ? (
                  <span className="text-sm font-bold">{tab.label}</span>
                ) : (
                  <Icon size={24} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
