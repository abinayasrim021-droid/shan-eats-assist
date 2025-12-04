import React from 'react';
import { Order } from '@/types/canteen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, ChefHat, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderTrackingProps {
  order: Order;
  onClose?: () => void;
}

const statusConfig = {
  received: {
    label: 'Order Received',
    icon: CheckCircle,
    color: 'bg-info',
    step: 1,
  },
  preparing: {
    label: 'Preparing',
    icon: ChefHat,
    color: 'bg-warning',
    step: 2,
  },
  ready: {
    label: 'Ready for Pickup',
    icon: Package,
    color: 'bg-success',
    step: 3,
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'bg-secondary',
    step: 4,
  },
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ order, onClose }) => {
  const currentStep = statusConfig[order.status].step;

  return (
    <Card className="animate-slide-up overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
              <Badge variant={order.status === 'ready' ? 'success' : 'default'}>
                {statusConfig[order.status].label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-muted" />
          
          {Object.entries(statusConfig).map(([key, config], index) => {
            const Icon = config.icon;
            const isActive = config.step <= currentStep;
            const isCurrent = config.step === currentStep;
            
            return (
              <div key={key} className="relative flex items-center gap-4 pb-6 last:pb-0">
                <div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                    isActive
                      ? `${config.color} text-primary-foreground`
                      : 'bg-muted text-muted-foreground'
                  } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex-1 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                  <p className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>
                    {config.label}
                  </p>
                  {isCurrent && order.status !== 'completed' && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Est. {order.estimatedTime} mins remaining</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Items */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
          <p className="font-semibold text-sm">Order Items:</p>
          <div className="space-y-2">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-border flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary">₹{order.totalAmount}</span>
          </div>
        </div>

        {order.status === 'ready' && (
          <div className="bg-success/10 border-2 border-success rounded-xl p-4 text-center">
            <Package className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="font-bold text-success">Your order is ready!</p>
            <p className="text-sm text-muted-foreground">Please collect it from the counter</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
