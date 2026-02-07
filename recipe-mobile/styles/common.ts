import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const common = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  containerPadded: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Surfaces
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },

  // Typography
  textTitle: {
    fontSize: theme.font.size.xxl,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
  },
  textSubtitle: {
    fontSize: theme.font.size.xl,
    fontWeight: theme.font.weight.medium,
    color: theme.colors.text,
  },
  textBody: {
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.regular,
    color: theme.colors.text,
  },
  textCaption: {
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.regular,
    color: theme.colors.textSecondary,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    color: theme.colors.surface,
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.medium,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: theme.colors.primary,
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.medium,
  },

  // Inputs
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.font.size.lg,
    color: theme.colors.text,
  },

  // List items
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
});
