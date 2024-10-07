import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
// Remove the CheckBox import from react-native-elements
// import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  CountryPicker,
  CountryList,
  CountryButton,
} from "react-native-country-codes-picker";

type RootStackParamList = {
  Login: undefined;
  MobileVerification: undefined;
};

type MobileVerificationScreenNavigationProp = {
  goBack: () => void;
};

function ListHeaderComponent({
  countries,
  lang,
  onPress,
}: {
  countries: any;
  lang: any;
  onPress: any;
}) {
  return (
    <View
      style={{
        paddingBottom: 20,
      }}
    >
      <Text className="text-left text-base text-black text-bold font-['Alexandria-Light']">
        Select a country
      </Text>
      {countries?.map((country: any, index: any) => {
        return (
          <CountryButton
            key={index}
            item={country}
            name={country?.name?.[lang || "en"]}
            onPress={() => onPress(country)}
          />
        );
      })}
    </View>
  );
}
export default function MobileVerificationScreen() {
  const navigation = useNavigation<MobileVerificationScreenNavigationProp>();
  const [isChecked, setIsChecked] = useState(true);
  const [show, setShow] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("🇺🇸"); // Add this line to store the country flag
  const [showPassword, setShowPassword] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 justify-center bg-white">
      {/* Back Button */}
      <View className="flex-row absolute top-10 left-4 items-center">
        <TouchableOpacity onPress={handleGoBack} className="mr-2">
          <Image
            source={require("@/assets/icons/back.png")}
            className="w-10 h-10 m-3"
          />
        </TouchableOpacity>
        <Text className="pl-10 pt-1 text-xl font-['Alexandria-Regular']">
          Register
        </Text>
      </View>

      {/* Phone Icon */}
      <View
        className="absolute bottom-0 bg-white rounded-t-[70px] pt-[70px] px-[40px] w-full items-center"
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
        {/* Mobile Number Input */}
        <View className="flex-row items-center my-5 gap-4">
          <TextInput
            style={{
              flex: 1,
              height: 60,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#8cd96e",
              fontSize: 16,
            }}
            placeholder="First Name"
          />
          <TextInput
            style={{
              flex: 1,
              height: 60,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#8cd96e",
              fontSize: 16,
            }}
            placeholder="Last Name"
          />
        </View>
        <TextInput
          style={{
            flex: 1,
            height: 60,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#8cd96e",
            fontSize: 16,
            width: "100%",
          }}
          className="my-5"
          placeholder="Email"
          keyboardType="email-address"
        />
        <View className="flex-row items-center my-5 gap-4">
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              width: "20%", // Reduced width to accommodate the phone input
              height: 60,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#8cd96e",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24 }}>{countryFlag}</Text>
            <Text style={{ color: "black", fontSize: 16 }}>{countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              height: 60,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#8cd96e",
              fontSize: 16,
            }}
            placeholder="Enter your number"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={(text) =>
              setMobileNumber(text.replace(/[^0-9]/g, ""))
            }
          />
          <CountryPicker
            show={show}
            lang="en"
            pickerButtonOnPress={(item: any) => {
              setCountryCode(item.dial_code);
              setCountryFlag(item.flag);
              setShow(false);
            }}
            ListHeaderComponent={ListHeaderComponent}
            popularCountries={["en", "ua", "pl"]}
            style={{
              modal: {
                padding: 100,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              },
              countryName: {
                color: "black",
              },
              dialCode: {
                color: "black",
              },
            }}
          />
        </View>
        <View className="relative w-full my-5">
          <TextInput
            style={{
              height: 60,
              backgroundColor: "white",
              padding: 10,
              paddingRight: 50, // Add space for the eye icon
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#8cd96e",
              fontSize: 16,
              width: "100%",
            }}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 transform -translate-y-1/2"
          >
            <Image
              source={
                !showPassword
                  ? require("../assets/images/eye-open.png")
                  : require("../assets/images/eye-close.png")
              }
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            flex: 1,
            height: 60,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#8cd96e",
            fontSize: 16,
            width: "100%",
          }}
          className="my-5"
          placeholder="Referral Code (Optional)"
        />
        {/* Terms and Conditions */}

        {/* Continue Button */}
        <TouchableOpacity
          className={`w-full py-3  rounded-2xl items-center ${
            isChecked ? "bg-[#8cd96e]" : "bg-gray-300"
          }`}
        >
          <Text className="text-white text-center font-['Alexandria-Regular']">
            Continue
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-black font-['Alexandria-Light'] mb-10 mt-10">
          Already have an account?{" "}
          <Text className="text-[#8cd96e] underline">Login</Text>
        </Text>
      </View>
    </View>
  );
}
