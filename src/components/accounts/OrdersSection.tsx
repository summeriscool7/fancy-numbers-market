
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-11-15',
    status: 'Completed',
    total: 199.99,
    items: [
      { id: '1', number: '9876543210', price: 199.99 }
    ]
  },
  {
    id: 'ORD-5678',
    date: '2023-10-22',
    status: 'Completed',
    total: 299.99,
    items: [
      { id: '2', number: '8765432109', price: 299.99 }
    ]
  },
  {
    id: 'ORD-9012',
    date: '2023-09-05',
    status: 'Completed',
    total: 499.98,
    items: [
      { id: '3', number: '7654321098', price: 249.99 },
      { id: '4', number: '6543210987', price: 249.99 }
    ]
  }
];

const OrdersSection = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(current => 
      current.includes(orderId) 
        ? current.filter(id => id !== orderId) 
        : [...current, orderId]
    );
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {mockOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-1">No orders yet</h3>
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Button>Browse Numbers</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between bg-muted p-4 cursor-pointer"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(order.date)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                      <div className="flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                        {expandedOrders.includes(order.id) ? (
                          <ChevronUp size={18} className="ml-2" />
                        ) : (
                          <ChevronDown size={18} className="ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedOrders.includes(order.id) && (
                    <div className="p-4 border-t">
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-background rounded-md">
                            <span className="font-medium">{item.number}</span>
                            <span>{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">{formatPrice(order.total)}</span>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ExternalLink size={14} />
                          <span>Order Details</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSection;
