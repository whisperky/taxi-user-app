import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  PanResponder,
} from "react-native";
import { useGlobalFonts } from "@/constants/fonts";
import { RadioButton } from "react-native-paper";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface SelectModalProps {
  isVisible: boolean;
  onClose: () => void;
  options: { label: string; symbol?: string; value: string }[];
  onSelect: (option: string) => void;
  title?: string;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  isVisible,
  onClose,
  options,
  onSelect,
  title = "Select an option",
  selectedOption,
  setSelectedOption,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  const fontsLoaded = useGlobalFonts();

  const panY = useRef(new Animated.Value(0)).current;
  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closeAnim = Animated.timing(animation, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  const closeModal = () => {
    closeAnim.start(() => {
      panY.setValue(0);
      setModalVisible(false);
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      closeModal();
    }
  }, [isVisible]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    onClose();
  };

  const handleOutsidePress = () => {
    onClose();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator if you prefer
  }

  return (
    <Modal visible={modalVisible} transparent animationType="none">
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
          opacity: opacity,
        }}
      >
        <StyledTouchableOpacity
          className="flex-1 justify-end"
          activeOpacity={1}
          onPress={handleOutsidePress}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.add(translateY, panY) }],
              backgroundColor: "white",
              borderTopLeftRadius: 70,
              borderTopRightRadius: 70,
            }}
            {...panResponder.panHandlers}
          >
            <StyledTouchableOpacity
              className="bg-white rounded-t-[70px] py-5 px-20"
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <StyledView className="w-20 h-2 bg-[#8cd96e] mx-auto mb-4" />
              <StyledText className="text-lg font-bold mb-4 text-center font-['Alexandria-Bold']">
                {title}
              </StyledText>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <StyledTouchableOpacity
                    className={`p-10 flex-row justify-between items-center border-gray-200`}
                    onPress={() => handleSelect(item.value)}
                  >
                    <StyledText className="text-base font-['Alexandria-Light']">
                      {item.label} &nbsp;&nbsp; {item.symbol && item.symbol}
                    </StyledText>
                    <RadioButton
                      value={item.value}
                      status={
                        item.value === selectedOption ? "checked" : "unchecked"
                      }
                      color="#8cd96e"
                      uncheckedColor="#8cd96e"
                      onPress={() => handleSelect(item.value)}
                    />
                  </StyledTouchableOpacity>
                )}
                style={{ maxHeight: 400 }}
              />
            </StyledTouchableOpacity>
          </Animated.View>
        </StyledTouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default SelectModal;
