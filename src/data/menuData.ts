import { MenuItem } from '@/types/canteen';

export const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: 'b1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with spiced potato filling, served with sambar and chutney',
    price: 35,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
    available: true,
    prepTime: 8,
    allergens: [],
    isVeg: true,
  },
  {
    id: 'b2',
    name: 'Idli Sambar',
    description: 'Soft steamed rice cakes with lentil stew and coconut chutney',
    price: 25,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    available: true,
    prepTime: 5,
    allergens: [],
    isVeg: true,
  },
  {
    id: 'b3',
    name: 'Poori Bhaji',
    description: 'Fluffy fried bread with spiced potato curry',
    price: 30,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    available: true,
    prepTime: 10,
    allergens: ['gluten'],
    isVeg: true,
  },
  {
    id: 'b4',
    name: 'Upma',
    description: 'Savory semolina porridge with vegetables and cashews',
    price: 20,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop',
    available: true,
    prepTime: 6,
    allergens: ['gluten', 'tree_nuts'],
    isVeg: true,
  },
  {
    id: 'b5',
    name: 'Pongal',
    description: 'Creamy rice and lentil porridge with ghee and pepper',
    price: 28,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    available: true,
    prepTime: 7,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'b6',
    name: 'Bread Omelette',
    description: 'Fluffy egg omelette with toast and butter',
    price: 35,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    available: true,
    prepTime: 8,
    allergens: ['eggs', 'gluten', 'milk'],
    isVeg: false,
  },
  
  // Lunch Items
  {
    id: 'l1',
    name: 'Veg Meals',
    description: 'Rice, sambar, rasam, 2 vegetables, curd, papad, and pickle',
    price: 60,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    available: true,
    prepTime: 5,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'l2',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken pieces and raita',
    price: 80,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    available: true,
    prepTime: 15,
    allergens: ['milk'],
    isVeg: false,
  },
  {
    id: 'l3',
    name: 'Veg Biryani',
    description: 'Fragrant rice with mixed vegetables and aromatic spices',
    price: 55,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
    available: true,
    prepTime: 12,
    allergens: [],
    isVeg: true,
  },
  {
    id: 'l4',
    name: 'Curd Rice',
    description: 'Cooling yogurt rice with tempering and pomegranate',
    price: 35,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    available: true,
    prepTime: 3,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'l5',
    name: 'Chapati Curry',
    description: '3 soft chapatis with dal and vegetable curry',
    price: 45,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=300&fit=crop',
    available: true,
    prepTime: 10,
    allergens: ['gluten'],
    isVeg: true,
  },
  
  // Snacks
  {
    id: 's1',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 15,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    available: true,
    prepTime: 3,
    allergens: ['gluten'],
    isVeg: true,
  },
  {
    id: 's2',
    name: 'Vada Pav',
    description: 'Spiced potato fritter in a soft bun with chutneys',
    price: 20,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&h=300&fit=crop',
    available: true,
    prepTime: 5,
    allergens: ['gluten'],
    isVeg: true,
  },
  {
    id: 's3',
    name: 'Pani Puri',
    description: '6 crispy puris with spiced water and sweet chutney',
    price: 25,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop',
    available: true,
    prepTime: 4,
    allergens: ['gluten'],
    isVeg: true,
  },
  {
    id: 's4',
    name: 'Bhel Puri',
    description: 'Puffed rice with vegetables and tangy chutneys',
    price: 20,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop',
    available: true,
    prepTime: 3,
    allergens: ['peanuts', 'gluten'],
    isVeg: true,
  },
  {
    id: 's5',
    name: 'Bread Pakora',
    description: 'Crispy gram flour coated bread with potato filling',
    price: 18,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    available: true,
    prepTime: 5,
    allergens: ['gluten'],
    isVeg: true,
  },
  
  // Drinks
  {
    id: 'd1',
    name: 'Masala Chai',
    description: 'Hot spiced Indian tea with milk',
    price: 10,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    available: true,
    prepTime: 3,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'd2',
    name: 'Filter Coffee',
    description: 'Traditional South Indian filter coffee',
    price: 15,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop',
    available: true,
    prepTime: 3,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'd3',
    name: 'Lassi',
    description: 'Sweet or salted yogurt drink',
    price: 25,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop',
    available: true,
    prepTime: 2,
    allergens: ['milk'],
    isVeg: true,
  },
  {
    id: 'd4',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime juice with soda water',
    price: 20,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop',
    available: true,
    prepTime: 2,
    allergens: [],
    isVeg: true,
  },
  {
    id: 'd5',
    name: 'Buttermilk',
    description: 'Spiced churned yogurt drink',
    price: 12,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1587657565520-6c3c7c3b3c25?w=400&h=300&fit=crop',
    available: true,
    prepTime: 2,
    allergens: ['milk'],
    isVeg: true,
  },
];

export const getMenuByCategory = (category: MenuItem['category']) => {
  return menuItems.filter(item => item.category === category);
};

export const getAvailableItems = () => {
  return menuItems.filter(item => item.available);
};

export const filterByAllergens = (items: MenuItem[], userAllergens: string[]) => {
  if (userAllergens.length === 0) return items;
  return items.filter(item => 
    !item.allergens.some(allergen => userAllergens.includes(allergen))
  );
};

export const getBudgetCombos = (budget: number, userAllergens: string[] = []) => {
  const availableItems = filterByAllergens(
    menuItems.filter(item => item.available && item.price <= budget),
    userAllergens
  );
  
  const combos: { items: MenuItem[]; total: number; savings?: number }[] = [];
  
  // Find combinations that fit the budget
  for (let i = 0; i < availableItems.length; i++) {
    const item1 = availableItems[i];
    if (item1.price <= budget) {
      // Single item
      combos.push({ items: [item1], total: item1.price });
      
      // Two items
      for (let j = i + 1; j < availableItems.length; j++) {
        const item2 = availableItems[j];
        if (item1.price + item2.price <= budget) {
          combos.push({ 
            items: [item1, item2], 
            total: item1.price + item2.price 
          });
        }
      }
    }
  }
  
  // Sort by value (most items that fit budget)
  return combos
    .sort((a, b) => b.items.length - a.items.length || b.total - a.total)
    .slice(0, 5);
};

export const getComboSuggestions = (selectedItem: MenuItem) => {
  const suggestions: { items: MenuItem[]; message: string; savings: number }[] = [];
  
  // Tea/Coffee combo
  if (selectedItem.category === 'breakfast' || selectedItem.category === 'snacks') {
    const tea = menuItems.find(item => item.id === 'd1');
    const coffee = menuItems.find(item => item.id === 'd2');
    
    if (tea) {
      suggestions.push({
        items: [tea],
        message: `Add ${tea.name} for a complete meal!`,
        savings: 0
      });
    }
    if (coffee) {
      suggestions.push({
        items: [coffee],
        message: `Pair with ${coffee.name} - perfect combo!`,
        savings: 0
      });
    }
  }
  
  // Lunch combos
  if (selectedItem.category === 'lunch') {
    const buttermilk = menuItems.find(item => item.id === 'd5');
    const lassi = menuItems.find(item => item.id === 'd3');
    
    if (buttermilk) {
      suggestions.push({
        items: [buttermilk],
        message: `Cool down with ${buttermilk.name}!`,
        savings: 2
      });
    }
    if (lassi) {
      suggestions.push({
        items: [lassi],
        message: `Complete your meal with ${lassi.name}!`,
        savings: 0
      });
    }
  }
  
  return suggestions.slice(0, 2);
};
