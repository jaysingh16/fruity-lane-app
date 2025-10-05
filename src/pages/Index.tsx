import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import PromoCard from "@/components/PromoCard";
import BottomNav from "@/components/BottomNav";

// Import fruit images
import appleImg from "@/assets/apple.jpg";
import bananaImg from "@/assets/banana.jpg";
import watermelonImg from "@/assets/watermelon.jpg";
import grapesImg from "@/assets/grapes.jpg";
import orangeImg from "@/assets/orange.jpg";
import pineappleImg from "@/assets/pineapple.jpg";
import strawberryImg from "@/assets/strawberry.jpg";
import kiwiImg from "@/assets/kiwi.jpg";
import mangoImg from "@/assets/mango.jpg";

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Apples", icon: "🍎", gradient: "bg-pastel-peach" },
    { name: "Bananas", icon: "🍌", gradient: "bg-pastel-yellow" },
    { name: "Watermelon", icon: "🍉", gradient: "bg-pastel-pink" },
    { name: "Grapes", icon: "🍇", gradient: "bg-pastel-purple" },
    { name: "Oranges", icon: "🍊", gradient: "bg-pastel-orange" },
    { name: "Pineapple", icon: "🍍", gradient: "bg-pastel-cream" },
    { name: "Berries", icon: "🍓", gradient: "bg-pastel-pink" },
    { name: "Kiwi", icon: "🥝", gradient: "bg-pastel-green" },
  ];

  const products = [
    { name: "Fresh Red Apples", price: 120, unit: "1 kg", image: appleImg },
    { name: "Ripe Bananas", price: 50, unit: "6 pieces", image: bananaImg },
    { name: "Sweet Watermelon", price: 80, unit: "1 piece", image: watermelonImg },
    { name: "Purple Grapes", price: 90, unit: "500g", image: grapesImg },
    { name: "Juicy Oranges", price: 100, unit: "1 kg", image: orangeImg },
    { name: "Tropical Pineapple", price: 60, unit: "1 piece", image: pineappleImg },
    { name: "Fresh Strawberries", price: 150, unit: "250g", image: strawberryImg },
    { name: "Green Kiwi", price: 200, unit: "500g", image: kiwiImg },
    { name: "Sweet Mangoes", price: 180, unit: "1 kg", image: mangoImg },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.name === product.name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Categories</h2>
            <button 
              onClick={() => navigate("/categories")}
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                icon={category.icon}
                gradient={category.gradient}
                onClick={() => navigate(`/categories?name=${category.name}`)}
              />
            ))}
          </div>
        </section>

        {/* Flash Sale Badge */}
        <div className="flex gap-6 overflow-x-auto pb-2 mb-2">
          <button className="font-bold text-lg text-muted-foreground/30 whitespace-nowrap transition-colors">
            Flash Sale
          </button>
          <button className="font-bold text-lg text-foreground whitespace-nowrap transition-colors">
            Popular
          </button>
          <button className="font-bold text-lg text-muted-foreground/30 whitespace-nowrap transition-colors">
            New Arrival
          </button>
        </div>

        {/* Products Grid */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Fresh Fruits</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                price={product.price}
                unit={product.unit}
                image={product.image}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </section>

        {/* Promotional Banners */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PromoCard
              title="FRESH DEALS"
              subtitle="Get 20% Off Fresh Fruits"
              buttonText="Shop Now"
              gradient="bg-gradient-green"
              icon="🍓"
            />
            <PromoCard
              title="QUICK DELIVERY"
              subtitle="Farm to Home in 2 Hours"
              buttonText="Order Now"
              gradient="bg-gradient-orange"
              icon="🚚"
            />
          </div>
        </section>

        {/* Order Tracking Section */}
        <section className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Track Your Orders</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">No active orders</p>
                <p className="text-xs text-muted-foreground">Start shopping to see your orders here</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
