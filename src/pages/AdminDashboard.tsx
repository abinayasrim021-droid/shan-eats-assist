import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { menuItems as initialMenuItems } from '@/data/menuData';
import { MenuItem, Order } from '@/types/canteen';
import { toast } from '@/hooks/use-toast';
import {
  ShieldCheck,
  LogOut,
  Bell,
  Package,
  ChefHat,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  UtensilsCrossed,
  Plus,
  Edit,
  Volume2,
} from 'lucide-react';

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'ord-001',
    studentEmail: 'john.doe@shanmugha.edu.in',
    studentName: 'John Doe',
    items: [
      { ...initialMenuItems[0], quantity: 2 },
      { ...initialMenuItems[16], quantity: 1 },
    ],
    totalAmount: 80,
    status: 'received',
    createdAt: new Date(Date.now() - 5 * 60000),
    estimatedTime: 12,
  },
  {
    id: 'ord-002',
    studentEmail: 'jane.smith@shanmugha.edu.in',
    studentName: 'Jane Smith',
    items: [
      { ...initialMenuItems[6], quantity: 1 },
      { ...initialMenuItems[18], quantity: 1 },
    ],
    totalAmount: 85,
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60000),
    estimatedTime: 8,
  },
];

const statusColors = {
  received: 'bg-info text-info-foreground',
  preparing: 'bg-warning text-warning-foreground',
  ready: 'bg-success text-success-foreground',
  completed: 'bg-muted text-muted-foreground',
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeTab, setActiveTab] = useState('orders');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Check admin auth
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin');
      return;
    }

    // Simulate new order notification
    const timer = setTimeout(() => {
      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        studentEmail: 'new.student@shanmugha.edu.in',
        studentName: 'New Student',
        items: [
          { ...initialMenuItems[2], quantity: 1 },
          { ...initialMenuItems[17], quantity: 2 },
        ],
        totalAmount: 50,
        status: 'received',
        createdAt: new Date(),
        estimatedTime: 10,
      };

      setOrders(prev => [newOrder, ...prev]);
      
      // Show notification
      toast({
        title: "🔔 New Order Received!",
        description: `Order #${newOrder.id.slice(0, 8)} from ${newOrder.studentName}`,
      });

      // Play sound
      if (soundEnabled) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, soundEnabled]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel.",
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    const order = orders.find(o => o.id === orderId);
    
    if (status === 'ready' && order) {
      toast({
        title: "📧 Email Sent",
        description: `Notification sent to ${order.studentEmail}`,
      });
    }

    toast({
      title: "Order Updated",
      description: `Order status changed to ${status}`,
    });
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
    toast({
      title: "Menu Updated",
      description: "Item availability has been updated",
    });
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'received' || o.status === 'preparing').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-secondary">
                <ShieldCheck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-bold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Sri Shanmugha Canteen</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {stats.pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {stats.pendingOrders}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-info">
                  <Package className="h-5 w-5 text-info-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-warning">
                  <Clock className="h-5 w-5 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-success">
                  <CheckCircle className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.completedOrders}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl gradient-primary">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start gap-2 h-auto p-2 bg-muted/50 rounded-2xl mb-6">
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 px-4 py-2 rounded-xl data-[state=active]:gradient-secondary data-[state=active]:text-secondary-foreground"
            >
              <Package className="h-4 w-4" />
              <span>Orders</span>
              <Badge variant="muted">{orders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="flex items-center gap-2 px-4 py-2 rounded-xl data-[state=active]:gradient-secondary data-[state=active]:text-secondary-foreground"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>Menu Management</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-0 space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground">Orders will appear here in real-time</p>
                </CardContent>
              </Card>
            ) : (
              orders.map(order => (
                <Card key={order.id} className={`animate-fade-in ${order.status === 'received' ? 'ring-2 ring-info' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          Order #{order.id.slice(0, 8)}
                          <Badge className={statusColors[order.status]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.studentName} • {order.studentEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₹{order.totalAmount}</p>
                        <p className="text-sm text-muted-foreground">
                          Est. {order.estimatedTime} mins
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm font-semibold mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="flex flex-wrap gap-2">
                      <p className="text-sm font-medium w-full mb-1">Update Status:</p>
                      {(['received', 'preparing', 'ready', 'completed'] as const).map(status => (
                        <Button
                          key={status}
                          variant={order.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, status)}
                          disabled={order.status === status}
                        >
                          {status === 'received' && <Package className="h-4 w-4 mr-1" />}
                          {status === 'preparing' && <ChefHat className="h-4 w-4 mr-1" />}
                          {status === 'ready' && <Bell className="h-4 w-4 mr-1" />}
                          {status === 'completed' && <CheckCircle className="h-4 w-4 mr-1" />}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="mt-0">
            <div className="grid gap-4">
              {['breakfast', 'lunch', 'snacks', 'drinks'].map(category => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {menuItems
                        .filter(item => item.category === category)
                        .map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">₹{item.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant={item.available ? 'success' : 'muted'}>
                                {item.available ? 'Available' : 'Unavailable'}
                              </Badge>
                              <Switch
                                checked={item.available}
                                onCheckedChange={() => toggleItemAvailability(item.id)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
