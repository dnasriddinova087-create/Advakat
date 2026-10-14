// Responsive screen hook for Mobile, Tablet, and Desktop adaptations
import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const maxContentWidth = 1200;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    maxContentWidth,
  };
}
