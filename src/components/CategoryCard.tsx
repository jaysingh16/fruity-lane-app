import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  icon: string;
  gradient: string;
  onClick?: () => void;
}

const CategoryCard = ({ name, icon, gradient, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-2 p-4 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105",
        gradient
      )}
    >
      <div className="text-4xl transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="text-xs font-semibold text-card-foreground">
        {name}
      </span>
    </button>
  );
};

export default CategoryCard;
