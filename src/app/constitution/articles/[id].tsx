// Single Constitution Article Reader with Navigation, Font Resizer, and Lex.uz Citation
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  ScrollView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  ExternalLink, 
  Printer, 
  Share2, 
  Scale 
} from 'lucide-react-native';
import ResponsiveLayout from '../../../components/ResponsiveLayout';
import ErrorState from '../../../components/ErrorState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../../styles/theme';
import { FULL_ARTICLES, CONSTITUTION_META } from '../../../lib/constitutionData';

export default function ConstitutionArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [fontSize, setFontSize] = useState<number>(15);

  const articleId = parseInt(id as string, 10) || 1;
  const articleIndex = FULL_ARTICLES.findIndex((a) => a.id === articleId);
  const article = FULL_ARTICLES[articleIndex] || FULL_ARTICLES[0];

  const prevArticle = articleIndex > 0 ? FULL_ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < FULL_ARTICLES.length - 1 ? FULL_ARTICLES[articleIndex + 1] : null;

  if (!article) {
    return (
      <ResponsiveLayout>
        <ErrorState message="Bunday modda topilmadi" />
      </ResponsiveLayout>
    );
  }

  const openLexUz = () => {
    Linking.openURL(CONSTITUTION_META.officialSourceUrl).catch(() => {});
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined' && window.print) {
      window.print();
    }
  };

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Top Back / Breadcrumb */}
        <View style={styles.breadcrumbRow}>
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => router.push('/constitution')}
          >
            <ArrowLeft size={16} color={COLORS.navy} />
            <Text style={styles.backBtnText}>Konstitutsiya mundarijasi</Text>
          </TouchableOpacity>

          <View style={styles.toolsRow}>
            {/* Font Resizer */}
            <View style={styles.fontControls}>
              <TouchableOpacity 
                style={styles.fontBtn} 
                onPress={() => setFontSize(Math.max(13, fontSize - 1))}
              >
                <Text style={styles.fontBtnText}>A-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.fontBtn} 
                onPress={() => setFontSize(Math.min(22, fontSize + 1))}
              >
                <Text style={styles.fontBtnText}>A+</Text>
              </TouchableOpacity>
            </View>

            {/* Print Friendly Button */}
            <TouchableOpacity style={styles.printBtn} onPress={handlePrint}>
              <Printer size={16} color={COLORS.navy} />
              <Text style={styles.printBtnText}>Chop etish</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Article Reader Card */}
        <View style={styles.articleCard}>
          {/* Section & Chapter hierarchy banner */}
          <View style={styles.metaBanner}>
            <Text style={styles.partName}>{article.part_name}</Text>
            <Text style={styles.chapterTitle}>{article.chapter_title}</Text>
          </View>

          {/* Article Title */}
          <Text style={styles.articleTitle}>{article.title}</Text>

          <View style={styles.divider} />

          {/* Verbatim Article Content */}
          <Text style={[styles.articleContent, { fontSize: fontSize, lineHeight: fontSize * 1.7 }]}>
            {article.content}
          </Text>

          {/* Verification Footnote */}
          <View style={styles.footnoteBox}>
            <Scale size={16} color={COLORS.gold} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.footnoteText}>
                Ushbu modda 2023-yil 30-aprelda o‘tkazilgan referendumda qabul qilingan yangi tahrirdagi Konstitutsiyaning rasmiy matnidan olingan.
              </Text>
              <TouchableOpacity onPress={openLexUz} style={styles.lexLinkRow}>
                <Text style={styles.lexLinkText}>Lex.uz rasmiy manbasida ko‘rish</Text>
                <ExternalLink size={12} color={COLORS.goldDark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Previous & Next Article Navigation */}
        <View style={styles.navRow}>
          {prevArticle ? (
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => router.push(`/constitution/articles/${prevArticle.id}`)}
            >
              <ArrowLeft size={16} color={COLORS.navy} />
              <View>
                <Text style={styles.navBtnSub}>Oldingi modda</Text>
                <Text style={styles.navBtnTitle}>{prevArticle.article_number}-modda</Text>
              </View>
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}

          {nextArticle ? (
            <TouchableOpacity
              style={[styles.navBtn, { justifyContent: 'flex-end' }]}
              onPress={() => router.push(`/constitution/articles/${nextArticle.id}`)}
            >
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.navBtnSub}>Keyingi modda</Text>
                <Text style={styles.navBtnTitle}>{nextArticle.article_number}-modda</Text>
              </View>
              <ArrowRight size={16} color={COLORS.navy} />
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 860,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  toolsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fontControls: {
    flexDirection: 'row',
    gap: 4,
  },
  fontBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  printBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  printBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
    marginBottom: 20,
  },
  metaBanner: {
    marginBottom: 14,
  },
  partName: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  chapterTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  articleTitle: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 18,
  },
  articleContent: {
    color: COLORS.text,
  },
  footnoteBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    padding: 12,
    borderRadius: RADIUS.md,
    marginTop: 24,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  footnoteText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  lexLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  lexLinkText: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    ...SHADOWS.sm,
  },
  navBtnSub: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  navBtnTitle: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
});
