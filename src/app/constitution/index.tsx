// Constitution of the Republic of Uzbekistan - Book Cover and Interactive Reader
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Linking 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Bookmark, 
  ChevronRight, 
  Scale, 
  Printer, 
  FileText 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { 
  CONSTITUTION_META, 
  CONSTITUTION_PARTS, 
  CONSTITUTION_CHAPTERS, 
  FULL_ARTICLES 
} from '../../lib/constitutionData';
import { ConstitutionPart, ConstitutionChapter } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

export default function ConstitutionHomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedPart, setSelectedPart] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(14);

  const openLexUz = () => {
    Linking.openURL(CONSTITUTION_META.officialSourceUrl).catch(() => {});
  };

  const filteredArticles = FULL_ARTICLES.filter((art) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.chapter_title.toLowerCase().includes(q)
    );
  });

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* 1. BOOK COVER HEADER */}
        <View style={styles.bookCover}>
          <View style={styles.emblemBadge}>
            <Scale size={32} color={COLORS.navy} strokeWidth={2} />
          </View>
          <Text style={styles.coverTitle}>{CONSTITUTION_META.title}</Text>
          <View style={styles.goldLine} />
          <Text style={styles.coverSubtitle}>{CONSTITUTION_META.subtitle}</Text>

          <View style={styles.metaBadgeRow}>
            <Text style={styles.metaBadgeText}>{CONSTITUTION_META.revisionDate}</Text>
            <Text style={styles.metaBadgeVerified}>{CONSTITUTION_META.verifiedDate}</Text>
          </View>

          <TouchableOpacity style={styles.lexLinkBtn} onPress={openLexUz}>
            <Text style={styles.lexLinkBtnText}>Lex.uz rasmiy matni (O‘RQ-837)</Text>
            <ExternalLink size={14} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* 2. READER CONTROLS: Search & Font Size */}
        <View style={styles.controlsBar}>
          {/* Search Article */}
          <View style={styles.searchBox}>
            <Search size={18} color={COLORS.gold} />
            <TextInput
              style={styles.searchInput}
              placeholder="Modda raqami yoki so‘z bo‘yicha qidiring (masalan: 29-modda, advokat, mulk)..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Font Resizer */}
          <View style={styles.fontControls}>
            <Text style={styles.fontLabel}>Matn o‘lchami:</Text>
            <TouchableOpacity 
              style={styles.fontBtn} 
              onPress={() => setFontSize(Math.max(12, fontSize - 1))}
            >
              <Text style={styles.fontBtnText}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.fontBtn, { backgroundColor: COLORS.gold }]} 
              onPress={() => setFontSize(14)}
            >
              <Text style={[styles.fontBtnText, { color: COLORS.navy }]}>Standart</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.fontBtn} 
              onPress={() => setFontSize(Math.min(20, fontSize + 1))}
            >
              <Text style={styles.fontBtnText}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. INTERACTIVE BOOK LAYOUT: Left Table of Contents, Right Articles */}
        <View style={styles.bookContentRow}>
          {/* Left: Table of Contents */}
          <View style={styles.tocSidebar}>
            <Text style={styles.tocHeading}>MUNDARIJA</Text>

            <TouchableOpacity 
              style={styles.viewChaptersBtn}
              onPress={() => router.push('/constitution/chapters')}
            >
              <Text style={styles.viewChaptersBtnText}>Bo‘limlar va boblar ro‘yxati →</Text>
            </TouchableOpacity>

            <ScrollView style={styles.tocScroll} nestedScrollEnabled>
              {CONSTITUTION_PARTS.map((part: ConstitutionPart) => (
                <View key={part.id} style={styles.tocPartBox}>
                  <TouchableOpacity
                    style={[
                      styles.tocPartBtn,
                      selectedPart === part.id && styles.tocPartBtnActive,
                    ]}
                    onPress={() => setSelectedPart(part.id)}
                  >
                    <Text style={styles.tocPartNum}>{part.part_number}</Text>
                    <Text style={styles.tocPartTitle} numberOfLines={2}>{part.title}</Text>
                  </TouchableOpacity>

                  {selectedPart === part.id && (
                    <View style={styles.tocChaptersList}>
                      {CONSTITUTION_CHAPTERS.filter((c: ConstitutionChapter) => c.part_id === part.id).map((ch: ConstitutionChapter) => (
                        <TouchableOpacity
                          key={ch.id}
                          style={styles.tocChapterItem}
                          onPress={() => router.push('/constitution/chapters')}
                        >
                          <Text style={styles.tocChapterTitle}>{ch.chapter_number}-bob: {ch.title}</Text>
                          <Text style={styles.tocChapterRange}>{ch.article_range}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Right: Articles Text Stream */}
          <View style={styles.articlesStream}>
            {/* Preamble Box if no search */}
            {!search && (
              <View style={styles.preambleCard}>
                <Text style={styles.preambleHeading}>MUQADDIMA</Text>
                <Text style={[styles.preambleContent, { fontSize: fontSize, lineHeight: fontSize * 1.6 }]}>
                  {CONSTITUTION_META.preamble}
                </Text>
              </View>
            )}

            {/* Articles List */}
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <View key={art.id} style={styles.articleCard}>
                  <View style={styles.articleHeader}>
                    <View>
                      <Text style={styles.articlePartTag}>{art.part_name}</Text>
                      <Text style={styles.articleChapterTag}>{art.chapter_title}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.fullArticleLink}
                      onPress={() => router.push(`/constitution/articles/${art.id}`)}
                    >
                      <Text style={styles.fullArticleLinkText}>Alohida ochish</Text>
                      <ChevronRight size={14} color={COLORS.gold} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.articleTitle}>{art.title}</Text>
                  <Text style={[styles.articleContent, { fontSize: fontSize, lineHeight: fontSize * 1.65 }]}>
                    {art.content}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.noArticleBox}>
                <Text style={styles.noArticleText}>
                  "{search}" bo‘yicha Konstitutsiya moddalari topilmadi.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  bookCover: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.goldDark,
    ...SHADOWS.lg,
    marginBottom: 24,
  },
  emblemBadge: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coverTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  goldLine: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.gold,
    marginVertical: 10,
  },
  coverSubtitle: {
    color: COLORS.goldLight,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  metaBadgeRow: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 18,
  },
  metaBadgeText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  metaBadgeVerified: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
  },
  lexLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    gap: 8,
  },
  lexLinkBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    minWidth: 280,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.text,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fontLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginRight: 4,
  },
  fontBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fontBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  bookContentRow: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  tocSidebar: {
    width: 320,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'flex-start',
  },
  tocHeading: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  viewChaptersBtn: {
    backgroundColor: COLORS.cream,
    padding: 8,
    borderRadius: RADIUS.sm,
    marginBottom: 12,
    alignItems: 'center',
  },
  viewChaptersBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  tocScroll: {
    maxHeight: 520,
  },
  tocPartBox: {
    marginBottom: 8,
  },
  tocPartBtn: {
    padding: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cream,
  },
  tocPartBtnActive: {
    backgroundColor: COLORS.navy,
  },
  tocPartNum: {
    color: COLORS.goldDark,
    fontSize: 10,
    fontWeight: '800',
  },
  tocPartTitle: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  tocChaptersList: {
    paddingLeft: 8,
    paddingTop: 6,
    gap: 6,
  },
  tocChapterItem: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tocChapterTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },
  tocChapterRange: {
    color: COLORS.textMuted,
    fontSize: 10,
  },
  articlesStream: {
    flex: 1,
    minWidth: 320,
  },
  preambleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  preambleHeading: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  preambleContent: {
    color: COLORS.text,
    fontStyle: 'italic',
  },
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
    paddingBottom: 8,
  },
  articlePartTag: {
    color: COLORS.goldDark,
    fontSize: 10,
    fontWeight: '800',
  },
  articleChapterTag: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  fullArticleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  fullArticleLinkText: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '700',
  },
  articleTitle: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  articleContent: {
    color: COLORS.text,
  },
  noArticleBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  noArticleText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
