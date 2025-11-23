import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../../store';
import { Exercise } from '../../types';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { Button } from '../../components/common/Button';
import { lightColors, darkColors, spacing, fontSize, borderRadius } from '../../utils/theme';

interface ExerciseDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      exercise: Exercise;
    };
  };
}

export const ExerciseDetailsScreen: React.FC<ExerciseDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { exercise } = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const colors = isDarkMode ? darkColors : lightColors;

  const isFavorite = favorites.some((fav) => fav.name === exercise.name);

  const handleToggleFavorite = () => {
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

  const InfoCard = ({ icon, label, value }: any) => (
    <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
      <Feather name={icon} size={24} color={colors.primary} />
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary + '20' }]}>
          <View style={styles.iconContainer}>
            <Feather name="activity" size={64} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{exercise.name}</Text>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <InfoCard
            icon="target"
            label="Muscle Group"
            value={exercise.muscle.replace(/_/g, ' ')}
          />
          <InfoCard
            icon="zap"
            label="Type"
            value={exercise.type}
          />
          <InfoCard
            icon="box"
            label="Equipment"
            value={exercise.equipment.replace(/_/g, ' ')}
          />
          <InfoCard
            icon="trending-up"
            label="Difficulty"
            value={exercise.difficulty}
          />
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="book-open" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Instructions
            </Text>
          </View>
          <View style={[styles.instructionsContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.instructionsText, { color: colors.text }]}>
              {exercise.instructions}
            </Text>
          </View>
        </View>

        {/* Tips */}
        <View style={[styles.tipsContainer, { backgroundColor: colors.info + '20', borderColor: colors.info }]}>
          <Feather name="info" size={20} color={colors.info} />
          <Text style={[styles.tipsText, { color: colors.text }]}>
            Remember to warm up before exercising and maintain proper form to prevent injuries.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <Button
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={handleToggleFavorite}
          variant={isFavorite ? 'outline' : 'primary'}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginTop: spacing.xs,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  instructionsContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  instructionsText: {
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  tipsContainer: {
    flexDirection: 'row',
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: spacing.sm,
  },
  tipsText: {
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    borderTopWidth: 1,
  },
});
