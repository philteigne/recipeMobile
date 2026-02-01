import ScreenView from '@/components/layout/ScreenView';
import H1 from '@/components/typography/H1';
import { fetchApi } from '@/lib/api';
import { routes } from '@/lib/apiRoutes';
import { Colors, Spacing } from '@/consts/theme';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function CreateRecipeScreen() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [recipe, setRecipe] = useState<string>('');
  const [errors, setErrors] = useState<{
    title: string | null;
    subtitle: string | null;
    description: string | null;
    recipe: string | null;
  }>({
    title: null,
    subtitle: null,
    description: null,
    recipe: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const validateForm = ():boolean => {
    const validateTitle = title.trim();
    const validateRecipe = recipe.trim();

    if (!validateTitle) {
      setErrors({ ...errors, title: 'Title is required' });
      return false;
    }
    if (!validateRecipe) {
      setErrors({ ...errors, recipe: 'Recipe is required' });
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    console.log('handleSubmit');
    if (!validateForm()) return;
    setSubmitting(true);
    
    console.log('submit');
    try {
      const res = await fetchApi(routes.recipes, {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          description: description.trim() || null,
          content: recipe.trim(),
        }),
      });
      console.log('response', res);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error?.message ?? `Request failed: ${res.status}`);
      }
      setTitle('');
      setSubtitle('');
      setDescription('');
      setRecipe('');
      console.log('alert');
      Alert.alert('Saved', 'Recipe created.');
    } catch (e) {
      console.log('error', e);
      Alert.alert('Error', e instanceof Error ? e.message : 'Could not create recipe.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <H1>Create Recipe</H1>

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Recipe name"
              placeholderTextColor={Colors.icon}
              style={[styles.input, styles.inputSingle]}
            />
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Subtitle</Text>
            <TextInput
              value={subtitle}
              onChangeText={setSubtitle}
              placeholder="Recipe subtitle"
              placeholderTextColor={Colors.icon}
              style={[styles.input, styles.inputSingle]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Short description or notes..."
              placeholderTextColor={Colors.icon}
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Recipe</Text>
            <TextInput
              value={recipe}
              onChangeText={setRecipe}
              placeholder="Recipe content..."
              placeholderTextColor={Colors.icon}
              style={[styles.input, styles.textAreaLarge]}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.submitRow}>
            <Pressable
              onPress={handleSubmit}
              disabled={submitting}
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.submitBtnPressed,
                submitting && styles.submitBtnDisabled,
              ]}
            >
              <Text style={styles.submitBtnText}>
                {submitting ? 'Saving…' : 'Save recipe'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  field: {
    marginTop: Spacing.lg,
  },
  label: {
    color: Colors.icon,
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background,
    borderColor: Colors.icon,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
  },
  inputSingle: {
    minHeight: 44,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.sm,
  },
  textAreaLarge: {
    minHeight: 180,
    paddingTop: Spacing.sm,
  },
  submitRow: {
    marginTop: Spacing.xl,
  },
  submitBtn: {
    backgroundColor: Colors.tint,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnPressed: {
    opacity: 0.9,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
