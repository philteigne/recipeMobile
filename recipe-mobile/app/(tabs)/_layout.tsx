import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/consts/theme';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="user-recipes"
        options={{
          title: 'Recipes',
        }}
      />
      <Tabs.Screen
        name="create-recipe"
        options={{
          title: 'New Recipe',
        }}
      />
    </Tabs>
  );
}
