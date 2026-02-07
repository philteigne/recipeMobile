export const theme = {
  colors: {
    primary: '#E85D2C',
    secondary: '#2C8E4E',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#DC2626',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  font: {
    size: { sm: 12, md: 14, lg: 16, xl: 20, xxl: 28 },
    weight: { regular: '400', medium: '500', bold: '700' },
  },
} as const;