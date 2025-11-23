import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { borderRadius, darkColors, fontSize, lightColors, spacing } from '../../utils/theme';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const colors = isDarkMode ? darkColors : lightColors;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const StatCard = ({ icon, label, value, color }: any) => (
    <View style={[styles.statCard, { backgroundColor: colors.card }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Feather name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );

  const MenuItem = ({ icon, title, onPress, rightElement }: any) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <Feather name={icon} size={20} color={colors.text} />
        <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
      </View>
      {rightElement || <Feather name="chevron-right" size={20} color={colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.primary + '20' }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'User'}</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {user?.email || 'user@example.com'}
          </Text>
          <Text style={[styles.username, { color: colors.textSecondary }]}>
            @{user?.username || 'username'}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="heart"
            label="Favorites"
            value={favorites.length}
            color={colors.error}
          />
          <StatCard
            icon="activity"
            label="Workouts"
            value="12"
            color={colors.success}
          />
          <StatCard
            icon="zap"
            label="Streak"
            value="5 days"
            color={colors.warning}
          />
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <MenuItem
            icon={isDarkMode ? 'moon' : 'sun'}
            title="Dark Mode"
            onPress={() => {}}
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <MenuItem
            icon="bell"
            title="Notifications"
            onPress={() => Alert.alert('Notifications', 'Feature coming soon!')}
          />

          <MenuItem
            icon="shield"
            title="Privacy & Security"
            onPress={() => Alert.alert('Privacy & Security', 'Feature coming soon!')}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          
          <MenuItem
            icon="info"
            title="About FitBuddy"
            onPress={() => Alert.alert('FitBuddy', 'Version 1.0.0\n\nYour personal fitness companion')}
          />

          <MenuItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => Alert.alert('Help & Support', 'Contact us at support@fitbuddy.com')}
          />

          <MenuItem
            icon="star"
            title="Rate Us"
            onPress={() => Alert.alert('Rate Us', 'Thank you for your support!')}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error + '20', borderColor: colors.error }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          FitBuddy v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: fontSize.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuText: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    marginTop: spacing.lg,
  },
});
