import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Colors, Spacing, Fonts } from '@/consts/theme';
import type { ProseMirrorDoc } from '@/types/editor.types';

/** Same extensions used in the editor so generateHTML knows all node types */
const extensions = [StarterKit];

interface RecipeContentProps {
  content: ProseMirrorDoc;
}

export default function RecipeContent({ content }: RecipeContentProps) {
  const { width } = useWindowDimensions();

  const html = useMemo(() => {
    try {
      return generateHTML(content, extensions);
    } catch {
      return '<p>Unable to render recipe content.</p>';
    }
  }, [content]);

  return (
    <RenderHtml
      contentWidth={width - Spacing.md * 2}
      source={{ html }}
      tagsStyles={tagsStyles}
    />
  );
}

const tagsStyles = {
  body: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: Fonts?.sans,
  },
  h1: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: Spacing.sm,
  },
  h2: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '600' as const,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  h3: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600' as const,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  p: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 0,
    marginBottom: Spacing.xs,
  },
  ul: {
    color: Colors.text,
    paddingLeft: Spacing.md,
  },
  ol: {
    color: Colors.text,
    paddingLeft: Spacing.md,
  },
  li: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: Spacing.xs,
  },
  hr: {
    borderColor: Colors.icon,
    borderWidth: 0.5,
    marginVertical: Spacing.md,
  },
  strong: {
    fontWeight: '700' as const,
  },
  em: {
    fontStyle: 'italic' as const,
  },
};
