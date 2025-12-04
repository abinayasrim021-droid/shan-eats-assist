import React from 'react';
import { useCanteen } from '@/context/CanteenContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ALLERGEN_LABELS, AllergenType } from '@/types/canteen';
import { ShieldAlert, X } from 'lucide-react';

interface AllergySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllergySelector: React.FC<AllergySelectorProps> = ({ isOpen, onClose }) => {
  const { userAllergies, setUserAllergies } = useCanteen();

  const allergens = Object.entries(ALLERGEN_LABELS) as [AllergenType, string][];

  const toggleAllergen = (allergen: string) => {
    if (userAllergies.includes(allergen)) {
      setUserAllergies(userAllergies.filter(a => a !== allergen));
    } else {
      setUserAllergies([...userAllergies, allergen]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <Card className="relative w-full max-w-md animate-scale-in">
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-destructive/10">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle>Allergy Protection</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select your allergies for safe ordering
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {allergens.map(([key, label]) => (
              <div
                key={key}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  userAllergies.includes(key)
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
                onClick={() => toggleAllergen(key)}
              >
                <Checkbox
                  checked={userAllergies.includes(key)}
                  onCheckedChange={() => toggleAllergen(key)}
                />
                <span className="font-medium text-sm">{label}</span>
              </div>
            ))}
          </div>

          {userAllergies.length > 0 && (
            <div className="bg-destructive/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-destructive mb-2">
                Active Protections ({userAllergies.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {userAllergies.map(allergen => (
                  <Badge key={allergen} variant="allergen">
                    {ALLERGEN_LABELS[allergen as AllergenType]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Items containing your allergens will be marked with warnings.
            Always verify ingredients with canteen staff.
          </p>

          <Button onClick={onClose} className="w-full">
            Save & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllergySelector;
