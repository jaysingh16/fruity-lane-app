import { Home, Grid, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNav = ({ activeTab = "home", onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "categories", label: "Categories", icon: Grid },
    { id: "orders", label: "Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
