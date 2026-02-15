import React from 'react';
import {
  RichText,
  CoreBridge,
  TenTapStartKit,
} from '@10play/tentap-editor';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing, ContentStyles } from '@/consts/theme';

/**
 * CSS applied at editor initialization via CoreBridge.configureCSS().
 * Runs BEFORE the editor mounts so font/padding are correct from first frame.
 * Values are sourced from ContentStyles so editor and viewer stay in sync.
 */
const editorCSS = `
/* Reset browser defaults so we have full control */
* {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.tiptap.ProseMirror {
  padding: ${Spacing.sm}px ${Spacing.md}px;
  color: ${Colors.text};
  font-size: ${ContentStyles.body.fontSize}px;
  line-height: ${ContentStyles.body.lineHeight}px;
  outline: none;
}
.tiptap p {
  margin-top: ${ContentStyles.paragraph.marginTop}px;
  margin-bottom: ${ContentStyles.paragraph.marginBottom}px;
}
.tiptap h1 {
  font-size: ${ContentStyles.h1.fontSize}px;
  font-weight: ${ContentStyles.h1.fontWeight};
  margin-top: ${ContentStyles.h1.marginTop}px;
  margin-bottom: ${ContentStyles.h1.marginBottom}px;
  line-height: 1.2;
  color: ${Colors.text};
}
.tiptap h2 {
  font-size: ${ContentStyles.h2.fontSize}px;
  font-weight: ${ContentStyles.h2.fontWeight};
  margin-top: ${ContentStyles.h2.marginTop}px;
  margin-bottom: ${ContentStyles.h2.marginBottom}px;
  line-height: 1.2;
  color: ${Colors.text};
}
.tiptap h3 {
  font-size: ${ContentStyles.h3.fontSize}px;
  font-weight: ${ContentStyles.h3.fontWeight};
  margin-top: ${ContentStyles.h3.marginTop}px;
  margin-bottom: ${ContentStyles.h3.marginBottom}px;
  line-height: 1.2;
  color: ${Colors.text};
}
.tiptap ul, .tiptap ol {
  padding-left: ${ContentStyles.list.paddingLeft}px;
  margin-top: ${ContentStyles.list.marginTop}px;
  margin-bottom: ${ContentStyles.list.marginBottom}px;
  list-style-position: outside;
}
.tiptap li {
  margin-bottom: ${ContentStyles.listItem.marginBottom}px;
}
.tiptap li p {
  margin: 0;
}
.tiptap blockquote {
  border-left: ${ContentStyles.blockquote.borderLeftWidth}px solid ${Colors.icon};
  padding-left: ${ContentStyles.blockquote.paddingLeft}px;
  margin: ${Spacing.sm}px 0;
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
