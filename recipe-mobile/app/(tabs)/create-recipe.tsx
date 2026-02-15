import ScreenView from "@/components/layout/ScreenView";
import RecipeEditor, {
  recipeBridgeExtensions,
} from "@/components/editor/RecipeEditor";
import H1 from "@/components/typography/H1";
import { fetchApi } from "@/lib/api";
import { routes } from "@/lib/apiRoutes";
import { Colors, Spacing } from "@/consts/theme";
import {
  Toolbar,
  useEditorBridge,
  type ToolbarItem,
  DEFAULT_TOOLBAR_ITEMS,
  Images,
} from "@10play/tentap-editor";
import type { ProseMirrorDoc } from "@/types/editor.types";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
/**
 * Curated toolbar items for recipe editing.
 *  Bold, Italic, Heading (H1-H3 sub-menu), Bullet List, Ordered List
 */
const dismissKeyboardItem: ToolbarItem = {
  onPress:
    ({ editor }) =>
    () => {
      editor.blur();
      Keyboard.dismiss();
    },
  active: () => false,
  disabled: () => false,
  image: () => Images.close,
};

/** Create a heading toolbar button for the given level. */
const headingItem = (level: 1 | 2): ToolbarItem => ({
  onPress: ({ editor }) => () => editor.toggleHeading(level),
  active: ({ editorState }) => editorState.headingLevel === level,
  disabled: ({ editorState }) => !editorState.canToggleHeading,
  image: () => Images[`h${level}`],
});


const RECIPE_TOOLBAR_ITEMS: ToolbarItem[] = [
  DEFAULT_TOOLBAR_ITEMS[0],  // Bold
  DEFAULT_TOOLBAR_ITEMS[1],  // Italic
  headingItem(1),
  headingItem(2),
  DEFAULT_TOOLBAR_ITEMS[10], // Bullet List
  DEFAULT_TOOLBAR_ITEMS[9],  // Ordered List
  dismissKeyboardItem, // Dismiss keyboard
].filter(Boolean) as ToolbarItem[];

export default function CreateRecipeScreen() {
  const [title, setTitle] = useState<string>("");
  const [errors, setErrors] = useState<{
    title: string | null;
    content: string | null;
  }>({
    title: null,
    content: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Editor bridge lives here so both RichText and Toolbar share it
  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: recipeBridgeExtensions,
    theme: {
      toolbar: {
        toolbarBody: {
          backgroundColor: "#fff",
          borderTopColor: Colors.icon,
          borderBottomColor: Colors.icon,
          borderRadius: 100,
          paddingHorizontal: Spacing.md,
        },
        toolbarButton: {
          backgroundColor: Colors.background,
          paddingHorizontal: Spacing.xs,
        },
        iconWrapper: {
          backgroundColor: Colors.background,
          borderRadius: 100,
          padding: Spacing.xxs,
        },
        iconWrapperActive: {
          backgroundColor: Colors.tint,
        },
        icon: {
          tintColor: Colors.text,
        },
        iconActive: {
          tintColor: "#fff",
        },
      },
      webview: {
        backgroundColor: Colors.background,
      },
      webviewContainer: {
        borderColor: Colors.icon,
        borderWidth: 0,
        borderRadius: 0,
      },
    },
  });

  const validateTitle = (): boolean => {
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, title: null }));
    return true;
  };

  async function handleSubmit() {
    if (!validateTitle()) return;

    // Get the ProseMirror JSON from the editor
    const json = (await editor.getJSON()) as ProseMirrorDoc;

    // Check for empty document (doc with no content or only empty paragraphs)
    const hasContent =
      json?.content?.some(
        (node) =>
          node.type !== "paragraph" ||
          (node.content && node.content.length > 0),
      ) ?? false;

    if (!hasContent) {
      setErrors((prev) => ({ ...prev, content: "Content is required" }));
      return;
    }
    setErrors((prev) => ({ ...prev, content: null }));

    setSubmitting(true);

    try {
      const res = await fetchApi(routes.recipes, {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          content: json as ProseMirrorDoc,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error?.message ?? `Request failed: ${res.status}`,
        );
      }

      // Reset form
      setTitle("");
      editor.setContent("");
      Alert.alert("Saved", "Recipe created.");
    } catch (e) {
      Alert.alert(
        "Error",
        e instanceof Error ? e.message : "Could not create recipe.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /** Dismiss both the native keyboard and the editor's WebView focus */
  function dismissKeyboard() {
    Keyboard.dismiss();
    editor.blur();
  }

  return (
    <>
      <ScreenView>
        <View style={styles.content}>
          {/* Tapping header/label area dismisses keyboard */}
          <Pressable onPress={dismissKeyboard}>
            <H1>Create Recipe</H1>
          </Pressable>

          <View style={styles.field}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Recipe name"
              placeholderTextColor={Colors.icon}
              style={[styles.input, styles.inputSingle]}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
          </View>

          {/* Editor fills remaining space -- NOT inside the dismiss Pressable */}
          <View style={styles.editorContainer}>
            <RecipeEditor editor={editor} />
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
                {submitting ? "Saving…" : "Save recipe"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenView>

      {/* Toolbar floats above the keyboard, outside ScreenView to span full width */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardToolbar}
      >
        <Toolbar editor={editor} items={RECIPE_TOOLBAR_ITEMS} />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
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
    borderWidth: 0,
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
  },
  inputSingle: {
    minHeight: 44,
  },
  editorContainer: {
    flex: 1,
    minHeight: 200,
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  submitRow: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  submitBtn: {
    backgroundColor: Colors.tint,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: "center",
  },
  submitBtnPressed: {
    opacity: 0.9,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  keyboardToolbar: {
    position: "absolute",
    width: "98%",
    alignSelf: "center",
    bottom: Spacing.md,
  },
});
