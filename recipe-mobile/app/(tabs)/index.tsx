import ScreenView from '@/components/layout/ScreenView';
import H1 from '@/components/typography/H1';
import H3 from '@/components/typography/H3';
import { View } from 'react-native';
import { Spacing } from '@/consts/theme';

export default function HomeScreen() {
  return (
    <ScreenView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <H1>Welcome to Pantry</H1>
        <View style={{ marginTop: Spacing.sm, opacity: 0.6 }}>
          <H3>Your recipes, all in one place.</H3>
        </View>
      </View>
    </ScreenView> 
  );
}
