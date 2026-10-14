// AdvoCare Home Page Component
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Scale, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Landmark, 
  ArrowRight, 
  Users, 
  Clock, 
  Lock, 
  CheckCircle2, 
  HelpCircle,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import SearchBar from '../components/SearchBar';
import LawyerCard from '../components/LawyerCard';
import ServiceCard from '../components/ServiceCard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { useResponsive } from '../hooks/useResponsive';
import { INITIAL_CATEGORIES, INITIAL_LAWYERS, INITIAL_REVIEWS } from '../lib/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isMobile } = useResponsive();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearch = (query: string, region: string) => {
    let url = '/lawyers?';
    if (query) url += `search=${encodeURIComponent(query)}&`;
    if (region && region !== 'Barcha hududlar') url += `region=${encodeURIComponent(region)}&`;
    router.push(url as any);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <ResponsiveLayout>
      {/* 1. HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          {/* Badge */}
          <View style={styles.heroBadge}>
            <Scale size={14} color={COLORS.gold} />
            <Text style={styles.heroBadgeText}>O‘ZBEKISTON YURIDIK XIZMATLAR PORTALI</Text>
          </View>

          {/* Title */}
          <Text style={styles.heroTitle}>
            {t.heroTitle}
          </Text>

          {/* Subtitle */}
          <Text style={styles.heroSubtitle}>
            {t.heroSubtitle}
          </Text>

          {/* Search Box */}
          <View style={styles.searchWrapper}>
            <SearchBar onSearch={handleSearch} />
          </View>

          {/* Quick Action CTA Buttons */}
          <View style={styles.heroActionsRow}>
            <TouchableOpacity 
              style={styles.heroPrimaryBtn}
              onPress={() => router.push('/lawyers')}
            >
              <Text style={styles.heroPrimaryBtnText}>{t.findLawyer}</Text>
              <ArrowRight size={16} color={COLORS.navy} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.heroSecondaryBtn}
              onPress={() => router.push('/appointments/book')}
            >
              <Text style={styles.heroSecondaryBtnText}>{t.getConsultation}</Text>
            </TouchableOpacity>
          </View>

          {/* Trust Metrics */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1 200+</Text>
              <Text style={styles.statLabel}>Litsenziyali advokat</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>26 ta</Text>
              <Text style={styles.statLabel}>Huquqiy yo‘nalish</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99.4%</Text>
              <Text style={styles.statLabel}>Mijozlar roziligi</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. POPULAR SERVICES CATALOG */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionPreTitle}>AMALIY HUQUQIY KATALOG</Text>
            <Text style={styles.sectionTitle}>{t.servicesTitle}</Text>
            <Text style={styles.sectionSubtitle}>{t.servicesSubtitle}</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => router.push('/services')}
          >
            <Text style={styles.viewAllBtnText}>Barcha 26 yo‘nalish</Text>
            <ArrowRight size={14} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {INITIAL_CATEGORIES.slice(0, 6).map((cat) => (
            <ServiceCard key={cat.id} category={cat} />
          ))}
        </View>
      </View>

      {/* 3. FEATURED LAWYERS SECTION */}
      <View style={[styles.sectionContainer, { backgroundColor: COLORS.white }]}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionPreTitle}>IShonchli HIMOYaCHILAR</Text>
            <Text style={styles.sectionTitle}>{t.lawyersTitle}</Text>
            <Text style={styles.sectionSubtitle}>{t.lawyersSubtitle}</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllBtn}
            onPress={() => router.push('/lawyers')}
          >
            <Text style={styles.viewAllBtnText}>Barcha advokatlar</Text>
            <ArrowRight size={14} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {INITIAL_LAWYERS.slice(0, 3).map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </View>
      </View>

      {/* 4. HOW IT WORKS SECTION */}
      <View style={styles.sectionContainer}>
        <View style={styles.centeredHeader}>
          <Text style={styles.sectionPreTitle}>ODDIY VA ISHONCHLI</Text>
          <Text style={styles.sectionTitle}>{t.howItWorksTitle}</Text>
          <Text style={styles.sectionSubtitle}>{t.howItWorksSubtitle}</Text>
        </View>

        <View style={styles.stepsRow}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>01</Text>
            </View>
            <Text style={styles.stepCardTitle}>{t.howStep1Title}</Text>
            <Text style={styles.stepCardDesc}>{t.howStep1Desc}</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>02</Text>
            </View>
            <Text style={styles.stepCardTitle}>{t.howStep2Title}</Text>
            <Text style={styles.stepCardDesc}>{t.howStep2Desc}</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>03</Text>
            </View>
            <Text style={styles.stepCardTitle}>{t.howStep3Title}</Text>
            <Text style={styles.stepCardDesc}>{t.howStep3Desc}</Text>
          </View>
        </View>
      </View>

      {/* 5. CONSTITUTION & LEGISLATION DUAL BANNER */}
      <View style={styles.interactiveBannerSection}>
        {/* Constitution Box */}
        <View style={styles.bannerBox}>
          <View style={styles.bannerIconBox}>
            <BookOpen size={28} color={COLORS.gold} />
          </View>
          <Text style={styles.bannerTitle}>{t.constitutionSectionTitle}</Text>
          <Text style={styles.bannerDesc}>{t.constitutionSectionDesc}</Text>
          <TouchableOpacity 
            style={styles.bannerActionBtn}
            onPress={() => router.push('/constitution')}
          >
            <Text style={styles.bannerActionBtnText}>{t.readConstitution}</Text>
            <ArrowRight size={14} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Laws Box */}
        <View style={[styles.bannerBox, { backgroundColor: COLORS.navyLight }]}>
          <View style={styles.bannerIconBox}>
            <Landmark size={28} color={COLORS.gold} />
          </View>
          <Text style={styles.bannerTitle}>{t.lawsSectionTitle}</Text>
          <Text style={styles.bannerDesc}>{t.lawsSectionDesc}</Text>
          <TouchableOpacity 
            style={styles.bannerActionBtn}
            onPress={() => router.push('/laws')}
          >
            <Text style={styles.bannerActionBtnText}>{t.viewLaws}</Text>
            <ArrowRight size={14} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 6. ADVANTAGES SECTION */}
      <View style={[styles.sectionContainer, { backgroundColor: COLORS.white }]}>
        <View style={styles.centeredHeader}>
          <Text style={styles.sectionPreTitle}>KAFOLATLANGAN SIFAT</Text>
          <Text style={styles.sectionTitle}>{t.advantagesTitle}</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.advCard}>
            <ShieldCheck size={28} color={COLORS.gold} />
            <Text style={styles.advTitle}>{t.adv1Title}</Text>
            <Text style={styles.advDesc}>{t.adv1Desc}</Text>
          </View>
          <View style={styles.advCard}>
            <Lock size={28} color={COLORS.gold} />
            <Text style={styles.advTitle}>{t.adv2Title}</Text>
            <Text style={styles.advDesc}>{t.adv2Desc}</Text>
          </View>
          <View style={styles.advCard}>
            <CheckCircle2 size={28} color={COLORS.gold} />
            <Text style={styles.advTitle}>{t.adv3Title}</Text>
            <Text style={styles.advDesc}>{t.adv3Desc}</Text>
          </View>
          <View style={styles.advCard}>
            <Clock size={28} color={COLORS.gold} />
            <Text style={styles.advTitle}>{t.adv4Title}</Text>
            <Text style={styles.advDesc}>{t.adv4Desc}</Text>
          </View>
        </View>
      </View>

      {/* 7. CLIENT REVIEWS SECTION */}
      <View style={styles.sectionContainer}>
        <View style={styles.centeredHeader}>
          <Text style={styles.sectionPreTitle}>HAQIQIY NATIJALAR</Text>
          <Text style={styles.sectionTitle}>{t.reviewsTitle}</Text>
        </View>

        <View style={styles.gridContainer}>
          {INITIAL_REVIEWS.map((rev) => (
            <View key={rev.id} style={styles.reviewCard}>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} color={COLORS.gold} fill={COLORS.gold} />
                ))}
              </View>
              <Text style={styles.reviewComment}>"{rev.comment}"</Text>
              <Text style={styles.reviewAuthor}>{rev.client_name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 8. FAQ ACCORDION SECTION */}
      <View style={[styles.sectionContainer, { backgroundColor: COLORS.white }]}>
        <View style={styles.centeredHeader}>
          <HelpCircle size={28} color={COLORS.gold} />
          <Text style={styles.sectionTitle}>{t.faqTitle}</Text>
        </View>

        <View style={styles.faqList}>
          {[
            { q: t.faq1Q, a: t.faq1A },
            { q: t.faq2Q, a: t.faq2A },
            { q: t.faq3Q, a: t.faq3A },
            { q: t.faq4Q, a: t.faq4A },
          ].map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <View key={idx} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestionRow}
                  onPress={() => toggleFaq(idx)}
                >
                  <Text style={styles.faqQuestionText}>{item.q}</Text>
                  {isOpen ? (
                    <ChevronUp size={18} color={COLORS.gold} />
                  ) : (
                    <ChevronDown size={18} color={COLORS.navy} />
                  )}
                </TouchableOpacity>
                {isOpen && (
                  <View style={styles.faqAnswerBox}>
                    <Text style={styles.faqAnswerText}>{item.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: COLORS.navy,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl + 16,
    paddingHorizontal: SPACING.md,
  },
  heroContent: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginBottom: 20,
    gap: 8,
  },
  heroBadgeText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 720,
    marginBottom: 28,
  },
  searchWrapper: {
    width: '100%',
    maxWidth: 820,
    marginBottom: 24,
  },
  heroActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 36,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  heroPrimaryBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  heroSecondaryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.navyLight,
  },
  heroSecondaryBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    flexWrap: 'wrap',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.borderDark,
  },
  sectionContainer: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.md,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  centeredHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  sectionPreTitle: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cream,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
  },
  viewAllBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  stepsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  stepCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    minWidth: 260,
    maxWidth: 360,
  },
  stepNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  stepCardTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  stepCardDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  interactiveBannerSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
  },
  bannerBox: {
    flex: 1,
    minWidth: 300,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    ...SHADOWS.lg,
  },
  bannerIconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  bannerDesc: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },
  bannerActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  bannerActionBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  advCard: {
    flex: 1,
    minWidth: 240,
    maxWidth: 280,
    padding: SPACING.md,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.lg,
    alignItems: 'flex-start',
  },
  advTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  advDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  reviewCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 380,
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 10,
  },
  reviewComment: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  reviewAuthor: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  faqList: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 14,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    paddingRight: 10,
  },
  faqAnswerBox: {
    marginTop: 10,
  },
  faqAnswerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
