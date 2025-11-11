import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

interface MenuState {
  items: MenuItem[];
  categories: string[];
  currentItem: MenuItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [],
  currentItem: null,
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setCurrentItem: (state, action: PayloadAction<MenuItem>) => {
      state.currentItem = action.payload;
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.currentItem?.id === action.payload.id) {
        state.currentItem = action.payload;
      }
    },
    toggleItemAvailability: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
      if (state.currentItem?.id === action.payload) {
        state.currentItem.isAvailable = !state.currentItem.isAvailable;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMenuItems,
  setCategories,
  setCurrentItem,
  updateMenuItem,
  toggleItemAvailability,
  setLoading,
  setError,
} = menuSlice.actions;

export default menuSlice.reducer;