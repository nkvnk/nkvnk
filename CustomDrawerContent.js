import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const list = [
    {
      id: "setting",
      icon: "settings",
      label: "設定",
      type: "link",
      screen: "settings",
    },
    {
      id: "profile",
      icon: "user",
      label: "プロフィール",
      type: "link",
      screen: "profile",
    },
    {
      id: "payment",
      icon: "credit-card",
      label: "支払方法",
      type: "link",
      screen: "pays",
    },
    {
      id: "MakeMoney",
      icon: "flag",
      label: "注文の編集",
      type: "link",
      screen: "withdraw",
    },
    {
      id: "help",
      icon: "help-circle",
      label: "ヘルプ",
      type: "link",
      screen: "help",
    },
    {
      id: "question",
      icon: "mail",
      label: "質問",
      type: "link",
      screen: "question",
    },
  ];
  const go = (screen) => {
    navigation.navigate(screen);
  };
  const order = [
    {
      id: 1,
      icon: "cart",
      label: "買い物依頼",
    },
    {
      id: 2,
      icon: "",
      label: "運転依頼",
    },
    {
      id: 3,
      icon: "",
      label: "バイト依頼",
    },
  ];
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity>
        <View style={styles.drawerHeader}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity style={styles.button}>
              <FeatherIcon name="user" style={{ color: "grey" }} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.userName}>シンシコウタロウ</Text>
          </View>

          <View style={{ paddingLeft: 20 }}>
            <Icon name="angle-right" size={30} color="grey" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <FlatList
          style={{ paddingHorizontal: "" }}
          horizontal={true}
          data={order}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.box}>
              <MaterialCommunityIcons name="cart" size={28} color="black" />
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.becomeDriverButton}>
        <Text style={styles.becomeDriverText}>Wallet </Text>
        <Text style={styles.earnMoneyText}>Earn money on your schedule</Text>
      </TouchableOpacity>
      <View style={{ paddingTop: 40, marginLeft: 20 }}>
        <FlatList
          data={list}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => go(item.screen)}
              >
                <FeatherIcon
                  name={item.icon}
                  size={22}
                  style={{ marginRight: 15 }}
                />

                <Text
                  style={{ fontSize: 19, fontWeight: 400, paddingLeft: 10 }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f6f6f6",
    //backgroundColor: "white",
    //justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewProfileText: {
    fontSize: 14,
    color: "#0066cc",
  },
  becomeDriverButton: {
    backgroundColor: "#00cc66",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  becomeDriverText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  earnMoneyText: {
    fontSize: 12,
    color: "#ffffff",
  },
  button: {
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
  box: {
    marginRight: 20,
    width: 80,
    height: 80,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Androidの影のため
    shadowColor: "#000", // iOSの影のため
    shadowOffset: { width: 0, height: 2 }, // iOSの影のため
    shadowOpacity: 0.3, // iOSの影のため
    shadowRadius: 3, // iOSの影のため
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  // ... 他のスタイル ...
});

export default CustomDrawerContent;
