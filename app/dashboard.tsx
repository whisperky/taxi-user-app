import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Define the City type
type City = {
  name: string;
  latitude: number;
  longitude: number;
};

// Define some European cities with their coordinates
const europeanCities: City[] = [
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Berlin", latitude: 52.52, longitude: 13.405 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
];

const Dashboard = () => {
  const [location, setLocation] = useState<City | null>(null);

  useEffect(() => {
    // Select a random European city
    const randomCity =
      europeanCities[Math.floor(Math.random() * europeanCities.length)];
    setLocation(randomCity);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
            />
          </MapView>
        ) : (
          <Text>Loading map...</Text>
        )}
      </View>
      {/* <View style={styles.infoContainer}>
        <Text style={styles.title}>Driver Dashboard</Text>
        <Text style={styles.info}>Status: Online</Text>
        <Text style={styles.info}>Trips Today: 5</Text>
        <Text style={styles.info}>Earnings Today: $120</Text>
        {location && (
          <Text style={styles.info}>Current City: {location.name}</Text>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Dashboard;
