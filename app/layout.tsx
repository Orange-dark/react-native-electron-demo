import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', // 深蓝色背景
    padding: 20,
  },
  contentContainer:{
    
  }
});