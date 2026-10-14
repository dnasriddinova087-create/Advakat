import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../hooks/useAuth';
import { LanguageProvider } from '../hooks/useLanguage';
import { COLORS } from '../styles/theme';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.cream },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="services" />
          <Stack.Screen name="lawyers" />
          <Stack.Screen name="lawyers/[id]" />
          <Stack.Screen name="appointments/index" />
          <Stack.Screen name="appointments/book" />
          <Stack.Screen name="constitution/index" />
          <Stack.Screen name="constitution/chapters" />
          <Stack.Screen name="constitution/articles/[id]" />
          <Stack.Screen name="laws/index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="dashboard/client" />
          <Stack.Screen name="dashboard/lawyer" />
          <Stack.Screen name="dashboard/lawyer-profile-setup" />
          <Stack.Screen name="admin/index" />
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="qr" />
        </Stack>
      </AuthProvider>
    </LanguageProvider>
  );
}
