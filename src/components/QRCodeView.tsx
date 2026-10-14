// QR Code View Component using qrcode library for cross-platform rendering
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'qrcode';
import { COLORS, RADIUS } from '../styles/theme';

interface QRCodeViewProps {
  value: string;
  size?: number;
  label?: string;
}

export default function QRCodeView({ value, size = 200, label }: QRCodeViewProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      value,
      {
        width: size,
        margin: 2,
        color: {
          dark: '#0B1424',
          light: '#FFFFFF',
        },
      },
      (err, url) => {
        if (!isMounted) return;
        if (err) {
          setError('QR kod yaratishda xatolik');
        } else {
          setDataUrl(url);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [value, size]);

  if (error) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!dataUrl) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <ActivityIndicator size="small" color={COLORS.gold} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.imageBox, { width: size + 16, height: size + 16 }]}>
        <Image source={{ uri: dataUrl }} style={{ width: size, height: size }} />
      </View>
      {label && <Text style={styles.labelText}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
  },
  imageBox: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  labelText: {
    marginTop: 8,
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
  },
});
