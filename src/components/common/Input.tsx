import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../../store';
import { lightColors, darkColors, borderRadius, spacing, fontSize } from '../../utils/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Feather.glyphMap;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  isPassword = false,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.error : colors.border,
          },
        ]}
      >
        {icon && (
          <Feather
            name={icon}
            size={20}
            color={colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            icon && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
  },
  inputWithIcon: {
    paddingLeft: spacing.xs,
  },
  icon: {
    marginRight: spacing.xs,
  },
  eyeIcon: {
    padding: spacing.xs,
  },
  error: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
});
