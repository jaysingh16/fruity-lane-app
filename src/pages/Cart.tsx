import { useState, useEffect } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CartItem {
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity += delta;
    
    if (newCart[index].quantity <= 0) {
      removeItem(index);
      return;
    }
    
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Item removed from cart");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now().toString(),
      items: cartItems,
      total: getTotalPrice(),
      status: "Processing",
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", "[]");
    
    toast.success("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card shadow-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary/30 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Shopping Cart</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">🛒</p>
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate("/")}>Start Shopping</Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-card rounded-2xl p-4 shadow-card flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.unit}</p>
                    <p className="font-bold text-primary">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-full"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-2 bg-secondary/30 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        className="hover:bg-secondary/50 p-1 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold min-w-[24px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(index, 1)}
                        className="hover:bg-secondary/50 p-1 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              className="w-full h-14 text-lg font-bold"
            >
              Place Order
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
