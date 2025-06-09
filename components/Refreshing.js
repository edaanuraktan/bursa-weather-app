import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Refreshing = ({ onRefresh, isRefreshing }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateRefreshIcon = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    animateRefreshIcon();
    if (onRefresh) onRefresh();
  };

  useEffect(() => {
    if (isRefreshing) {
      animateRefreshIcon();
    }
  }, [isRefreshing]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 10 }}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Ionicons name="refresh" size={28} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Refreshing;
