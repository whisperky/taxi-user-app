import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import { AppContext } from "@/app/_layout";
import SelectModal from "@/components/modals/SelectModal";
// import MobileVerificationScreen from "./phone";

import { useFonts } from "expo-font";
import { useGlobalFonts } from "@/constants/fonts";
import { languageOptions, currencyOptions } from "@/constants/options";

// Define the navigation prop type
type RootStackParamList = {
  MobileVerification: undefined;
  // ... other screen names ...
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "MobileVerification"
>;

const LoginScreen = () => {
  const router = useRouter();
  const navigation = useNavigation<NavigationProp>();

  const fontsLoaded = useGlobalFonts();
  const { language, setLanguage, currency, setCurrency } =
    useContext(AppContext);

  useEffect(() => {
    console.log("language", language);
    console.log("currency", currency);
  }, [language, currency]);

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  // Add this function to handle language selection
  const handleLanguageSelect = (_language: string) => {
    // Implement language change logic here
    console.log(`Selected language: ${_language}`);
    setLanguage(_language);
    setLanguageModalVisible(false);
  };

  const handleCurrencySelect = (_currency: string) => {
    // Implement currency change logic here
    console.log(`Selected currency: ${_currency}`);
    setCurrency(_currency);
    setCurrencyModalVisible(false);
  };

  const handleRegisterPress = () => {
    router.push("/phone");
  };

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  // Add this function to get the full language name
  const getLanguageName = (code: string) => {
    const language = languageOptions.find((lang) => lang.value === code);
    return language ? language.label : code;
  };

  return (
    <View className="flex-1 bg-white" id="login">
      <StatusBar backgroundColor="#8cd96e" barStyle="light-content" />

      {/* Logo */}
      <View className="items-center pt-[130px]">
        <Image
          source={require("../assets/user_logo.png")}
          className="w-[90px] h-[90px]"
        />
      </View>

      <View className="flex-1 items-center justify-start pt-[30px] pb-[10px]">
        {/* Welcome Back Text */}
        <Text className="font-['Alexandria-Regular'] text-2xl">
          Welcome Back
        </Text>
        <Text className="font-['Alexandria-Light'] text-base text-[#777] mb-[10px]">
          Login to continue
        </Text>

        {/* Wrapped content with top rounded corners and shadow */}
        <View
          className="bg-white rounded-t-[60px] mt-[60px] pt-[40px] px-[40px] w-full h-full items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -10,
            },
            shadowOpacity: 0.6,
            shadowRadius: 5,
            elevation: 20,
          }}
        >
          <TouchableOpacity
            className="bg-[#8cd96e] py-[10px] px-[80px] rounded-[10px] mb-[30px] w-full items-center"
            style={{
              shadowColor: "#777",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 5,
              elevation: 6,
            }}
            onPress={handleRegisterPress}
          >
            <Text className="font-['Alexandria-Regular'] text-white text-base py-[10px]">
              Continue with Phone Number
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            className="bg-white py-[5px] px-[80px] rounded-[10px] mb-[20px] w-full items-center"
            style={{
              shadowColor: "#777",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 5,
              elevation: 6,
            }}
            onPress={handleRegisterPress}
          >
            <Text className="font-['Alexandria-Light'] text-black text-base py-[10px]">
              Register
            </Text>
          </TouchableOpacity>

          {/* Looking for User app? */}
          <View className="flex-row justify-center w-full px-[40px]">
            <TouchableOpacity
              className="w-[80%] items-center"
              onPress={handleRegisterPress}
            >
              <Text className="font-['Alexandria-Regular'] text-base p-[5px] text-[#8cd96e]">
                Looking for User app?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer: Language and Currency Options */}
        <View className="absolute bottom-[0px] flex-row justify-between w-full my-[40px] px-[40px]">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setLanguageModalVisible(true)}
          >
            <Text className="font-['Alexandria-Light'] text-sm text-black mr-1">
              {getLanguageName(language)}{" "}
            </Text>
            <Image
              source={require("../assets/icons/down-arrow.png")}
              className="w-[20px] h-[20px] mr-[10px]"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setCurrencyModalVisible(true)}
          >
            <Text className="font-['Alexandria-Light'] text-sm text-black mr-1">
              {currency}{" "}
            </Text>
            <Image
              source={require("../assets/icons/down-arrow.png")}
              className="w-[20px] h-[20px] mr-[10px]"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add SelectModal for language selection */}
      <SelectModal
        isVisible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onSelect={handleLanguageSelect}
        options={languageOptions}
        title="Select Language"
        selectedOption={language}
        setSelectedOption={setLanguage}
      />

      {/* Add SelectModal for currency selection */}
      <SelectModal
        isVisible={currencyModalVisible}
        onClose={() => setCurrencyModalVisible(false)}
        onSelect={handleCurrencySelect}
        options={currencyOptions}
        title="Select Currency"
        selectedOption={currency}
        setSelectedOption={setCurrency}
      />
    </View>
  );
};

export default LoginScreen;
