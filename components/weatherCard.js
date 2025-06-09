import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const WeatherCard = ({
  weather,
  loading,
  error,
  showDetails,
  toggleDetails,
}) => {
  
  // Daha Fazla butonuna basıldığında animasyon ve toggle işlemi
  const onTogglePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleDetails();
  };

  return (
    <View style={styles.infoBox}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Text style={styles.city}>⚲ Bursa</Text>
          <Text style={styles.temp}>{weather.main.temp.toFixed(1)}°C</Text>
          <Text style={styles.detail}>Nem: {weather.main.humidity}%</Text>
          <Text style={styles.detail}>Rüzgar: {weather.wind.speed} m/s</Text>

          <TouchableOpacity
            style={styles.moreContainer}
            onPress={onTogglePress}
            activeOpacity={0.7}
          >
            <Text style={styles.moreText}>Daha Fazla</Text>
            <Ionicons
              name={showDetails ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.forecastContainer}>
              <Text style={styles.subHeader}>Bugünün Saatlik Tahminleri</Text>
              {weather.forecast.list
                .filter(
                  (item) =>
                    new Date(item.dt_txt).getDate() === new Date().getDate()
                )
                .map((item, index) => (
                  <Text key={index} style={styles.forecastItem}>
                    {item.dt_txt.split(' ')[1].slice(0, 5)} -{' '}
                    {item.main.temp.toFixed(1)}°C, {item.weather[0].description}
                  </Text>
                ))}

              <Text style={[styles.subHeader, { marginTop: 10 }]}>Yarın</Text>
              {weather.forecast.list
                .filter(
                  (item) =>
                    new Date(item.dt_txt).getDate() === new Date().getDate() + 1
                )
                .slice(0, 4)
                .map((item, index) => (
                  <Text key={index} style={styles.forecastItem}>
                    {item.dt_txt.split(' ')[1].slice(0, 5)} -{' '}
                    {item.main.temp.toFixed(1)}°C, {item.weather[0].description}
                  </Text>
                ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    overflow: 'hidden',
  },
  city: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  temp: {
    fontSize: 60,
    color: '#fff',
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    color: '#eee',
    marginTop: 5,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  error: {
    color: '#ffdddd',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  moreContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
    height: 40,
  },
  moreText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
    fontWeight: '600',
  },
  forecastContainer: {
    marginTop: 15,
    width: '100%',
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastItem: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 3,
  },
});

export default WeatherCard;
