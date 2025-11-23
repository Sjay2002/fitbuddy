import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { AppDispatch, RootState } from '../../store';
import { clearError, register } from '../../store/slices/authSlice';
import { darkColors, fontSize, lightColors, spacing } from '../../utils/theme';
import { registerSchema } from '../../utils/validation';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? darkColors : lightColors;

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
      dispatch(clearError());
    }
  }, [error]);

  const handleRegister = async () => {
    try {
      // Validate form
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});

      // Dispatch register action
      await dispatch(register(formData)).unwrap();
    } catch (err: any) {
      if (err.inner) {
        // Yup validation errors
        const validationErrors: any = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary + '20' }]}>
            <Feather name="user-plus" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join FitBuddy and start your fitness journey
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
            icon="user"
          />

          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            error={errors.username}
            icon="at-sign"
            autoCapitalize="none"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            icon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            error={errors.password}
            icon="lock"
            isPassword
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            error={errors.confirmPassword}
            icon="lock"
            isPassword
          />

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            style={styles.registerButton}
          />

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.link, { color: colors.primary }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.md,
  },
  link: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
