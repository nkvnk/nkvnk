import Home from "../Screens/Home";
import Map from "../Screens/Map";
import Setting from "../Screens/Setting";
import Activity from "../Screens/Activity";
import Trade from "../Screens/Trade";
import PayMoney from "../Traging/PayMoney";
import Search from "../Screens/Search";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="post"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13 },
        tabBarActiveTintColor: "white",
        tabBarStyle: { height: 60, backgroundColor: "#414249" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="map"
        component={Map}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabel: "Activity",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: "Setting",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({});

export default Tabs;
