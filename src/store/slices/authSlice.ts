import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '../../types';
import { authAPI } from '../../services/api';

const STORAGE_KEYS = {
  USER: '@fitbuddy_user',
  TOKEN: '@fitbuddy_token',
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(username, password);
      
      // Store auth data securely
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, username, email, password }: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(name, username, email, password);
      
      // Store auth data securely
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      const [userStr, token] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      ]);

      if (userStr && token) {
        const user = JSON.parse(userStr);
        return { user, token };
      }
      
      return rejectWithValue('No stored auth data');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Load stored auth
    builder.addCase(loadStoredAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
