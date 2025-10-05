import { useState, useEffect } from "react";
import { ArrowLeft, Package, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  date: string;
}

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    setOrder(foundOrder || null);
  };

  const trackingSteps = [
    { label: "Order Placed", status: "completed", icon: "✓" },
    { label: "Processing", status: order?.status === "Processing" ? "current" : order?.status === "Shipped" || order?.status === "Delivered" ? "completed" : "pending", icon: "📦" },
    { label: "Shipped", status: order?.status === "Shipped" ? "current" : order?.status === "Delivered" ? "completed" : "pending", icon: "🚚" },
    { label: "Delivered", status: order?.status === "Delivered" ? "completed" : "pending", icon: "✓" },
  ];

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card shadow-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/orders")} className="p-2 hover:bg-secondary/30 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Track Order</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Order Info */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-bold text-lg">#{order.id.slice(-8)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-primary">₹{order.total}</p>
          </div>
        </div>

        {/* Tracking Progress */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-lg font-bold mb-6">Order Status</h2>
          
          <div className="relative">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                    step.status === "completed" 
                      ? "bg-primary text-primary-foreground" 
                      : step.status === "current"
                      ? "bg-primary/20 text-primary animate-pulse"
                      : "bg-secondary/30 text-muted-foreground"
                  }`}>
                    {step.icon}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-1 h-12 my-1 ${
                      step.status === "completed" ? "bg-primary" : "bg-secondary/30"
                    }`} />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className={`font-semibold mb-1 ${
                    step.status === "current" ? "text-primary" : ""
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.status === "completed" ? "Completed" : step.status === "current" ? "In Progress" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center p-3 bg-secondary/20 rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{item.price}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
