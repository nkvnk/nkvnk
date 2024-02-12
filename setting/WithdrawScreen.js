import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { generateClient } from "aws-amplify/api";
import { listOrders, getOrder } from "../src/graphql/queries";
import { UserInformation } from "../Context/UserInformation";
import { Rect, Circle, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
const client = generateClient();

export default function WithdrawScreen() {
  const userInformation = useContext(UserInformation);
  //console.log(userInformation);
  const [product, setProduct] = useState(null);
  const see = async () => {
    try {
      // List all items
      const variables = {
        filter: { userId: { eq: userInformation.user.sub } },
      };
      const allOrders = await client.graphql({
        query: listOrders,
        variables: variables,
      });
      const orders = allOrders.data.listOrders.items;
      setProduct(orders);
    } catch (err) {
      console.log("cant see");
    }
  };

  useEffect(() => {
    see();
  }, []);

  const navigation = useNavigation("");
  const detail = () => {
    navigation.navigate("detail", product);
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>注文した商品</Text>
      </View>

      <View
        style={{ alignSelf: "flex-start", marginTop: 50, flexDirection: "row" }}
      >
        <TouchableOpacity onPress={detail}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <Svg height={80} width={80}>
              <Rect
                width={80}
                height={80}
                fill="#DCDDDD"
                rx={30} // x軸方向の角の丸み
                ry={30}
              />

              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: "center",
                  marginTop: 15,
                }}
                source={require("../assets/shoppingIcon.png")}
              />
            </Svg>
            {product &&
              product.map((prodects) => (
                <View
                  key={prodects.id}
                  style={{ marginLeft: 50, flexDirection: "column" }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {prodects.product}
                  </Text>

                  <Text>{prodects.createdAt}</Text>
                </View>
              ))}
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 0.3,
          width: "80%",
          borderBottomColor: "grey",
          marginTop: 10,
          alignSelf: "center",
        }}
      />
    </View>
  );
}
