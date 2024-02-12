import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Search from "../Screens/Search";
import { AntDesign } from "@expo/vector-icons";

const SearchDetail2 = () => {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={{ left: 20, marginTop: 40 }}>
          <AntDesign name="arrowleft" size={35} color="white" />
        </View>
      </View>
      <View style={styles.tripCard}>
        <TouchableOpacity>
          <View style={styles.tripInfo}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.time}>09:40</Text>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 7.5,
                    backgroundColor: "orange",
                    marginLeft: 20,
                  }}
                />
                <View style={{ paddingLeft: 20, marginBottom: 6 }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    南柏駅
                  </Text>
                </View>
                <View style={{ marginLeft: 80 }}></View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ paddingVertical: 15 }}>
                  <Text style={styles.duration}>6h10</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 38,
                    paddingVertical: 5,
                  }}
                >
                  <View style={{ flex: 1, marginLeft: 200 }}>
                    <AntDesign name="right" size={24} color="white" />
                  </View>
                  <View style={styles.verticalLine} />
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.time}>13:40</Text>
                  <View style={styles.dot} />
                  <View style={{ paddingLeft: 20, marginBottom: 6 }}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
                    >
                      青葉台駅
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.tripStops}></View>

        <View style={styles.passengerIcons}>{/* Icons for passengers */}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27282f",
  },

  searchBar: {
    marginTop: 30,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#e6e6e6",
    backgroundColor: "#414249",
    borderRadius: 20,
    margin: 16,
    paddingLeft: 16,
    height: 55,
  },
  tripCard: {
    backgroundColor: "#333",
    borderRadius: 18,
    margin: 10,
    padding: 20,

    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
  verticalLine: {
    width: 2,
    height: 20, // This should be a small number to look like a line
    backgroundColor: "orange",
    flex: 1,
    paddingVertical: 5, // This will only work if the parent View has a defined height or flex
    // marginVertical: , // adjust the spacing according to your design
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "orange",
    marginLeft: 22,
  },
  line: {
    height: 1,
    width: 20,
    flex: 1,
    backgroundColor: "orange",
    marginHorizontal: 5,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    color: "#fff",
    fontSize: 18,
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

  // Add additional styles for other elements
});

export default SearchDetail2;
