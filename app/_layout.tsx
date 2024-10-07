import { createContext, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";

// Create the context
export const AppContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
}>({
  language: "en",
  setLanguage: () => {},
  currency: "EUR",
  setCurrency: () => {},
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("EUR");

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="phone"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="phone-2"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
