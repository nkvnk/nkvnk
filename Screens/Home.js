import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rect, Circle, Svg } from "react-native-svg";

export default function Home() {
  const navigation = useNavigation();

  const categorylist = [
    {
      id: 1,
      name: "依頼したlist",
      value: "依頼したリスト",
      icon: require("../assets/see.png"),
      screen: "see",
    },

    {
      id: 2,
      name: "リストの編集",
      value: "リストの編集",
      icon: require("../assets/edit.png"),
      screen: "edit",
    },

    {
      id: 3,
      name: "リストの削除",
      value: "リストの削除",
      icon: require("../assets/trash.png"),
      screen: "delete",
    },
  ];
  function shop() {
    navigation.navigate("shopping1");
  }
  function editme(screen) {
    navigation.navigate(screen);
  }
  const test = () => {
    navigation.navigate("test");
  };
  const widthSize = 90;
  const heightSize = 80;
  const car = () => {
    navigation.navigate("sharecar1");
  };
  return (
    <View style={styles.container}>
      <View style={styles.service}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "white",
            //  backgroundColor: "#EEEEEE"
          }}
        >
          サービス
        </Text>
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={shop}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 90, // 必要に応じてサイズを調整してください
                height: 90, // 必要に応じてサイズを調整してください
                backgroundColor: "white",
                borderRadius: 25, // 幅と高さの半分の値にして円を作ります
                elevation: 3, // Android用の影を追加
                // iOS用の影
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: { height: 0, width: 0 },
              }}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: "center",
                  //marginTop: 15,
                }}
                source={require("../assets/grocery-cart.png")}
              />
              <Text
                style={{
                  paddingTop: 4,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                買い物依頼
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 20 }}>
            <TouchableOpacity
              onPress={car}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 90, // 必要に応じてサイズを調整してください
                height: 90, // 必要に応じてサイズを調整してください
                backgroundColor: "white",
                borderRadius: 25, // 幅と高さの半分の値にして円を作ります
                elevation: 3, // Android用の影を追加
                // iOS用の影
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: { height: 0, width: 0 },
              }}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: "center",
                  //marginTop: 15,
                }}
                source={require("../assets/car-sharing.png")}
              />
              <Text
                style={{
                  paddingTop: 4,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                相乗り募集
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 20 }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 90, // 必要に応じてサイズを調整してください
                height: 90, // 必要に応じてサイズを調整してください
                backgroundColor: "white",
                borderRadius: 25, // 幅と高さの半分の値にして円を作ります
                elevation: 3, // Android用の影を追加
                // iOS用の影
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: { height: 0, width: 0 },
              }}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: "center",
                  //marginTop: 15,
                }}
                source={require("../assets/meeting.png")}
              />
              <Text
                style={{
                  paddingTop: 4,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                仕事依頼
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <FlatList
          data={categorylist}
          horizontal={true}
          styel={{ position: "absolute" }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => editme(item.screen)}>
              <View style={{ marginTop: 25 }}>
                <Image
                  source={item.icon}
                  style={{ width: 70, height: 70, marginRight: 30 }}
                />
                <Text style={{ fontSize: 13, paddingTop: 5, fontWeight: 300 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          />*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: "#fff",
    backgroundColor: "#27282f",
    alignItems: "center",
    justifyContent: "center",
  },
  headview: {
    top: 0,
    position: "absolute",
    marginTop: 50,
  },
  head: {
    fontSize: 40,
    fontWeight: "bold",
  },
  service: {
    top: 0,
    position: "absolute",
    marginTop: 100,
    left: 0,
    marginLeft: 40,
  },
});
