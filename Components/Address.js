import React from "react";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

export default function Address() {
  const route = useRoute();
  const placeData = route.params.placeData;

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        //  backgroundColor: "white",
        marginTop: 100,
      }}
    >
      <View style={{ alignSelf: "flex-start", marginLeft: 40 }}>
        {placeData && <Text>{placeData}</Text>}
      </View>

      <View
        style={{ marginTop: 10, alignItems: "center", width: "80%" }}
      ></View>

      <View style={{ marginTop: 30 }}>
        <TextInput
          style={{
            height: 50,
            width: 300,
            marginTop: 30,
            backgroundColor: "#EEEEEE",
            paddingHorizontal: 10,
            borderRadius: 10,
            borderRadius: 10,
            borderWidth: 2,
          }}
          placeholder="番地"
        />
      </View>
      <TextInput
        style={{
          height: 50,
          width: 300,
          marginTop: 30,
          backgroundColor: "#EEEEEE",
          paddingHorizontal: 10,
          borderRadius: 10,
          borderWidth: 2,
        }}
        placeholder="建物名・部屋番号"
      />
    </View>
  );
}
