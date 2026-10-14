// Constitution Chapters & Sections Detailed View
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, ChevronRight, Scale } from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { CONSTITUTION_PARTS, CONSTITUTION_CHAPTERS, FULL_ARTICLES } from '../../lib/constitutionData';
import { ConstitutionPart, ConstitutionChapter } from '../../types';

export default function ConstitutionChaptersScreen() {
  const router = useRouter();

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/constitution')}>
          <ArrowLeft size={16} color={COLORS.navy} />
          <Text style={styles.backBtnText}>Konstitutsiya muqovasiga qaytish</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.preTitle}>TUZILISH VA MUNDARIJA</Text>
          <Text style={styles.title}>Konstitutsiya bo‘limlari va boblari</Text>
          <Text style={styles.subtitle}>
            O‘zbekiston Respublikasi Konstitutsiyasi 6 ta bo‘lim, 27 ta bob va 155 ta moddadan iborat.
          </Text>
        </View>

        <View style={styles.partsList}>
          {CONSTITUTION_PARTS.map((part: ConstitutionPart) => {
            const chaptersInPart = CONSTITUTION_CHAPTERS.filter((c: ConstitutionChapter) => c.part_id === part.id);
            return (
              <View key={part.id} style={styles.partCard}>
                <View style={styles.partCardHeader}>
                  <Text style={styles.partNumber}>{part.part_number}</Text>
                  <Text style={styles.partTitle}>{part.title}</Text>
                </View>

                <View style={styles.chaptersGrid}>
                  {chaptersInPart.map((ch: ConstitutionChapter) => (
                    <View key={ch.id} style={styles.chapterCard}>
                      <View style={styles.chapterHeader}>
                        <Text style={styles.chapterNum}>{ch.chapter_number}-bob</Text>
                        <Text style={styles.chapterRange}>{ch.article_range}</Text>
                      </View>
                      <Text style={styles.chapterName}>{ch.title}</Text>

                      {/* Display available articles in this chapter */}
                      <View style={styles.articlesLinkRow}>
                        {FULL_ARTICLES.filter((a) => a.chapter_id === ch.chapter_number).map((a) => (
                          <TouchableOpacity
                            key={a.id}
                            style={styles.articleBadge}
                            onPress={() => router.push(`/constitution/articles/${a.id}`)}
                          >
                            <Text style={styles.articleBadgeText}>{a.article_number}-modda</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  backBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  preTitle: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  partsList: {
    gap: 20,
  },
  partCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  partCardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
    marginBottom: 14,
  },
  partNumber: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '800',
  },
  partTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  chaptersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chapterCard: {
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    padding: 12,
    flex: 1,
    minWidth: 280,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chapterNum: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '700',
  },
  chapterRange: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  chapterName: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  articlesLinkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  articleBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  articleBadgeText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '600',
  },
});
