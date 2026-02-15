import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, ContentStyles } from "@/consts/theme";
import type { ProseMirrorDoc } from "@/types/editor.types";

interface RecipeContentProps {
  content: ProseMirrorDoc;
}

export default function RecipeContent({ content }: RecipeContentProps) {
  // Handle content that arrives as a JSON string (e.g. from some DB drivers)
  let doc: ProseMirrorDoc;
  if (typeof content === "string") {
    try {
      doc = JSON.parse(content);
    } catch {
      return <Text style={styles.body}>Unable to parse recipe content.</Text>;
    }
  } else {
    doc = content;
  }

  if (!doc?.content) {
    if (__DEV__) {
      console.log("RecipeContent received:", JSON.stringify(content));
    }
    return <Text style={styles.body}>No content available.</Text>;
  }

  return (
    <View>
      {doc.content.map((node, i) => (
        <BlockNode key={i} node={node} />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Block-level nodes
// ---------------------------------------------------------------------------

function BlockNode({ node }: { node: Record<string, any> }) {
  switch (node.type) {
    case "paragraph":
      return (
        <Text style={styles.paragraph}>
          <InlineContent content={node.content} />
        </Text>
      );

    case "heading": {
      const level: number = node.attrs?.level ?? 1;
      const headingStyle =
        level === 1
          ? styles.h1
          : level === 2
            ? styles.h2
            : styles.h3;
      return (
        <Text style={headingStyle}>
          <InlineContent content={node.content} />
        </Text>
      );
    }

    case "bulletList":
      return (
        <View style={styles.list}>
          {node.content?.map((item: any, i: number) => (
            <ListItem key={i} node={item} bullet="•" />
          ))}
        </View>
      );

    case "orderedList":
      return (
        <View style={styles.list}>
          {node.content?.map((item: any, i: number) => (
            <ListItem key={i} node={item} bullet={`${i + 1}.`} />
          ))}
        </View>
      );

    case "blockquote":
      return (
        <View style={styles.blockquote}>
          {node.content?.map((child: any, i: number) => (
            <BlockNode key={i} node={child} />
          ))}
        </View>
      );

    case "horizontalRule":
      return <View style={styles.hr} />;

    default:
      // Unknown block type — attempt to render children
      if (node.content) {
        return (
          <View>
            {node.content.map((child: any, i: number) => (
              <BlockNode key={i} node={child} />
            ))}
          </View>
        );
      }
      return null;
  }
}

// ---------------------------------------------------------------------------
// List items
// ---------------------------------------------------------------------------

function ListItem({
  node,
  bullet,
}: {
  node: Record<string, any>;
  bullet: string;
}) {
  return (
    <View style={styles.listItemRow}>
      <Text style={styles.listBullet}>{bullet}</Text>
      <View style={styles.listItemContent}>
        {node.content?.map((child: any, i: number) => (
          <BlockNode key={i} node={child} />
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Inline / text content
// ---------------------------------------------------------------------------

function InlineContent({ content }: { content?: Record<string, any>[] }) {
  if (!content) return null;

  return (
    <>
      {content.map((node, i) => {
        if (node.type === "text") {
          return <StyledText key={i} node={node} />;
        }
        if (node.type === "hardBreak") {
          return <Text key={i}>{"\n"}</Text>;
        }
        // Unknown inline — render text if available
        return node.text ? <Text key={i}>{node.text}</Text> : null;
      })}
    </>
  );
}

function StyledText({ node }: { node: Record<string, any> }) {
  const marks: Record<string, any>[] = node.marks ?? [];

  let style: any = { ...styles.body };
  for (const mark of marks) {
    switch (mark.type) {
      case "bold":
        style = { ...style, fontWeight: "700" };
        break;
      case "italic":
        style = { ...style, fontStyle: "italic" };
        break;
      case "underline":
        style = { ...style, textDecorationLine: "underline" };
        break;
      case "strike":
        style = { ...style, textDecorationLine: "line-through" };
        break;
      case "code":
        style = {
          ...style,
          fontFamily: "monospace",
          backgroundColor: "#f0f0f0",
        };
        break;
    }
  }

  return <Text style={style}>{node.text}</Text>;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  body: {
    color: Colors.text,
    fontSize: ContentStyles.body.fontSize,
    lineHeight: ContentStyles.body.lineHeight,
  },
  paragraph: {
    color: Colors.text,
    fontSize: ContentStyles.body.fontSize,
    lineHeight: ContentStyles.body.lineHeight,
    marginTop: ContentStyles.paragraph.marginTop,
    marginBottom: ContentStyles.paragraph.marginBottom,
  },
  h1: {
    color: Colors.text,
    fontSize: ContentStyles.h1.fontSize,
    fontWeight: ContentStyles.h1.fontWeight,
    marginTop: ContentStyles.h1.marginTop,
    marginBottom: ContentStyles.h1.marginBottom,
  },
  h2: {
    color: Colors.text,
    fontSize: ContentStyles.h2.fontSize,
    fontWeight: ContentStyles.h2.fontWeight,
    marginTop: ContentStyles.h2.marginTop,
    marginBottom: ContentStyles.h2.marginBottom,
  },
  h3: {
    color: Colors.text,
    fontSize: ContentStyles.h3.fontSize,
    fontWeight: ContentStyles.h3.fontWeight,
    marginTop: ContentStyles.h3.marginTop,
    marginBottom: ContentStyles.h3.marginBottom,
  },
  list: {
    marginTop: ContentStyles.list.marginTop,
    marginBottom: ContentStyles.list.marginBottom,
  },
  listItemRow: {
    flexDirection: "row",
    paddingLeft: ContentStyles.list.paddingLeft,
    marginBottom: ContentStyles.listItem.marginBottom,
  },
  listBullet: {
    color: Colors.text,
    fontSize: ContentStyles.body.fontSize,
    lineHeight: ContentStyles.body.lineHeight,
    width: 24,
  },
  listItemContent: {
    flex: 1,
  },
  blockquote: {
    borderLeftWidth: ContentStyles.blockquote.borderLeftWidth,
    borderLeftColor: Colors.icon,
    paddingLeft: ContentStyles.blockquote.paddingLeft,
    marginVertical: Spacing.sm,
  },
  hr: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.icon,
    marginVertical: Spacing.md,
  },
});
