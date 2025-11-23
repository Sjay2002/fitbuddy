import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, FavoritesState } from '../../types';

const STORAGE_KEY = '@fitbuddy_favorites';

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Exercise[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<Exercise>) => {
      const exists = state.favorites.some(ex => ex.name === action.payload.name);
      if (!exists) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(ex => ex.name !== action.payload);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<Exercise>) => {
      const index = state.favorites.findIndex(ex => ex.name === action.payload.name);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;

// Async action to load favorites from storage
export const loadFavorites = () => async (dispatch: any) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const favorites = JSON.parse(stored);
      dispatch(setFavorites(favorites));
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
};

export default favoritesSlice.reducer;
