import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';

const images = [
  require('../assets/bursa-bg/bursa-1.jpg'),
  require('../assets/bursa-bg/bursa-2.jpg'),
  require('../assets/bursa-bg/bursa-3.jpg'),
  require('../assets/bursa-bg/bursa-4.jpg'),
  require('../assets/bursa-bg/bursa-5.jpg'),
  require('../assets/bursa-bg/bursa-6.jpg'),
  require('../assets/bursa-bg/bursa-7.jpg'),
];

const imageCount = images.length;
const imageChangeInterval = 10000;

export function useBackgroundImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImage, setVisibleImage] = useState(true);

  const opacityA = useRef(new Animated.Value(1)).current;
  const opacityB = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imageCount;

      if (visibleImage) {
        opacityB.setValue(0);
        Animated.parallel([
          Animated.timing(opacityA, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityB, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentIndex(nextIndex);
          setVisibleImage(false);
        });
      } else {
        opacityA.setValue(0);
        Animated.parallel([
          Animated.timing(opacityB, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityA, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentIndex(nextIndex);
          setVisibleImage(true);
        });
      }
    }, imageChangeInterval);

    return () => clearInterval(interval);
  }, [currentIndex, visibleImage, opacityA, opacityB]);

  const currentImage = visibleImage ? images[currentIndex] : images[(currentIndex + 1) % imageCount];
  const nextImage = visibleImage ? images[(currentIndex + 1) % imageCount] : images[currentIndex];

  return {
    currentImage,
    nextImage,
    opacityA,
    opacityB,
  };
}
