// Legal Service Category Card with Lucide Icons and Navigation
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Scale, 
  ShieldAlert, 
  Users, 
  Briefcase, 
  Home, 
  FileText, 
  Building2, 
  Receipt, 
  Landmark, 
  Globe, 
  Plane, 
  ShoppingBag, 
  ShieldCheck, 
  Lightbulb, 
  Code, 
  Gavel, 
  TrendingUp, 
  Map, 
  Award, 
  BookOpen, 
  DollarSign, 
  Activity, 
  HardHat, 
  Video, 
  Car,
  ChevronRight 
} from 'lucide-react-native';
import { LegalCategory } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

interface ServiceCardProps {
  category: LegalCategory;
}

// Icon mapping function with fallback
function getCategoryIcon(iconName: string, size = 24, color = COLORS.navy) {
  switch (iconName) {
    case 'Scale': return <Scale size={size} color={color} strokeWidth={1.8} />;
    case 'ShieldAlert': return <ShieldAlert size={size} color={color} strokeWidth={1.8} />;
    case 'Users': return <Users size={size} color={color} strokeWidth={1.8} />;
    case 'Briefcase': return <Briefcase size={size} color={color} strokeWidth={1.8} />;
    case 'Home': return <Home size={size} color={color} strokeWidth={1.8} />;
    case 'FileText': return <FileText size={size} color={color} strokeWidth={1.8} />;
    case 'Building2': return <Building2 size={size} color={color} strokeWidth={1.8} />;
    case 'Receipt': return <Receipt size={size} color={color} strokeWidth={1.8} />;
    case 'Landmark': return <Landmark size={size} color={color} strokeWidth={1.8} />;
    case 'Globe': return <Globe size={size} color={color} strokeWidth={1.8} />;
    case 'Plane': return <Plane size={size} color={color} strokeWidth={1.8} />;
    case 'ShoppingBag': return <ShoppingBag size={size} color={color} strokeWidth={1.8} />;
    case 'ShieldCheck': return <ShieldCheck size={size} color={color} strokeWidth={1.8} />;
    case 'Lightbulb': return <Lightbulb size={size} color={color} strokeWidth={1.8} />;
    case 'Code': return <Code size={size} color={color} strokeWidth={1.8} />;
    case 'Gavel': return <Gavel size={size} color={color} strokeWidth={1.8} />;
    case 'TrendingUp': return <TrendingUp size={size} color={color} strokeWidth={1.8} />;
    case 'Map': return <Map size={size} color={color} strokeWidth={1.8} />;
    case 'Award': return <Award size={size} color={color} strokeWidth={1.8} />;
    case 'BookOpen': return <BookOpen size={size} color={color} strokeWidth={1.8} />;
    case 'DollarSign': return <DollarSign size={size} color={color} strokeWidth={1.8} />;
    case 'Activity': return <Activity size={size} color={color} strokeWidth={1.8} />;
    case 'HardHat': return <HardHat size={size} color={color} strokeWidth={1.8} />;
    case 'Video': return <Video size={size} color={color} strokeWidth={1.8} />;
    case 'Car': return <Car size={size} color={color} strokeWidth={1.8} />;
    default: return <Scale size={size} color={color} strokeWidth={1.8} />;
  }
}

export default function ServiceCard({ category }: ServiceCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/lawyers?category=${encodeURIComponent(category.title)}`)}
    >
      <View style={styles.iconBox}>
        {getCategoryIcon(category.icon_name, 26, COLORS.navy)}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {category.title}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {category.description}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.countText}>{category.service_count} ta xizmat</Text>
        <View style={styles.arrowBox}>
          <ChevronRight size={14} color={COLORS.navy} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    minWidth: 260,
    maxWidth: 380,
    marginBottom: SPACING.md,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.cream,
  },
  countText: {
    color: COLORS.goldDark,
    fontSize: 12,
    fontWeight: '600',
  },
  arrowBox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
