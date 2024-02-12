import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { UserInformation } from "../Context/UserInformation";
import { generateClient } from "aws-amplify/api";
import { onCreateUserMoney } from "../src/graphql/subscriptions";
import Icon from "react-native-vector-icons/MaterialIcons"; // M
import { useNavigation } from "@react-navigation/native";
import {
  listUserMoneys,
  getUserMoney,
  listUserMonies,
} from "../src/graphql/queries";

const client = generateClient();

export default function Wait() {
  const userinformation = useContext(UserInformation);
  const navigation = useNavigation();
  console.log(userinformation);
  const [change, setChange] = useState(false);
  const [addresss, setAddresss] = useState(null);
  const [order, setOrder] = useState(null);
  const see = async () => {
    try {
      // List all items
      const variables = {
        filter: { delivererm: { eq: userinformation?.user?.sub } },
      };
      const allOrders = await client.graphql({
        query: listUserMonies,
        variables: variables,
      });
      const order = allOrders.data.listUserMonies.items[0].ordererm;
      const address = allOrders.data.listUserMonies.items[0].address;
      setAddresss(address);
      setOrder(order);
      console.log(addresss);
      setChange(false);
    } catch (error) {
      console.log("確認", error);
    }
  };

  useEffect(() => {
    see();
  }, []);

  const variables = {
    filter: {
      delivererm: { eq: userinformation?.user?.sub },
    },
  };
  const createSub = client
    .graphql({
      query: onCreateUserMoney,
      variables: variables,
    })
    .subscribe({
      next: ({ data }) => {
        console.log(data), setChange(false), console.log("all compted");
      },
      error: (error) => console.warn(error),
    });
  useEffect(() => {
    return () => {
      createSub.unsubscribe();
    };
  }, []);

  //リスケ対策で
  // List all items

  const navigateToAddress = () => {
    // ここに目的の住

    // 住所からGoogle MapsのURLを生成
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      addresss
    )}`;

    // Google Mapsアプリを開く
    Linking.openURL(googleMapsUrl);
  };
  const chatscreen = () => {
    navigation.navigate("chat", { order });
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {change ? (
        <View style={{ marginTop: 200 }}>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../assets/hourglass.gif")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Text style={{ fontWeight: "bold" }}>
            注文者の支払いが完了するまで待機していててください
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            (会計はせずに)
          </Text>

          {/*  <ActivityIndicator size="large" />*/}
        </View>
      ) : (
        <View>
          <View style={{ paddingTop: 50 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
            >
              入金が確認されました
            </Text>
            <View style={{ padding: 40 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                配達先の住所に向かってください
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "grey",
                  marginTop: 2,
                }}
              />
            </View>
            <TouchableOpacity onPress={chatscreen}>
              <View style={{ alignSelf: "flex-end", paddingVertical: 20 }}>
                <Icon name="message" size={24} color="black" />
                <Text>メッセージ</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: "grey",
                marginTop: 2,
              }}
            />
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontSize: 20 }}>建物名:南柏307</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "grey",
                marginTop: 2,
              }}
            />
            <TouchableOpacity onPress={navigateToAddress}>
              <View
                style={{
                  marginTop: 30,
                  alignSelf: "center",
                  paddingVertical: 20,
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="place"
                  size={30}
                  color="black"
                  style={{ marginRight: 10, alignSelf: "flex-start" }}
                />
                {addresss && <Text style={{ fontSize: 20 }}>{addresss}</Text>}
                {/* Location icon */}
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: "grey",
                marginTop: 20,
              }}
            />
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#00a960",
                  width: 200,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  配達を完了する
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

{
  /*

const createData = async () => {
  try {
    const variables = {
      filter: {
        // Only receive Todo messages where the "type" field is "Personal"
        userId: { eq: userinformation.user.sub },
      },
    };
    const sub = await client
      .graphql({
        query: subscriptions.onCreateUserMoney,
        variables: variables,
      })
      .subscribe({
        next: () => {
          console.log("完了しました");
        },
        error: (error) => console.warn(error),
      });
  } catch (err) {
    console.log("全然無");
  }
};

useEffect(() => {
  createData();
}, []);*/
}
