import { useState, useEffect } from "react";
import { ArrowLeft, Package, Clock, CheckCircle2, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  date: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="text-orange-500" size={20} />;
      case "Shipped":
        return <Truck className="text-blue-500" size={20} />;
      case "Delivered":
        return <CheckCircle2 className="text-green-500" size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-orange-100 text-orange-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-secondary/30";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card shadow-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary/30 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">My Orders</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">📦</p>
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <p className="text-sm text-muted-foreground">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-card rounded-2xl p-6 shadow-card cursor-pointer hover:shadow-hover transition-all"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                    <p className="font-bold">#{order.id.slice(-8)}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-semibold">{order.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                    <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="font-bold text-primary text-lg">₹{order.total}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Items ({order.items.length})</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <img 
                        key={idx}
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-16 h-16 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold">+{order.items.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
