// Search Bar Component with Keyword Input and Region Filter
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { UZBEKISTAN_REGIONS } from '../lib/constants';
import { useLanguage } from '../hooks/useLanguage';

interface SearchBarProps {
  initialQuery?: string;
  initialRegion?: string;
  onSearch: (query: string, region: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  initialQuery = '',
  initialRegion = 'Barcha hududlar',
  onSearch,
  placeholder,
}: SearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [showRegions, setShowRegions] = useState(false);

  const handleSearch = () => {
    onSearch(query, region);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        {/* Keyword Input */}
        <View style={styles.inputGroup}>
          <Search size={18} color={COLORS.gold} />
          <TextInput
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder || t.searchPlaceholder}
            placeholderTextColor={COLORS.textMuted}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* Region Selector Button */}
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.regionBtn}
          onPress={() => setShowRegions(!showRegions)}
        >
          <MapPin size={18} color={COLORS.gold} />
          <Text style={styles.regionBtnText} numberOfLines={1}>
            {region}
          </Text>
        </TouchableOpacity>

        {/* Search Submit Button */}
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>{t.searchBtn}</Text>
        </TouchableOpacity>
      </View>

      {/* Region Dropdown List */}
      {showRegions && (
        <View style={styles.regionDropdown}>
          {UZBEKISTAN_REGIONS.map((reg) => (
            <TouchableOpacity
              key={reg}
              style={[
                styles.regionItem,
                region === reg && styles.regionItemActive,
              ]}
              onPress={() => {
                setRegion(reg);
                setShowRegions(false);
                onSearch(query, reg);
              }}
            >
              <Text
                style={[
                  styles.regionItemText,
                  region === reg && styles.regionItemTextActive,
                ]}
              >
                {reg}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 50,
  },
  searchCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    ...SHADOWS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexWrap: 'wrap',
  },
  inputGroup: {
    flex: 2,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    color: COLORS.text,
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  regionBtn: {
    flex: 1.2,
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  regionBtnText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  searchBtn: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  regionDropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 240,
    ...SHADOWS.lg,
    zIndex: 100,
    padding: 6,
    overflow: 'scroll' as any,
  },
  regionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.sm,
  },
  regionItemActive: {
    backgroundColor: COLORS.cream,
  },
  regionItemText: {
    color: COLORS.text,
    fontSize: 13,
  },
  regionItemTextActive: {
    color: COLORS.goldDark,
    fontWeight: '700',
  },
});
