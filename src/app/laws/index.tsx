// Legislation Library Page (Lex.uz Codes, Laws, Decrees)
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
import { 
  Landmark, 
  Search, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Calendar,
  Tag
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import EmptyState from '../../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { INITIAL_LEGAL_DOCS } from '../../lib/mockData';
import { OFFICIAL_LINKS } from '../../lib/constants';
import { LegalDocumentRecord } from '../../types';

export default function LawsScreen() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('barchasi');

  const types = [
    { id: 'barchasi', label: 'Barcha hujjatlar' },
    { id: 'konstitutsiya', label: 'Konstitutsiya' },
    { id: 'kodeks', label: 'Kodekslar' },
    { id: 'qonun', label: 'Qonunlar' },
  ];

  const filteredDocs = INITIAL_LEGAL_DOCS.filter((doc) => {
    if (selectedType !== 'barchasi' && doc.type !== selectedType) {
      return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.doc_number.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Landmark size={14} color={COLORS.gold} />
            <Text style={styles.bannerBadgeText}>QONUNCHILIK MILLIY BAZASI (LEX.UZ)</Text>
          </View>
          <Text style={styles.bannerTitle}>O‘zbekiston Respublikasi Qonunchilik Kutubxonasi</Text>
          <Text style={styles.bannerSubtitle}>
            Amaldagi qonunlar, kodekslar va normativ-huquqiy hujjatlarning rasmiy Lex.uz bazasidagi tahrirlari.
          </Text>

          {/* Search Box */}
          <View style={styles.searchBox}>
            <Search size={18} color={COLORS.gold} />
            <TextInput
              style={styles.searchInput}
              placeholder="Hujjat nomi, raqami yoki kalit so‘z (masalan: Mehnat kodeksi, O‘RQ-837)..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Disclaimer Warning */}
        <View style={styles.disclaimerBox}>
          <Info size={20} color={COLORS.goldDark} />
          <Text style={styles.disclaimerText}>
            Diqqat: Ushbu bo‘limdagi huquqiy ma’lumotlar umumiy tanishuv xarakteriga ega bo‘lib, to‘g‘ridan-to‘g‘ri yuridik xulosa hisoblanmaydi. Aniq nizo yoki masala yuzasidan litsenziyaga ega advokat bilan maslahatlashish tavsiya etiladi.
          </Text>
        </View>

        {/* Document Type Filter Tabs */}
        <View style={styles.tabsRow}>
          {types.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.tabBtn,
                selectedType === t.id && styles.tabBtnActive,
              ]}
              onPress={() => setSelectedType(t.id)}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  selectedType === t.id && styles.tabBtnTextActive,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Documents List */}
        {filteredDocs.length > 0 ? (
          <View style={styles.docsList}>
            {filteredDocs.map((doc) => (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.docHeader}>
                  <View style={styles.docTypeBadge}>
                    <Tag size={12} color={COLORS.navy} />
                    <Text style={styles.docTypeText}>{doc.type.toUpperCase()}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <CheckCircle size={12} color={COLORS.success} />
                    <Text style={styles.statusText}>Amaldagi tahrir</Text>
                  </View>
                </View>

                <Text style={styles.docTitle}>{doc.title}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.docNumber}>Hujjat raqami: {doc.doc_number}</Text>
                  <Text style={styles.docDate}>Qabul qilingan: {doc.date_adopted}</Text>
                </View>

                <Text style={styles.docSummary}>{doc.summary}</Text>

                <View style={styles.docFooter}>
                  <Text style={styles.verifiedDate}>
                    Oxirgi tekshirilgan sana: {doc.last_verified}
                  </Text>
                  <TouchableOpacity
                    style={styles.openLexBtn}
                    onPress={() => openUrl(doc.lex_url)}
                  >
                    <Text style={styles.openLexBtnText}>Lex.uz da o‘qish</Text>
                    <ExternalLink size={14} color={COLORS.gold} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <EmptyState
            title="Qonun hujjati topilmadi"
            description="Kiritilgan so‘rov bo‘yicha hujjat topilmadi. Qidiruvni tozalang."
            actionLabel="Qidiruvni tozalash"
            onAction={() => setSearch('')}
          />
        )}
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
  banner: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 20,
    ...SHADOWS.md,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    gap: 6,
    marginBottom: 12,
  },
  bannerBadgeText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 640,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 600,
    height: 46,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.creamDark,
    padding: 14,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    gap: 12,
    marginBottom: 20,
  },
  disclaimerText: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  tabBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  docsList: {
    gap: 16,
  },
  docCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  docTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  docTypeText: {
    color: COLORS.navy,
    fontSize: 10,
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '700',
  },
  docTitle: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  docNumber: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  docDate: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  docSummary: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  docFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cream,
    flexWrap: 'wrap',
    gap: 8,
  },
  verifiedDate: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  openLexBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  openLexBtnText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
  },
});
