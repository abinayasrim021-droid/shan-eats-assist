import React from 'react';
import { useCanteen } from '@/context/CanteenContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartItemsCount } = useCanteen();

  const estimatedPrepTime = cart.reduce((max, item) => 
    Math.max(max, item.prepTime), 0
  ) + Math.ceil(cart.length / 2) * 2;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <Card className="relative w-full max-w-md h-full rounded-none border-l animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <CardTitle>Your Cart</CardTitle>
            <Badge variant="default">{cartItemsCount}</Badge>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex flex-col h-[calc(100%-180px)] overflow-hidden">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <p className="text-muted-foreground text-sm">Add some delicious items!</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-muted/50 rounded-xl p-3 animate-fade-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-primary font-bold">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Estimated prep time</span>
              <span className="font-semibold">~{estimatedPrepTime} mins</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-lg">Total</span>
              <span className="text-2xl font-bold text-primary">₹{cartTotal}</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                onClick={onCheckout}
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CartPanel;
