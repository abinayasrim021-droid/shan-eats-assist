import React, { useState } from 'react';
import { useCanteen } from '@/context/CanteenContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getBudgetCombos } from '@/data/menuData';
import { BUDGET_OPTIONS } from '@/types/canteen';
import { Wallet, Sparkles, Plus, X } from 'lucide-react';

interface BudgetOptimizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetOptimizer: React.FC<BudgetOptimizerProps> = ({ isOpen, onClose }) => {
  const { userAllergies, addToCart, selectedBudget, setSelectedBudget } = useCanteen();
  const [combos, setCombos] = useState<ReturnType<typeof getBudgetCombos>>([]);

  const handleBudgetSelect = (budget: number) => {
    setSelectedBudget(budget);
    const suggestions = getBudgetCombos(budget, userAllergies);
    setCombos(suggestions);
  };

  const handleAddCombo = (combo: typeof combos[0]) => {
    combo.items.forEach(item => addToCart(item));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <Card className="relative w-full max-w-lg max-h-[90vh] overflow-hidden animate-scale-in">
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/20">
              <Wallet className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <CardTitle>Budget Optimizer</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI finds the best meal combinations
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Budget Selection */}
          <div>
            <p className="text-sm font-medium mb-3">Select your budget:</p>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map(budget => (
                <Button
                  key={budget}
                  variant={selectedBudget === budget ? 'default' : 'outline'}
                  onClick={() => handleBudgetSelect(budget)}
                  className="min-w-[80px]"
                >
                  ₹{budget}
                </Button>
              ))}
            </div>
          </div>

          {/* Combo Suggestions */}
          {selectedBudget && combos.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Suggestions for ₹{selectedBudget}</span>
              </div>
              
              {combos.map((combo, index) => (
                <div
                  key={index}
                  className="bg-muted/50 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {combo.items.map(item => (
                        <Badge key={item.id} variant="secondary">
                          {item.name} (₹{item.price})
                        </Badge>
                      ))}
                    </div>
                    <span className="font-bold text-primary whitespace-nowrap">
                      ₹{combo.total}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {combo.items.length} item(s) • Saves ₹{selectedBudget - combo.total}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddCombo(combo)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add All
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedBudget && combos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No items found within ₹{selectedBudget}</p>
              <p className="text-sm">Try increasing your budget</p>
            </div>
          )}

          {!selectedBudget && (
            <div className="text-center py-8 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Select a budget to get AI-powered meal suggestions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOptimizer;
