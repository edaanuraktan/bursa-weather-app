import React, { useEffect, useState, useRef } from 'react';
import {
  View, StyleSheet, Animated, ScrollView, RefreshControl
} from 'react-native';
import { fetchWeather } from '../utils/fetchWeather';
import WeatherCard from '../components/weatherCard';
import Refreshing from '../components/Refreshing';
import { useBackgroundImages } from '../components/bgAnimation';

const HomeScreen = () => {
  const { currentImage, nextImage, opacityA, opacityB } = useBackgroundImages();

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const animatedHeight = useRef(new Animated.Value(250)).current;

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
    Animated.timing(animatedHeight, {
      toValue: showDetails ? 250 : 550,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const getWeather = async () => {
    if (!refreshing) setLoading(true);
    try {
      const data = await fetchWeather();
      setTimeout(() => {
        setWeather(data);
        setError(null);
        setLoading(false);
        setRefreshing(false);
      }, 500);
    } catch (err) {
      setTimeout(() => {
        setError('Veri alınamadı. Lütfen tekrar deneyin.');
        setLoading(false);
        setRefreshing(false);
      }, 2000);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getWeather();
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(getWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.background}>
      <Animated.Image source={currentImage} style={[styles.fullImage, { opacity: opacityA }]} />
      <Animated.Image source={nextImage} style={[styles.fullImage, { opacity: opacityB }]} />

      <View style={styles.overlay} />

      <View style={styles.topRightButton}>
        <Refreshing onRefresh={onRefresh} isRefreshing={refreshing} />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <WeatherCard
            weather={weather}
            loading={loading}
            error={error}
            showDetails={showDetails}
            toggleDetails={toggleDetails}
            animatedHeight={animatedHeight}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topRightButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 100,
  },
});

export default HomeScreen;
