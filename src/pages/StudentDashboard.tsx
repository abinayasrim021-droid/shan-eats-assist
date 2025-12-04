import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanteen } from '@/context/CanteenContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/MenuItemCard';
import CartPanel from '@/components/CartPanel';
import VoiceOrdering from '@/components/VoiceOrdering';
import AllergySelector from '@/components/AllergySelector';
import BudgetOptimizer from '@/components/BudgetOptimizer';
import OrderTracking from '@/components/OrderTracking';
import { menuItems, filterByAllergens } from '@/data/menuData';
import { Order, MenuItem } from '@/types/canteen';
import { toast } from '@/hooks/use-toast';
import {
  UtensilsCrossed,
  ShoppingBag,
  Mic,
  ShieldAlert,
  Wallet,
  LogOut,
  User,
  Coffee,
  Sun,
  Cookie,
  GlassWater,
  ClipboardList,
} from 'lucide-react';

const categoryConfig = {
  breakfast: { label: 'Breakfast', icon: Sun },
  lunch: { label: 'Lunch', icon: UtensilsCrossed },
  snacks: { label: 'Snacks', icon: Cookie },
  drinks: { label: 'Drinks', icon: GlassWater },
};

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    setUser, 
    cart, 
    cartItemsCount, 
    cartTotal,
    userAllergies,
    clearCart,
    addOrder,
    orders,
  } = useCanteen();
  
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('breakfast');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAllergyOpen, setIsAllergyOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Filter menu items by category and allergies
  const filteredItems = filterByAllergens(
    menuItems.filter(item => item.category === activeCategory),
    userAllergies
  );

  const allCategoryItems = menuItems.filter(item => item.category === activeCategory);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const estimatedTime = cart.reduce((max, item) => 
      Math.max(max, item.prepTime), 0
    ) + Math.ceil(cart.length / 2) * 2;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      studentEmail: user?.email || '',
      studentName: user?.name || '',
      items: [...cart],
      totalAmount: cartTotal,
      status: 'received',
      createdAt: new Date(),
      estimatedTime,
    };

    addOrder(newOrder);
    setActiveOrder(newOrder);
    clearCart();
    setIsCartOpen(false);

    toast({
      title: "🎉 Order Placed Successfully!",
      description: `Order #${newOrder.id.slice(0, 8)} - Total: ₹${newOrder.totalAmount}`,
    });

    // Simulate order status updates
    setTimeout(() => {
      newOrder.status = 'preparing';
      addOrder({ ...newOrder, status: 'preparing' });
    }, 3000);

    setTimeout(() => {
      newOrder.status = 'ready';
      addOrder({ ...newOrder, status: 'ready' });
      toast({
        title: "✅ Order Ready!",
        description: "Your order is ready for pickup!",
      });
    }, 8000);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-primary">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold">Sri Shanmugha Canteen</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Ordering</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* AI Features */}
              <Button
                variant="voice"
                size="icon"
                onClick={() => setIsVoiceOpen(true)}
                title="Voice Order"
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <Button
                variant={userAllergies.length > 0 ? 'destructive' : 'ghost'}
                size="icon"
                onClick={() => setIsAllergyOpen(true)}
                title="Allergy Settings"
              >
                <ShieldAlert className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBudgetOpen(true)}
                title="Budget Optimizer"
              >
                <Wallet className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="default"
                className="relative gap-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="hidden sm:inline">₹{cartTotal}</span>
                {cartItemsCount > 0 && (
                  <Badge variant="accent" className="absolute -top-2 -right-2 h-5 min-w-5 p-0 flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Active Order Banner */}
        {activeOrder && activeOrder.status !== 'completed' && (
          <div className="mb-6">
            <OrderTracking order={activeOrder} onClose={() => setActiveOrder(null)} />
          </div>
        )}

        {/* AI Features Banner */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors text-left"
          >
            <div className="p-2 rounded-xl gradient-primary">
              <Mic className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Voice Order</p>
              <p className="text-xs text-muted-foreground">Speak to order</p>
            </div>
          </button>

          <button
            onClick={() => setIsAllergyOpen(true)}
            className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 hover:bg-destructive/20 transition-colors text-left"
          >
            <div className="p-2 rounded-xl bg-destructive">
              <ShieldAlert className="h-5 w-5 text-destructive-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Allergy Guard</p>
              <p className="text-xs text-muted-foreground">
                {userAllergies.length} active
              </p>
            </div>
          </button>

          <button
            onClick={() => setIsBudgetOpen(true)}
            className="flex items-center gap-3 p-4 rounded-2xl bg-accent/20 hover:bg-accent/30 transition-colors text-left"
          >
            <div className="p-2 rounded-xl bg-accent">
              <Wallet className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Budget Optimizer</p>
              <p className="text-xs text-muted-foreground">AI meal combos</p>
            </div>
          </button>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/20 text-left">
            <div className="p-2 rounded-xl bg-secondary">
              <ClipboardList className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">My Orders</p>
              <p className="text-xs text-muted-foreground">
                {orders.length} order(s)
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as MenuItem['category'])}>
          <TabsList className="w-full justify-start gap-2 h-auto p-2 bg-muted/50 rounded-2xl mb-6 overflow-x-auto">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              const count = menuItems.filter(i => i.category === key && i.available).length;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{config.label}</span>
                  <Badge variant="muted" className="text-xs">{count}</Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.keys(categoryConfig).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              {userAllergies.length > 0 && filteredItems.length < allCategoryItems.length && (
                <div className="mb-4 p-3 bg-destructive/10 rounded-xl flex items-center gap-2 text-sm">
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                  <span>
                    {allCategoryItems.length - filteredItems.length} item(s) hidden due to your allergy settings
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-slide-up"
                  >
                    <MenuItemCard item={item} />
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <Coffee className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No items available</p>
                  <p className="text-sm text-muted-foreground">Check back later or adjust your filters</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Modals */}
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <VoiceOrdering isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <AllergySelector isOpen={isAllergyOpen} onClose={() => setIsAllergyOpen(false)} />
      <BudgetOptimizer isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
    </div>
  );
};

export default StudentDashboard;
