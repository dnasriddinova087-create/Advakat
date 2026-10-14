// Premium Lawyer Card Component with Verification Badge, Price, and Booking CTA
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Calendar,
  MessageCircle,
  Video
} from 'lucide-react-native';
import { LawyerProfile } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { formatMoney } from '../utils/formatters';
import { useLanguage } from '../hooks/useLanguage';

interface LawyerCardProps {
  lawyer: LawyerProfile;
  onBook?: () => void;
}

export default function LawyerCard({ lawyer, onBook }: LawyerCardProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBook = () => {
    if (onBook) {
      onBook();
    } else {
      router.push(`/appointments/book?lawyerId=${lawyer.id}`);
    }
  };

  return (
    <View style={styles.card}>
      {/* Top Header: Avatar & Main info */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: lawyer.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' }}
            style={styles.avatar}
          />
          {lawyer.is_online_available && (
            <View style={styles.onlineBadge}>
              <Video size={10} color={COLORS.white} />
            </View>
          )}
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText} numberOfLines={1}>
              {lawyer.full_name}
            </Text>
          </View>

          {/* Verification Badge */}
          {lawyer.is_verified ? (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={12} color={COLORS.navy} />
              <Text style={styles.verifiedText}>{t.verifiedBadge}</Text>
            </View>
          ) : (
            <View style={styles.unverifiedBadge}>
              <ShieldAlert size={12} color={COLORS.textMuted} />
              <Text style={styles.unverifiedText}>{t.notVerifiedBadge}</Text>
            </View>
          )}

          {/* Location & Experience */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MapPin size={13} color={COLORS.gold} />
              <Text style={styles.metaText} numberOfLines={1}>
                {lawyer.region}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Briefcase size={13} color={COLORS.gold} />
              <Text style={styles.metaText}>
                {lawyer.experience_years} {t.experienceYears}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Specializations Tags */}
      <View style={styles.tagsContainer}>
        {lawyer.specializations.slice(0, 3).map((spec, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{spec}</Text>
          </View>
        ))}
      </View>

      {/* Bio excerpt */}
      <Text style={styles.bioText} numberOfLines={2}>
        {lawyer.bio}
      </Text>

      {/* Divider */}
      <View style={styles.cardDivider} />

      {/* Bottom Footer: Price, Rating, and CTA Buttons */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>Konsultatsiya:</Text>
          <Text style={styles.priceValue}>{formatMoney(lawyer.consultation_price)}</Text>
        </View>

        <View style={styles.ratingBox}>
          <Star size={14} color={COLORS.gold} fill={COLORS.gold} />
          <Text style={styles.ratingVal}>{lawyer.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({lawyer.review_count})</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push(`/lawyers/${lawyer.id}`)}
        >
          <Text style={styles.profileBtnText}>Profilni ko‘rish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
          <Calendar size={14} color={COLORS.navy} />
          <Text style={styles.bookBtnText}>{t.bookAppointment}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    flex: 1,
    minWidth: 300,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: 6,
    gap: 4,
  },
  verifiedText: {
    color: COLORS.navy,
    fontSize: 10,
    fontWeight: '700',
  },
  unverifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: 6,
    gap: 4,
  },
  unverifiedText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  tagText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '600',
  },
  bioText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  priceLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  priceValue: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '800',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  ratingVal: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  ratingCount: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  profileBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  bookBtn: {
    flex: 1.2,
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bookBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
});
