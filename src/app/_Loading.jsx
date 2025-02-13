
import React, { useEffect } from "react";
import { Image, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
const _Loading = () => {
  return (
    <SafeAreaView className="bg-primary h-full  ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-between flex-1">
          <View className="items-center justify-center flex-1">
            <Image source={images.logo} />
            <Text className="text-5xl text-white font-bold text-center">
              Sleep Sounds
            </Text>
          </View>
          <View>
            <Text className=" text-xs text-white font-light text-center">
              Created by
            </Text>
            <Text className=" text-xl text-white font-light text-center">
              Volodea
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default _Loading;
