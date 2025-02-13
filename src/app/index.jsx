import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
import * as Location from "expo-location";
import _Loading from "./_Loading";
import axios from "axios";
import { Redirect, router } from "expo-router";
import Weather from "./Weather";

const API_KEY = "5abd9ef606a592f2ad5006d4aa0cc110";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

    this.setState({ isLoading: false, temp: temp, condition: weather[0].main });
    console.log(data);
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Doesn't Work", "Go back");
    }
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <_Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
