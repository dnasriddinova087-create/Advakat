// Responsive Footer Component with Lex.uz links and legal disclaimer
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Scale, ExternalLink, ShieldCheck, QrCode } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { OFFICIAL_LINKS } from '../lib/constants';

export default function Footer() {
  const router = useRouter();
  const { t } = useLanguage();

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        {/* Brand & Purpose */}
        <View style={styles.columnBrand}>
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Scale size={20} color={COLORS.navy} />
            </View>
            <Text style={styles.logoTextMain}>Advo<Text style={{ color: COLORS.gold }}>Care</Text></Text>
          </View>
          <Text style={styles.brandDesc}>
            O‘zbekiston Respublikasi fuqarolari va tadbirkorlari uchun yagona raqamli yuridik xizmatlar portali.
          </Text>
          <View style={styles.badgeRow}>
            <ShieldCheck size={16} color={COLORS.gold} />
            <Text style={styles.badgeText}>Advokatlik siri & RLS xavfsizligi</Text>
          </View>
        </View>

        {/* Practice Areas */}
        <View style={styles.column}>
          <Text style={styles.colTitle}>Huquqiy yo‘nalishlar</Text>
          <TouchableOpacity onPress={() => router.push('/lawyers?category=fuqarolik')}>
            <Text style={styles.colLink}>Fuqarolik ishlari</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/lawyers?category=jinoyat')}>
            <Text style={styles.colLink}>Jinoyat ishlari</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/lawyers?category=oila')}>
            <Text style={styles.colLink}>Oila huquqi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/lawyers?category=biznes')}>
            <Text style={styles.colLink}>Biznes va tadbirkorlik</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/services')}>
            <Text style={[styles.colLink, { color: COLORS.gold }]}>Barcha 26 yo‘nalish →</Text>
          </TouchableOpacity>
        </View>

        {/* Official Sources */}
        <View style={styles.column}>
          <Text style={styles.colTitle}>Rasmiy manbalar</Text>
          <TouchableOpacity 
            style={styles.externalLinkRow}
            onPress={() => openUrl(OFFICIAL_LINKS.constitutionLexUz)}
          >
            <Text style={styles.colLink}>Konstitutsiya (Lex.uz)</Text>
            <ExternalLink size={12} color={COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.externalLinkRow}
            onPress={() => openUrl(OFFICIAL_LINKS.lexUz)}
          >
            <Text style={styles.colLink}>Lex.uz Qonunchilik milliy bazasi</Text>
            <ExternalLink size={12} color={COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.externalLinkRow}
            onPress={() => openUrl(OFFICIAL_LINKS.advocatesChamber)}
          >
            <Text style={styles.colLink}>O‘zbekiston Advokatlar palatasi</Text>
            <ExternalLink size={12} color={COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.externalLinkRow}
            onPress={() => openUrl(OFFICIAL_LINKS.justiceMinistry)}
          >
            <Text style={styles.colLink}>Adliya vazirligi</Text>
            <ExternalLink size={12} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* Mobile App & Testing */}
        <View style={styles.column}>
          <Text style={styles.colTitle}>Mobil va Ishga tushirish</Text>
          <TouchableOpacity 
            style={styles.qrBtn}
            onPress={() => router.push('/qr')}
          >
            <QrCode size={18} color={COLORS.navy} />
            <Text style={styles.qrBtnText}>Expo Go va Web QR-kod</Text>
          </TouchableOpacity>
          <Text style={styles.mobileHelpText}>
            Telefon kamerasi orqali skanerlang va Expo Go da oching.
          </Text>
        </View>
      </View>

      {/* Legal Disclaimer Box */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          {t.disclaimerLegal}
        </Text>
      </View>

      {/* Copyright */}
      <View style={styles.copyrightRow}>
        <Text style={styles.copyrightText}>{t.footerCopyright}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: COLORS.navyDark,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  footerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    gap: 24,
  },
  columnBrand: {
    flex: 1,
    minWidth: 260,
  },
  column: {
    flex: 1,
    minWidth: 200,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoTextMain: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  brandDesc: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '600',
  },
  colTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
  colLink: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 10,
  },
  externalLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    gap: 8,
    marginBottom: 8,
  },
  qrBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  mobileHelpText: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  disclaimerBox: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    marginTop: 28,
    padding: 12,
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
  },
  disclaimerText: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  copyrightRow: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.navyLight,
    alignItems: 'center',
  },
  copyrightText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
