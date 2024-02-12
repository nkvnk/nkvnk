import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
export default function QuestionScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.placeholder}>
        <TouchableOpacity>
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <MaterialIcons name="add" size={50} color="black" />
            <Text>商品を追加する</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.placeholderInset}>
          {/* Replace with your content */}
        </View>
      </View>

      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            {/* <Text style={styles.overlayContentPriceBefore}>$399</Text>*/}
            <Text style={styles.overlayContentPrice}>Total: 1000</Text>
          </View>

          {/*}  <Text style={styles.overlayContentTotal}>30% discount applied</Text>*/}
        </View>

        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Completed</Text>

            <MaterialCommunityIcons
              color="#fff"
              name="play-circle"
              size={24}
              style={{ marginLeft: 12 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 10,
    padding: 24,
    backgroundColor: "#F3F4F6",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#CFD1D4",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Overlay */
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  overlayContentPriceBefore: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#8e8e93",
    marginRight: 4,
    textDecorationLine: "line-through",
    textDecorationColor: "#8e8e93",
    textDecorationStyle: "solid",
  },
  overlayContentPrice: {
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "700",
    color: "#000",
  },
  overlayContentTotal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#4c6cfd",
    letterSpacing: -0.07,
    textDecorationLine: "underline",
    textDecorationColor: "#4c6cfd",
    textDecorationStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
