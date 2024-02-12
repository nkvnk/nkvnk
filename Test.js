import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";
import { MapView, Marker } from "react-native-maps";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // 例としてFontAwesomeを使用
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";
import RBSheet from "react-native-raw-bottom-sheet";
import Bottom from "./Bottom";

export default function Test() {
  const bottomSheetRef = useRef(null);

  const navigation = useNavigation();
  const draws = () => {
    navigation.openDrawer();
  };
  const [modal, setModal] = useState(false);
  const start = () => {
    setModal(true);
  };
  const end = () => {
    setModal(false);
  };
  const [selected, setSelected] = useState(0);
  const sheet = useRef();

  const [bottom, setBottom] = useState(false);
  const bottoms = () => {
    sheet.current.open();
  };
  //情報の取得

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        showsUserLocation={true}
      ></MapView>
      {/* 左上のアイコン */}
      <TouchableOpacity style={styles.iconTopLeft} onPress={draws}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconTopRight} onPress={start}>
        <Icon name="sliders" size={24} color="black" />
      </TouchableOpacity>

      <View
        style={{ position: "absolute", right: "0%", bottom: 180, margin: 20 }}
      >
        <TouchableOpacity
          // onPress={handleCurrentLocation}
          style={styles.buttons}
        >
          <MaterialCommunityIcons name="near-me" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ bottom: 50, position: "absolute", width: "90%" }}>
        <TouchableOpacity style={styles.tsudenibutton} onPress={bottoms}>
          <Text style={styles.tsuidenitext}>ついでに</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        //  height={200}
        // openDuration={250}
        ref={sheet}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>オプション</Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={styles.sheetBodyOptions}>
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 0 && { borderColor: "#000" },
              ]}
              onPress={() => setSelected(0)}
            >
              <FeatherIcon
                name="map"
                color={selected === 0 ? "#000" : "#bcbdd9"}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 0 && { color: "#000" },
                ]}
              >
                Option 1
              </Text>
            </TouchableOpacity>
            <View style={styles.delimiter} />
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 1 && { borderColor: "#000" },
              ]}
              onPress={() => setSelected(1)}
            >
              <FeatherIcon
                name="globe"
                color={selected === 1 ? "#000" : "#bcbdd9"}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 1 && { color: "#000" },
                ]}
              >
                Option 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 3 && { borderColor: "#000" },
              ]}
              onPress={() => setSelected(3)}
            >
              <FeatherIcon
                name="globe"
                color={selected === 3 ? "#000" : "#bcbdd9"}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 3 && { color: "#000" },
                ]}
              >
                Option 3
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Place an order</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/*  <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={["5%", "50%", "75%"]}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>配達する範囲を決める</Text>
        </View>
  </BottomSheet>*/}
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    width: 50, // 必要に応じてサイズを調整してください
    height: 50, // 必要に応じてサイズを調整してください
    backgroundColor: "white",
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
  iconTopRight: {
    position: "absolute",
    top: 10, // ステータスバーなどを考慮した余白
    right: 10, // 画面の右端からの余白
    padding: 10, // タップしやすいようにパディングを追加
    backgroundColor: "white", // アイコンの背景色
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
    margin: 17,
  },
  iconTopLeft: {
    position: "absolute",
    top: 10, // ステータスバーなどを考慮した余白
    left: 10, // 画面の左端からの余白
    padding: 10, // タップしやすいようにパディングを追加
    backgroundColor: "white", // アイコンの背景色
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
    margin: 17,
  },
  tsudenibutton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#00a960",
    width: "90%",
    height: 50,
    borderRadius: 40,
  },
  tsuidenitext: {
    fontWeight: "bold",
    color: "midnightblue",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  delimiter: {
    height: "100%",
    width: 1,
    backgroundColor: "#ebebf5",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Sheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 300,
  },
  sheetHeader: {
    paddingVertical: 14,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
  },
  sheetText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
    marginTop: 12,
  },
  sheetBody: {
    padding: 24,
  },
  sheetBodyOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    marginHorizontal: -16,
  },
  sheetBodyOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 28,
  },
  sheetBodyOptionText: {
    fontSize: 18,
    fontWeight: "600",
    //  marginTop: 2,
    color: "#bcbdd9",
  },
  /** Button */
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 32,
    backgroundColor: "#000000",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
