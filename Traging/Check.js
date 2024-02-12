import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
export default function Check() {
  const [modalVisible, setModalVisible] = useState(true);
  // 画面の高さを取得
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const go = () => {
    setModalVisible(false);
    navigation.navigate("activity");
  };
  const products = [
    {
      id: 1,
      price: 700,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>注文の確認</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
                width: "100%",
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Image
                  source={require("../assets/grocery-cart.png")} // あるいは {uri: item.image} で動的に
                  style={{ height: 80, width: 80 }}
                />
              </View>
              <View style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  ￥{item.price}
                </Text>
              </View>
              {/* 価格を動的に表示 */}
            </View>
          )}
          // keyExtractor={(item) => item.id.toString()} // keyExtractorを有効に
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View
            style={[styles.modalContent, { marginTop: screenHeight * 0.5 }]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* この行を追加 */}
              <Text
                style={{ textAlign: "left", fontSize: 20, fontWeight: "600" }}
              >
                小計
              </Text>
              {/* textAlignを修正 */}
              <Text style={{ fontSize: 20, fontWeight: "600" }}>￥800</Text>
            </View>

            <View style={{ bottom: 10, width: "98%", position: "absolute" }}>
              <TouchableOpacity style={styles.button} onPress={go}>
                <Text style={styles.modalText}>会計に進む</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },

  header: {
    positon: "absolute",
    marginTop: 50,
  },
  headertext: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    height: 150,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    height: 60,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
    textAlign: "center",
    color: "white",
    paddingVertical: 9,
  },
});
