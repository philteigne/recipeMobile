import React from 'react';
import H1 from '@/components/typography/H1';
import ScreenView from '@/components/layout/ScreenView';
import { ScrollView } from 'react-native';
import PressableCard from '@/components/buttons/PressableCard';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export default function UserRecipesScreen() {
  return (
    <ScreenView>
      <H1>User Recipes Screen</H1>

      {/* CONTENT */}
      <ScrollView>
        <PressableCard solid>
          <H2>Recipe Title</H2>
          <H3>Recipe </H3>
        </PressableCard>
      </ScrollView>
    </ScreenView> 
  );
}
