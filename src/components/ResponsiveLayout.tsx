// Responsive Layout Wrapper with Header, Content Container, and Footer
import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { COLORS } from '../styles/theme';
import { useResponsive } from '../hooks/useResponsive';

interface ResponsiveLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function ResponsiveLayout({
  children,
  showHeader = true,
  showFooter = true,
}: ResponsiveLayoutProps) {
  const { maxContentWidth } = useResponsive();

  return (
    <View style={styles.outerContainer}>
      {showHeader && <Header />}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainContent, { maxWidth: maxContentWidth }]}>
          {children}
        </View>
        {showFooter && <Footer />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  mainContent: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
});
