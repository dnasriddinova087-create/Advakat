// Responsive Header Component with Navigation, Language Switcher, Role Switcher, and Mobile Drawer
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { 
  Scale, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  Landmark, 
  QrCode, 
  LogOut,
  CalendarDays
} from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { useResponsive } from '../hooks/useResponsive';
import { Language } from '../types';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLanguage, t } = useLanguage();
  const { user, logout, switchDemoRole } = useAuth();
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks = [
    { label: t.navHome, route: '/' },
    { label: t.navServices, route: '/services' },
    { label: t.navLawyers, route: '/lawyers' },
    { label: t.navConstitution, route: '/constitution' },
    { label: t.navLaws, route: '/laws' },
    { label: t.navQR, route: '/qr' },
  ];

  const handleNav = (route: string) => {
    setMobileMenuOpen(false);
    router.push(route as any);
  };

  const handleLanguageSelect = (l: Language) => {
    setLanguage(l);
    setLangMenuOpen(false);
  };

  const handleRoleSelect = (role: 'client' | 'lawyer' | 'admin' | 'guest') => {
    switchDemoRole(role);
    setRoleMenuOpen(false);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <TouchableOpacity 
          style={styles.logoRow} 
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <View style={styles.logoIconBox}>
            <Scale size={22} color={COLORS.navy} strokeWidth={2.2} />
          </View>
          <View>
            <View style={styles.brandRow}>
              <Text style={styles.logoTextMain}>Advo</Text>
              <Text style={styles.logoTextGold}>Care</Text>
            </View>
            <Text style={styles.logoTagline}>UZBEKISTAN</Text>
          </View>
        </TouchableOpacity>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <View style={styles.desktopNav}>
            {navLinks.map((item) => {
              const isActive = pathname === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  style={[styles.navLink, isActive && styles.navLinkActive]}
                  onPress={() => handleNav(item.route)}
                >
                  <Text style={[styles.navLinkText, isActive && styles.navLinkTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Action Controls */}
        <View style={styles.actionRow}>
          {/* Language Switcher */}
          <View style={styles.relativeBox}>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe size={18} color={COLORS.gold} />
              <Text style={styles.langLabel}>{lang.toUpperCase()}</Text>
            </TouchableOpacity>

            {langMenuOpen && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleLanguageSelect('uz')}
                >
                  <Text style={[styles.dropdownItemText, lang === 'uz' && styles.textGold]}>O‘zbekcha</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleLanguageSelect('ru')}
                >
                  <Text style={[styles.dropdownItemText, lang === 'ru' && styles.textGold]}>Русский</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleLanguageSelect('en')}
                >
                  <Text style={[styles.dropdownItemText, lang === 'en' && styles.textGold]}>English</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Role Quick Switcher Badge (for live pairing & testing) */}
          <View style={styles.relativeBox}>
            <TouchableOpacity 
              style={styles.roleBadge}
              onPress={() => setRoleMenuOpen(!roleMenuOpen)}
            >
              <ShieldCheck size={14} color={COLORS.gold} />
              <Text style={styles.roleBadgeText}>
                {user ? user.role.toUpperCase() : 'MEHMON'}
              </Text>
            </TouchableOpacity>

            {roleMenuOpen && (
              <View style={[styles.dropdownMenu, { right: 0, minWidth: 160 }]}>
                <Text style={styles.dropdownHeader}>Rolni almashtirish:</Text>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleRoleSelect('client')}
                >
                  <Text style={styles.dropdownItemText}>👤 Mijoz (Client)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleRoleSelect('lawyer')}
                >
                  <Text style={styles.dropdownItemText}>⚖️ Advokat (Lawyer)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleRoleSelect('admin')}
                >
                  <Text style={styles.dropdownItemText}>🛡️ Admin (Admin)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => handleRoleSelect('guest')}
                >
                  <Text style={styles.dropdownItemText}>🚪 Mehmon (Guest)</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* User Auth Buttons / Dashboard */}
          {!isMobile && (
            user ? (
              <View style={styles.authRow}>
                {user.role === 'admin' ? (
                  <TouchableOpacity 
                    style={styles.dashboardBtn}
                    onPress={() => router.push('/admin')}
                  >
                    <Text style={styles.dashboardBtnText}>{t.navAdmin}</Text>
                  </TouchableOpacity>
                ) : user.role === 'lawyer' ? (
                  <TouchableOpacity 
                    style={styles.dashboardBtn}
                    onPress={() => router.push('/dashboard/lawyer')}
                  >
                    <Text style={styles.dashboardBtnText}>{t.navDashboard}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.dashboardBtn}
                    onPress={() => router.push('/dashboard/client')}
                  >
                    <CalendarDays size={16} color={COLORS.navy} />
                    <Text style={styles.dashboardBtnText}>{t.navDashboard}</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.logoutBtn}
                  onPress={logout}
                >
                  <LogOut size={16} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.authRow}>
                <TouchableOpacity 
                  style={styles.loginBtn}
                  onPress={() => router.push('/login')}
                >
                  <Text style={styles.loginBtnText}>{t.navLogin}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.registerBtn}
                  onPress={() => router.push('/register')}
                >
                  <Text style={styles.registerBtnText}>{t.navRegister}</Text>
                </TouchableOpacity>
              </View>
            )
          )}

          {/* Mobile Menu Hamburger */}
          {isMobile && (
            <TouchableOpacity 
              style={styles.mobileToggleBtn}
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} color={COLORS.white} />
              ) : (
                <Menu size={24} color={COLORS.white} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mobile Menu Dropdown Drawer */}
      {isMobile && mobileMenuOpen && (
        <View style={styles.mobileDrawer}>
          {navLinks.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.mobileDrawerItem}
              onPress={() => handleNav(item.route)}
            >
              <Text style={styles.mobileDrawerItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.mobileDrawerDivider} />

          {user ? (
            <View>
              <Text style={styles.mobileUserGreeting}>
                Foydalanuvchi: <Text style={{ color: COLORS.gold }}>{user.full_name}</Text>
              </Text>
              {user.role === 'admin' ? (
                <TouchableOpacity 
                  style={styles.mobileActionBtn}
                  onPress={() => handleNav('/admin')}
                >
                  <Text style={styles.mobileActionBtnText}>{t.navAdmin}</Text>
                </TouchableOpacity>
              ) : user.role === 'lawyer' ? (
                <TouchableOpacity 
                  style={styles.mobileActionBtn}
                  onPress={() => handleNav('/dashboard/lawyer')}
                >
                  <Text style={styles.mobileActionBtnText}>{t.navDashboard}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.mobileActionBtn}
                  onPress={() => handleNav('/dashboard/client')}
                >
                  <Text style={styles.mobileActionBtnText}>{t.navDashboard}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={[styles.mobileActionBtn, { backgroundColor: COLORS.navyLight, marginTop: 8 }]}
                onPress={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.mobileActionBtnText, { color: COLORS.danger }]}>{t.navLogout}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mobileAuthRow}>
              <TouchableOpacity 
                style={[styles.mobileActionBtn, { flex: 1, marginRight: 8, backgroundColor: COLORS.navyLight }]}
                onPress={() => handleNav('/login')}
              >
                <Text style={styles.mobileActionBtnText}>{t.navLogin}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.mobileActionBtn, { flex: 1, backgroundColor: COLORS.gold }]}
                onPress={() => handleNav('/register')}
              >
                <Text style={[styles.mobileActionBtnText, { color: COLORS.navy }]}>{t.navRegister}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.navy,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
    zIndex: 100,
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextMain: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoTextGold: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoTagline: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    marginHorizontal: 2,
  },
  navLinkActive: {
    backgroundColor: COLORS.navyLight,
  },
  navLinkText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.85,
  },
  navLinkTextActive: {
    color: COLORS.gold,
    fontWeight: '700',
    opacity: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  relativeBox: {
    position: 'relative',
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navyLight,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  langLabel: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navyLight,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
  },
  roleBadgeText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 38,
    right: 0,
    backgroundColor: COLORS.navyLight,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: RADIUS.md,
    padding: 6,
    minWidth: 120,
    ...SHADOWS.lg,
    zIndex: 999,
  },
  dropdownHeader: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: 'uppercase',
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  dropdownItemText: {
    color: COLORS.white,
    fontSize: 13,
  },
  textGold: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  authRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
    gap: 8,
  },
  loginBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  registerBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
  },
  registerBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  dashboardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  dashboardBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  logoutBtn: {
    padding: 7,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.navyLight,
  },
  mobileToggleBtn: {
    padding: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navyLight,
  },
  mobileDrawer: {
    backgroundColor: COLORS.navyDark,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  mobileDrawerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.navyLight,
  },
  mobileDrawerItemText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  mobileDrawerDivider: {
    height: 12,
  },
  mobileUserGreeting: {
    color: COLORS.white,
    fontSize: 13,
    marginBottom: 10,
  },
  mobileActionBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  mobileActionBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  mobileAuthRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
