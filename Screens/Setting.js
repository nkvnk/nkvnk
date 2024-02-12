import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import { Rect } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { UserInformation } from "../Context/UserInformation";

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
    icon: "flag",
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

export default function Setting() {
  const userInformation = useContext(UserInformation);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setMail(userInformation.user.email);
    setName(userInformation.user.name);
  });

  const navigation = useNavigation();
  const go = (screen) => {
    navigation.navigate(screen);
  };

  const sett = () => {
    navigation.navigate("profile");
  };
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity
          style={{ paddingHorizontal: 24, marginBottom: 12 }}
          onPress={sett}
        >
          {/*  <FeatherIcon name="user" size={30} style={{ marginRight: 15 }} />*/}
          <Text style={styles.title}>{name}</Text>

          <Text style={styles.subtitle}>{mail} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.becomeDriverButton}>
          <Text style={styles.becomeDriverText}>Wallet </Text>
          <Text style={styles.earnMoneyText}>Earn money on your schedule</Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 40, marginLeft: 20 }}>
          <FlatList
            data={list}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => go(item.screen)}
              >
                <FeatherIcon
                  name={item.icon}
                  size={22}
                  style={{ marginRight: 10, color: "white" }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    paddingLeft: 10,
                    color: "white",
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#f6f6f6",
    // backgroundColor: "white",
    backgroundColor: "#27282f",
    // backgroundColor: "#000",
  },
  scroll: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    color: "white",
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
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  section: {
    paddingTop: 12,
  },
  sectionheader: {
    paddingHorizontal: 24,
  },
  sectionheadertext: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  wrapper: {
    paddingLeft: 24,
    //borderTopWidth: 1,
    borderColor: "#e3e3e3",
    //backgroundColor: "#fff",
  },
  row: {
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    //justifyContent: "flex-start",
    paddingRight: 24,
  },
  rowlabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowspace: {
    flex: 1,
  },
  rowvalue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
});
