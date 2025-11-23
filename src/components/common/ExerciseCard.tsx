import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../../store';
import { Exercise } from '../../types';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { lightColors, darkColors, borderRadius, spacing, fontSize } from '../../utils/theme';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const colors = isDarkMode ? darkColors : lightColors;

  const isFavorite = favorites.some(fav => fav.name === exercise.name);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    dispatch(toggleFavorite(exercise));
  };

  const getDifficultyColor = () => {
    switch (exercise.difficulty.toLowerCase()) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'expert':
        return colors.error;
      default:
        return colors.info;
    }
  };

  // Map exercise type to icon
  const getExerciseIcon = () => {
    const muscle = exercise.muscle.toLowerCase();
    if (muscle.includes('chest')) return 'activity';
    if (muscle.includes('abs') || muscle.includes('abdominals')) return 'square';
    if (muscle.includes('leg') || muscle.includes('quadriceps')) return 'trending-up';
    if (muscle.includes('arm') || muscle.includes('biceps') || muscle.includes('triceps')) return 'zap';
    return 'heart';
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
          <Feather name={getExerciseIcon()} size={32} color={colors.primary} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {exercise.name}
          </Text>
          <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
            <Feather
              name={isFavorite ? 'heart' : 'heart'}
              size={20}
              color={isFavorite ? colors.error : colors.textSecondary}
              fill={isFavorite ? colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: getDifficultyColor() + '20' }]}>
            <Text style={[styles.tagText, { color: getDifficultyColor() }]}>
              {exercise.difficulty}
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: colors.secondary + '20' }]}>
            <Text style={[styles.tagText, { color: colors.secondary }]}>
              {exercise.type}
            </Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Feather name="target" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {exercise.muscle}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Feather name="box" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {exercise.equipment.replace(/_/g, ' ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: spacing.md,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    flex: 1,
    marginRight: spacing.sm,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  detailText: {
    fontSize: fontSize.sm,
    textTransform: 'capitalize',
  },
});
