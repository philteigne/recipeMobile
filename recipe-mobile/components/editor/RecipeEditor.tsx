import React from 'react';
import {
  RichText,
  CoreBridge,
  TenTapStartKit,
} from '@10play/tentap-editor';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/consts/theme';

/**
 * CSS applied at editor initialization via CoreBridge.configureCSS().
 * Runs BEFORE the editor mounts so font/padding are correct from first frame.
 */
const editorCSS = `
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.tiptap.ProseMirror {
  padding: ${Spacing.sm}px ${Spacing.md}px;
  color: ${Colors.text};
  font-size: 16px;
  line-height: 1.5;
  outline: none;
}
.tiptap p {
  margin: 4px 0;
}
.tiptap h1, .tiptap h2, .tiptap h3 {
  margin-top: 12px;
  margin-bottom: 4px;
  color: ${Colors.text};
}
.tiptap ul, .tiptap ol {
  padding-left: 24px;
  margin: 4px 0;
}
.tiptap li {
  margin-bottom: 2px;
}
`;

/**
 * Bridge extensions: spread TenTapStartKit first, then override CoreBridge
 * with custom CSS. Duplicates are ignored so our CoreBridge replaces the default.
 */
export const recipeBridgeExtensions = [
  ...TenTapStartKit,
  CoreBridge.configureCSS(editorCSS),
];

interface RecipeEditorProps {
  editor: any; // EditorBridge from useEditorBridge
}

/**
 * Renders the TipTap RichText WebView. The parent screen owns the
 * useEditorBridge hook and passes the editor instance here, so both
 * this component and the Toolbar share the same editor.
 */
export default function RecipeEditor({ editor }: RecipeEditorProps) {
  return (
    <View style={styles.editorWrapper}>
      <RichText editor={editor} />
    </View>
  );
}

const styles = StyleSheet.create({
  editorWrapper: {
    flex: 1,
  },
});
