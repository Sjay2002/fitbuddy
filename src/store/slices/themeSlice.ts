import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../../types';

const STORAGE_KEY = '@fitbuddy_theme';

const initialState: ThemeState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.isDarkMode));
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Async action to load theme from storage
export const loadTheme = () => async (dispatch: any) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const isDarkMode = JSON.parse(stored);
      dispatch(setTheme(isDarkMode));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

export default themeSlice.reducer;
