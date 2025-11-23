import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../../store';
import { Exercise } from '../../types';
import { fitnessAPI } from '../../services/api';
import { ExerciseCard } from '../../components/common/ExerciseCard';
import { lightColors, darkColors, spacing, fontSize, borderRadius } from '../../utils/theme';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const user = useSelector((state: RootState) => state.auth.user);
  const colors = isDarkMode ? darkColors : lightColors;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const muscleGroups = ['chest', 'abdominals', 'quadriceps', 'biceps', 'triceps', 'back'];

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [searchQuery, selectedMuscle, exercises]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await fitnessAPI.getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExercises();
    setRefreshing(false);
  };

  const filterExercises = () => {
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter((ex) =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMuscle) {
      filtered = filtered.filter(
        (ex) => ex.muscle.toLowerCase() === selectedMuscle.toLowerCase()
      );
    }

    setFilteredExercises(filtered);
  };

  const handleMuscleFilter = (muscle: string) => {
    setSelectedMuscle(selectedMuscle === muscle ? null : muscle);
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Text style={[styles.greeting, { color: colors.text }]}>
        Hello, {user?.name || 'User'}! 👋
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Ready for your workout today?
      </Text>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Feather name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search exercises..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Muscle Group Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={muscleGroups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedMuscle === item ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleMuscleFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: selectedMuscle === item ? '#FFFFFF' : colors.text,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {selectedMuscle
          ? `${selectedMuscle.charAt(0).toUpperCase() + selectedMuscle.slice(1)} Exercises`
          : 'All Exercises'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No exercises found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.md,
  },
  headerContent: {
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
  },
  filtersContainer: {
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.md,
    marginTop: spacing.md,
  },
});
