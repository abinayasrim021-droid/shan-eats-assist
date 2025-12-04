// Types for the canteen application

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'snacks' | 'drinks';
  image: string;
  available: boolean;
  prepTime: number; // in minutes
  allergens: string[];
  isVeg: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  studentEmail: string;
  studentName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'received' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  estimatedTime: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  allergies: string[];
  isAdmin: boolean;
}

export type AllergenType = 
  | 'peanuts'
  | 'milk'
  | 'gluten'
  | 'eggs'
  | 'soy'
  | 'shellfish'
  | 'tree_nuts';

export const ALLERGEN_LABELS: Record<AllergenType, string> = {
  peanuts: 'Peanuts',
  milk: 'Milk/Dairy',
  gluten: 'Gluten',
  eggs: 'Eggs',
  soy: 'Soy',
  shellfish: 'Shellfish',
  tree_nuts: 'Tree Nuts',
};

export const BUDGET_OPTIONS = [20, 30, 50, 70, 100] as const;

export type BudgetOption = typeof BUDGET_OPTIONS[number];
