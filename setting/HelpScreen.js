import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>{/* Search bar content here */}</View>
      <View style={styles.filterContainer}>{/* Filter buttons here */}</View>
      <View style={styles.tripCard}>
        <View style={styles.tripInfo}>
          <Text style={styles.time}>09:40</Text>
          <Text style={styles.duration}>6h10</Text>
          <Text style={styles.price}>£30.76</Text>
        </View>
        <View style={styles.tripStops}>
          <Text style={styles.location}>Jena</Text>
          <FontAwesome name="long-arrow-down" size={18} color="orange" />
          <Text style={styles.location}>Salzburg</Text>
        </View>
        <View style={styles.driverInfo}>
          <Image
            style={styles.driverImage}
            source={{ uri: "path-to-driver-image" }} // Replace with your image path
          />
          <Text style={styles.driverName}>Adrian</Text>
          <MaterialCommunityIcons name="star" size={18} color="yellow" />
          <Text style={styles.rating}>5</Text>
        </View>
        <View style={styles.passengerIcons}>{/* Icons for passengers */}</View>
      </View>
      {/* Repeat trip card for other trips */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  searchBar: {
    // Styles for the search bar at the top
  },
  filterContainer: {
    // Styles for the filter buttons container
  },
  tripCard: {
    backgroundColor: "#333",
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    color: "#fff",
    fontSize: 20,
  },
  duration: {
    color: "orange",
    fontSize: 16,
  },
  price: {
    color: "#fff",
    fontSize: 20,
  },
  tripStops: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    color: "#fff",
    fontSize: 16,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  driverName: {
    color: "#fff",
    marginLeft: 8,
  },
  rating: {
    marginLeft: 4,
    color: "#fff",
  },
  passengerIcons: {
    // Styles for passenger icons
  },
  // Add additional styles for other elements
});

export default HelpScreen;
