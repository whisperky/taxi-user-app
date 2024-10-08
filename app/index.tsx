import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SplashScreen, useRouter, Slot, Link } from "expo-router";
import { useFonts } from "expo-font";

const TaxiDriverApp = () => {
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Alexandria-Thin": require("../assets/fonts/Alexandria-Thin.ttf"),
    "Alexandria-Light": require("../assets/fonts/Alexandria-Light.ttf"),
    "Alexandria-Regular": require("../assets/fonts/Alexandria-Regular.ttf"),
    "Alexandria-Bold": require("../assets/fonts/Alexandria-Bold.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      await SplashScreen.hideAsync();

      // Set a timeout to navigate to the login screen after 2 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
        router.replace("/login");
      }, 2000);

      return () => clearTimeout(timer);
    };

    loadApp(); // Call the loadApp function
  }, [router]); // Remove 'loaded' from the dependency array

  if (!loaded || showSplash) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 90, height: 90 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/login">Login</Link>
      {/* Add more components and content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TaxiDriverApp;
