import React from 'react';
import { MenuItem, ALLERGEN_LABELS } from '@/types/canteen';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCanteen } from '@/context/CanteenContext';
import { Plus, Minus, Clock, AlertTriangle, Leaf } from 'lucide-react';
import { getComboSuggestions } from '@/data/menuData';
import { toast } from '@/hooks/use-toast';

interface MenuItemCardProps {
  item: MenuItem;
  showAllergenWarning?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, showAllergenWarning }) => {
  const { addToCart, cart, updateQuantity, userAllergies } = useCanteen();
  const cartItem = cart.find(ci => ci.id === item.id);
  
  const hasUserAllergen = item.allergens.some(a => userAllergies.includes(a));
  
  const handleAddToCart = () => {
    addToCart(item);
    
    // Show combo suggestions
    const suggestions = getComboSuggestions(item);
    if (suggestions.length > 0) {
      const suggestion = suggestions[0];
      toast({
        title: "💡 AI Suggestion",
        description: suggestion.message,
      });
    }
  };

  if (!item.available) {
    return (
      <Card className="overflow-hidden opacity-60">
        <div className="relative h-40 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <Badge variant="secondary" className="text-sm">Currently Unavailable</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden animate-fade-in ${hasUserAllergen ? 'ring-2 ring-destructive/50' : ''}`}>
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isVeg && (
            <Badge variant="success" className="gap-1">
              <Leaf className="h-3 w-3" />
              Veg
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="accent" className="font-bold">
            ₹{item.price}
          </Badge>
        </div>
        {hasUserAllergen && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="allergen" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Contains allergen
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{item.prepTime} mins</span>
          </div>
          
          {item.allergens.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {item.allergens.slice(0, 2).map(allergen => (
                <Badge
                  key={allergen}
                  variant={userAllergies.includes(allergen) ? 'allergen' : 'muted'}
                  className="text-xs"
                >
                  {ALLERGEN_LABELS[allergen as keyof typeof ALLERGEN_LABELS] || allergen}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {cartItem ? (
          <div className="flex items-center justify-between bg-muted rounded-lg p-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg">{cartItem.quantity}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant={hasUserAllergen ? 'outline' : 'default'}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
