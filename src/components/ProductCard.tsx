import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  unit: string;
  image: string;
  onAddToCart?: () => void;
}

const ProductCard = ({ name, price, unit, image, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card hover:shadow-hover transition-all duration-300 group">
      <div className="bg-secondary/30 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="font-semibold text-sm mb-1 text-card-foreground">{name}</h3>
      <p className="text-xs text-muted-foreground mb-3">{unit}</p>
      
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg text-primary">₹{price}</span>
        <Button
          size="icon"
          onClick={onAddToCart}
          className="rounded-full bg-primary hover:bg-primary/90 shadow-md h-9 w-9"
        >
          <Plus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
