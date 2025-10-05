import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

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

const Categories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("name") || "All";

  const allProducts = [
    { name: "Fresh Red Apples", price: 120, unit: "1 kg", image: appleImg, category: "Apples" },
    { name: "Ripe Bananas", price: 50, unit: "6 pieces", image: bananaImg, category: "Bananas" },
    { name: "Sweet Watermelon", price: 80, unit: "1 piece", image: watermelonImg, category: "Watermelon" },
    { name: "Purple Grapes", price: 90, unit: "500g", image: grapesImg, category: "Grapes" },
    { name: "Juicy Oranges", price: 100, unit: "1 kg", image: orangeImg, category: "Oranges" },
    { name: "Tropical Pineapple", price: 60, unit: "1 piece", image: pineappleImg, category: "Pineapple" },
    { name: "Fresh Strawberries", price: 150, unit: "250g", image: strawberryImg, category: "Berries" },
    { name: "Green Kiwi", price: 200, unit: "500g", image: kiwiImg, category: "Kiwi" },
    { name: "Sweet Mangoes", price: 180, unit: "1 kg", image: mangoImg, category: "Pineapple" },
  ];

  const filteredProducts = category === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === category);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.name === product.name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card shadow-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary/30 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{category}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
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
      </main>
    </div>
  );
};

export default Categories;
