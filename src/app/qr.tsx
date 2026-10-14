// Mobile Testing & QR Code Hub: Expo Go Development QR vs Vercel Production QR
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { 
  QrCode, 
  Smartphone, 
  Globe, 
  Terminal, 
  Info, 
  CheckCircle2, 
  Copy,
  ExternalLink 
} from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import QRCodeView from '../components/QRCodeView';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function QRScreen() {
  const [activeTab, setActiveTab] = useState<'dev' | 'prod'>('dev');
  const [devIp, setDevIp] = useState('192.168.1.100');
  const [devPort, setDevPort] = useState('8081');
  const [prodUrl, setProdUrl] = useState(
    process.env.EXPO_PUBLIC_VERCEL_URL || 'https://advocare-uz.vercel.app'
  );
  const [copied, setCopied] = useState(false);

  // Expo Go scheme format: exp://<host>:<port>
  const expoGoUrl = `exp://${devIp}:${devPort}`;

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.badge}>
            <QrCode size={14} color={COLORS.navy} />
            <Text style={styles.badgeText}>MOBIL QURILMALARDA ISHGA TUSHIRISH</Text>
          </View>
          <Text style={styles.bannerTitle}>Expo Go va Production Web QR-kodlari</Text>
          <Text style={styles.bannerSubtitle}>
            Mobil telefon kamerasi yoki Expo Go ilovasi orqali skanerlang va loyihani to‘g‘ridan-to‘g‘ri telefoningizda oching.
          </Text>

          {/* Tab Switcher */}
          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'dev' && styles.tabBtnActive]}
              onPress={() => setActiveTab('dev')}
            >
              <Smartphone size={16} color={activeTab === 'dev' ? COLORS.navy : COLORS.white} />
              <Text style={[styles.tabBtnText, activeTab === 'dev' && styles.tabBtnTextActive]}>
                1. Development (Expo Go QR)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'prod' && styles.tabBtnActive]}
              onPress={() => setActiveTab('prod')}
            >
              <Globe size={16} color={activeTab === 'prod' ? COLORS.navy : COLORS.white} />
              <Text style={[styles.tabBtnText, activeTab === 'prod' && styles.tabBtnTextActive]}>
                2. Production (Vercel Web QR)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          {activeTab === 'dev' ? (
            <View style={styles.tabSection}>
              <View style={styles.tagRow}>
                <View style={[styles.statusTag, { backgroundColor: COLORS.warningLight }]}>
                  <Text style={[styles.statusTagText, { color: COLORS.warning }]}>
                    DEVELOPMENT MUHITI (LOKAL TEST)
                  </Text>
                </View>
              </View>

              <Text style={styles.cardHeading}>Expo Go orqali sinab ko‘rish</Text>
              <Text style={styles.cardDesc}>
                1. Kompyuter terminalida quyidagi buyruqni bering:{'\n'}
                <Text style={styles.codeText}>npx expo start</Text>{'\n'}
                2. Telefoningizda App Store yoki Google Play dan <Text style={{ fontWeight: '700' }}>Expo Go</Text> ilovasini oching.{'\n'}
                3. Quyidagi QR-kodni Expo Go orqali skanerlang.
              </Text>

              {/* QR Code Display */}
              <View style={styles.qrContainer}>
                <QRCodeView value={expoGoUrl} size={220} label={expoGoUrl} />
              </View>

              {/* IP / Port Configuration */}
              <View style={styles.configBox}>
                <Text style={styles.configTitle}>Lokal IP sozlamasi (agar LAN orqali ulansangiz):</Text>
                <View style={styles.ipRow}>
                  <TextInput
                    style={styles.ipInput}
                    value={devIp}
                    onChangeText={setDevIp}
                    placeholder="192.168.1.100"
                  />
                  <Text style={{ alignSelf: 'center', fontWeight: '800' }}>:</Text>
                  <TextInput
                    style={[styles.ipInput, { width: 80 }]}
                    value={devPort}
                    onChangeText={setDevPort}
                    placeholder="8081"
                  />
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => copyToClipboard(expoGoUrl)}
                  >
                    <Copy size={14} color={COLORS.navy} />
                    <Text style={styles.copyBtnText}>{copied ? 'Nusxa olindi!' : 'Nusxa'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.tabSection}>
              <View style={styles.tagRow}>
                <View style={[styles.statusTag, { backgroundColor: COLORS.successLight }]}>
                  <Text style={[styles.statusTagText, { color: COLORS.success }]}>
                    PRODUCTION MUHITI (INTERNET / VERCEL)
                  </Text>
                </View>
              </View>

              <Text style={styles.cardHeading}>Vercel Production Web QR-kodi</Text>
              <Text style={styles.cardDesc}>
                Ushbu QR-kod telefon brauzerida (Safari, Chrome) to‘g‘ridan-to‘g‘ri Vercel platformasidagi jonli veb-saytni ochadi. Expo Go ilovasi shart emas.
              </Text>

              {/* QR Code Display */}
              <View style={styles.qrContainer}>
                <QRCodeView value={prodUrl} size={220} label={prodUrl} />
              </View>

              <View style={styles.configBox}>
                <Text style={styles.configTitle}>Production Vercel URL:</Text>
                <View style={styles.ipRow}>
                  <TextInput
                    style={[styles.ipInput, { flex: 1 }]}
                    value={prodUrl}
                    onChangeText={setProdUrl}
                    placeholder="https://advocare-uz.vercel.app"
                  />
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => copyToClipboard(prodUrl)}
                  >
                    <Copy size={14} color={COLORS.navy} />
                    <Text style={styles.copyBtnText}>{copied ? 'Nusxa olindi!' : 'Nusxa'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Instructions Box */}
          <View style={styles.infoBox}>
            <Info size={18} color={COLORS.goldDark} />
            <Text style={styles.infoBoxText}>
              Eslatma: Mobil brauzerda loyiha to‘liq responsive interfeysda ishlaydi. Kompyuterda ochilganda esa kengaytirilgan yon panellar va navigatsiya namoyish etiladi.
            </Text>
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  banner: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    ...SHADOWS.md,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.navy,
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
    maxWidth: 600,
    marginBottom: 20,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.navyLight,
    padding: 4,
    borderRadius: RADIUS.md,
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  tabBtnActive: {
    backgroundColor: COLORS.gold,
  },
  tabBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  tabSection: {
    alignItems: 'center',
  },
  tagRow: {
    marginBottom: 12,
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardHeading: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 580,
    marginBottom: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    backgroundColor: COLORS.cream,
    fontWeight: '700',
    color: COLORS.navy,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  configBox: {
    backgroundColor: COLORS.cream,
    padding: 14,
    borderRadius: RADIUS.lg,
    width: '100%',
    maxWidth: 520,
    marginTop: 12,
  },
  configTitle: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  ipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ipInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    height: 38,
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  copyBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.creamDark,
    padding: 14,
    borderRadius: RADIUS.md,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    gap: 10,
    alignItems: 'center',
  },
  infoBoxText: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
